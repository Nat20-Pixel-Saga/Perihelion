import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e01',
  number: 1,
  title: 'Sixty-one seconds',
  logline: 'A survey ship reaches the first beacon left by a lost expedition. It pulses every 61 seconds instead of 60, and its memory explains why.',
  start: {
    clock: [412, '21:40'], loc: 'in transit · 0.3 ly from Tau-9', status: 'nominal',
    view: 'transit', map: 3.55, mapKnown: 4, mapCam: 0, music: 'calm',
    crew: { V: 'bridge', O: 'bridge', A: 'bridge', P: 'lab', H: 'med', C: 'cargo', M: 'drive' },
    meters: { fuel: 62, hull: 91, morale: 58 }
  }
}, ({ scene, note, music, wait, mark, clock, loc, status, view, blip, readout, mapTo, course, sig, tx, move, labels, meter, log, logOpen, logType, logErase, say, end, trailer, thumb }) => {

  /* Scene 1 */
  scene('Transit');
  mapTo(3.9, 70);
  note('Open on the full console. Stars drift across the viewscreen. Seven crew dots sit at their stations.');
  log('day 412 · 21:40', 'We passed the last charted star nine days ago. From here the only map is the one the Aphelion left: a chain of beacons, dropped one per system, like a trail of stones.');
  log('day 412 · 21:44', 'Sixty-four people went out on the Aphelion. Eleven years ago they stopped reporting. Seven of us were sent to find out why. Beacon 1 is one day ahead.');
  say('O', 'Captain, Madrigal wants a slower approach. Again.');
  say('M', 'The drive wants it. I translate.');
  say('V', 'Granted. We save fuel where we can.');
  mark('habit');
  clock(412, '22:05');
  note('The doctor leaves the medical bay for the mess only now, after everyone else has eaten. Pell and Castellanos go to their quarters. Madrigal stays in the drive room, as she will all episode.');
  move('H', 'mess'); move('P', 'crew a'); move('C', 'crew b');
  wait(4.5);
  say('A', 'Doctor is in the mess. Must be past ten.');
  say('O', 'You could set the ship clock by him.');
  wait(2);

  /* Scene 2 */
  scene('Arrival');
  music('wonder');
  clock(413, '06:10'); loc('Tau-9 system · sublight');
  view('orbit', { body: 'tau9', fromR: 4, fromCx: 590, R: 64, cx: 470, dur: 16 });
  mapTo(4, 10);
  move('P', 'lab'); move('C', 'cargo'); move('H', 'med');
  note('The stars stop streaking. A banded, ringed planet grows on the viewscreen. The ship marker reaches Tau-9 on the star map.');
  wait(2);
  say('O', 'Sublight. Tau-9 c on screen.');
  mark('pulse');
  sig('beacon', { on: true, period: 6.1, name: 'beacon 1' });
  blip('beacon', { label: 'beacon 1', orbit: true, ch: 'beacon' });
  note('The signal strip wakes. An amber pulse crosses it at a steady interval.');
  wait(4);
  say('A', 'Beacon signal. Aphelion ident, strong and clean.');
  wait(2.5);
  say('A', 'One problem. It pulses every 61 seconds.');
  say('O', 'Survey beacons pulse every 60.');
  say('P', 'Clocks drift.');
  say('A', 'Not these. Somebody set it to 61.');
  mark('decision');
  status('decision · close orbit');
  log('day 413 · 06:40', 'Beacon 1 found in orbit of Tau-9 c, eleven years old and off by one second. Reading its memory means a close orbit. Madrigal prices that at seven points of fuel.');
  say('M', 'Seven points. Note my objection.');
  say('V', 'Noted. Take us in.');
  meter('fuel', 55);
  view('orbit', { R: 104, cx: 430, dur: 7 }); loc('orbit · Tau-9 c'); status('nominal');
  wait(6);

  /* Scene 3 */
  scene('The beacon');
  music('unease');
  clock(413, '14:30'); status('tightbeam · beacon 1');
  view('screen', { object: 'beacon', caption: 'beacon 1 · Aphelion issue' });
  move('C', 'lab');
  note('The viewscreen switches to a wireframe of the beacon. Its memory prints beside it, one entry at a time.');
  wait(1.5);
  say('A', 'Tightbeam locked. Its memory holds three entries.');
  readout('entry 1 · Aphelion day 388', 'Beacon 1 placed. All sixty-four aboard and well. Continuing outward. Brandt, commanding.');
  wait(1.5);
  mark('entry2');
  readout('entry 2 · Aphelion day 431', 'We came back to change the interval. Count the seconds between pulses. That is how many of us are left.');
  wait(3);
  say('O', 'Sixty-one.');
  say('H', 'Three dead in forty-three days. Of what?');
  meter('morale', 49);
  wait(1.5);
  mark('roster');
  note('The captain asks a quiet question. It is the seed of everything she does tonight.');
  say('V', 'Achterberg. Does the beacon hold a crew roster?');
  say('A', 'It would answer a roster query. We would have to send one.');
  say('V', 'Then we do not ask.');
  wait(1);
  mark('entry3');
  readout('entry 3 · Aphelion day 431', 'Do not answer the other one.');
  wait(3);
  say('P', 'The other what?');
  wait(1.5);
  mark('other');
  music('dread');
  sig('other', { on: true, period: 6.1, offset: 0.4, name: 'unknown source' });
  status('unknown contact', 'teal');
  note('A second trace appears on the signal strip in teal, pulsing just after the amber one.');
  say('A', 'Captain. There is a second signal under the beacon.');
  view('orbit', { R: 104, cx: 430, dur: 0 });
  blip('other', { label: 'unknown source', at: [-1.52, 0.33], ch: 'other', tone: 'teal', dy: 22 });
  say('A', 'From inside the rings. Same 61 seconds, a beat behind.');
  say('P', 'It is echoing the beacon.');
  say('A', 'Or it has listened to it for eleven years.');
  say('V', 'Nobody transmits. No pings, no ranging. We listen.');
  log('day 413 · 19:20', 'Standing order: this ship does not transmit. Beacon 2 lies six days out. We leave orbit in the morning, after everyone has slept.');
  wait(1);

  /* Scene 4 */
  scene('Ship night');
  music('night');
  clock(413, '23:50'); status('ship night'); loc('orbit · Tau-9 c');
  view('night');
  move('V', 'crew a'); move('P', 'crew a'); move('H', 'crew b'); move('C', 'crew b'); move('A', 'crew b');
  note('The viewscreen dims. Okafor keeps the watch on the bridge. The captain goes to crew quarters A.');
  log('day 413 · 23:50', 'Quiet. All hands resting. I am turning in.');
  wait(2.5);
  mark('night');
  clock(414, '02:09'); labels(false);
  note('Privacy hours: the deck plan drops crew initials. No dialogue and no log from here to the end of the scene, only instruments.');
  wait(4);
  clock(414, '02:11');
  note('One dot leaves quarters A and one leaves quarters B. Both walk to cargo.');
  move('P', 'cargo', 5); move('C', 'cargo', 5);
  wait(5.5);
  clock(414, '02:12');
  note('The last dot in quarters A walks to the bridge. Quarters A is now empty.');
  move('V', 'bridge', 5);
  wait(5.5);
  clock(414, '02:13');
  wait(3);
  mark('tx');
  clock(414, '02:14');
  tx('tx 02:14 · internal');
  sig('other', { on: false });
  note('A red spike on the signal strip: a 0.8 second transmission from inside the ship. No alarm sounds. The teal trace goes flat.');
  wait(8);
  sig('other', { on: true, period: 0.7, offset: 0 });
  note('The teal signal returns, pulsing every 7 seconds.');
  wait(7);
  clock(414, '02:31');
  note('The three dots walk back to their quarters.');
  move('P', 'crew a', 5); move('C', 'crew b', 5); move('V', 'crew a', 5);
  wait(6.5);

  /* Scene 5 */
  scene('Morning');
  music('dread');
  clock(414, '07:00'); labels(true); status('transmission logged 02:14', 'red');
  view('orbit', { R: 104, cx: 430, dur: 0 });
  move('V', 'mess'); move('O', 'mess'); move('A', 'mess'); move('P', 'mess'); move('H', 'mess'); move('C', 'mess');
  note('The status line turns red. Six dots gather in the mess. Madrigal stays in the drive room.');
  wait(4.5);
  say('A', 'Outbound burst at 02:14. 0.8 seconds, from our own relay.');
  say('O', 'I had the watch. The board showed nothing.');
  say('H', 'And the other signal?');
  say('A', 'It stopped echoing. It pulses every seven seconds now.');
  wait(2.5);
  mark('seven');
  say('C', 'There are seven of us.');
  meter('morale', 38);
  wait(3);
  mark('redact');
  logOpen('day 414 · 07:30');
  logType('Someone aboard answered it. ');
  logType('Castellanos and Pell were in cargo at 02:14, beside the relay.');
  logErase();
  note('The captain deletes the sentence, character by character, and writes another.');
  logType('The source of the transmission is under review. I was asleep in my quarters.');
  wait(1);
  say('V', 'Set course for Beacon 2. If it counted us, it can count us leaving.');
  course(true);
  view('orbit', { R: 30, cx: 640, dur: 16 }); loc('departing Tau-9 · beacon 2 in 6 days');
  mapTo(4.3, 14);
  move('V', 'bridge'); move('O', 'bridge'); move('A', 'bridge'); move('P', 'lab'); move('H', 'med'); move('C', 'cargo');
  note('A dashed course line reaches for the next beacon. The planet falls away. The teal signal keeps its seven-second count.');
  wait(7);
  end({ next: 'dead astern', line: 'the signal keeps counting' });

  trailer({
    hook: 'The beacon should pulse every 60 seconds.',
    cuts: [
      { at: 'pulse', from: 6, dur: 7, caption: 'It pulses every 61.' },
      { at: 'entry2', from: 0, dur: 9, caption: 'Its memory explains why.' },
      { at: 'entry3', from: 0, dur: 4.5, caption: 'And it carries a warning.' },
      { at: 'tx', from: -3, dur: 7, caption: 'That night, someone answers.' },
      { at: 'seven', from: -1, dur: 5, caption: 'Now something is counting them.' }
    ]
  });
  thumb({ at: 'other', from: 14, big: '61', title: 'Sixty-one seconds', sub: 'the beacon is counting', R: 96 });
});
