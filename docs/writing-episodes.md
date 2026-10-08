# Writing an episode

An episode is one file in `episodes/`. It calls a small set of verbs in story order. The builder keeps the clock, so you never write timestamps: text takes as long as it takes to type, and `wait()` adds silence. `episodes/s01e01.js` is the reference.

```js
import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e02', number: 2, title: 'Dead astern',
  logline: 'One or two sentences for the YouTube description. No spoilers past the first act.',
  start: { /* the console at 0:00, see below */ }
}, ({ scene, say, log, wait /* …the verbs you use */ }) => {
  scene('Inquiry');
  …
  end({ next: 'three empty suits' });
  trailer({ … });
  thumb({ … });
});
```

Check your work with:

```
node tools/cli.js lint s01e02            # must print "ok"
node tools/cli.js frames s01e02          # stills in dist/s01e02/frames (one per scene and per mark, plus trailer cuts)
node tools/cli.js frames s01e02 95 210   # stills at chosen seconds
```

## The opening state

`meta.start` sets the console at 0:00. A 4.5 second title card covers the viewscreen first; your first `scene()` starts after it.

| Field | Meaning |
| --- | --- |
| `clock: [day, 'hh:mm']` | Ship day and time |
| `loc`, `status`, `statusTone` | Top bar. `loc` up to 46 characters, `status` up to 36 |
| `view`, `viewOpts` | Viewscreen mode and options, as in `view()` below |
| `map`, `mapKnown`, `mapCam`, `course` | Star map: ship position, last labelled node, camera x, dashed course line |
| `crew: { V: 'bridge', … }` | Where each dot starts |
| `meters: { fuel, hull, morale }` | Percent |
| `sig: { beacon: {…}, other: {…} }` | Signals already present |
| `logMode: 'open'` | From episode 6 on |
| `music` | Opening mood |

## Verbs

**Time and structure**

- `scene('Title')` starts a scene. It shows a card, clears the comms panel, and becomes a YouTube chapter. Keep titles short. At least 3 scenes, each at least 20 seconds.
- `wait(seconds)` holds. Use it after a strong line, and while dots walk (a move takes 4 seconds by default).
- `note('…')` is a stage direction. It appears only in the exported script. Write one wherever the instruments say something the dialogue does not.
- `mark('name')` names this moment for the trailer and the thumbnail.
- `music('mood')`: `calm`, `wonder`, `unease`, `dread`, `crisis`, `night`, `resolve`, `silence`.
- `end({ next: 'next title', line: 'optional small line' })` shows the end card and adds 9 seconds.

**Top bar**

- `clock(day, 'hh:mm')`, `loc('…')`, `status('…', tone)`. Tones: `'amber'` (default), `'teal'` for anything the Register touches, `'red'` for danger only.
- `theme('amber' | 'red' | 'teal')` recolours the console frame. Red is for a ship in danger. Teal is used once, at the end of episode 9 and the start of episode 10.

**Viewscreen**

- `view(mode, opts)`. Modes: `'transit'` (stars streak), `'orbit'` (stars still, a body in view), `'night'` (the same, dimmed), `'screen'` (a readout).
- Options for space views: `body` (`'tau9'`, `'shallows'`, `'kiln'`, `'vesper'`, `'aphelion'`, `'register'`, `'none'`), `R` (size, 0 to about 190; 100 is a comfortable orbit), `cx` (0 to 760, centre is 380), `dur` (seconds to tween), `fromR` and `fromCx` (start values), `nodes` (Register only: 63 or 64).
- Options for screens: `object` (`'beacon'`, `'shuttle'`, `'aphelion'`, `'register'`, `'wave'`, `'none'`), `caption` (small text under the object), `label` (panel label, default "tightbeam"). Calling `view('screen', { object })` again clears the readouts.
- `readout('heading', 'text', { tone })` types a block on the screen. With an object there is room for about 10 lines of 44 characters, headings included. `object: 'none'` gives 69 characters per line. The linter tells you when it overflows.
- `blip(id, { label, tone, ch, orbit: true })` puts a marker in orbit around the body. Use `at: [dx, dy]` (in body radii) for a fixed marker, and `ch: 'beacon' | 'other'` to make it pulse with that signal. `blip(id)` removes it. Blips clear when the body changes.

