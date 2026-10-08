// Episode video (16:9) and trailer (9:16, for YouTube Shorts).

import fs from 'node:fs';
import path from 'node:path';
import { drawWide, drawTall } from '../engine/draw.js';
import { SERIES } from '../engine/world.js';
import { toWav, splice } from '../engine/audio.js';
import { encode, buildAudio, readWav, distDir, when, rel, clock } from './lib.js';

const FPS = 30, SCALE = 1.5;

export async function renderEpisode(ep, opts) {
  opts = opts || {};
  const dir = distDir(ep.meta.id), wav = path.join(dir, 'audio.wav'), out = path.join(dir, ep.meta.id + '.mp4');
  const { used } = await buildAudio(ep, wav);
  fs.writeFileSync(path.join(dir, 'music-used.json'), JSON.stringify(used.map(t => ({ id: t.id, title: t.title, author: t.author, license: t.license, page: t.page })), null, 2));
  const seconds = opts.seconds ? Math.min(opts.seconds, ep.duration) : ep.duration;
  console.log(ep.meta.id + ' · ' + clock(seconds) + ' · ' + rel(out));
  await encode({
    W: 1920, H: 1080, fps: FPS, frames: Math.floor(seconds * FPS), wav, out, crf: opts.crf, preset: opts.preset,
    drawFrame: (ctx, i) => { ctx.scale(SCALE, SCALE); drawWide(ctx, ep, i / FPS); }
  });
  return out;
}

// The trailer is a list of cuts from the episode, between a hook card and a title card.
export function trailerPlan(ep) {
  const tr = ep.meta.trailer; if (!tr) throw new Error(ep.meta.id + ': no trailer() in the episode');
  const HOOK = 2.6, OUTRO = 3.6, segs = [];
  const cuts = tr.cuts.map(c => ({ t0: when(ep, c), dur: c.dur, caption: c.caption || '' }));
  segs.push({ t0: Math.max(0, cuts[0].t0 - HOOK), dur: HOOK, caption: '', card: 'hook' });
  cuts.forEach(c => segs.push(c));
  const last = cuts[cuts.length - 1];
  segs.push({ t0: Math.min(ep.duration - OUTRO - 9, last.t0 + last.dur), dur: OUTRO, caption: '', card: 'outro' });
  return { segs, total: segs.reduce((s, x) => s + x.dur, 0), hook: tr.hook };
}

export async function renderShort(ep) {
  const dir = distDir(ep.meta.id), epWav = path.join(dir, 'audio.wav'), wav = path.join(dir, 'short.wav'), out = path.join(dir, ep.meta.id + '-short.mp4');
  const audio = fs.existsSync(epWav) ? readWav(epWav) : (await buildAudio(ep, epWav)).audio;
  const plan = trailerPlan(ep);
  const cut = splice(audio, plan.segs.map(s => [s.t0, s.dur]));
  const fade = Math.floor(0.4 * cut.sr);
  for (let i = 0; i < fade; i++) { const g = i / fade, j = cut.L.length - 1 - i; cut.L[i] *= g; cut.R[i] *= g; cut.L[j] *= g; cut.R[j] *= g; }
  fs.writeFileSync(wav, toWav(cut.L, cut.R, cut.sr));
  const frames = [];
  for (const s of plan.segs) { const n = Math.round(s.dur * FPS); for (let i = 0; i < n; i++) frames.push({ s, x: i / FPS }); }
  console.log(ep.meta.id + ' trailer · ' + clock(plan.total) + ' · ' + rel(out));
  await encode({
    W: 1080, H: 1920, fps: FPS, frames: frames.length, wav, out, crf: 20,
    drawFrame: (ctx, i) => {
      const { s, x } = frames[i]; let card = null;
      if (s.card === 'hook') card = { alpha: Math.min(1, (s.dur - x) / 0.35), lines: [{ text: plan.hook, size: 52, tone: 'paper' }] };
      if (s.card === 'outro') card = { alpha: Math.min(1, x / 0.4), lines: [{ text: SERIES, size: 70, tone: 'amber' }, { text: 'episode ' + ep.meta.number + ' · ' + ep.meta.title.toLowerCase(), size: 26, mono: true, tone: 'paper' }, { text: 'full episode on the channel', size: 24, mono: true, bold: true, tone: 'teal' }] };
      ctx.scale(SCALE, SCALE); drawTall(ctx, ep, s.t0 + x, { caption: s.caption, card });
    }
  });
  fs.rmSync(wav, { force: true });
  return out;
}
