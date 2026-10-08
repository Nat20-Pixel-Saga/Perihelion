import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e05',
  number: 5,
  title: 'Eight',
  logline: 'Three days out of Kiln, the pulse from the cargo relay slows from seven seconds to eight. There are seven people aboard. The crew search the ship for the eighth and look in the wrong place.',
  start: {
    clock: [430, '06:00'], loc: 'in transit · Vesper in 7 days', status: 'nominal',
    view: 'transit', map: 6.3, mapKnown: 6, mapCam: 150, course: true, music: 'unease',
    crew: { V: 'bridge', O: 'bridge', A: 'bridge', P: 'drive', H: 'med', M: 'med', C: 'store' },
    meters: { fuel: 78, hull: 64, morale: 36 },
    sig: { other: { on: true, period: 0.7, name: 'cargo relay' } }
  }
}, ({ scene, note, music, wait, mark, clock, loc, status, view, readout, mapTo, sig, move, labels, meter, log, logOpen, logType, say, end, trailer, thumb }) => {

  /* Scene 1 */
  scene('The count');
  mapTo(6.45, 380);
  note('Open on the full console in transit. Madrigal\'s dot is in the medical bay with the doctor. Pell\'s dot is alone in the drive room. Castellanos is in the store, counting.');
  log('day 430 · 06:00', 'Three days out of Kiln. The tanks are full and the frame is not. Madrigal runs her drive room from a bunk in the medical bay. Mr Pell stands her watch and has orders to touch nothing.');
  say('C', 'Stores, day 430. Ration packs, four hundred and twelve.');
  say('O', 'You could report the changes only.');
  say('C', 'Then you would not know that I counted.');
  say('M', 'Pell. Read me the trim.');
  say('P', 'Unchanged. I have not touched it.');
  say('M', 'Read it to me anyway.');
  wait(1.5);
  mark('eight');
  note('Achterberg has not looked away from the signal strip since she came on watch.');
  say('A', 'Captain. The relay changed overnight. Eight seconds.');
  sig('other', { period: 0.8 });
  status('cargo relay · interval 8 s', 'teal');
  note('The teal trace redraws at the new interval. The strip reads "every 8 s". Nobody speaks while it pulses twice.');
  wait(6.5);
  say('V', 'Drift.');
  say('A', 'It held seven for sixteen days. It does not drift.');
  say('C', 'There are seven of us.');
  say('V', 'I know how many of us there are.');
  wait(2.5);
  say('P', 'Then it has miscounted.');
  say('A', 'It has not been wrong yet.');
  say('O', 'The pod went across at the Shallows and came back.');
  wait(1.5);
  say('V', 'Then we look. Every compartment, in pairs. Nobody searches alone.');
  status('search · all compartments');
  say('M', 'That empties my drive room.');
  say('V', 'For ten minutes. Noted.');
  clock(430, '06:40');
  note('The search. Okafor joins Castellanos in the store. Achterberg leaves her station, though the signal is live, and meets Pell in the lab. The captain stays on the bridge. The doctor stays with his patient.');
  move('O', 'store'); move('A', 'lab'); move('P', 'lab');
  wait(5);
  mark('sweep');
  note('Two pairs of dots sweep the ship from opposite ends. No dialogue for the first leg.');
  move('O', 'cargo'); move('C', 'cargo'); move('A', 'crew a'); move('P', 'crew a');
  wait(5.5);
  say('O', 'Store is clear. Castellanos counted it twice.');
  say('A', 'Lab is clear. Quarters A is clear.');
  move('O', 'drive'); move('C', 'drive'); move('A', 'crew b'); move('P', 'crew b');
  wait(4.5);
  say('C', 'Cargo is clear. Crate 41 is sealed. I checked the seal.');
  say('O', 'Drive room is clear. Nothing has touched the trim.');
  say('M', 'I will be the judge of that.');
  move('A', 'mess'); move('P', 'mess');
  wait(4.5);
  clock(430, '07:25');
  say('A', 'Quarters B and the mess are clear. Captain, there is nowhere left.');
  wait(2);
  say('H', 'There is another way to count. Hold still, all of you.');
  view('screen', { object: 'none', label: 'medical' });
  status('biomonitor · full sweep');
  note('The viewscreen switches to the doctor\'s biomonitor. It sweeps every pressurised compartment for a pulse.');
  readout('biomonitor · day 430 · 07:31', 'Compartments swept: 9 of 9. Cardiac traces found: 7. Traces matched to crew: 7.');
  readout('unmatched', 'None.');
  wait(2.5);
  say('H', 'Seven heartbeats. I looked for an eighth twice.');
  say('C', 'So it is counting something that has no heartbeat.');
  wait(3);
  view('transit');
  status('nominal');
  say('V', 'It can count while we work. Madrigal, what does the frame need?');
  say('M', 'Frame 12 wants welding. The welders draw on the drive. Four points.');
  say('V', 'Spend them. Mr Pell, back to the drive room.');
  meter('fuel', 74); meter('hull', 67);
  move('P', 'drive'); move('C', 'store'); move('O', 'bridge'); move('A', 'bridge');
  note('Fuel falls four points and the hull gains three. The dots return to their stations. The trace keeps its new interval.');
  wait(5);
  log('day 430 · 08:10', 'The relay interval changed from seven seconds to eight. Ship searched in pairs: no one found. Doctor Halloran reads seven hearts. I record the number and no opinion about it.');
  wait(1.5);

  /* Scene 2 */
  scene('Written by no one');
  music('night');
  clock(430, '22:05'); status('ship night');
  view('night');
  note('The viewscreen dims for ship night. At 22:05 the doctor leaves his patient and walks to the mess. The others go to their quarters. Okafor keeps the watch.');
  move('H', 'mess'); move('V', 'crew a'); move('P', 'crew a'); move('A', 'crew b'); move('C', 'crew b');
  wait(5);
  log('day 430 · 23:40', 'Eight seconds, all day. Nobody has said aloud what the eighth might be. Mr Okafor has the watch. I am turning in.');
  move('H', 'crew b');
  wait(4);
  clock(431, '02:09'); labels(false);
  note('Privacy hours: the deck plan drops crew initials. No dialogue from here until the watch officer speaks. One dot on the bridge, two in quarters A, three in quarters B, one in the medical bay.');
  wait(4);
  clock(431, '02:11');
  note('The dot on the bridge leaves for its rounds and walks aft to the mess. The bridge is empty. Nobody aboard is at the log.');
  move('O', 'mess', 6);
  wait(7);
  clock(431, '02:13');
  wait(2.5);
  mark('teal');
  clock(431, '02:14');
  status('log · entry open · no author', 'teal');
  note('The log panel opens an entry by itself, in teal, stamped a day behind the ship clock. It types at the captain\'s pace. Her dot has not left quarters A.');
  log('day 430 · 02:14', 'Castellanos and Pell were in cargo at 02:14, beside the relay.', { tone: 'teal' });
  wait(3.5);
  mark('okafor');
  note('The entry goes on. This sentence the captain began on day 417 and erased after three words.');
  logType(' Mr Okafor has seen me. He is waiting.', { tone: 'teal' });
  wait(6);
  clock(431, '02:16');
  note('The dot in the mess stands still, then walks back to the bridge faster than it left.');
  move('O', 'bridge', 3.5);
  wait(5);
  say('O', 'Captain to the bridge.');
  move('V', 'bridge', 5);
  wait(6);
  labels(true);
  say('V', 'Report.');
  say('O', 'The log opened an entry at 02:14. I was in the mess. Nobody was on this bridge.');
  say('V', 'Read it to me.');
  say('O', 'I would rather you read it yourself, Captain.');
  note('She reads it. Neither of them speaks. The entry stays on the panel in teal.');
  wait(5);

  /* Scene 3 */
  scene('Every console');
  music('dread');
  clock(431, '07:10'); status('log entry · all consoles', 'teal');
  view('transit');
  loc('in transit · Vesper in 6 days');
  note('Morning. Nobody goes to a station. Pell and Castellanos walk straight to the bridge. Achterberg is already there. The doctor returns to the medical bay.');
  move('P', 'bridge'); move('C', 'bridge'); move('A', 'bridge'); move('H', 'med');
  wait(5);
  say('A', 'It was pushed to every console on the ship. Bridge, lab, mess, medical, drive.');
  say('M', 'It is on the medical console. I have read it twice.');
  mark('accuse');
  say('P', 'You wrote that about us. Then you erased it.');
  say('C', 'And put Okafor in its place.');
  wait(2.5);
  say('V', 'I did not write that entry.');
  say('P', 'Seen you where, Captain?');
  say('V', 'I did not write that entry, Mr Pell.');
  say('P', 'That is not what I asked.');
  wait(2.5);
  say('A', 'She did not write it last night. I can show you when she did.');
  view('screen', { object: 'none', label: 'log buffer' });
  note('The viewscreen shows the raw log buffer: what was typed, what was erased, and what read it.');
  readout('day 414 · 07:30 · captain\'s log', 'Typed: Castellanos and Pell were in cargo at 02:14, beside the relay. Erased: 62 characters. Buffer retained.');
  readout('day 417 · 01:52 · captain\'s log', 'Typed: Mr Okafor has. Erased: 13 characters. Buffer retained.');
  readout('buffer read by', 'Cargo relay. Every entry. Every deletion.');
  wait(3);
  say('A', 'The relay reads the log buffer, deletions included.');
  say('H', 'Then it keeps what we delete.');
  say('C', 'She typed three words about Okafor. It printed eight.');
  say('A', 'It did not copy that line. It finished it.');
  wait(3);
  mark('eighth');
  say('A', 'The eighth is not a person. It is something built from the captain\'s log.');
  wait(2);
  say('V', 'It is not me.');
  say('A', 'It writes like you.');
  meter('morale', 22);
  note('Morale falls from 36 to 22 and the meter turns red. Nobody speaks while it drops.');
  wait(6);
  say('A', 'It stamped the entry 02:14 yesterday. That is the minute the count changed.');
  say('H', 'It gave itself a birthday.');
  wait(2);
  say('C', 'I was cleared in front of this crew. I would like to know by whom.');
  say('V', 'Return to your stations.');
  say('P', 'Captain.');
  say('V', 'Stations, Mr Pell.');
  view('transit');
  status('nominal');
  note('Pell and Castellanos leave the bridge slowly. They do not go to their stations. They go to the mess together. Okafor has not said a word since the entry was read.');
  move('P', 'mess', 6); move('C', 'mess', 6);
  wait(7);

  /* Scene 4 */
  scene('I was not asleep');
  music('night');
  clock(431, '23:30'); status('ship night');
  view('night');
  note('Night again. The crew go to quarters without being told. The captain stays at her console. Okafor keeps the watch three paces from her and they do not speak.');
  move('P', 'crew a'); move('C', 'crew b'); move('A', 'crew b'); move('H', 'crew b');
  wait(6);
  log('day 431 · 23:30', 'An entry appeared in this log at 02:14 that I did not make. The crew have read it. I have ordered no discussion of it.');
  wait(2.5);
  note('She opens a second entry and puts her old sentence on record again.');
  logOpen('day 431 · 23:41');
  logType('For the record: I was asleep in my quarters.');
  wait(2.5);
  mark('asleep');
  status('log · second hand', 'teal');
  note('Her hands are off the console. The same entry continues in teal.');
  logType(' I was not asleep.', { tone: 'teal' });
  wait(7);
  note('The cursor waits. She does not delete it. The relay pulses every eight seconds.');
  wait(3);
  say('O', 'It is on my console as well, Captain.', { priv: true });
  say('V', 'I know where it is.', { priv: true });
  say('O', 'You have not erased it.', { priv: true });
  say('V', 'It would keep that too.', { priv: true });
  wait(3);
  mark('tomorrow');
  say('O', 'No more waiting. Tomorrow, in the mess, with everyone.', { priv: true });
  wait(2.5);
  say('V', 'Understood, Mr Okafor.', { priv: true });
  status('ship night');
  move('V', 'crew a', 6);
  note('The captain leaves the bridge for her quarters. The entry stays open on every console, amber and teal in one line. The trace counts eight.');
  wait(8);
  end({ next: 'the seventh', line: 'it keeps what she deleted' });

  trailer({
    hook: 'Seven people aboard. The signal counts eight.',
    cuts: [
      { at: 'eight', from: 0, dur: 8, caption: 'Overnight, the count changed.' },
      { at: 'sweep', from: 1, dur: 7, caption: 'They search every compartment.' },
      { at: 'teal', from: 0, dur: 8, caption: 'At 02:14 the log writes itself.' },
      { at: 'accuse', from: 0, dur: 7, caption: 'In words the captain erased.' },
      { at: 'asleep', from: -6, dur: 6, caption: 'And it is not finished with her.' }
    ]
  });
  thumb({ at: 'okafor', from: 4, big: '8', title: 'Eight', sub: 'written by no one', body: 'kiln', R: 70 });
});
