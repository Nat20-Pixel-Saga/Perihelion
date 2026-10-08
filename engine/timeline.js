// Episode builder. An episode is a function that calls these verbs in story order;
// the builder keeps a clock and turns the calls into a flat, time-stamped event list.
// The renderer, the audio, the script export and the metadata all read that list.

import { CREW, VOICES, PLANS } from './world.js';

export const CPS = 24;        // captain's log typing speed, characters per second
export const ERASE = 45;      // deletion speed
export const READ_CPS = 30;   // viewscreen readout typing speed
export const TITLE_SECONDS = 4.5;

export function episode(meta, write) {
  const E = [];
  const marks = {};
  let T = 0;
  let lastTyped = '';
  const ev = (type, d) => { E.push(Object.assign({ t: +T.toFixed(2), type }, d || {})); };

  const d = {
    // --- time ---
    wait(s) { T += s; },
    mark(name) { marks[name] = +T.toFixed(2); },
    now() { return T; },

    // --- structure ---
    scene(title) { ev('scene', { title }); },
    note(text) { ev('note', { text }); },
    music(mood) { ev('music', { mood }); },
    end(o) { ev('end', Object.assign({ next: '', line: '' }, o || {})); T += 9; },

    // --- top bar ---
    clock(day, time) { ev('clock', { day, time }); },
    loc(text) { ev('loc', { text }); },
    status(text, tone) { ev('status', { text, tone: tone || 'amber' }); },
    theme(name) { ev('theme', { name }); },

    // --- viewscreen ---
    // mode: 'transit' | 'orbit' | 'night' | 'screen'. o: { body, R, cx, dur, fromR, fromCx, object }
    view(mode, o) { ev('view', Object.assign({ mode }, o || {})); },
    blip(id, o) { ev('blip', { id, o: o || null }); },
    readout(head, text, o) { ev('readout', Object.assign({ head, text }, o || {})); T += text.length / READ_CPS + 1.2; },

    // --- star map ---
    mapTo(to, dur) { ev('map', { to, dur: dur || 0 }); },
    mapCam(x, dur) { ev('mapCam', { to: x, dur: dur || 0 }); },
    mapKnown(n) { ev('mapKnown', { n }); },
    course(on) { ev('course', { on: on !== false }); },
    mapReveal() { ev('mapReveal', {}); },

    // --- signal strip ---
    // ch: 'beacon' | 'other'. o: { on, period (screen seconds; 1 s on screen = 10 s of story), offset, name, label }
    sig(ch, o) { ev('sig', Object.assign({ ch }, o)); },
    tx(label) { ev('tx', { label }); },

    // --- deck plan ---
    plan(name) { ev('plan', { name: name || 'perihelion' }); },
    move(who, room, dur) {
      const parts = room.includes(':') ? room.split(':') : ['perihelion', room];
      ev('move', { who, plan: parts[0], room: parts[1], dur: dur === undefined ? 4 : dur });
    },
    labels(on) { ev('labels', { on }); },
    tag(room, text) { ev('tag', { room, text: text || null }); },

    // --- meters ---
    meter(name, to, dur) { ev('meter', { name, to, dur: dur === undefined ? 3 : dur }); },

    // --- captain's log ---
    logMode(mode) { ev('logMode', { mode }); },
    logOpen(stamp, o) { ev('logOpen', Object.assign({ stamp }, o || {})); },
    logType(text, o) { ev('logType', Object.assign({ text }, o || {})); lastTyped = text; T += text.length / CPS + 1.6; },
    logErase() { ev('logErase', { n: lastTyped.length, erased: lastTyped }); T += lastTyped.length / ERASE + 0.8; },
    log(stamp, text, o) { d.logOpen(stamp, o); d.logType(text, o); },

    // --- comms ---
    say(who, text, o) { ev('say', Object.assign({ who, text }, o || {})); T += 1.4 + text.length / 20; },

    // --- packaging ---
    trailer(o) { meta.trailer = o; },
    thumb(o) { meta.thumb = o; }
  };

  // Opening state, then the title card.
  const s = meta.start || {};
  if (s.clock) d.clock(s.clock[0], s.clock[1]);
  if (s.loc) d.loc(s.loc);
  d.status(s.status || 'nominal', s.statusTone);
  d.view(s.view || 'transit', Object.assign({ body: 'none', R: 0, cx: 560, dur: 0 }, s.viewOpts || {}));
  ev('map', { to: s.map === undefined ? 4 : s.map, dur: 0 });
  ev('mapCam', { to: s.mapCam || 0, dur: 0 });
  ev('mapKnown', { n: s.mapKnown === undefined ? 4 : s.mapKnown });
  for (const k of Object.keys(s.crew || {})) d.move(k, s.crew[k], 0);
  for (const k of Object.keys(s.meters || {})) d.meter(k, s.meters[k], 0);
  for (const k of Object.keys(s.sig || {})) d.sig(k, s.sig[k]);
  if (s.logMode) d.logMode(s.logMode);
  if (s.theme) d.theme(s.theme);
  if (s.course) d.course(true);
  if (s.plan) d.plan(s.plan);
  for (const k of Object.keys(s.blips || {})) d.blip(k, s.blips[k]);
  d.music(s.music || 'calm');
  ev('title', {});
  T = TITLE_SECONDS;

  write(d);

  if (!E.some(e => e.type === 'end')) d.end({});
  E.sort((a, b) => a.t - b.t);
  return { meta, events: E, marks, duration: +T.toFixed(2) };
}

// Resolve a mark name, or a number, to seconds.
export function at(ep, x) {
  if (typeof x === 'number') return x;
  if (!(x in ep.marks)) throw new Error(ep.meta.id + ': unknown mark "' + x + '"');
  return ep.marks[x];
}

export const KNOWN = { CREW, VOICES, PLANS };
