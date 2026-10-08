// Draws the console. Works on any Canvas 2D context (Node via @napi-rs/canvas, or a browser).
// Each panel is drawn in its own nominal coordinate space and placed by a layout,
// which is how the same panels serve the 16:9 episode, the 9:16 trailer and the thumbnail.

import { CREW, ORDER, PLANS, ROUTE, CHART_EDGE, FAR, BODIES, SERIES, speaker } from './world.js';
import { stateAt, prepare, tw, ease, clamp, sigCfg, pulseAge, sigLabel, logText } from './state.js';
import { TITLE_SECONDS, READ_CPS } from './timeline.js';
import { wrapChars, CAP } from './text.js';

const BASE = { void: '#070B10', panel: '#0A1118', line: '#4A3414', amber: '#F2A93B', dim: '#A87428', teal: '#4FD6B0', tealDim: '#1F7F68', red: '#FF5A4F', paper: '#FCE9C8', mute: '#6F7884' };
const THEMES = {
  amber: {},
  red: { line: '#5A1F1C' },
  teal: { line: '#12403A', accent: '#4FD6B0', accentDim: '#1F7F68' }
};
let C = Object.assign({ accent: BASE.amber, accentDim: BASE.dim }, BASE);
const setTheme = name => { C = Object.assign({ accent: BASE.amber, accentDim: BASE.dim }, BASE, THEMES[name] || {}); };

export const FONT_MONO = '"IBM Plex Mono", "DejaVu Sans Mono", monospace';
export const FONT_DISPLAY = '"Tektur", "IBM Plex Mono", sans-serif';
const F = (px, bold) => (bold ? 'bold ' : '') + px + 'px ' + FONT_MONO;
const FD = px => px + 'px ' + FONT_DISPLAY;
const TAU = Math.PI * 2;
const tone = n => (n === 'teal' ? C.teal : n === 'red' ? C.red : n === 'paper' ? C.paper : n === 'mute' ? C.mute : n === 'amber' ? C.amber : C.accent);

function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let x = Math.imul(seed ^ seed >>> 15, 1 | seed); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
const r1 = rng(412);
const STARS = Array.from({ length: 150 }, () => ({ x: r1() * 760, y: r1() * 300, d: 0.3 + r1() * 0.7, ph: r1() * 6.28 }));
const MAPSTARS = Array.from({ length: 44 }, () => ({ x: r1() * 1200, y: 30 + r1() * 140 }));
const DEBRIS = Array.from({ length: 150 }, () => ({ a: r1() * TAU, r: 0.7 + r1() * 1.7, s: 0.6 + r1() * 2.6, k: r1() }));
const NODES = Array.from({ length: 64 }, (_, i) => ({ ring: i % 5, a: r1() * TAU }));

function panel(ctx, w, h, label, lc) {
  ctx.fillStyle = C.panel; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(0.75, 0.75, w - 1.5, h - 1.5);
  if (label) { ctx.font = F(13); ctx.fillStyle = lc || C.accentDim; ctx.textAlign = 'left'; ctx.fillText(label, 12, 21); }
}
function place(ctx, r, nominalW, fn) {
  ctx.save(); ctx.translate(r.x, r.y); const k = r.w / nominalW; ctx.scale(k, k); fn(); ctx.restore();
}
// Draws wrapped monospace text made of coloured segments, revealing the first `shown` characters.
function typed(ctx, segs, shown, x, y, cap, lh, px) {
  const full = segs.map(s => s.text).join('');
  const lines = wrapChars(full, cap);
  const cw = px * 0.6;
  let cur = { x, y };
  lines.forEach((ln, i) => {
    const vis = Math.min(ln.text.length, shown - ln.start);
    if (vis >= 0) cur = { x: x + Math.max(0, vis) * cw, y: y + i * lh };
    if (vis <= 0) return;
    let off = 0;
    for (const sg of segs) {
      const a = Math.max(off, ln.start), b = Math.min(off + sg.text.length, ln.start + vis);
      if (b > a) { ctx.fillStyle = tone(sg.tone); ctx.fillText(full.slice(a, b), x + (a - ln.start) * cw, y + i * lh); }
      off += sg.text.length;
    }
  });
  return { lines: lines.length, cur };
}

/* ---------- top bar (1248 x 44) ---------- */
function drawTop(ctx, s) {
  const tn = tone(s.status.tone);
  ctx.textAlign = 'left'; ctx.font = F(18, true); ctx.fillStyle = C.accent; ctx.fillText('DSV Perihelion', 0, 29);
  ctx.font = F(16); ctx.fillStyle = C.paper; ctx.fillText('day ' + s.day + ' · ' + s.time, 180, 29);
  ctx.fillStyle = C.accentDim; ctx.fillText(s.loc, 356, 29);
  ctx.textAlign = 'right'; ctx.fillStyle = tn; ctx.font = F(16, true); ctx.fillText(s.status.text, 1248, 29);
  ctx.textAlign = 'left';
  ctx.fillStyle = s.status.tone === 'amber' ? C.line : tn; ctx.fillRect(0, 42, 1248, 2);
}

