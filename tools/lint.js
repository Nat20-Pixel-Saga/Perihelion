// Checks an episode against what the console can actually show and what YouTube needs.
// Errors block a build; warnings are judgement calls.

import { CREW, VOICES, PLANS, BODIES, MOODS } from '../engine/world.js';
import { wrapChars, CAP } from '../engine/text.js';
import { trailerPlan } from './video.js';
import { clock } from './lib.js';

const OBJECTS = ['beacon', 'shuttle', 'aphelion', 'register', 'wave', 'none'];
const MODES = ['transit', 'orbit', 'night', 'screen'];

export function lint(ep) {
  const errors = [], warns = [];
  const err = (e, m) => errors.push((e ? clock(e.t) + ' ' : '') + m), warn = (e, m) => warns.push((e ? clock(e.t) + ' ' : '') + m);
  const m = ep.meta;
  if (!m.id || !m.number || !m.title) err(null, 'meta needs id, number and title');
  if (!m.logline) err(null, 'meta.logline is missing'); else if (m.logline.length > 220) err(null, 'meta.logline is over 220 characters');
  if (!m.start || !m.start.clock) err(null, 'meta.start.clock is missing');

  let logText = '', logStamp = null, screenY = 46, screenObj = 'beacon', lastScene = null, hasEnd = false;
  const crewPlan = {};
  for (const e of ep.events) {
    switch (e.type) {
      case 'scene': if (lastScene && e.t - lastScene.t < 20) err(e, 'scene "' + lastScene.title + '" is under 20 s; YouTube chapters need at least 10 s and a card needs time to read'); lastScene = e; break;
      case 'status': if (e.text.length > CAP.status) err(e, 'status text over ' + CAP.status + ' characters: "' + e.text + '"'); break;
      case 'loc': if (e.text.length > CAP.loc) err(e, 'loc text over ' + CAP.loc + ' characters: "' + e.text + '"'); break;
      case 'music': if (!MOODS[e.mood]) err(e, 'unknown mood "' + e.mood + '"'); break;
      case 'theme': if (!['amber', 'red', 'teal'].includes(e.name)) err(e, 'unknown theme "' + e.name + '"'); break;
      case 'view':
        if (!MODES.includes(e.mode)) err(e, 'unknown view mode "' + e.mode + '"');
        if (e.body && !BODIES[e.body]) err(e, 'unknown body "' + e.body + '"');
        if (e.object && !OBJECTS.includes(e.object)) err(e, 'unknown screen object "' + e.object + '"');
        if (e.mode === 'screen') { screenY = 46; if (e.object) screenObj = e.object; }
        break;
      case 'readout': {
        const cap = screenObj === 'none' ? CAP.readoutWide : CAP.readout;
        screenY += 23 + wrapChars(e.text, cap).length * 23 + 11;
        if (screenY - 34 > 286) err(e, 'readouts overflow the viewscreen; start a new view("screen", …) or shorten: "' + e.head + '"');
        break;
      }
      case 'move': {
        if (!CREW[e.who]) err(e, 'move: unknown crew "' + e.who + '"');
        const plan = PLANS[e.plan];
        if (!plan) err(e, 'move: unknown plan "' + e.plan + '"'); else if (e.room !== 'off' && !plan.rooms[e.room]) err(e, 'move: no room "' + e.room + '" on plan "' + e.plan + '"');
        crewPlan[e.who] = e.plan; break;
      }
      case 'plan': if (!PLANS[e.name]) err(e, 'unknown plan "' + e.name + '"'); break;
      case 'tag': break;
      case 'meter': if (!['fuel', 'hull', 'morale'].includes(e.name)) err(e, 'unknown meter "' + e.name + '"'); if (e.to < 0 || e.to > 100) err(e, 'meter out of range'); break;
      case 'sig': if (!['beacon', 'other'].includes(e.ch)) err(e, 'unknown signal channel "' + e.ch + '"'); if (e.on && !(e.period > 0)) { const prev = ep.sig[e.ch].find(c => c.t === e.t); if (!prev || !(prev.period > 0)) err(e, 'signal turned on without a period'); } break;
      case 'logOpen': logText = ''; logStamp = e.stamp; if (e.stamp.length > 20) err(e, 'log stamp over 20 characters'); break;
      case 'logType': logText += e.text; { const n = wrapChars(logText, CAP.log).length; if (n > CAP.logLines) err(e, 'log entry "' + logStamp + '" runs to ' + n + ' lines; the panel holds ' + CAP.logLines + '. Split it into two entries.'); } break;
      case 'logErase': logText = logText.slice(0, logText.length - e.n); break;
      case 'say': {
        const sp = typeof e.who === 'object' ? e.who : CREW[e.who] || VOICES[e.who];
        if (!sp) err(e, 'say: unknown speaker "' + e.who + '"');
        const n = wrapChars(e.text, CAP.comms).length; if (n > CAP.commsLines) err(e, 'comms line runs to ' + n + ' lines; keep it to ' + CAP.commsLines + ': "' + e.text.slice(0, 40) + '…"');
        break;
      }
      case 'end': hasEnd = true; if (!e.next && m.number < 10) warn(e, 'end() has no next-episode title'); break;
    }
  }
  if (ep.scenes.length < 3) err(null, 'fewer than 3 scenes; YouTube needs at least 3 chapters');
  if (!hasEnd) err(null, 'no end()');
  if (ep.duration < 255) warn(null, 'runtime ' + clock(ep.duration) + ' is under 4:15');
  if (ep.duration > 560) warn(null, 'runtime ' + clock(ep.duration) + ' is over 9:20');

  if (!m.thumb) err(null, 'no thumb()');
  if (!m.trailer) err(null, 'no trailer()');
  else {
    if (!m.trailer.hook || m.trailer.hook.length > 64) err(null, 'trailer hook is missing or over 64 characters');
    if (!m.trailer.cuts || m.trailer.cuts.length < 3) err(null, 'trailer needs at least 3 cuts');
    else {
      try {
        const plan = trailerPlan(ep);
        if (plan.total > 58) err(null, 'trailer runs ' + plan.total.toFixed(1) + ' s; keep it under 58 s');
        if (plan.total < 20) warn(null, 'trailer runs only ' + plan.total.toFixed(1) + ' s');
        for (const c of m.trailer.cuts) if (c.caption && c.caption.length > 46) err(null, 'trailer caption over 46 characters: "' + c.caption + '"');
        for (const s of plan.segs) if (s.t0 + s.dur > ep.duration) err(null, 'a trailer cut runs past the end of the episode');
      } catch (x) { err(null, x.message); }
    }
  }
  return { errors, warns };
}
