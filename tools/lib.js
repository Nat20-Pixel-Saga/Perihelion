// Shared plumbing for the command-line tools: episode loading, canvas and fonts, ffmpeg, WAV, music lookup.

import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { prepare } from '../engine/state.js';
import { renderAudio, toWav, SR } from '../engine/audio.js';
import { at } from '../engine/timeline.js';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const FFMPEG = process.env.FFMPEG || 'ffmpeg';
export const rel = p => path.relative(ROOT, p);

let fontsReady = false;
export function canvas(w, h) {
  if (!fontsReady) {
    const dir = path.join(ROOT, 'assets/fonts');
    GlobalFonts.registerFromPath(path.join(dir, 'IBMPlexMono-Regular.ttf'), 'IBM Plex Mono');
    GlobalFonts.registerFromPath(path.join(dir, 'IBMPlexMono-Bold.ttf'), 'IBM Plex Mono');
    GlobalFonts.registerFromPath(path.join(dir, 'Tektur-Medium.ttf'), 'Tektur');
    fontsReady = true;
  }
  const c = createCanvas(w, h);
  return { c, ctx: c.getContext('2d') };
}

export function episodeIds() {
  return fs.readdirSync(path.join(ROOT, 'episodes')).filter(f => /^s\d\de\d\d\.js$/.test(f)).map(f => f.slice(0, -3)).sort();
}
export async function loadEpisode(id) {
  const mod = await import(pathToFileURL(path.join(ROOT, 'episodes', id + '.js')).href);
  return prepare(mod.default);
}
export function season() { return JSON.parse(fs.readFileSync(path.join(ROOT, 'season.json'), 'utf8')); }
export function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); return p; }
export const distDir = id => ensureDir(path.join(ROOT, 'dist', id));
export const releaseDir = id => ensureDir(path.join(ROOT, 'release', id));

// A time given as seconds, a mark name, or { at: mark, from: offset }.
export function when(ep, spec) {
  if (spec && typeof spec === 'object') return Math.max(0, at(ep, spec.at) + (spec.from || 0));
  return at(ep, spec);
}
export const clock = x => Math.floor(x / 60) + ':' + String(Math.floor(x % 60)).padStart(2, '0');

export function ffmpeg(args, pipeIn) {
  const proc = spawn(FFMPEG, ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: [pipeIn ? 'pipe' : 'ignore', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => { proc.on('error', rej); proc.on('close', code => (code === 0 ? res() : rej(new Error('ffmpeg exited with ' + code)))); });
  return { proc, done };
}

// Pipes drawn frames into ffmpeg and muxes them with a WAV file.
export async function encode({ W, H, fps, frames, drawFrame, wav, out, crf, preset }) {
  const { c, ctx } = canvas(W, H);
  const { proc, done } = ffmpeg(['-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', W + 'x' + H, '-r', String(fps), '-i', '-', '-i', wav,
    '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-c:v', 'libx264', '-preset', preset || 'veryfast', '-crf', String(crf || 19), '-g', String(fps * 2),
    '-af', 'volume=9dB,alimiter=limit=0.89:level=false', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], true);
  const t0 = Date.now();
  for (let i = 0; i < frames; i++) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawFrame(ctx, i);
    if (!proc.stdin.write(c.data())) await once(proc.stdin, 'drain');
    if (i % (fps * 30) === 0 && i) process.stdout.write('  ' + clock(i / fps) + ' of ' + clock(frames / fps) + ' · ' + Math.round(i / ((Date.now() - t0) / 1000)) + ' fps\n');
  }
  proc.stdin.end();
  await done;
}

/* ---------- music ---------- */
export function musicManifest() { return JSON.parse(fs.readFileSync(path.join(ROOT, 'music/manifest.json'), 'utf8')); }
// Tracks that are both mapped to a mood and present on disk. Empty means: use the procedural pads.
export function availableTracks() {
  const m = musicManifest(), have = {};
  for (const mood of Object.keys(m.moods)) {
    const tr = m.tracks.find(x => x.id === m.moods[mood]);
    if (tr && fs.existsSync(path.join(ROOT, 'music/tracks', tr.file))) have[mood] = tr;
  }
  return have;
}

// Writes the episode's final audio to a WAV and returns the samples plus the tracks used.
// With CC0 tracks on disk, each music(mood) span plays its track under the sound effects;
// spans whose mood has no track keep the procedural pad.
export async function buildAudio(ep, wavPath) {
  const tracks = process.env.PERIHELION_NO_MUSIC ? {} : availableTracks();
  const anyTrack = Object.keys(tracks).length > 0;
  let audio = renderAudio(ep, { pad: !anyTrack });
  const used = [];
  if (!anyTrack) { fs.writeFileSync(wavPath, toWav(audio.L, audio.R, audio.sr)); return { audio, used }; }
  // Pads only for the spans that have no track.
  const full = renderAudio(ep, { pad: true });
  const dry = wavPath.replace(/\.wav$/, '.dry.wav'), wet = wavPath.replace(/\.wav$/, '.pads.wav');
  for (const sp of audio.spans) {
    if (tracks[sp.mood]) continue;
    const a = Math.floor(sp.t0 * SR), b = Math.min(audio.L.length, Math.floor(sp.t1 * SR));
    for (let i = a; i < b; i++) { audio.L[i] = full.L[i]; audio.R[i] = full.R[i]; }
  }
  fs.writeFileSync(dry, toWav(audio.L, audio.R, audio.sr));
  const args = ['-i', dry], parts = [];
  let n = 1;
  for (const sp of audio.spans) {
    const tr = tracks[sp.mood]; if (!tr) continue;
    if (!used.includes(tr)) used.push(tr);
    const len = sp.t1 - sp.t0;
    args.push('-stream_loop', '-1', '-t', String(len + 1), '-i', path.join(ROOT, 'music/tracks', tr.file));
    parts.push(`[${n}:a]aresample=${SR},volume=${tr.gain || 0.5},afade=t=in:d=3,afade=t=out:st=${Math.max(0, len - 3)}:d=3,adelay=${Math.round(sp.t0 * 1000)}:all=1[m${n}]`);
    n++;
  }
  const mix = '[0:a]' + parts.map((_, i) => `[m${i + 1}]`).join('') + `amix=inputs=${n}:duration=first:normalize=0,alimiter=limit=0.9[out]`;
  await ffmpeg([...args, '-filter_complex', parts.join(';') + ';' + mix, '-map', '[out]', '-ar', String(SR), '-ac', '2', wavPath]).done;
  fs.rmSync(dry, { force: true }); fs.rmSync(wet, { force: true });
  audio = readWav(wavPath);
  return { audio, used };
}

export function readWav(file) {
  const b = fs.readFileSync(file); let o = 12, sr = SR;
  while (o < b.length) {
    const id = b.toString('ascii', o, o + 4), size = b.readUInt32LE(o + 4);
    if (id === 'fmt ') sr = b.readUInt32LE(o + 12);
    if (id === 'data') { const n = Math.floor(Math.min(size, b.length - o - 8) / 4), L = new Float32Array(n), R = new Float32Array(n); for (let i = 0; i < n; i++) { L[i] = b.readInt16LE(o + 8 + i * 4) / 32768; R[i] = b.readInt16LE(o + 10 + i * 4) / 32768; } return { L, R, sr }; }
    o += 8 + size + (size & 1);
  }
  throw new Error('no data chunk in ' + file);
}
