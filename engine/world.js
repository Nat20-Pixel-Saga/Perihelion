// The fixed world of the show: people, deck plans, the star map and the bodies on the viewscreen.
// Episodes refer to these by name. Nothing here depends on Node or the browser.

export const SERIES = 'PERIHELION';

// Crew dots. `tone` is the dot colour; order fixes each dot's seat inside a room.
export const CREW = {
  V: { name: 'Varga', role: 'captain' },
  O: { name: 'Okafor', role: 'first officer' },
  A: { name: 'Achterberg', role: 'signals' },
  P: { name: 'Pell', role: 'science' },
  H: { name: 'Halloran', role: 'doctor' },
  C: { name: 'Castellanos', role: 'quartermaster' },
  M: { name: 'Madrigal', role: 'engineer' },
  B: { name: 'Brandt', role: 'commander, Aphelion', tone: 'paper' }
};
export const ORDER = ['V', 'O', 'A', 'P', 'H', 'C', 'M', 'B'];

// Voices that are not crew dots. `say()` accepts these keys too.
export const VOICES = {
  K: { name: 'The kept', tone: 'teal' },
  D: { name: 'Dominik', tone: 'teal' },
  R: { name: 'Register', tone: 'teal' },
  X: { name: 'The log', tone: 'teal' },
  S: { name: 'Recorder', tone: 'mute' },
  T: { name: 'Mateo', tone: 'teal' }
};
export const speaker = who => (typeof who === 'object' ? who : CREW[who] || VOICES[who]);

// Deck plans, in the decks panel's own 760 x 220 space.
// rooms: [centre x, centre y, spread]. labels: [x, y]. v: [x, y0, y1]. h: [y, x0, x1].
export const PLANS = {
  perihelion: {
    title: 'decks',
    hull: [[28, 116], [88, 40], [674, 40], [736, 76], [736, 156], [674, 192], [88, 192]],
    v: [[154, 40, 192], [284, 40, 192], [414, 40, 192], [544, 40, 192], [674, 40, 192]],
    h: [[116, 154, 544]],
    corridor: 116,
    rooms: { bridge: [102, 112, 0.8], lab: [219, 82, 1], med: [219, 154, 1], mess: [349, 82, 1], 'crew a': [349, 154, 1], 'crew b': [479, 82, 1], store: [479, 154, 1], cargo: [609, 112, 1], drive: [705, 112, 0.5] },
    labels: { bridge: [76, 82], lab: [164, 60], med: [164, 134], mess: [294, 60], 'crew a': [294, 134], 'crew b': [424, 60], store: [424, 134], cargo: [554, 60], drive: [682, 82] }
  },
  shuttle: {
    title: 'boarding · Aphelion shuttle 2',
    hull: [[170, 116], [236, 56], [540, 56], [592, 88], [592, 144], [540, 176], [236, 176]],
    v: [[310, 56, 176], [420, 56, 176], [510, 56, 176]],
    h: [],
    corridor: 116,
    rooms: { cockpit: [262, 112, 0.7], cabin: [365, 112, 0.9], 'suit rack': [465, 112, 0.7], airlock: [552, 112, 0.6] },
    labels: { cockpit: [222, 80], cabin: [320, 80], 'suit rack': [430, 80], airlock: [516, 80, 'lock'] },
    fog: true
  },
  aphelion: {
    title: 'boarding · DSV Aphelion',
    hull: [[18, 116], [70, 34], [690, 34], [742, 70], [742, 162], [690, 198], [70, 198]],
    v: [[128, 34, 198], [248, 34, 198], [368, 34, 198], [488, 34, 198], [608, 34, 198], [690, 34, 198]],
    h: [[116, 128, 488]],
    corridor: 116,
    rooms: { bridge: [84, 112, 0.7], 'cabins 1-21': [188, 80, 0.9], 'cabins 22-42': [308, 80, 0.9], 'cabins 43-63': [428, 80, 0.9], commons: [188, 154, 0.9], hydro: [308, 154, 0.9], medical: [428, 154, 0.9], hangar: [548, 112, 0.9], drive: [649, 112, 0.6], airlock: [716, 112, 0.35] },
    labels: { bridge: [62, 82], 'cabins 1-21': [136, 56], 'cabins 22-42': [256, 56], 'cabins 43-63': [376, 56], commons: [136, 134], hydro: [256, 134], medical: [376, 134], hangar: [496, 56], drive: [616, 56], airlock: [697, 86, 'lock'] },
    fog: true
  }
};

