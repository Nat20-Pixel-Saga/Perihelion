// Channel art and channel text for YouTube, drawn with the show's own renderer.
// Writes release/channel/: avatar, banner, watermark, playlist cover, and channel.md.

import fs from 'node:fs';
import path from 'node:path';
import { drawSpace, traceLine, FONT_MONO, FONT_DISPLAY } from '../engine/draw.js';
import { stateAt } from '../engine/state.js';
import { SERIES } from '../engine/world.js';
import { canvas, ensureDir, ROOT, season, rel, clock } from './lib.js';
import { calendar } from './meta.js';

const C = { void: '#070B10', panel: '#0A1118', line: '#4A3414', amber: '#F2A93B', dim: '#A87428', teal: '#4FD6B0', tealDim: '#1F7F68', paper: '#FCE9C8' };
const TAU = Math.PI * 2;
const DAY = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };

// The mark: an eccentric orbit, the body it circles, and the ship at its closest approach (the perihelion).
function mark(ctx, cx, cy, r, o) {
  o = o || {};
  const a = r, b = r * 0.72, rot = -0.42, c = a * Math.sqrt(1 - (b * b) / (a * a));
  const P = (x, y) => [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)];
  ctx.lineCap = 'round';
  ctx.strokeStyle = C.amber; ctx.lineWidth = r * 0.085; ctx.beginPath(); ctx.ellipse(cx, cy, a, b, rot, 0, TAU); ctx.stroke();
  const f = P(c, 0), ship = P(a, 0);
  ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(f[0], f[1], r * 0.13, 0, TAU); ctx.fill();
  ctx.fillStyle = o.bg || C.void; ctx.beginPath(); ctx.arc(ship[0], ship[1], r * 0.17, 0, TAU); ctx.fill();
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.arc(ship[0], ship[1], r * 0.105, 0, TAU); ctx.fill();
}

function space(ctx, ep, o) {
  const t = ep.marks.other + 14, s = stateAt(ep, t);
  s.mode = 'orbit'; s.body = o.body || 'tau9'; s.blips = o.blips ? s.blips : {};
  s.R = { from: o.R, to: o.R, t: 0, dur: 0 }; s.cx = { from: o.cx, to: o.cx, t: 0, dur: 0 };
  ctx.save(); ctx.translate(o.x || 0, o.y || 0); ctx.scale(o.k, o.k); drawSpace(ctx, ep, s, t, false); ctx.restore();
  return t;
}
const save = async (c, name) => { const out = path.join(ensureDir(path.join(ROOT, 'release/channel')), name); fs.writeFileSync(out, await c.encode('png')); console.log('channel · ' + rel(out)); };