**Star map**

- `mapTo(position, seconds)`: 4 is Tau-9, 5 the Shallows, 6 Kiln, 7 Vesper, 8 the Aphelion, 9 the Register. Fractions are in between.
- `mapKnown(n)` labels nodes up to n. `mapCam(x, seconds)` slides the window (0, 80, 150, 240, 300 suit nodes 4 to 8). `course(true | false)` draws or removes the dashed line to the next node. `mapReveal()` is for the finale.

**Signal strip**

- `sig('beacon' | 'other', { on, period, offset, name, label })`. One second on screen is ten seconds of story, so a 58-second beacon is `period: 5.8` and the strip prints "every 58 s". `name` is what the strip calls the source. `label` replaces the whole text.
- `tx('label')` draws a red transmission spike.

**Deck plan**

- `move('V', 'mess')`, or `move('V', 'mess', seconds)`. Rooms: `bridge`, `lab`, `med`, `mess`, `crew a`, `crew b`, `store`, `cargo`, `drive`. Crew: `V` Varga, `O` Okafor, `A` Achterberg, `P` Pell, `H` Halloran, `C` Castellanos, `M` Madrigal, `B` Brandt.
- `plan('shuttle' | 'aphelion')` swaps the panel to a boarding plan, and `plan()` swaps back. Move people on it with `move('O', 'shuttle:airlock', 0)` then `move('O', 'shuttle:cabin')`. Rooms on a boarding plan show their names only after someone has entered. Shuttle rooms: `airlock`, `suit rack`, `cabin`, `cockpit`. Aphelion rooms: `airlock`, `hangar`, `drive`, `cabins 43-63`, `cabins 22-42`, `cabins 1-21`, `commons`, `hydro`, `medical`, `bridge`. A room of `'off'` hides a dot.
- `labels(false)` drops the initials (privacy hours). `tag('mess', 'retain 3')` pins a small label on a room, and `tag('mess')` removes it.

**Meters**

- `meter('fuel' | 'hull' | 'morale', value)`. Change them when the story charges a price, at the moment it does.

**Captain's log**

- `log('day 413 · 06:40', 'text')` opens a new entry and types it. An entry holds 6 lines of 41 characters, about 230 characters. Split longer thoughts into two entries.
- `logOpen(stamp)`, `logType('text')`, `logErase()` build an entry in pieces. `logErase()` deletes the last piece typed, on screen.
- `{ tone: 'teal' }` on `log`, `logOpen` or `logType` is text written by the Register's copy of the captain.
- `logMode('open')` adds "open, no erase" to the panel. After episode 6 the captain never calls `logErase()` on her own text.

**Comms**

- `say('O', 'text')`. A line holds 2 rows of 57 characters. One row is better. Add `{ priv: true }` for a private channel.
- Other voices: `K` the kept, `D` Dominik, `R` the Register, `T` Mateo, `S` a recorder, or `{ name: 'Lamp', tone: 'paper' }` for a one-off.

**Packaging**

```js
trailer({
  hook: 'One sentence, up to 64 characters, shown on a card first.',
  cuts: [ { at: 'markName', from: -2, dur: 7, caption: 'Up to 46 characters.' }, … ]   // 4 to 6 cuts, 30 to 50 seconds in all
});
thumb({ at: 'markName', from: 10, big: '58', title: 'Three empty suits', sub: 'three words or so', R: 96 });
```

Pick thumbnail moments where a body is on the viewscreen. `big` is the number the episode turns on.

## House style

- People speak in short, dry lines. No contractions, no exclamation marks, no em dashes. Naval manners: "Captain", "Mr Okafor", "Doctor".
- The captain's log is first person and measured. It states what she wants on record, which is not always what happened.
- Never explain a habit or a number twice. Show it on an instrument, let one person remark on it, and move on.
- Give every scene one moment where the instruments carry the story with no dialogue for at least five seconds.
- Madrigal's objections are always "noted". Castellanos counts things. The doctor goes to the mess at 22:05.
- Aim for 5:30 to 7:30. The linter prints the runtime.