/* ---------- viewscreen (760 x 300) ---------- */
function drawPlanet(ctx, cfg, cx, cy, R, t) {
  const ring = (k, back) => {
    ctx.beginPath(); ctx.ellipse(cx, cy, R * k, R * k * 0.2, -0.2, back ? Math.PI : 0, back ? TAU : Math.PI);
    ctx.strokeStyle = back ? BASE.line : BASE.dim; ctx.lineWidth = 1.2; ctx.stroke();
  };
  const detail = R > 22;
  if (cfg.ring && detail) [1.5, 1.68, 1.8].forEach(k => ring(k, true));
  if (cfg.hot && detail) { ctx.strokeStyle = cfg.edge; ctx.lineWidth = 1; [1.06, 1.13].forEach((k, i) => { ctx.globalAlpha = 0.25 - i * 0.1; ctx.beginPath(); ctx.arc(cx, cy, R * k, 0, TAU); ctx.stroke(); }); ctx.globalAlpha = 1; }
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fillStyle = cfg.fill; ctx.fill(); ctx.clip();
  if (detail) {
    ctx.strokeStyle = cfg.band; ctx.lineWidth = 1.2;
    for (let i = -4; i <= 4; i++) {
      ctx.beginPath();
      for (let x = -R; x <= R; x += 6) { const y = cy + i * R / 4.6 + Math.sin(x * 0.035 + t * (cfg.hot ? 0.3 : 0.12) + i * 1.7) * R * 0.035; x === -R ? ctx.moveTo(cx + x, y) : ctx.lineTo(cx + x, y); }
      ctx.stroke();
    }
    for (let k = 0; k < 3; k++) {
      const x = cx - R * 1.3 + ((t * (cfg.hot ? 7 : 3) + k * 131) % (R * 2.6));
      ctx.beginPath(); ctx.ellipse(x, cy + (k - 1) * R * 0.42 + R * 0.1, R * 0.16, R * 0.05, 0, 0, TAU); ctx.stroke();
    }
  }
  ctx.beginPath(); ctx.arc(cx + R * 0.62, cy - R * 0.12, R * 1.06, 0, TAU); ctx.fillStyle = 'rgba(4,8,12,0.72)'; ctx.fill();
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.strokeStyle = cfg.edge; ctx.lineWidth = 1.5; ctx.stroke();
  if (cfg.ring && detail) [1.5, 1.68, 1.8].forEach(k => ring(k, false));
}
function drawStar(ctx, cfg, cx, cy, R, t) {
  ctx.strokeStyle = cfg.edge; ctx.lineWidth = 1;
  [1.12, 1.26, 1.44].forEach((k, i) => { ctx.globalAlpha = 0.34 - i * 0.1 + 0.05 * Math.sin(t * 0.7 + i); ctx.beginPath(); ctx.arc(cx, cy, R * k, 0, TAU); ctx.stroke(); });
  ctx.globalAlpha = 1;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fillStyle = cfg.fill; ctx.fill(); ctx.lineWidth = 1.8; ctx.stroke();
  if (R > 22) {
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip(); ctx.lineWidth = 1; ctx.globalAlpha = 0.55;
    for (let i = 0; i < 14; i++) { const a = i * 2.4 + t * 0.05, rr = R * (0.2 + (i % 5) * 0.16); ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a * 1.3) * rr, R * 0.12, a, a + 2.2); ctx.stroke(); }
    ctx.restore(); ctx.globalAlpha = 1;
    for (let i = 0; i < 3; i++) { const a = i * 2.1 + t * 0.03, l = R * (0.18 + 0.1 * Math.sin(t * 0.5 + i * 2)); ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.quadraticCurveTo(cx + Math.cos(a + 0.2) * (R + l * 1.6), cy + Math.sin(a + 0.2) * (R + l * 1.6), cx + Math.cos(a + 0.42) * R, cy + Math.sin(a + 0.42) * R); ctx.stroke(); }
  }
}
function drawDebris(ctx, cx, cy, R, t) {
  const core = Math.max(2.5, R * 0.1);
  ctx.strokeStyle = C.paper; ctx.lineWidth = 1;
  [2.2, 3.6].forEach((k, i) => { ctx.globalAlpha = 0.3 - i * 0.14; ctx.beginPath(); ctx.arc(cx, cy, core * k, 0, TAU); ctx.stroke(); });
  ctx.globalAlpha = 1; ctx.fillStyle = C.paper; ctx.beginPath(); ctx.arc(cx, cy, core, 0, TAU); ctx.fill();
  if (R < 14) return;
  for (const d of DEBRIS) {
    const a = d.a + t * 0.05 / (d.r * d.r), x = cx + Math.cos(a) * R * d.r, y = cy + Math.sin(a) * R * d.r * 0.34 - Math.cos(a) * R * d.r * 0.12;
    const front = Math.sin(a) > 0;
    ctx.globalAlpha = (front ? 0.9 : 0.4) * (0.4 + d.k * 0.6);
    ctx.fillStyle = d.k > 0.8 ? BASE.dim : C.mute;
    if (d.k > 0.9) { ctx.beginPath(); ctx.moveTo(x - d.s * 1.6, y); ctx.lineTo(x + d.s, y - d.s * 1.2); ctx.lineTo(x + d.s * 1.4, y + d.s); ctx.closePath(); ctx.fill(); } else ctx.fillRect(x, y, d.s, d.s * 0.7);
  }
  ctx.globalAlpha = 1;
}
const SHIP = [[-1, 0], [-0.74, -0.17], [0.7, -0.17], [0.96, -0.07], [0.96, 0.07], [0.7, 0.17], [-0.74, 0.17]];
function drawShip(ctx, cx, cy, R, t) {
  if (R < 10) { ctx.fillStyle = C.paper; ctx.fillRect(cx - 1.5, cy - 1.5, 3, 3); return; }
  ctx.strokeStyle = C.paper; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.85; ctx.beginPath();
  SHIP.forEach((p, i) => (i ? ctx.lineTo(cx + p[0] * R, cy + p[1] * R) : ctx.moveTo(cx + p[0] * R, cy + p[1] * R))); ctx.closePath(); ctx.stroke();
  ctx.globalAlpha = 0.4; ctx.beginPath();
  for (let k = -0.6; k <= 0.61; k += 0.2) { ctx.moveTo(cx + k * R, cy - 0.17 * R); ctx.lineTo(cx + k * R, cy + 0.17 * R); }
  ctx.moveTo(cx - 0.74 * R, cy); ctx.lineTo(cx + 0.96 * R, cy); ctx.stroke();
  ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.ellipse(cx - 0.1 * R, cy, R * 0.07, R * 0.36, 0, 0, TAU); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + 0.3 * R, cy - 0.17 * R); ctx.lineTo(cx + 0.36 * R, cy - 0.34 * R); ctx.stroke(); ctx.beginPath(); ctx.arc(cx + 0.36 * R, cy - 0.38 * R, R * 0.05, 0.4, Math.PI - 0.4, true); ctx.stroke();
  ctx.globalAlpha = 1; ctx.fillStyle = BASE.amber;
  for (let i = 0; i < 6; i++) { if (Math.floor(t * 1.2 + i * 0.5) % 3 === 0) ctx.fillRect(cx + (-0.6 + i * 0.26) * R - 1, cy - 0.17 * R - 4, 2.4, 2.4); }
}
function drawLattice(ctx, cx, cy, R, t, count) {
  if (R < 10) { ctx.fillStyle = C.teal; ctx.fillRect(cx - 1.5, cy - 1.5, 3, 3); return; }
  const rings = [[1, 0.28, 0.2], [0.82, 0.5, -0.5], [0.64, 0.2, 0.9], [0.46, 0.4, -1.2], [0.28, 0.24, 0.4]];
  ctx.lineWidth = 1.2;
  rings.forEach((g, i) => { ctx.strokeStyle = i % 2 ? C.tealDim : C.teal; ctx.globalAlpha = 0.75; ctx.beginPath(); ctx.ellipse(cx, cy, R * g[0], R * g[0] * g[1], g[2] * 0.45 + Math.sin(t * 0.05 + i) * 0.12, 0, TAU); ctx.stroke(); });
  ctx.globalAlpha = 1;
  for (let i = 0; i < count; i++) {
    const n = NODES[i], g = rings[n.ring], rot = g[2] * 0.45 + Math.sin(t * 0.05 + n.ring) * 0.12, a = n.a + t * 0.04 * (1.4 - g[0]);
    const ex = Math.cos(a) * R * g[0], ey = Math.sin(a) * R * g[0] * g[1];
    const x = cx + ex * Math.cos(rot) - ey * Math.sin(rot), y = cy + ex * Math.sin(rot) + ey * Math.cos(rot);
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + i * 0.7);
    ctx.fillStyle = i === 63 ? C.paper : C.teal; ctx.globalAlpha = 0.45 + pulse * 0.55;
    ctx.beginPath(); ctx.arc(x, y, i === 63 ? 3.4 : 1.8 + pulse * 0.9, 0, TAU); ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.strokeStyle = C.teal; ctx.beginPath();
  for (let i = 0; i < 6; i++) { const a = i * TAU / 6 + t * 0.1; i ? ctx.lineTo(cx + Math.cos(a) * R * 0.1, cy + Math.sin(a) * R * 0.1) : ctx.moveTo(cx + Math.cos(a) * R * 0.1, cy + Math.sin(a) * R * 0.1); }
  ctx.closePath(); ctx.stroke();
}
function drawBody(ctx, s, cx, cy, R, t) {
  const cfg = BODIES[s.body] || BODIES.none;
  if (cfg.kind === 'planet') drawPlanet(ctx, cfg, cx, cy, R, t);
  else if (cfg.kind === 'star') drawStar(ctx, cfg, cx, cy, R, t);
  else if (cfg.kind === 'debris') drawDebris(ctx, cx, cy, R, t);
  else if (cfg.kind === 'ship') drawShip(ctx, cx, cy, R, t);
  else if (cfg.kind === 'lattice') drawLattice(ctx, cx, cy, R, t, s.nodes || 63);
}
function blip(ctx, x, y, col, age, label, dy) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill();
  if (age < 1.1) { ctx.globalAlpha = 1 - age / 1.1; ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, 6 + age * 20, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
  if (label) { ctx.font = F(13); ctx.fillStyle = col; ctx.fillText(label, x + 12, y + (dy || -8)); }
}

