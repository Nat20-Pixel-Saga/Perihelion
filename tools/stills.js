// Thumbnails and check frames.

import fs from 'node:fs';
import path from 'node:path';
import { drawWide, drawTall, drawThumb } from '../engine/draw.js';
import { canvas, distDir, releaseDir, when, rel } from './lib.js';
import { trailerPlan } from './video.js';

export async function renderThumb(ep) {
  const o = ep.meta.thumb; if (!o) throw new Error(ep.meta.id + ': no thumb() in the episode');
  const { c, ctx } = canvas(1280, 720);
  drawThumb(ctx, ep, when(ep, o), o);
  const out = path.join(releaseDir(ep.meta.id), 'thumbnail.png');
  fs.writeFileSync(out, await c.encode('png'));
  console.log(ep.meta.id + ' thumbnail · ' + rel(out));
  return out;
}

// Still frames for review: one per scene (12 s in), one per mark, plus the trailer's cuts in 9:16.
export async function renderFrames(ep, times) {
  const dir = path.join(distDir(ep.meta.id), 'frames'); fs.mkdirSync(dir, { recursive: true });
  const list = times && times.length ? times.map(Number) : [...ep.scenes.map(s => s.t + 12), ...Object.values(ep.marks).map(t => t + 3)].sort((a, b) => a - b);
  const { c, ctx } = canvas(1280, 720), out = [];
  for (const t of list) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); drawWide(ctx, ep, Math.min(t, ep.duration - 0.1));
    const f = path.join(dir, 'wide-' + String(Math.round(t)).padStart(4, '0') + '.png'); fs.writeFileSync(f, await c.encode('png')); out.push(f);
  }
  if (ep.meta.trailer) {
    const tall = canvas(720, 1280), plan = trailerPlan(ep);
    let i = 0;
    for (const s of plan.segs) {
      tall.ctx.setTransform(1, 0, 0, 1, 0, 0);
      const card = s.card === 'hook' ? { lines: [{ text: plan.hook, size: 52, tone: 'paper' }] } : null;
      drawTall(tall.ctx, ep, s.t0 + s.dur * 0.6, { caption: s.caption, card });
      const f = path.join(dir, 'tall-' + i++ + '.png'); fs.writeFileSync(f, await tall.c.encode('png')); out.push(f);
    }
  }
  console.log(ep.meta.id + ' frames · ' + out.length + ' in ' + rel(dir));
  return out;
}
