#!/usr/bin/env node
// node tools/cli.js <command> [episode ids…]
//   build    lint, then video + trailer + thumbnail + metadata (default: every episode)
//   render   episode video only          short    trailer only
//   thumb    thumbnail only              frames   still frames for review (ids, then optional seconds)
//   meta     titles, descriptions, script, schedule
//   lint     check episodes              music    status | fetch
// Options: --seconds N (render only the first N seconds), --no-video (build without the two videos)

import { loadEpisode, episodeIds, clock } from './lib.js';
import { renderEpisode, renderShort } from './video.js';
import { renderThumb, renderFrames } from './stills.js';
import { writeMeta, writeSchedule } from './meta.js';
import { lint } from './lint.js';
import { musicStatus, musicFetch } from './music.js';

const argv = process.argv.slice(2), cmd = argv[0] || 'build';
const flags = {}, rest = [];
for (let i = 1; i < argv.length; i++) { if (argv[i] === '--seconds') flags.seconds = +argv[++i]; else if (argv[i].startsWith('--')) flags[argv[i].slice(2)] = true; else rest.push(argv[i]); }
const ids = rest.filter(x => /^s\d\de\d\d$/.test(x)), extra = rest.filter(x => !/^s\d\de\d\d$/.test(x));
const pick = async () => Promise.all((ids.length ? ids : episodeIds()).map(loadEpisode));
const everything = async () => Promise.all(episodeIds().map(loadEpisode));

function runLint(eps) {
  let bad = 0;
  for (const ep of eps) {
    const r = lint(ep);
    console.log(ep.meta.id + ' · ' + ep.meta.title + ' · ' + clock(ep.duration) + ' · ' + ep.events.length + ' events · ' + (r.errors.length ? r.errors.length + ' errors' : 'ok') + (r.warns.length ? ', ' + r.warns.length + ' warnings' : ''));
    r.errors.forEach(x => console.log('  error  ' + x)); r.warns.forEach(x => console.log('  warn   ' + x));
    bad += r.errors.length;
  }
  return bad;
}

if (cmd === 'music') { if (extra[0] === 'fetch') await musicFetch(); else musicStatus(); }
else if (cmd === 'lint') { if (runLint(await pick())) process.exit(1); }
else {
  const eps = await pick(), all = await everything();
  if (cmd === 'build' && runLint(eps)) { console.error('Fix the errors above, then build again.'); process.exit(1); }
  for (const ep of eps) {
    if (cmd === 'render' || (cmd === 'build' && !flags['no-video'])) await renderEpisode(ep, flags);
    if (cmd === 'short' || (cmd === 'build' && !flags['no-video'])) await renderShort(ep);
    if (cmd === 'thumb' || cmd === 'build') await renderThumb(ep);
    if (cmd === 'frames') await renderFrames(ep, extra);
    if (cmd === 'meta' || cmd === 'build') writeMeta(ep, all);
  }
  if (cmd === 'meta' || cmd === 'build') writeSchedule(all);
}