const WIRES = {
  beacon: { v: [[0, -1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, 1, 0], [0, -1.7, 0]], e: [[0, 1], [0, 2], [0, 3], [0, 4], [5, 1], [5, 2], [5, 3], [5, 4], [1, 2], [2, 3], [3, 4], [4, 1], [0, 6]], sx: 62, sy: 78, tip: 6 },
  shuttle: { v: [[-1, -0.5, -0.6], [1, -0.5, -0.6], [1, 0.5, -0.6], [-1, 0.5, -0.6], [-1, -0.5, 0.6], [1, -0.5, 0.6], [1, 0.5, 0.6], [-1, 0.5, 0.6], [1.7, 0.1, 0], [-1, 0, -0.9], [-1, 0, 0.9]], e: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7], [1, 8], [2, 8], [5, 8], [6, 8], [0, 9], [3, 9], [4, 10], [7, 10]], sx: 62, sy: 62 },
  aphelion: (() => { const v = [], e = []; for (let k = 0; k < 2; k++) for (let i = 0; i < 6; i++) v.push([k ? 1.4 : -1.5, Math.cos(i * TAU / 6) * 0.42, Math.sin(i * TAU / 6) * 0.42]); for (let i = 0; i < 6; i++) { e.push([i, (i + 1) % 6], [6 + i, 6 + (i + 1) % 6], [i, 6 + i]); } v.push([1.95, 0, 0]); for (let i = 0; i < 6; i++) e.push([6 + i, 12]); return { v, e, sx: 56, sy: 56, tilt: 0.3 }; })(),
  register: (() => { const v = [], e = []; [[1, 0], [0.75, 1.1], [0.5, 2.2]].forEach((g, k) => { for (let i = 0; i < 16; i++) { const a = i * TAU / 16, x = Math.cos(a) * g[0], z = Math.sin(a) * g[0]; v.push([x, z * Math.sin(g[1]), z * Math.cos(g[1])]); e.push([k * 16 + i, k * 16 + (i + 1) % 16]); } }); return { v, e, sx: 96, sy: 96, teal: true }; })()
};
function drawWire(ctx, ep, s, t) {
  const cx = 140, cy = 158;
  if (s.object === 'wave') {
    ctx.strokeStyle = C.teal; ctx.lineWidth = 3;
    for (let i = 0; i < 40; i++) { const h = 8 + Math.abs(Math.sin(i * 0.7 + t * 3.1) * Math.sin(i * 0.23 + t * 1.3)) * 86 * (0.4 + 0.6 * Math.abs(Math.sin(t * 0.9 + i * 0.05))); ctx.beginPath(); ctx.moveTo(30 + i * 5.6, cy - h / 2); ctx.lineTo(30 + i * 5.6, cy + h / 2); ctx.stroke(); }
    return;
  }
  const w = WIRES[s.object]; if (!w) return;
  const a = t * 0.45, tilt = w.tilt === undefined ? 0.4 : w.tilt, age = s.object === 'beacon' ? pulseAge(ep, 'beacon', t) : Infinity;
  const pr = v => { const x = v[0] * Math.cos(a) + v[2] * Math.sin(a), z = -v[0] * Math.sin(a) + v[2] * Math.cos(a); return [cx + x * w.sx, cy + (v[1] * Math.cos(tilt) - z * Math.sin(tilt)) * w.sy]; };
  const p = w.v.map(pr);
  ctx.strokeStyle = w.teal ? C.teal : age < 0.5 ? C.paper : C.amber; ctx.lineWidth = 1.5;
  w.e.forEach(e => { ctx.beginPath(); ctx.moveTo(p[e[0]][0], p[e[0]][1]); ctx.lineTo(p[e[1]][0], p[e[1]][1]); ctx.stroke(); });
  if (w.tip !== undefined) blip(ctx, p[w.tip][0], p[w.tip][1], C.amber, age, '');
}
function drawScreen(ctx, ep, s, t) {
  const has = s.object && s.object !== 'none';
  if (has) { drawWire(ctx, ep, s, t); if (s.objectCaption) { ctx.font = F(13); ctx.fillStyle = C.accentDim; ctx.fillText(s.objectCaption, 28, 284); } }
  let y = 46; const x = has ? 286 : 28, cap = has ? CAP.readout : CAP.readoutWide;
  for (const r of s.readout) {
    ctx.font = F(13); ctx.fillStyle = C.teal; ctx.fillText(r.head, x, y); y += 23;
    ctx.font = F(17);
    const n = Math.floor((t - r.t) * READ_CPS);
    const o = typed(ctx, [{ text: r.text, tone: r.tone || 'paper' }], Math.min(n, r.text.length), x, y, cap, 23, 17);
    if (n < r.text.length) { ctx.fillStyle = C.paper; ctx.fillRect(o.cur.x + 2, o.cur.y - 14, 9, 17); }
    y += o.lines * 23 + 11;
  }
}
// The viewscreen's picture only: stars, body, blips. Used by the panel and by the thumbnail.
function drawSpace(ctx, ep, s, t, labels) {
  const transit = s.mode === 'transit';
  ctx.strokeStyle = C.paper; ctx.fillStyle = C.paper;
  for (const st of STARS) {
    if (transit) {
      const x = ((st.x - t * 46 * st.d) % 760 + 760) % 760;
      ctx.globalAlpha = 0.35 + st.d * 0.6; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(x, st.y); ctx.lineTo(x + st.d * 16, st.y); ctx.stroke();
    } else {
      ctx.globalAlpha = (0.35 + st.d * 0.5) * (0.8 + 0.2 * Math.sin(t * 1.3 + st.ph));
      const z = st.d > 0.75 ? 2 : 1.3; ctx.fillRect(st.x, st.y, z, z);
    }
  }
  ctx.globalAlpha = 1;
  const R = tw(s.R, t), cx = tw(s.cx, t), cy = 152;
  if (R > 1 && s.body !== 'none') drawBody(ctx, s, cx, cy, R, t);
  for (const id of Object.keys(s.blips)) {
    const b = s.blips[id]; let x, y;
    if (b.orbit) {
      const th = t * 0.1 + (b.phase || 0.6); x = cx + Math.cos(th) * R * 1.28; y = cy + Math.sin(th) * R * 0.42 - Math.cos(th) * R * 0.2;
      if (Math.sin(th) < 0 && Math.hypot(x - cx, y - cy) < R) continue;
    } else if (b.abs) { x = b.abs[0]; y = b.abs[1]; } else { x = cx + (b.at ? b.at[0] : 0) * R; y = cy + (b.at ? b.at[1] : 0) * R; }
    if (R < 30 && !b.abs) continue;
    blip(ctx, x, y, tone(b.tone || 'amber'), b.ch ? pulseAge(ep, b.ch, t) : Infinity, labels ? b.label : '', b.dy);
  }
}
function drawView(ctx, ep, s, t) {
  const Wd = 760, Ht = 300;
  panel(ctx, Wd, Ht, null);
  ctx.save(); ctx.beginPath(); ctx.rect(2, 2, Wd - 4, Ht - 4); ctx.clip();
  if (s.mode === 'screen') {
    ctx.fillStyle = C.paper; for (const st of STARS) { ctx.globalAlpha = 0.18 * st.d; ctx.fillRect(st.x, st.y, 1.3, 1.3); } ctx.globalAlpha = 1;
    drawScreen(ctx, ep, s, t);
  } else {
    drawSpace(ctx, ep, s, t, true);
    if (s.mode === 'night') { ctx.fillStyle = 'rgba(7,11,16,0.6)'; ctx.fillRect(0, 0, Wd, Ht); ctx.font = F(13); ctx.fillStyle = C.accentDim; ctx.textAlign = 'right'; ctx.fillText('dimmed · ship night', Wd - 14, Ht - 14); ctx.textAlign = 'left'; }
  }
  ctx.font = F(13); ctx.fillStyle = C.accentDim; ctx.textAlign = 'left'; ctx.fillText(s.mode === 'screen' ? 'viewscreen · ' + (s.screenLabel || 'tightbeam') : 'viewscreen', 12, 21);
  const titleOn = s.title && t < TITLE_SECONDS;
  if (s.scene && t - s.scene.t < 4 && !s.end && !titleOn) {
    ctx.globalAlpha = Math.min(1, (4 - (t - s.scene.t)) / 0.6); ctx.font = F(15, true);
    const txt = 'scene ' + (s.sceneIdx + 1) + ' of ' + ep.scenes.length + ' · ' + s.scene.title.toLowerCase(), w = ctx.measureText(txt).width + 28;
    ctx.fillStyle = C.accent; ctx.fillRect(14, Ht - 46, w, 32); ctx.fillStyle = C.void; ctx.fillText(txt, 28, Ht - 25); ctx.globalAlpha = 1;
  }
  if (titleOn) {
    const a = Math.min(1, (TITLE_SECONDS - t) / 0.8);
    ctx.fillStyle = 'rgba(7,11,16,' + 0.88 * a + ')'; ctx.fillRect(0, 0, Wd, Ht);
    ctx.globalAlpha = a; ctx.textAlign = 'center';
    ctx.font = FD(46); ctx.fillStyle = C.amber; ctx.fillText(SERIES, Wd / 2, 138);
    ctx.font = F(18); ctx.fillStyle = C.paper; ctx.fillText('episode ' + ep.meta.number + ' · ' + ep.meta.title.toLowerCase(), Wd / 2, 182);
    ctx.textAlign = 'left'; ctx.globalAlpha = 1;
  }
  if (s.end) {
    const a = ease((t - s.end.t) / 3);
    ctx.fillStyle = 'rgba(7,11,16,' + 0.86 * a + ')'; ctx.fillRect(0, 0, Wd, Ht);
    ctx.globalAlpha = a; ctx.textAlign = 'center';
    ctx.font = FD(40); ctx.fillStyle = C.amber; ctx.fillText(SERIES, Wd / 2, 128);
    ctx.font = F(17); ctx.fillStyle = C.paper; ctx.fillText('end of episode ' + ep.meta.number + ' · ' + ep.meta.title.toLowerCase(), Wd / 2, 170);
    if (s.end.next) { ctx.fillStyle = C.teal; ctx.fillText('next · ' + s.end.next, Wd / 2, 202); }
    if (s.end.line) { ctx.fillStyle = C.accentDim; ctx.font = F(14); ctx.fillText(s.end.line, Wd / 2, 236); }
    ctx.textAlign = 'left'; ctx.globalAlpha = 1;
  }
  ctx.restore();
}

