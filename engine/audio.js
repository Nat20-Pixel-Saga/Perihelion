// Procedural soundtrack. Everything is synthesised from the event list, so the audio
// is original to this project and carries no licence. Layers: engine hum, slow chord pads
// chosen by music(mood), signal pings in time with the strip chart, typing, comms chirps, stings.

import { MOODS, speaker } from './world.js';
import { CPS, ERASE, READ_CPS } from './timeline.js';
import { prepare } from './state.js';

export const SR = 44100;
const TAU = Math.PI * 2;

function noiseGen(seed) { let s = seed >>> 0; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 2147483648 - 1; }; }

export function renderAudio(ep, opts) {
  opts = Object.assign({ pad: true, hum: true }, opts || {});
  prepare(ep);
  const dur = ep.duration, n = Math.ceil(dur * SR);
  const L = new Float32Array(n), R = new Float32Array(n);
  const rnd = noiseGen(412 + ep.meta.number);

  const tone = (t0, freq, len, gain, o) => {
    o = o || {}; const a = Math.max(0, Math.floor(t0 * SR)), b = Math.min(n, a + Math.floor(len * SR)), decay = o.decay || 5 / len, pan = o.pan === undefined ? 0 : o.pan, f1 = o.to || freq;
    let ph = 0;
    for (let i = a; i < b; i++) {
      const x = (i - a) / SR, f = freq + (f1 - freq) * (x / len), env = Math.min(1, x / 0.004) * Math.exp(-x * decay);
      ph += TAU * f / SR;
      const v = (o.square ? (Math.sin(ph) > 0 ? 0.6 : -0.6) : Math.sin(ph)) * env * gain;
      L[i] += v * (1 - pan * 0.5); R[i] += v * (1 + pan * 0.5);
    }
  };
  const burst = (t0, len, gain, lp) => {
    const a = Math.max(0, Math.floor(t0 * SR)), b = Math.min(n, a + Math.floor(len * SR)); let y = 0;
    for (let i = a; i < b; i++) { const x = (i - a) / (b - a); y += (rnd() - y) * lp; const v = y * gain * (1 - x) * (1 - x); L[i] += v; R[i] += v; }
  };

  // Engine hum.
  if (opts.hum) for (let i = 0; i < n; i++) {
    const t = i / SR, a = 0.03 * (1 + 0.15 * Math.sin(TAU * 0.07 * t));
    const v = Math.sin(TAU * 55 * t) * 0.5 + Math.sin(TAU * 82.4 * t) * 0.2 + Math.sin(TAU * 110.6 * t) * 0.1;
    L[i] += v * a; R[i] += (Math.sin(TAU * 55 * t + 0.4) * 0.5 + Math.sin(TAU * 82.4 * t + 0.9) * 0.2 + Math.sin(TAU * 110.6 * t) * 0.1) * a;
  }

  // Pads, rendered at half rate and upsampled: the content is all below 1 kHz.
  const spans = [];
  for (const e of ep.events) if (e.type === 'music') { if (spans.length) spans[spans.length - 1].t1 = e.t; spans.push({ t0: e.t, t1: dur, mood: e.mood }); }
  if (opts.pad) {
    const H = SR / 2, hn = Math.ceil(n / 2), hl = new Float32Array(hn), hr = new Float32Array(hn);
    const CH = 14, XF = 5;
    for (const sp of spans) {
      const mood = MOODS[sp.mood] || MOODS.calm; if (!mood.gain) continue;
      let k = 0;
      for (let a = sp.t0; a < sp.t1; a += CH, k++) {
        const chord = mood.chords[k % mood.chords.length], end = Math.min(sp.t1, a + CH) + XF, start = a === sp.t0 ? a : a;
        const i0 = Math.max(0, Math.floor(start * H)), i1 = Math.min(hn, Math.floor(end * H)), amp = 0.055 * mood.gain / Math.sqrt(chord.length);
        chord.forEach((f, ni) => {
          [[1, 1], [2, 0.22], [1.004, 0.55]].forEach((pt, pi) => {
            const incL = TAU * f * pt[0] * 0.9985 / H, incR = TAU * f * pt[0] * 1.0015 / H; let pl = ni * 1.3 + pi, pr = ni * 0.7 + pi * 2;
            const lfo = 0.11 + ni * 0.023 + pi * 0.017;
            for (let i = i0; i < i1; i++) {
              const x = i / H - start, env = Math.min(1, x / XF) * Math.min(1, (end - start - x) / XF);
              const g = env * env * (3 - 2 * env) * amp * pt[1] * (0.75 + 0.25 * Math.sin(TAU * lfo * x + ni));
              pl += incL; pr += incR; hl[i] += Math.sin(pl) * g; hr[i] += Math.sin(pr) * g;
            }
          });
        });
      }
      if (mood.pulse) for (let a = sp.t0 + 1; a < sp.t1; a += mood.pulse) tone(a, 62, 0.5, 0.2, { to: 44, decay: 7 });
    }
    for (let i = 0; i < n; i++) { const j = i >> 1, j2 = Math.min(hn - 1, j + 1), f = (i & 1) * 0.5; L[i] += hl[j] + (hl[j2] - hl[j]) * f; R[i] += hr[j] + (hr[j2] - hr[j]) * f; }
  }

  // Signal pings, in time with the strip chart.
  for (const ch of ['beacon', 'other']) {
    const list = ep.sig[ch], freq = ch === 'beacon' ? 880 : 392;
    list.forEach((c, idx) => {
      if (!c.on) return; const stop = idx + 1 < list.length ? list[idx + 1].t : dur;
      if (c.period < 0.5) return;
      for (let a = c.t + (c.offset || 0); a < stop; a += c.period) {
        if (c.period >= 1.5) { tone(a, freq, 0.7, 0.085, { pan: ch === 'beacon' ? -0.5 : 0.5 }); tone(a + 0.33, freq, 0.6, 0.03, { pan: 0.6 }); tone(a + 0.66, freq, 0.5, 0.012, { pan: -0.6 }); } else tone(a, freq, 0.22, 0.022, { pan: 0.5, decay: 22 });
      }
    });
  }

  // Per-event sounds.
  for (const e of ep.events) {
    if (e.type === 'logType') for (let i = 0; i < e.text.length; i += 2) burst(e.t + i / CPS, 0.006, 0.09, 0.5);
    else if (e.type === 'logErase') for (let i = 0; i < e.n; i += 3) burst(e.t + i / ERASE, 0.008, 0.07, 0.2);
    else if (e.type === 'readout') for (let i = 0; i < e.text.length; i += 3) burst(e.t + i / READ_CPS, 0.005, 0.05, 0.7);
    else if (e.type === 'say') { const teal = speaker(e.who).tone === 'teal'; tone(e.t, teal ? 523 : 660, 0.05, 0.035, { decay: 30 }); tone(e.t + 0.06, teal ? 392 : 880, 0.07, 0.035, { decay: 25 }); }
    else if (e.type === 'tx') { tone(e.t, 140, 0.8, 0.12, { square: true, decay: 1.5 }); burst(e.t, 0.8, 0.12, 0.3); }
    else if (e.type === 'status' && e.tone === 'red') { tone(e.t, 72, 2.6, 0.26, { to: 36, decay: 1.4 }); burst(e.t, 1.2, 0.08, 0.05); }
    else if (e.type === 'status' && e.tone === 'teal') { tone(e.t, 1568, 2.2, 0.03, { decay: 1.8, pan: 0.6 }); tone(e.t + 0.12, 1046.5, 2.2, 0.03, { decay: 1.8, pan: -0.6 }); }
    else if (e.type === 'theme' && e.name === 'teal') { tone(e.t, 196, 5, 0.12, { to: 392, decay: 0.5 }); tone(e.t, 293.7, 5, 0.08, { to: 587.3, decay: 0.5, pan: 0.7 }); }
    else if (e.type === 'scene') tone(e.t, 110, 1.6, 0.06, { to: 82, decay: 2.5 });
  }

  // Master: fades and a soft limiter.
  for (let i = 0; i < n; i++) {
    const t = i / SR, f = Math.min(1, t / 1.5) * Math.min(1, (dur - t) / 3);
    L[i] = Math.tanh(L[i] * 1.6) * f * 0.8; R[i] = Math.tanh(R[i] * 1.6) * f * 0.8;
  }
  return { L, R, sr: SR, spans };
}

