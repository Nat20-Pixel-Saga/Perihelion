// Episode video (16:9) and trailer (9:16, for YouTube Shorts).

import fs from 'node:fs';
import path from 'node:path';
import { drawWide } from '../engine/draw.js';
import { encode, buildAudio, distDir, when, rel, clock } from './lib.js';

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