/* ---------- star map (476 x 180) ---------- */
function drawMap(ctx, s, t) {
  panel(ctx, 476, 180, 'star map');
  ctx.save(); ctx.beginPath(); ctx.rect(2, 26, 472, 152); ctx.clip();
  const cam = tw(s.mapCam, t), X = x => x - cam;
  ctx.fillStyle = C.mute; MAPSTARS.forEach(m => ctx.fillRect(X(m.x), m.y, 1.5, 1.5));
  ctx.setLineDash([3, 5]); ctx.strokeStyle = C.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(CHART_EDGE), 30); ctx.lineTo(X(CHART_EDGE), 168); ctx.stroke(); ctx.setLineDash([]);
  ctx.font = F(12); ctx.fillStyle = C.mute; ctx.textAlign = 'right'; ctx.fillText('edge of charts', X(CHART_EDGE) - 6, 168); ctx.textAlign = 'left';
  if (s.reveal) {
    FAR.forEach((p, i) => { const a = ease((t - s.reveal.t - i * 0.5) / 1.5); if (a <= 0) return; ctx.globalAlpha = a; ctx.strokeStyle = C.tealDim; ctx.setLineDash([2, 5]); ctx.beginPath(); const from = i < 3 ? ROUTE[9] : { x: FAR[i - 3][0], y: FAR[i - 3][1] }; ctx.moveTo(X(from.x), from.y); ctx.lineTo(X(p[0]), p[1]); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(X(p[0]), p[1], 3, 0, TAU); ctx.fill(); });
    ctx.globalAlpha = 1;
  }
  const pos = Math.min(ROUTE.length - 1, tw(s.map, t)), i = Math.min(ROUTE.length - 2, Math.floor(pos)), f = pos - i;
  const sx = ROUTE[i].x + (ROUTE[i + 1].x - ROUTE[i].x) * f, sy = ROUTE[i].y + (ROUTE[i + 1].y - ROUTE[i].y) * f;
  ctx.strokeStyle = C.teal; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(ROUTE[0].x), ROUTE[0].y);
  for (let k = 1; k <= i; k++) ctx.lineTo(X(ROUTE[k].x), ROUTE[k].y);
  ctx.lineTo(X(sx), sy); ctx.stroke();
  if (s.course) {
    const b = ROUTE[Math.min(ROUTE.length - 1, Math.floor(pos + 0.001) + 1)], p = ease((t - s.course.t) / 4);
    ctx.setLineDash([4, 5]); ctx.strokeStyle = C.amber; ctx.beginPath(); ctx.moveTo(X(sx), sy); ctx.lineTo(X(sx + (b.x - sx) * p), sy + (b.y - sy) * p); ctx.stroke(); ctx.setLineDash([]);
  }
  ROUTE.forEach((p, k) => {
    if (k > s.mapKnown + 1) return;
    const known = k <= s.mapKnown, big = p.beacon || p.register;
    ctx.beginPath(); ctx.arc(X(p.x), p.y, big ? 5 : 3.5, 0, TAU);
    if (known && k <= pos + 0.001) { ctx.fillStyle = p.register ? C.teal : p.beacon ? C.amber : C.teal; ctx.fill(); } else { ctx.strokeStyle = known ? (p.register ? C.teal : C.amber) : C.mute; ctx.lineWidth = 1.2; ctx.stroke(); }
    ctx.font = F(12);
    if (known && p.label) { ctx.fillStyle = p.register ? C.teal : p.beacon ? C.amber : C.mute; ctx.fillText(p.label, X(p.x) + (p.lx || 0), p.y + (p.ly || 0)); } else if (!known) { ctx.fillStyle = C.mute; ctx.fillText('?', X(p.x) + 9, p.y - 6); }
  });
  ctx.strokeStyle = C.paper; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(sx), sy, 9 + Math.sin(t * 2) * 1.5, 0, TAU); ctx.stroke();
  ctx.restore();
}

