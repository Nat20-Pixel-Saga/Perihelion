import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e03',
  number: 3,
  title: 'Three empty suits',
  logline: 'The second beacon counts fifty-eight. Its memory says three people took a shuttle toward the signal, and the shuttle is still here, adrift in the wreck of a dead star.',
  start: {
    clock: [420, '11:20'], loc: 'approaching the Shallows', status: 'nominal',
    view: 'transit', map: 4.9, mapKnown: 4, mapCam: 40, course: true, music: 'calm',
    crew: { V: 'bridge', O: 'bridge', A: 'bridge', P: 'lab', H: 'med', C: 'store', M: 'drive' },
    meters: { fuel: 52, hull: 91, morale: 33 },
    sig: { other: { on: true, period: 0.7, name: 'cargo relay' } }
  }
}, ({ scene, note, music, wait, mark, clock, loc, status, view, blip, readout, mapTo, mapKnown, mapCam, course, sig, plan, move, meter, log, say, end, trailer, thumb }) => {

  /* Scene 1 */
  scene('The Shallows');
  mapTo(4.97, 60);
  note('Open on the full console. Stars streak. Seven dots at their stations. On the signal strip the teal trace from the cargo relay pulses every seven seconds, as it has for six days.');
  log('day 420 · 11:20', 'Sixth day of transit. The relay in our cargo bay still pulses every seven seconds. The inquiry into 02:14 remains open. Mr Okafor continues to stand his watch.');
  say('C', 'Stores counted. Six days out, nothing missing.');
  say('P', 'Does that count include crate 41?');
  say('C', 'I count it twice now.');
  wait(1.5);
  say('O', 'Sublight in two minutes, Captain.');
  say('V', 'Thank you, Mr Okafor.');
  note('It is the only thing she has said to him today. Nobody on the bridge remarks on it.');
  wait(1);

  clock(420, '13:05'); loc('the Shallows · sublight');
  music('wonder');
  view('orbit', { body: 'shallows', fromR: 4, fromCx: 600, R: 56, cx: 470, dur: 16 });
  mapTo(5, 10); mapCam(80, 10);
  note('The stars stop. A hard white point grows on the viewscreen, wrapped in a slow disc of wreckage: a white dwarf and what is left of its planets.');
  wait(5);
  mapKnown(5); course(false);
  say('M', 'Shallow water. Rocks all the way in.');
  mark('pulse');
  sig('beacon', { on: true, period: 5.8, name: 'beacon 2' });
  blip('beacon', { label: 'beacon 2', orbit: true, ch: 'beacon' });
  note('The signal strip gains an amber trace above the teal one. The amber pulse is slow. The teal one does not change its count.');
  wait(5.5);
  say('A', 'Beacon signal. Aphelion ident. I am timing it.');
  wait(4);
  say('O', 'Fifty-eight.');
  wait(1.5);
  say('H', 'Three more.');
  wait(2.5);
  say('A', 'It sits inside the disc. I cannot read it from here.');
  say('M', 'Threading that is three points of fuel. And a hull I like.');
  say('M', 'Note my objection.');
  say('V', 'Noted. Thread it.');
  mark('thread');
  status('manoeuvring · debris field');
  meter('fuel', 49);
  view('orbit', { R: 100, cx: 400, dur: 9 });
  loc('the Shallows · inside the disc');
  note('The fuel meter falls three points as the disc opens around the ship. Nobody speaks while Madrigal flies.');
  wait(7);
  status('nominal');

  /* Scene 2 */
  scene('Beacon 2');
  music('unease');
  clock(420, '14:40'); status('tightbeam · beacon 2');
  view('screen', { object: 'beacon', label: 'tightbeam', caption: 'beacon 2 · Aphelion issue' });
  note('The viewscreen switches to the beacon wireframe. It flashes each time the amber trace peaks.');
  wait(1.5);
  say('A', 'Tightbeam locked. Receive only. Three entries again.');
  readout('entry 1 · Aphelion day 452', 'Beacon 2 placed. Sixty-one aboard.');
  wait(1.5);
  say('C', 'She has stopped writing "and well".');
  wait(1.5);
  mark('entry2');
  readout('entry 2 · Aphelion day 470', 'Three took shuttle 2 toward it. They were not taken. They went.');
  wait(3.5);
  say('P', 'Toward it. She does not say toward what.');
  say('A', 'She does not have to.');
  wait(1.5);
  mark('entry3');
  readout('entry 3 · Aphelion day 470', 'If you find the shuttle, do not bring its recorder aboard.');
  wait(3.5);
  say('A', 'Captain. I may already have.');
  view('orbit', { R: 100, cx: 400, dur: 0 });
  status('contact · no power, no ident', 'amber');
  mark('shuttle');
  blip('shuttle', { label: 'shuttle 2', tone: 'paper', at: [1.58, 0.3], dy: 22 });
  note('Back to the dwarf and its disc. A small paper-white marker sits among the debris, apart from the beacon. It does not pulse. Hold on it.');
  wait(6);
  say('A', 'Optics only. Right size, tumbling, cold.');
  wait(1.5);
  say('H', 'If there are bodies, that is my work.');
  wait(1);
  say('V', 'If there are bodies, Doctor, you go second.');
  say('V', 'Mr Okafor. Take the pod across. Pell goes with you.');
  wait(1);
  say('P', 'With Mr Okafor.');
  say('V', 'With Mr Okafor.');
  wait(1.5);
  say('O', 'Aye, Captain.');
  move('O', 'cargo', 6); move('P', 'cargo', 5); move('C', 'cargo', 4);
  note('Okafor walks the length of the ship to cargo. Pell joins him from the lab. Castellanos comes from the store to launch the pod. Five days ago these three stood in the same bay, around a crate.');
  say('A', 'Suit radios stay off. The pod pays out a hardline.');
  wait(2);
  log('day 420 · 15:30', 'Shuttle 2 is adrift near the beacon. Mr Okafor and Pell go across by pod, on a hardline. The recorder stays where it is.');
  wait(1);

  /* Scene 3 */
  scene('Boarding');
  music('dread');
  clock(420, '16:10'); status('boarding · shuttle 2'); loc('the Shallows · alongside shuttle 2');
  plan('shuttle');
  move('O', 'shuttle:airlock', 0); move('P', 'shuttle:airlock', 0);
  view('screen', { object: 'shuttle', label: 'hardline', caption: 'shuttle 2 · helmet feed' });
  note('The deck plan is replaced by an outline of the shuttle, dark except for the airlock, where two dots stand. Rooms take their names only as someone enters them.');
  wait(2);
  say('O', 'Hardline is good. We are in the lock.');
  readout('airlock', 'Outer hatch released by hand, from inside. No forcing.');
  wait(1.5);
  say('O', 'Nobody broke in. Somebody let themselves out.');
  move('O', 'shuttle:suit rack', 3.5); move('P', 'shuttle:suit rack', 4.5);
  wait(5);
  mark('suits');
  readout('suit rack', 'Three suits, sealed. Okonjo. Reyes. Lindqvist.');
  note('Three names on the viewscreen. The two dots stand still in the suit rack. No dialogue.');
  wait(6);
  say('H', 'Then they did not go outside. Not and live.');
  wait(1.5);
  say('O', 'Mr Pell. Look at the collar.');
  readout('docking collar', 'Scored on every latch. Hard-docked to a second hull. Not the Aphelion.');
  wait(2.5);
  say('A', 'There is no second hull out there. I have looked.');
  mark('across');
  say('O', 'They did not step out. They stepped across.');
  wait(3.5);
  move('O', 'shuttle:cabin', 3.5); move('P', 'shuttle:cabin', 4);
  wait(4.5);
  say('P', 'Three bunks, made. They were not in a hurry.');
  move('O', 'shuttle:cockpit', 3.5); move('P', 'shuttle:cockpit', 4);
  wait(4.5);
  say('O', 'Cockpit. The recorder is in its cradle. It has power.');
  say('P', 'It unclips, Captain. Ten minutes in my lab.');
  say('V', 'It stays in its cradle.');
  say('P', 'It is evidence.');
  say('V', 'It is bait. Brandt said so before I did.');
  wait(1);
  say('V', 'Play it where it sits. Achterberg, nothing is stored.');
  say('A', 'Audio down the line and no further.');
  music('silence');
  view('screen', { object: 'wave', label: 'recorder', caption: 'flight recorder · played in place' });
  status('playback · shuttle 2 recorder', 'teal');
  note('The viewscreen shows a teal waveform. It is the first voice from the Aphelion that anyone aboard has heard.');
  readout('last entry · Aphelion day 470', 'Okonjo, S. Forty-one seconds.');
  wait(1.5);
  mark('recorder');
  say('S', 'It has Ines\'s voice. It knows what she said to me the night before she died.');
  wait(2.5);
  say('S', 'Lindqvist says it is a trick. Reyes says it does not matter if it is.');
  wait(2.5);
  say('S', 'I am going to hear the rest of what she has to say.');
  note('The waveform keeps moving for a few seconds after the voice stops. Nobody talks over it.');
  wait(6);
  status('boarding · shuttle 2');
  music('dread');
  say('H', 'Three dead at Tau-9. One of them was Ines.');
  meter('morale', 31);
  wait(2);
  say('V', 'Come home, Mr Okafor. Leave everything as it was.');
  say('O', 'Mr Pell. Hands off the cradle.');
  move('O', 'shuttle:airlock', 7); move('P', 'shuttle:airlock', 6);
  note('The two dots walk back the way they came, through three rooms that now have names.');
  wait(6.5);

  clock(420, '17:25');
  plan();
  move('O', 'off', 0); move('P', 'off', 0);
  view('orbit', { R: 100, cx: 400, dur: 0 });
  status('pod returning');
  note('The Perihelion deck plan returns with five dots on it. Okafor and Pell are in the pod, between hulls, and on no plan at all.');
  wait(3.5);
  mark('strike');
  music('crisis');
  status('debris strike · pod bay', 'red');
  meter('hull', 88, 1);
  note('The status line goes red and the hull meter drops three points in a second.');
  wait(2.5);
  say('M', 'Strike. Something came down the path we cut.');
  say('V', 'The pod. Castellanos.');
  wait(2);
  move('O', 'cargo', 0); move('P', 'cargo', 0);
  say('C', 'Pod is in. Door is shut. Two aboard, I counted.');
  move('H', 'cargo', 5);
  note('Two dots reappear in cargo. The doctor is already walking aft from the medical bay.');
  say('M', 'Outer skin only. Three points. I did note it.');
  say('V', 'You did.');
  status('nominal');
  music('unease');
  wait(2);
  wait(2);

  /* Scene 4 */
  scene('Two trays');
  music('unease');
  clock(420, '20:30'); status('nominal'); loc('the Shallows · holding off the disc');
  view('orbit', { R: 70, cx: 440, dur: 6 });
  blip('shuttle');
  move('V', 'mess'); move('O', 'mess', 5); move('P', 'mess', 5); move('H', 'mess', 5); move('C', 'mess', 5);
  note('The ship has backed out of the debris. Five dots gather in the mess. Achterberg keeps her station while the signals are live. Madrigal stays in the drive room.');
  wait(5.5);
  say('P', 'Eleven years of listening. It could build a voice from that.');
  say('C', 'A voice, yes. Not what she said in the dark to one person.');
  wait(1.5);
  mark('dead');
  say('H', 'It speaks with the dead.');
  wait(1.5);
  say('A', 'It speaks as them.');
  wait(3);
  say('V', 'Nobody aboard listens to that channel alone. Standing order.');
  say('M', 'It is in our cargo bay. We all listen to it.');
  wait(2.5);
  move('V', 'bridge'); move('O', 'bridge', 5); move('P', 'lab'); move('H', 'med'); move('C', 'store');
  note('The mess empties. Everyone returns to a station, the doctor to the medical bay.');
  log('day 420 · 21:10', 'Shuttle 2 boarded. No bodies. Three suits on the rack, sealed. They went of their own will, toward a voice one of them knew. The recorder stays in its cradle. Mr Okafor led the boarding well.');
  wait(2);

  clock(420, '22:05');
  music('night');
  view('night');
  mark('trays');
  move('H', 'mess', 5);
  note('22:05. One dot leaves the medical bay and crosses to the mess. It sits alone. Hold on it.');
  wait(6);
  say('C', 'He takes two trays.');
  wait(2);
  say('P', 'Every night?');
  say('C', 'Every night. One comes back full.');
  note('Nobody asks. The dot in the mess does not move.');
  wait(5);

  clock(420, '23:40'); status('ship night');
  move('A', 'crew b'); move('P', 'crew a'); move('C', 'crew b'); move('H', 'crew b');
  note('The ship turns in. Two dots are left on the bridge, and the comms panel switches to the private channel.');
  wait(4.5);
  say('O', 'Pell thought about not turning his back on me today.', { priv: true });
  say('V', 'I saw that you went anyway.', { priv: true });
  wait(2);
  mark('ask');
  say('O', 'We are at Beacon 2. I am asking again.', { priv: true });
  wait(4);
  say('V', 'After Kiln.', { priv: true });
  wait(2.5);
  say('O', 'After Kiln, Captain.', { priv: true });
  meter('morale', 30);
  wait(3);

  clock(421, '06:30'); status('departure burn'); loc('departing the Shallows · Kiln in 5 days');
  music('unease');
  view('orbit', { R: 100, cx: 400, dur: 0 });
  view('orbit', { R: 26, cx: 650, dur: 16 });
  move('A', 'bridge'); move('P', 'lab'); move('C', 'store'); move('H', 'med');
  course(true);
  mapTo(5.25, 14);
  meter('fuel', 46);
  sig('beacon', { on: false, name: 'beacon 2', label: 'beacon 2 · astern, out of range' });
  note('Morning. The dwarf and its disc fall away. A dashed course line reaches for Kiln. The comms panel is the open channel again. The amber trace goes quiet behind the ship and the teal one keeps its seven.');
  say('O', 'Course for Kiln laid in, Captain.');
  log('day 421 · 06:40', 'Course laid for Beacon 3. Behind us a shuttle keeps three suits for people who had no more use for them. Fifty-eight.');
  status('nominal');
  wait(5);
  end({ next: 'blind skim', line: 'they went by choice' });

  trailer({
    hook: 'Three people left this shuttle. None were taken.',
    cuts: [
      { at: 'pulse', from: 4, dur: 9, caption: 'The second beacon counts fifty-eight.' },
      { at: 'entry2', from: 0, dur: 7, caption: 'Three took a shuttle toward the signal.' },
      { at: 'suits', from: -1, dur: 7, caption: 'Their suits are still on the rack.' },
      { at: 'recorder', from: -1, dur: 9, caption: 'It spoke to them in a dead voice.' },
      { at: 'ask', from: -1, dur: 7, caption: 'And the first officer is still asking.' }
    ]
  });
  thumb({ at: 'shuttle', from: 4, big: '58', title: 'Three empty suits', sub: 'they went by choice', R: 96 });
});
