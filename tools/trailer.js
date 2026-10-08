// Trailers. Every trailer exists in two formats: 16:9 ("wide") and 9:16 ("short", for YouTube Shorts).
// An episode trailer is cut from its own episode (the episode's trailer() call).
// The season trailer is cut from several episodes (episodes/season1-trailer.js).
// Sound: the cuts keep their own effects (pings, typing, comms) over one continuous music bed.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { drawWide, drawTall } from '../engine/draw.js';
import { SERIES } from '../engine/world.js';
import { episode } from '../engine/timeline.js';
import { renderAudio, toWav, splice } from '../engine/audio.js';
import { encode, distDir, ensureDir, when, rel, clock, season, ROOT } from './lib.js';
import { trailerPlan } from './video.js';

const FPS = 30, SCALE = 1.5;
const FORMATS = { wide: { W: 1920, H: 1080, suffix: '-trailer' }, short: { W: 1080, H: 1920, suffix: '-short' } };

export function episodeTrailer(ep) {
  const p = trailerPlan(ep);
  return {
    id: ep.meta.id, dir: distDir(ep.meta.id), moods: ep.meta.trailer.moods || ['unease', 'dread'], total: p.total,
    segs: p.segs.map(s => Object.assign({ ep }, s, {
      card: s.card === 'hook' ? [{ text: p.hook, size: 52, tone: 'paper' }]
        : s.card === 'outro' ? [{ text: SERIES, size: 70, tone: 'amber' }, { text: 'episode ' + ep.meta.number + ' · ' + ep.meta.title.toLowerCase(), size: 26, mono: true, tone: 'paper' }, { text: 'full episode on the channel', size: 24, mono: true, bold: true, tone: 'teal' }] : null,
      fade: s.card === 'hook' ? 'out' : 'in'
    }))
  };
}

export async function seasonSpec() { return (await import(pathToFileURL(path.join(ROOT, 'episodes/season1-trailer.js')).href)).default; }

export function seasonTrailer(spec, all, format) {
  const HOOK = 3.2, OUTRO = 4.6, byId = Object.fromEntries(all.map(e => [e.meta.id, e]));
  const days = season().schedule.days.map(d => d.toLowerCase()).join(' · ');
  const cuts = spec[format].map(c => { const ep = byId[c.ep]; if (!ep) throw new Error('season trailer: no episode ' + c.ep); return { ep, t0: when(ep, c), dur: c.dur, caption: c.caption || '' }; });
  const first = cuts[0], last = cuts[cuts.length - 1];
  const segs = [
    { ep: first.ep, t0: Math.max(0, first.t0 - HOOK), dur: HOOK, caption: '', card: [{ text: spec.hook, size: 52, tone: 'paper' }], fade: 'out' },
    ...cuts,
    { ep: last.ep, t0: last.t0 + last.dur, dur: OUTRO, caption: '', fade: 'in', card: [{ text: SERIES, size: 70, tone: 'amber' }, { text: spec.outro[0], size: 26, mono: true, tone: 'paper' }, { text: spec.outro[1], size: 26, mono: true, tone: 'paper' }, { text: 'new episodes ' + days, size: 24, mono: true, bold: true, tone: 'teal' }] }
  ];
  return { id: spec.id, dir: ensureDir(path.join(ROOT, 'dist', spec.id)), moods: spec.moods, segs, total: segs.reduce((s, x) => s + x.dur, 0) };
}

const sfxCache = new Map();
function trailerAudio(plan) {
  const parts = plan.segs.map(s => {
    if (!sfxCache.has(s.ep.meta.id)) sfxCache.set(s.ep.meta.id, renderAudio(s.ep, { pad: false, hum: false }));
    return splice(sfxCache.get(s.ep.meta.id), [[s.t0, s.dur]]);
  });
  const step = plan.total / plan.moods.length;
  const bed = renderAudio(episode({ id: 'bed', number: 0, title: '', start: { music: plan.moods[0] } }, d => { d.wait(Math.max(0, step - 4.5)); plan.moods.slice(1).forEach(m => { d.music(m); d.wait(step); }); d.end(); }));
  const n = Math.round(plan.total * bed.sr), L = new Float32Array(n), R = new Float32Array(n), fade = 0.5 * bed.sr;
  let o = 0;
  for (const p of parts) { for (let i = 0; i < p.L.length && o + i < n; i++) { L[o + i] = p.L[i]; R[o + i] = p.R[i]; } o += p.L.length; }
  for (let i = 0; i < n; i++) { const g = Math.min(1, i / fade, (n - i) / (fade * 2)); L[i] = Math.tanh(L[i] + bed.L[i] * 1.1) * g; R[i] = Math.tanh(R[i] + bed.R[i] * 1.1) * g; }
  return { L, R, sr: bed.sr };
}

export async function renderTrailer(plan, format) {
  const f = FORMATS[format], wav = path.join(plan.dir, plan.id + f.suffix + '.wav'), out = path.join(plan.dir, plan.id + f.suffix + '.mp4');
  const a = trailerAudio(plan); fs.writeFileSync(wav, toWav(a.L, a.R, a.sr));
  const frames = [];
  for (const s of plan.segs) { const n = Math.round(s.dur * FPS); for (let i = 0; i < n; i++) frames.push({ s, x: i / FPS }); }
  console.log(plan.id + ' ' + format + ' trailer · ' + clock(plan.total) + ' · ' + rel(out));
  await encode({
    W: f.W, H: f.H, fps: FPS, frames: frames.length, wav, out, crf: 20,
    drawFrame: (ctx, i) => {
      const { s, x } = frames[i];
      const card = s.card ? { lines: s.card, alpha: s.fade === 'out' ? Math.min(1, (s.dur - x) / 0.35) : Math.min(1, x / 0.4) } : null;
      ctx.scale(SCALE, SCALE);
      if (format === 'wide') drawWide(ctx, s.ep, s.t0 + x, { trailer: true, caption: s.caption, card }); else drawTall(ctx, s.ep, s.t0 + x, { caption: s.caption, card });
    }
  });
  fs.rmSync(wav, { force: true });
  return out;
}

// Still frames of every cut in both formats, for review.
export async function trailerFrames(plan, format, canvasOf) {
  const f = FORMATS[format], dir = ensureDir(path.join(plan.dir, 'frames')), { c, ctx } = canvasOf(f.W / SCALE, f.H / SCALE), out = [];
  let i = 0;
  for (const s of plan.segs) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const card = s.card ? { lines: s.card } : null, t = s.t0 + s.dur * 0.7;
    if (format === 'wide') drawWide(ctx, s.ep, t, { trailer: true, caption: s.caption, card }); else drawTall(ctx, s.ep, t, { caption: s.caption, card });
    const file = path.join(dir, 'trailer-' + format + '-' + String(i++).padStart(2, '0') + '.png'); fs.writeFileSync(file, await c.encode('png')); out.push(file);
  }
  return out;
}