/* ---------- signal strip (476 x 108) ---------- */
function traceLine(ctx, ep, ch, t, x0, x1, base, amp, col, k, speed) {
  ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.beginPath();
  for (let x = x0; x <= x1; x += 2) {
    const tau = t - (x1 - x) / speed, age = pulseAge(ep, ch, tau);
    const v = (age < 1 ? Math.exp(-age * 9) * Math.cos(age * 26) : 0) + Math.sin(tau * 37.1 + k) * 0.035 + Math.sin(tau * 91.7 + k * 3) * 0.03;
    x === x0 ? ctx.moveTo(x, base - v * amp) : ctx.lineTo(x, base - v * amp);
  }
  ctx.stroke();
}
function drawSignal(ctx, ep, s, t) {
  const Wd = 476, speed = 40;
  const bc = sigCfg(ep, 'beacon', t), oc = sigCfg(ep, 'other', t);
  panel(ctx, Wd, 108, 'signal · ' + sigLabel(bc, 'no carrier'), bc && bc.on ? C.amber : C.accentDim);
  traceLine(ctx, ep, 'beacon', t, 6, Wd - 6, 50, 20, bc ? C.amber : C.line, 0, speed);
  ctx.font = F(13); ctx.fillStyle = oc ? C.teal : C.mute;
  ctx.fillText(sigLabel(oc, 'no second source'), 12, 74);
  traceLine(ctx, ep, 'other', t, 6, Wd - 6, 94, 13, oc ? C.teal : C.line, 2, speed);
  for (const x of ep.tx) {
    const dx = (t - x.t) * speed; if (dx < 0 || dx > Wd - 12) continue;
    const px = Wd - 6 - dx; ctx.fillStyle = C.red; ctx.fillRect(px - 1.5, 28, 3, 74);
    ctx.font = F(13, true); ctx.textAlign = dx > 190 ? 'left' : 'right'; ctx.fillText(x.label, px + (dx > 190 ? 8 : -8), 42); ctx.textAlign = 'left';
  }
}