// 16-bit stereo WAV bytes.
export function toWav(L, R, sr) {
  const n = L.length, buf = new ArrayBuffer(44 + n * 4), v = new DataView(buf);
  const str = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  str(0, 'RIFF'); v.setUint32(4, 36 + n * 4, true); str(8, 'WAVE'); str(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 2, true);
  v.setUint32(24, sr, true); v.setUint32(28, sr * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true); str(36, 'data'); v.setUint32(40, n * 4, true);
  for (let i = 0; i < n; i++) { v.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i])) * 32767, true); v.setInt16(46 + i * 4, Math.max(-1, Math.min(1, R[i])) * 32767, true); }
  return new Uint8Array(buf);
}

// Cut pieces out of a rendered track and join them with short fades. pieces: [[t0, dur], ...]
export function splice(audio, pieces) {
  const total = pieces.reduce((s, p) => s + Math.round(p[1] * audio.sr), 0), L = new Float32Array(total), R = new Float32Array(total);
  let o = 0; const fade = Math.floor(0.03 * audio.sr);
  for (const p of pieces) {
    const a = Math.max(0, Math.floor(p[0] * audio.sr)), len = Math.round(p[1] * audio.sr);
    for (let i = 0; i < len; i++) { const g = Math.min(1, i / fade, (len - i) / fade), j = a + i; if (j < audio.L.length) { L[o + i] = audio.L[j] * g; R[o + i] = audio.R[j] * g; } }
    o += len;
  }
  return { L, R, sr: audio.sr };
}
