// Turns an event list into "what the console shows at time t".
// Every value is a pure function of t, so any frame can be drawn on its own and in any order.

import { CPS, ERASE } from './timeline.js';
import { speaker } from './world.js';

export const clamp = p => (p < 0 ? 0 : p > 1 ? 1 : p);
export const ease = p => { p = clamp(p); return p * p * (3 - 2 * p); };
export const tw = (o, t) => (o.dur <= 0 ? o.to : o.from + (o.to - o.from) * ease((t - o.t) / o.dur));

// One-time indexing: signal configurations and transmissions are looked up by time,
// because the strip chart draws the recent past as well as the present.
export function prepare(ep) {
  if (ep._ready) return ep;
  ep.sig = { beacon: [], other: [] };
  ep.tx = [];
  ep.scenes = [];
  for (const e of ep.events) {
    if (e.type === 'sig') {
      const prev = ep.sig[e.ch][ep.sig[e.ch].length - 1] || {};
      ep.sig[e.ch].push(Object.assign({}, prev, e, { label: e.label }));
    } else if (e.type === 'tx') ep.tx.push(e);
    else if (e.type === 'scene') ep.scenes.push(e);
  }
  ep._ready = true;
  return ep;
}

export function sigCfg(ep, ch, tau) {
  let c = null;
  for (const k of ep.sig[ch]) { if (k.t <= tau) c = k; else break; }
  return c;
}
export function pulseAge(ep, ch, tau) {
  const c = sigCfg(ep, ch, tau);
  if (!c || !c.on) return Infinity;
  const a = tau - c.t - (c.offset || 0);
  return a < 0 ? Infinity : a % c.period;
}
// Text for the strip label, e.g. "beacon 1 every 61 s".
export function sigLabel(c, fallback) {
  if (!c) return fallback;
  const name = c.name || (c.ch === 'beacon' ? 'beacon' : 'unknown source');
  if (c.label) return c.label;
  if (!c.on) return name + ' · silent';
  return name + ' every ' + Math.round(c.period * 10) + ' s';
}

export function stateAt(ep, t) {
  const s = {
    day: 0, time: '', loc: '', status: { text: '', tone: 'amber' }, theme: 'amber',
    mode: 'transit', modeT: 0, body: 'none', object: 'beacon',
    R: { from: 0, to: 0, t: 0, dur: 0 }, cx: { from: 560, to: 560, t: 0, dur: 0 },
    blips: {}, readout: [],
    map: { from: 0, to: 0, t: 0, dur: 0 }, mapCam: { from: 0, to: 0, t: 0, dur: 0 }, mapKnown: 4, course: null, reveal: null,
    plan: 'perihelion', crew: {}, lit: {}, labels: true, tags: {},
    meters: {}, log: null, logMode: null, comms: [],
    scene: null, sceneIdx: -1, end: null, title: null, caption: null, mood: 'calm'
  };
  for (const e of ep.events) {
    if (e.t > t) break;
    switch (e.type) {
      case 'title': s.title = e; break;
      case 'scene': s.scene = e; s.sceneIdx++; s.comms = []; break;
      case 'music': s.mood = e.mood; break;
      case 'clock': s.day = e.day; s.time = e.time; break;
      case 'loc': s.loc = e.text; break;
      case 'status': s.status = e; break;
      case 'theme': s.theme = e.name; break;
      case 'view':
        if (e.mode !== s.mode || e.object) { if (e.mode === 'screen') s.readout = []; s.mode = e.mode; s.modeT = e.t; }
        if (e.object) s.object = e.object;
        if (e.body && e.body !== s.body) { s.body = e.body; s.blips = {}; }
        if (e.R !== undefined) s.R = { from: e.fromR !== undefined ? e.fromR : tw(s.R, e.t), to: e.R, t: e.t, dur: e.dur || 0 };
        if (e.cx !== undefined) s.cx = { from: e.fromCx !== undefined ? e.fromCx : tw(s.cx, e.t), to: e.cx, t: e.t, dur: e.dur || 0 };
        break;
      case 'blip': if (e.o) s.blips[e.id] = Object.assign({ t: e.t }, e.o); else delete s.blips[e.id]; break;
      case 'readout': s.readout.push(e); s.caption = { who: e.head, key: e.t, text: e.text }; break;
      case 'map': s.map = { from: tw(s.map, e.t), to: e.to, t: e.t, dur: e.dur }; break;
      case 'mapCam': s.mapCam = { from: tw(s.mapCam, e.t), to: e.to, t: e.t, dur: e.dur }; break;
      case 'mapKnown': s.mapKnown = e.n; break;
      case 'course': s.course = e.on ? e : null; break;
      case 'mapReveal': s.reveal = e; break;
      case 'plan': s.plan = e.name; break;
      case 'move': {
        const p = s.crew[e.who];
        const same = p && p.plan === e.plan;
        s.crew[e.who] = { plan: e.plan, from: same ? p.to : e.room, to: e.room, t: e.t, dur: same ? e.dur : 0 };
        if (e.plan !== 'perihelion' && e.room !== 'off') { const k = e.plan + ':' + e.room; if (!(k in s.lit)) s.lit[k] = e.t + (same ? e.dur : 0); }
        break;
      }
      case 'labels': s.labels = e.on; break;
      case 'tag': if (e.text) s.tags[e.room] = e.text; else delete s.tags[e.room]; break;
      case 'meter': { const m = s.meters[e.name]; s.meters[e.name] = { from: m ? tw(m, e.t) : e.to, to: e.to, t: e.t, dur: e.dur }; break; }
      case 'logMode': s.logMode = e.mode; break;
      case 'logOpen': s.log = { stamp: e.stamp, tone: e.tone || 'paper', ops: [] }; break;
      case 'logType': if (!s.log) s.log = { stamp: '', tone: 'paper', ops: [] }; s.log.ops.push(e); s.caption = { who: e.tone === 'teal' || s.log.tone === 'teal' ? 'The log' : "Captain's log", key: e.t, text: e.text }; break;
      case 'logErase': s.log.ops.push(e); break;
      case 'say': s.comms.push(e); s.caption = { who: speaker(e.who).name, key: e.t, text: e.text }; break;
      case 'end': s.end = e; break;
    }
  }
  return s;
}

// The log as coloured segments, with how many characters are visible at time t.
export function logText(lg, t) {
  const segs = [];
  let hidden = 0, typing = false;
  for (const op of lg.ops) {
    if (op.type === 'logType') {
      const n = Math.min(op.text.length, Math.floor((t - op.t) * CPS));
      segs.push({ text: op.text, tone: op.tone || lg.tone });
      hidden = op.text.length - n; typing = hidden > 0;
    } else {
      let n = Math.min(op.n, Math.floor((t - op.t) * ERASE));
      typing = n < op.n; hidden = 0;
      while (n > 0 && segs.length) {
        const last = segs[segs.length - 1];
        if (last.text.length <= n) { n -= last.text.length; segs.pop(); } else { last.text = last.text.slice(0, last.text.length - n); n = 0; }
      }
    }
  }
  const full = segs.map(x => x.text).join('');
  return { segs, full, shown: full.length - hidden, typing };
}