/* ---------- deck plan (760 x 220) ---------- */
function slot(plan, id, room) { const k = Math.max(0, ORDER.indexOf(id)), r = plan.rooms[room]; return [r[0] + ((k % 4) - 1.5) * 26 * r[2], r[1] + (k >> 2) * 22]; }
function crewXY(plan, id, c, t) {
  const b = slot(plan, id, c.to); if (c.dur <= 0 || c.from === c.to || !plan.rooms[c.from]) return b;
  const p = ease((t - c.t) / c.dur); if (p >= 1) return b;
  const a = slot(plan, id, c.from), y = plan.corridor, pts = [a, [a[0], y], [b[0], y], b];
  const L = [Math.abs(a[1] - y), Math.abs(b[0] - a[0]), Math.abs(b[1] - y)], tot = L[0] + L[1] + L[2] || 1;
  let d = p * tot;
  for (let i = 0; i < 3; i++) { if (d <= L[i] || i === 2) { const f = L[i] ? Math.min(1, d / L[i]) : 1; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f]; } d -= L[i]; }
  return b;
}
function drawDecks(ctx, s, t) {
  const plan = PLANS[s.plan] || PLANS.perihelion, home = s.plan === 'perihelion';
  panel(ctx, 760, 220, plan.title + (s.labels ? '' : ' · privacy hours, initials off'), home ? null : C.teal);
  ctx.strokeStyle = home ? C.accent : C.paper; ctx.lineWidth = 1.5; ctx.beginPath();
  plan.hull.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.stroke();
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.2; ctx.beginPath();
  plan.v.forEach(v => { ctx.moveTo(v[0], v[1]); ctx.lineTo(v[0], v[2]); });
  plan.h.forEach(h => { ctx.moveTo(h[1], h[0]); ctx.lineTo(h[2], h[0]); });
  ctx.stroke();
  ctx.font = F(13);
  for (const r of Object.keys(plan.labels)) {
    if (plan.fog) { const lit = s.lit[s.plan + ':' + r]; if (lit === undefined || t < lit) { ctx.fillStyle = C.line; ctx.fillText('· · ·', plan.labels[r][0], plan.labels[r][1]); continue; } }
    ctx.fillStyle = C.accentDim; ctx.fillText(plan.labels[r][2] || r, plan.labels[r][0], plan.labels[r][1]);
  }
  for (const r of Object.keys(s.tags)) {
    const rm = plan.rooms[r]; if (!rm) continue;
    ctx.font = F(12, true); const w = ctx.measureText(s.tags[r]).width + 14, lb = plan.labels[r];
    ctx.fillStyle = C.accent; ctx.fillRect(lb[0] - 4, lb[1] - 13, w, 18); ctx.fillStyle = C.void; ctx.fillText(s.tags[r], lb[0] + 3, lb[1]);
  }
  for (const id of ORDER) {
    const c = s.crew[id]; if (!c || c.plan !== s.plan || c.to === 'off' || !plan.rooms[c.to]) continue;
    const p = crewXY(plan, id, c, t);
    ctx.fillStyle = tone(CREW[id].tone || 'amber'); ctx.beginPath(); ctx.arc(p[0], p[1], s.labels ? 9 : 6.5, 0, TAU); ctx.fill();
    if (s.labels) { ctx.font = F(12, true); ctx.fillStyle = C.void; ctx.textAlign = 'center'; ctx.fillText(id, p[0], p[1] + 4.2); ctx.textAlign = 'left'; }
  }
}