// Star map route in map-world coordinates. The panel shows a 476-wide window at `mapCam`.
export const ROUTE = [
  { x: 30, y: 150, label: 'home', lx: -10, ly: 20 },
  { x: 95, y: 128 },
  { x: 150, y: 142 },
  { x: 212, y: 108 },
  { x: 300, y: 88, label: 'Tau-9 · b1', beacon: true, lx: -38, ly: 24 },
  { x: 392, y: 112, label: 'Shallows · b2', beacon: true, lx: -44, ly: 24 },
  { x: 470, y: 66, label: 'Kiln · b3', beacon: true, lx: -30, ly: -14 },
  { x: 560, y: 96, label: 'Vesper · b4', beacon: true, lx: -40, ly: 24 },
  { x: 640, y: 58, label: 'Aphelion', beacon: true, lx: -28, ly: -14 },
  { x: 712, y: 90, label: 'Register', register: true, lx: -28, ly: 24 }
];
export const CHART_EDGE = 250;
// Registers revealed by mapReveal() in the finale.
export const FAR = [[770, 40], [800, 120], [838, 70], [866, 144], [892, 30], [930, 96], [960, 150], [985, 56], [1020, 112], [1058, 38], [1090, 140], [1120, 80]];

// Bodies the viewscreen can show. `kind` selects the drawing routine.
export const BODIES = {
  none: { kind: 'none' },
  tau9: { kind: 'planet', fill: '#06302B', band: '#1F7F68', edge: '#4FD6B0', ring: true },
  kiln: { kind: 'planet', fill: '#3A1D08', band: '#A8581C', edge: '#F2A93B', ring: false, hot: true },
  vesper: { kind: 'star', fill: '#3A0F0C', edge: '#E2604A' },
  shallows: { kind: 'debris' },
  aphelion: { kind: 'ship' },
  register: { kind: 'lattice' }
};

// Moods for the score. Each is a short cycle of chords in Hz; engine/audio.js plays them as slow pads.
export const MOODS = {
  silence: { gain: 0, chords: [[110]] },
  calm: { gain: 1, chords: [[73.4, 110, 146.8, 220, 329.6], [65.4, 98, 164.8, 196, 293.7], [87.3, 130.8, 174.6, 220, 349.2]] },
  wonder: { gain: 1, chords: [[82.4, 123.5, 185, 246.9, 370], [73.4, 110, 164.8, 277.2, 329.6], [98, 146.8, 185, 293.7, 440]] },
  unease: { gain: 0.9, chords: [[73.4, 110, 155.6, 207.7], [69.3, 103.8, 146.8, 220], [77.8, 116.5, 164.8, 233.1]] },
  dread: { gain: 0.9, chords: [[55, 82.4, 116.5, 155.6], [51.9, 77.8, 110, 164.8], [58.3, 87.3, 123.5, 174.6]] },
  crisis: { gain: 1, chords: [[55, 58.3, 110, 164.8], [51.9, 55, 103.8, 155.6]], pulse: 2.2 },
  night: { gain: 0.7, chords: [[55, 110, 164.8], [49, 98, 146.8]] },
  resolve: { gain: 1, chords: [[65.4, 98, 164.8, 246.9, 329.6], [87.3, 130.8, 174.6, 261.6, 392], [73.4, 110, 185, 220, 293.7], [98, 146.8, 196, 246.9, 392]] }
};