export async function renderChannel(all) {
  const se = season(), ep = all[0];
  const days = se.schedule.days.map(d => d.toUpperCase()).join(' · ');

  // Profile picture, 800 x 800. YouTube crops it to a circle, so everything sits inside one.
  { const { c, ctx } = canvas(800, 800);
    ctx.fillStyle = C.void; ctx.fillRect(0, 0, 800, 800);
    ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(400, 400, 372, 0, TAU); ctx.stroke();
    mark(ctx, 388, 404, 262);
    await save(c, 'avatar-800.png'); }

  // Watermark, 150 x 150, transparent. Shown bottom right on every video.
  { const { c, ctx } = canvas(150, 150);
    ctx.fillStyle = 'rgba(7,11,16,0.72)'; ctx.beginPath(); ctx.arc(75, 75, 73, 0, TAU); ctx.fill();
    mark(ctx, 73, 76, 50, { bg: '#0B1016' });
    await save(c, 'watermark-150.png'); }

  // Banner, 2560 x 1440. Only the centre 1546 x 423 shows on every device; the rest is for TVs and desktops.
  { const { c, ctx } = canvas(2560, 1440);
    ctx.fillStyle = C.void; ctx.fillRect(0, 0, 2560, 1440);
    const t = space(ctx, ep, { k: 4.8, x: -260, y: -10, R: 50, cx: 520, blips: true });
    for (let i = 0; i < 10; i++) { ctx.fillStyle = 'rgba(7,11,16,' + (0.6 - i * 0.06) + ')'; ctx.fillRect(i === 0 ? 0 : 1000 + i * 50, 0, i === 0 ? 1050 : 50, 1440); }
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    mark(ctx, 600, 712, 62);
    ctx.font = '168px ' + FONT_DISPLAY; ctx.fillStyle = C.amber; ctx.fillText(SERIES, 700, 742);
    ctx.font = 'bold 40px ' + FONT_MONO; ctx.fillStyle = C.paper; ctx.fillText(se.tagline.toLowerCase(), 708, 812);
    ctx.font = 'bold 34px ' + FONT_MONO; ctx.fillStyle = C.teal; ctx.fillText('NEW EPISODES  ' + days, 708, 876);
    traceLine(ctx, ep, 'beacon', t, 0, 2560, 1010, 44, C.amber, 0, 70);
    traceLine(ctx, ep, 'other', t, 0, 2560, 1090, 26, C.teal, 2, 70);
    await save(c, 'banner-2560x1440.png');
    // A copy with the safe areas drawn, for checking only.
    ctx.setLineDash([16, 12]); ctx.lineWidth = 4; ctx.font = '28px ' + FONT_MONO;
    [[507, 508, 1546, 423, 'all devices 1546 x 423', C.paper], [0, 508, 2560, 423, 'desktop max 2560 x 423', C.teal]].forEach(g => { ctx.strokeStyle = g[5]; ctx.strokeRect(g[0], g[1], g[2], g[3]); ctx.fillStyle = g[5]; ctx.fillText(g[4], g[0] + 16, g[1] - 14); });
    await save(c, 'banner-safe-area-check.png'); }

  // Playlist cover, 1280 x 720.
  { const { c, ctx } = canvas(1280, 720);
    ctx.fillStyle = C.void; ctx.fillRect(0, 0, 1280, 720);
    const t = space(ctx, ep, { k: 2.4, x: 900 - 400 * 2.4, y: 330 - 152 * 2.4, R: 96, cx: 400, blips: true });
    ctx.fillStyle = 'rgba(7,11,16,0.9)'; ctx.fillRect(0, 0, 420, 720);
    for (let i = 0; i < 12; i++) { ctx.fillStyle = 'rgba(7,11,16,' + (0.9 - (i + 1) * 0.072) + ')'; ctx.fillRect(420 + i * 30, 0, 30, 720); }
    ctx.font = '34px ' + FONT_DISPLAY; ctx.fillStyle = C.dim; ctx.fillText(SERIES, 52, 84);
    ctx.font = 'bold 24px ' + FONT_MONO; ctx.fillStyle = C.paper; ctx.fillText(all.length + ' EPISODES · WATCH IN ORDER', 54, 124);
    ctx.font = '150px ' + FONT_DISPLAY; ctx.fillStyle = C.amber; ctx.fillText('SEASON', 46, 330); ctx.fillText('ONE', 46, 470);
    ctx.font = 'bold 28px ' + FONT_MONO; ctx.fillStyle = C.teal; ctx.fillText('sixty-four went out. seven follow.', 54, 600);
    traceLine(ctx, ep, 'beacon', t, 0, 1280, 652, 34, C.amber, 0, 60); traceLine(ctx, ep, 'other', t, 0, 1280, 694, 20, C.teal, 2, 60);
    ctx.strokeStyle = C.dim; ctx.lineWidth = 6; ctx.strokeRect(3, 3, 1274, 714);
    await save(c, 'playlist-season-1.png'); }

  // Channel text.
  const cal = calendar(all.length), total = all.reduce((s, e) => s + e.duration, 0);
  const dayNames = se.schedule.days.map(d => DAY[d]);
  const when = dayNames.slice(0, -1).join(', ') + ' and ' + dayNames[dayNames.length - 1] + ' at ' + se.schedule.time + ' (' + se.schedule.timezone.split('/')[1] + ' time)';
  const description = [
    'Sixty-four people went out on the survey ship Aphelion. Eleven years ago they stopped reporting. Seven were sent to find out why.',
    '',
    'PERIHELION is a science-fiction serial told entirely through a ship\'s console. You never see a face. You see the viewscreen, the star map, the signal strip, the deck plan with its seven crew dots, the captain\'s log and the comms. Watch the instruments: they show more than the log says.',
    '',
    'Season 1 is ' + all.length + ' episodes, about ' + Math.round(total / 60) + ' minutes in all. New episodes ' + when + ', with a short trailer the day before each one.',
    '',
    'Start with episode 1, "' + all[0].meta.title + '", and watch in order.',
    '',
    'Every frame and every sound is drawn by code from a script. The scripts and the tools are public: ' + se.repo
  ].join('\n');
  const playlist = [
    'The complete first season of PERIHELION, in order.',
    '',
    'A survey ship follows a chain of beacons left by a lost expedition. Each beacon pulses at an interval equal to the number of people who were still aboard when it was set, and the number keeps falling.',
    '',
    ...all.map(e => e.meta.number + '. ' + e.meta.title + ' (' + clock(e.duration) + ')'),
    '',
    'Told entirely through a ship\'s console. Watch the instruments.'
  ].join('\n');
  const md = [
    '# Channel setup · ' + se.handle, '',
    'Everything to paste into YouTube Studio. Regenerate with `node tools/cli.js channel` after changing `season.json`.', '',
    '## Files', '',
    '| File | Where it goes in YouTube Studio | Notes |', '| --- | --- | --- |',
    '| `avatar-800.png` | Customisation, Branding, Picture | 800 x 800. Cropped to a circle; the mark sits inside it |',
    '| `banner-2560x1440.png` | Customisation, Branding, Banner image | 2560 x 1440. The wordmark and both text lines sit inside the 1546 x 423 area every device shows |',
    '| `watermark-150.png` | Customisation, Branding, Video watermark | 150 x 150, transparent. Set display time to "Entire video" |',
    '| `playlist-season-1.png` | Upload as the thumbnail of a playlist-only cover video, or use on community posts | 1280 x 720. YouTube takes a playlist\'s cover from one of its videos |',
    '| `banner-safe-area-check.png` | Not for upload | The banner with the safe areas outlined |', '',
    '## Name and handle', '', '- Name: ' + se.channel, '- Handle: ' + se.handle, '- URL: ' + se.channelUrl, '',
    '## Channel description', '', '```', description, '```', '', '(' + description.length + ' of 1,000 characters)', '',
    '## One-line versions', '',
    '- Tagline (banner, social bios): ' + se.tagline + '.',
    '- Search snippet (first 150 characters matter most): Sixty-four people went out on the survey ship Aphelion. Eleven years ago they stopped reporting. Seven were sent to find out why.',
    '- Community post for launch: The beacon should pulse every 60 seconds. It pulses every 61. PERIHELION, episode 1, ' + new Date(cal[0].date + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }) + ' at ' + se.schedule.time + '.', '',
    '## Channel keywords', '', '```', se.tags.map(t => (t.includes(' ') ? '"' + t + '"' : t)).join(' '), '```', '',
    '## Playlist', '', '- Title: PERIHELION · Season 1', '- Order: manual, episode 1 first. Turn on "Set as official series playlist" so episodes link to the next one.', '', '```', playlist, '```', '',
    '## Home tab layout', '',
    '1. Channel trailer for people who have not subscribed: the episode 1 trailer (`s01e01-short.mp4`) will not work here because Shorts cannot be channel trailers. Use episode 1 itself.',
    '2. Featured video for returning subscribers: the newest episode.',
    '3. Section 1: the "PERIHELION · Season 1" playlist, as a single horizontal row.',
    '4. Section 2: Shorts (YouTube adds this shelf by itself once trailers are up).', '',
    '## Upload defaults', '',
    '- Category: Film and Animation.', '- Language: English. Add English captions from each episode\'s `script.md` if you want them searchable.',
    '- Audience: not made for kids.', '- Altered or synthetic content: answer "No". The videos are animated graphics and text, with no realistic people, places or events.',
    '- Default description footer: already included in each episode\'s `description.txt`.', '',
    '## Pinned comment for episode 1', '', '```', 'A tip for watching: the captain\'s log says what she wants on record. The deck plan shows where everyone actually was. They do not always agree.', '```', ''
  ].join('\n');
  fs.writeFileSync(path.join(ROOT, 'release/channel/channel.md'), md);
  console.log('channel · release/channel/channel.md · description ' + description.length + ' characters');
}