/* ---------- captain's log (476 x 220), comms (760 x 112), meters (476 x 112) ---------- */
function drawLog(ctx, s, t) {
  const teal = s.log && s.log.tone === 'teal';
  panel(ctx, 476, 220, (teal ? 'log' : "captain's log") + (s.log && s.log.stamp ? ' · ' + s.log.stamp : '') + (s.logMode === 'open' ? ' · open, no erase' : ''), teal ? C.teal : null);
  if (!s.log) return;
  const o = logText(s.log, t);
  ctx.font = F(18);
  const r = typed(ctx, o.segs, o.shown, 14, 52, CAP.log, 26, 18);
  if (o.typing || Math.floor(t * 2) % 2 === 0) { const last = o.segs[o.segs.length - 1]; ctx.fillStyle = last && last.tone === 'teal' ? C.teal : C.accent; ctx.fillRect(r.cur.x + 2, r.cur.y - 15, 10, 19); }
}
function drawComms(ctx, s) {
  const last = s.comms[s.comms.length - 1];
  panel(ctx, 760, 112, last && last.priv ? 'comms · private channel' : 'comms', last && last.priv ? C.paper : null);
  ctx.font = F(17);
  const rows = [];
  s.comms.slice(-4).forEach((m, i, arr) => { const sp = speaker(m.who); wrapChars(m.text, CAP.comms).forEach((ln, j) => rows.push({ who: j === 0 ? sp.name : '', text: ln.text, fresh: i === arr.length - 1, tone: sp.tone })); });
  rows.slice(-3).forEach((r, i) => {
    const y = 48 + i * 26, tl = r.tone === 'teal';
    ctx.fillStyle = tl ? (r.fresh ? C.teal : C.tealDim) : r.fresh ? C.accent : C.accentDim; ctx.fillText(r.who, 14, y);
    ctx.fillStyle = tl ? (r.fresh ? C.teal : C.tealDim) : r.fresh ? C.paper : C.mute; ctx.fillText(r.text, 150, y);
  });
}
function drawMeters(ctx, s, t) {
  panel(ctx, 476, 112, null);
  ['fuel', 'hull', 'morale'].forEach((n, i) => {
    const m = s.meters[n]; if (!m) return; const v = tw(m, t), y = 32 + i * 30, low = v < (n === 'hull' ? 50 : 30);
    ctx.font = F(15); ctx.fillStyle = C.accentDim; ctx.fillText(n, 14, y + 5);
    ctx.strokeStyle = C.line; ctx.lineWidth = 1.2; ctx.strokeRect(96, y - 8, 300, 14);
    ctx.fillStyle = low ? C.red : C.accent; ctx.fillRect(96, y - 8, 300 * v / 100, 14);
    ctx.textAlign = 'right'; ctx.fillStyle = low ? C.red : C.paper; ctx.fillText(Math.round(v) + '%', 462, y + 5); ctx.textAlign = 'left';
  });
}

/* ---------- layouts ---------- */
export const LAYOUTS = {
  wide: { W: 1280, H: 720 },
  tall: { W: 720, H: 1280 },
  thumb: { W: 1280, H: 720 }
};

// 16:9 episode frame.
export function drawWide(ctx, ep, t) {
  prepare(ep);
  const s = stateAt(ep, t); setTheme(s.theme); applyViewExtras(ep, s, t);
  ctx.fillStyle = C.void; ctx.fillRect(0, 0, 1280, 720); ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  place(ctx, { x: 16, y: 0, w: 1248 }, 1248, () => drawTop(ctx, s));
  place(ctx, { x: 16, y: 52, w: 760 }, 760, () => drawView(ctx, ep, s, t));
  place(ctx, { x: 788, y: 52, w: 476 }, 476, () => drawMap(ctx, s, t));
  place(ctx, { x: 788, y: 244, w: 476 }, 476, () => drawSignal(ctx, ep, s, t));
  place(ctx, { x: 16, y: 364, w: 760 }, 760, () => drawDecks(ctx, s, t));
  place(ctx, { x: 788, y: 364, w: 476 }, 476, () => drawLog(ctx, s, t));
  place(ctx, { x: 16, y: 596, w: 760 }, 760, () => drawComms(ctx, s));
  place(ctx, { x: 788, y: 596, w: 476 }, 476, () => drawMeters(ctx, s, t));
  return s;
}

// Optional view fields that ride on view events (kept out of stateAt to keep it small).
function applyViewExtras(ep, s, t) {
  for (const e of ep.events) {
    if (e.t > t) break;
    if (e.type !== 'view') continue;
    if (e.nodes !== undefined) s.nodes = e.nodes;
    if (e.caption !== undefined) s.objectCaption = e.caption;
    if (e.label !== undefined) s.screenLabel = e.label;
  }
}

// 9:16 trailer frame. o: { caption, card: { lines: [{ text, size, tone }], alpha } }
export function drawTall(ctx, ep, t, o) {
  prepare(ep); o = o || {};
  const s = stateAt(ep, t); setTheme(s.theme); applyViewExtras(ep, s, t);
  s.title = null; s.end = null;
  ctx.fillStyle = C.void; ctx.fillRect(0, 0, 720, 1280); ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  ctx.font = FD(38); ctx.fillStyle = C.accent; ctx.fillText(SERIES, 16, 52);
  ctx.font = F(16); ctx.fillStyle = C.paper; ctx.textAlign = 'right'; ctx.fillText('episode ' + ep.meta.number, 704, 34);
  ctx.fillStyle = tone(s.status.tone); ctx.font = F(15, true); ctx.fillText(s.status.text, 704, 58);
  ctx.textAlign = 'left'; ctx.font = F(16); ctx.fillStyle = C.accentDim; ctx.fillText('day ' + s.day + ' · ' + s.time + ' · ' + s.loc, 16, 86);
  if (o.caption) { ctx.font = F(20, true); ctx.fillStyle = C.paper; ctx.fillText(o.caption, 16, 116); }
  ctx.fillStyle = s.status.tone === 'amber' ? C.line : tone(s.status.tone); ctx.fillRect(16, 128, 688, 2);
  const k = 688;
  place(ctx, { x: 16, y: 140, w: k }, 760, () => drawView(ctx, ep, s, t));
  place(ctx, { x: 16, y: 422, w: k }, 760, () => drawComms(ctx, s));
  place(ctx, { x: 16, y: 533, w: k }, 760, () => drawDecks(ctx, s, t));
  place(ctx, { x: 16, y: 742, w: k }, 476, () => drawSignal(ctx, ep, s, t));
  place(ctx, { x: 16, y: 908, w: k }, 476, () => drawLog(ctx, s, t));
  if (o.card) {
    const a = o.card.alpha === undefined ? 1 : o.card.alpha;
    ctx.fillStyle = 'rgba(7,11,16,' + 0.9 * a + ')'; ctx.fillRect(0, 0, 720, 1280);
    ctx.globalAlpha = a; ctx.textAlign = 'center';
    let y = 520 - o.card.lines.length * 34;
    for (const ln of o.card.lines) {
      const size = ln.size || 44; ctx.font = ln.mono ? F(size, ln.bold) : FD(size); ctx.fillStyle = tone(ln.tone || 'amber');
      for (const w of wrapChars(ln.text, Math.floor(640 / (size * (ln.mono ? 0.6 : 0.58))))) { ctx.fillText(w.text, 360, y); y += size * 1.25; }
      y += size * 0.45;
    }
    ctx.textAlign = 'left'; ctx.globalAlpha = 1;
  }
  return s;
}

// 1280 x 720 thumbnail. o: { at (seconds), big, title, sub, R, cx }
export function drawThumb(ctx, ep, t, o) {
  prepare(ep); o = o || {};
  const s = stateAt(ep, t); setTheme('amber'); applyViewExtras(ep, s, t);
  if (o.body) s.body = o.body;
  if (s.mode === 'transit' || s.mode === 'screen' || s.mode === 'night') s.mode = 'orbit';
  if (o.R !== undefined) s.R = { from: o.R, to: o.R, t: 0, dur: 0 };
  s.cx = { from: 400, to: 400, t: 0, dur: 0 };
  ctx.fillStyle = C.void; ctx.fillRect(0, 0, 1280, 720); ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1280, 720); ctx.clip();
  ctx.save(); ctx.translate((o.x || 900) - 400 * 2.4, (o.y || 330) - 152 * 2.4); ctx.scale(2.4, 2.4); drawSpace(ctx, ep, s, t, false); ctx.restore();
  ctx.restore();
  ctx.fillStyle = 'rgba(7,11,16,0.9)'; ctx.fillRect(0, 0, 420, 720);
  for (let i = 0; i < 12; i++) { ctx.fillStyle = 'rgba(7,11,16,' + (0.9 - (i + 1) * 0.072) + ')'; ctx.fillRect(420 + i * 30, 0, 30, 720); }
  ctx.font = FD(34); ctx.fillStyle = C.dim; ctx.fillText(SERIES, 52, 84);
  ctx.font = F(24, true); ctx.fillStyle = C.paper; ctx.fillText('EPISODE ' + String(ep.meta.number).padStart(2, '0'), 54, 124);
  const title = (o.title || ep.meta.title).toUpperCase();
  let y = 250;
  if (o.big) {
    let px = 300; ctx.font = FD(px); while (ctx.measureText(o.big).width > 560 && px > 120) { px -= 10; ctx.font = FD(px); }
    ctx.fillStyle = C.amber; ctx.fillText(o.big, 44, 190 + px * 0.76); y = 190 + px * 0.76 + 76;
    let tp = 54; ctx.font = FD(tp); while (ctx.measureText(title).width > 640 && tp > 30) { tp -= 2; ctx.font = FD(tp); }
    ctx.fillStyle = C.paper; ctx.fillText(title, 52, y);
  } else {
    let px = 112, lines;
    for (;;) { ctx.font = FD(px); lines = wrapChars(title, Math.max(6, Math.floor(620 / (px * 0.6)))); if ((lines.length <= 3 && lines.every(l => ctx.measureText(l.text).width <= 640)) || px <= 48) break; px -= 6; }
    ctx.fillStyle = C.amber; y = 380 - lines.length * px * 0.5; lines.forEach(l => { ctx.fillText(l.text, 50, y + px * 0.8); y += px * 1.04; });
  }
  if (o.sub) { ctx.font = F(28, true); ctx.fillStyle = C.teal; ctx.fillText(o.sub, 54, 600); }
  const bcT = sigCfg(ep, 'beacon', t);
  traceLine(ctx, ep, 'beacon', t, 0, 1280, 652, bcT && bcT.period < 0.5 ? 12 : 34, C.amber, 0, 60);
  traceLine(ctx, ep, 'other', t, 0, 1280, 694, 20, C.teal, 2, 60);
  ctx.strokeStyle = C.dim; ctx.lineWidth = 6; ctx.strokeRect(3, 3, 1274, 714);
  return s;
}

export function draw(ctx, ep, t, layout, o) {
  if (layout === 'tall') return drawTall(ctx, ep, t, o);
  if (layout === 'thumb') return drawThumb(ctx, ep, t, o);
  return drawWide(ctx, ep, t);
}
