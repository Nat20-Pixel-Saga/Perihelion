import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e02',
  number: 2,
  title: 'Dead astern',
  logline: 'Two days out from the first beacon, the captain opens an inquiry into the transmission nobody admits to sending. The signal that answered it has not fallen behind.',
  start: {
    clock: [415, '09:00'], loc: 'in transit · beacon 2 in 5 days', status: 'inquiry · tx 02:14',
    view: 'transit', map: 4.3, mapKnown: 4, mapCam: 0, course: true, music: 'unease',
    crew: { V: 'bridge', O: 'bridge', A: 'bridge', P: 'lab', H: 'med', C: 'cargo', M: 'drive' },
    meters: { fuel: 55, hull: 91, morale: 38 },
    sig: { other: { on: true, period: 0.7, name: 'unknown source' } }
  }
}, ({ scene, note, music, wait, mark, clock, loc, status, view, readout, mapTo, mapCam, sig, move, labels, meter, log, logOpen, logType, logErase, say, end, trailer, thumb }) => {

  /* Scene 1 */
  scene('Inquiry');
  mapTo(4.36, 80);
  note('Open on the full console in transit. Stars streak. On the signal strip the teal trace pulses every 7 seconds, as it has since 02:14 the night before last.');
  log('day 415 · 09:00', 'I am opening a formal inquiry into the transmission of day 414, 02:14. Eight tenths of a second, outbound, against a standing order. All hands will give an account.');
  say('V', 'All hands to the mess. Madrigal, join by comms.');
  say('M', 'Already listening, Captain.');
  move('V', 'mess'); move('O', 'mess'); move('A', 'mess'); move('P', 'mess'); move('H', 'mess'); move('C', 'mess');
  note('Six dots leave their stations and gather in the mess. The bridge stands empty. Madrigal stays in the drive room. Nobody speaks while they walk.');
  wait(5);
  say('V', 'This is on the record. Achterberg, what do we know?');
  say('A', 'The burst left through the cargo relay. That is the only antenna aboard with the reach.');
  say('H', 'Could it have fired by itself?');
  say('A', 'No, Doctor. Somebody keyed it.');
  wait(1.5);
  say('V', 'Mr Okafor. The door log.');
  say('O', 'Cargo opened at 02:11. Two badges.');
  wait(2.5);
  say('O', 'Pell. Castellanos.');
  mark('badges');
  meter('morale', 34);
  note('Morale drops four points. For several seconds nothing moves in the mess, and the strip counts seven.');
  wait(5.5);
  say('P', 'We were not transmitting.');
  say('C', 'We were moving a crate.');
  say('H', 'At two in the morning.');
  say('C', 'It was a heavy crate, Doctor.');
  say('V', 'What is in it?');
  wait(4);
  note('Neither of them answers. Pell looks at Castellanos. Castellanos looks at the table.');
  say('M', 'I am in the drive room and I can hear that silence.');
  say('V', 'Then we will go and look at it. 14:00, in cargo. Until then, stations.');
  log('day 415 · 09:40', 'Inquiry adjourned to 14:00. Two badges, one crate, no contents offered. Cargo will be inspected.');
  move('O', 'bridge'); move('A', 'bridge'); move('V', 'bridge'); move('P', 'lab'); move('H', 'med'); move('C', 'cargo');
  wait(4.5);

  /* Scene 2 */
  scene('Crate 41');
  music('dread');
  clock(415, '14:00'); status('inspection · cargo');
  mapTo(4.39, 90);
  note('The captain and the first officer walk aft from the bridge. Pell comes from the lab. Castellanos is already in cargo, where she has been since the mess. Achterberg keeps her station.');
  move('V', 'cargo', 6); move('O', 'cargo', 6); move('P', 'cargo', 5);
  wait(6.5);
  say('V', 'Achterberg, put the manifest on the main screen.');
  view('screen', { object: 'none', label: 'manifest' });
  readout('hold 2 · declared', 'Crates 1 to 40. Stores, spares, rations. Counted day 415, 06:00. Castellanos, M.');
  wait(1);
  mark('crate');
  readout('hold 2 · deck scale', 'Crate 41. Not on the manifest. 212 kg. Sealed. No customs mark.', { tone: 'red' });
  note('The second block prints in red. Forty crates were declared. The deck scale has been weighing forty-one since launch.');
  wait(5.5);
  say('O', 'Two hundred and twelve kilograms of nothing.');
  say('V', 'Mr Pell.');
  wait(2);
  say('P', 'It is a listening probe. Passive. I brought it aboard against regulations.');
  say('P', 'It only listens. I wanted a recording before you ordered us away.');
  say('V', 'And you, Quartermaster?');
  say('C', 'I count everything on this ship. I chose not to count that.');
  wait(2.5);
  say('A', 'Captain. Bridge. The crate is not your answer.');
  say('A', 'I have the relay trace. The burst was keyed from a command console. Cargo has none.');
  mark('consoles');
  meter('morale', 31);
  wait(2);
  say('H', 'How many command consoles are there?');
  say('A', 'Two. The bridge, and the captain\'s desk.');
  note('Morale falls to 31. Four dots stand in cargo beside the relay. Nobody moves for six seconds.');
  wait(6);
  say('O', 'I had the watch. I sent nothing.');
  wait(2);
  say('V', 'Nobody has said that you did, Mr Okafor.');
  say('O', 'No, Captain. Nobody has.');
  wait(2.5);
  note('The captain does not say where she was. She lets the question stay on the bridge, with him.');
  say('V', 'Pell, Castellanos, you are cleared. The crate stays sealed, and it stays here.');
  say('C', 'I will add it to the count.');
  view('transit');
  status('nominal');
  log('day 415 · 14:50', 'Pell and Castellanos are cleared. The transmission was keyed from a command console. I have asked Mr Okafor to account for his watch.');
  move('V', 'bridge', 5); move('O', 'bridge', 6); move('P', 'lab', 5);
  note('Okafor walks back to the bridge a little behind the captain. The crate stays in cargo, sealed, with Castellanos.');
  wait(6.5);

  /* Scene 3 */
  scene('Bearing 180');
  music('night');
  clock(416, '03:00'); loc('in transit · beacon 2 in 4 days'); status('ship night');
  view('night');
  mapTo(4.47, 120);
  move('V', 'crew a', 0); move('P', 'crew a', 0); move('H', 'crew b', 0); move('C', 'crew b', 0);
  labels(false);
  note('Ship night, privacy hours: the deck plan drops its initials. Two dots on the bridge, four in quarters, one in the drive room. The teal trace keeps its count. Hold on it.');
  wait(6);
  say('A', 'Mr Okafor. Look at the strip.');
  say('O', 'Seven seconds. It has been seven for two days.');
  say('A', 'We are two days from Tau-9 and it has not faded at all. I took a bearing.');
  view('screen', { object: 'none', label: 'bearing' });
  status('contact · bearing 180', 'teal');
  readout('unknown source · passive bearing', 'Day 414: 180. Day 415: 180. Day 416: 180. Range: no solution.', { tone: 'teal' });
  note('The status line turns teal. Three bearings in two days, all the same: dead astern.');
  wait(3);
  say('O', 'Dead astern, constant. It is following us.');
  say('A', 'Madrigal, aft sensors?');
  say('M', 'Nothing behind us but where we have been.');
  wait(1.5);
  say('O', 'Wake the captain.');
  note('One dot leaves quarters A and walks forward to the bridge. The initials come back on with her.');
  move('V', 'bridge', 5);
  wait(5.5);
  labels(true);
  say('V', 'Report.');
  say('A', 'The contact holds bearing 180. I want to turn the ship and see if it stays there.');
  say('M', 'Thirty degrees off the line and back is three points of fuel. Note my objection.');
  say('V', 'Noted. Mr Okafor, come thirty degrees to starboard.');
  mark('turn');
  status('turning · 30 degrees starboard');
  meter('fuel', 52, 6.5);
  note('The fuel meter runs down three points as the ship swings. No dialogue. Everyone on the bridge watches the bearing.');
  wait(7);
  readout('after turn · heading +30', 'Bearing: 180. Dead astern.', { tone: 'teal' });
  status('contact · bearing 180', 'teal');
  wait(3.5);
  say('O', 'It turned with us.');
  say('A', 'No. Nothing turns that fast. It did not move at all.');
  wait(2);
  say('A', 'Permission to leave my station, Captain.');
  say('V', 'Granted.');
  note('Achterberg does not leave her station while a signal is live. She leaves it now, with a handheld receiver, and walks the length of the ship to cargo. The strip pulses twice while she walks.');
  move('A', 'cargo', 8);
  view('night');
  wait(9);
  mark('relay');
  say('A', 'Achterberg, in cargo. The handheld is reading it at arm\'s length.');
  say('A', 'It is the relay. Our own relay is pulsing.');
  sig('other', { name: 'cargo relay' });
  status('source · cargo relay', 'teal');
  note('On the signal strip the teal source is renamed: cargo relay. The bearing was dead astern because the cargo bay is.');
  wait(6);
  say('A', 'It is not sending, Captain. It is keeping time. Every seven seconds, one for each of us.');
  say('V', 'Madrigal. Can it be pulled?');
  say('M', 'Four bolts. Pull it and nobody at home ever hears from us again.');
  wait(3);
  say('V', 'It stays where it is.');
  say('M', 'For once I have no objection.');
  say('V', 'Resume course, Mr Okafor. Achterberg, back to your station.');
  status('ship night');
  move('A', 'bridge', 8);
  log('day 416 · 03:50', 'The unknown source is our own cargo relay, pulsing every seven seconds. It is also our only voice home. I have left it in place.');
  wait(2);

  /* Scene 4 */
  scene('The watch');
  music('silence');
  clock(417, '01:30'); loc('in transit · beacon 2 in 3 days'); status('ship night');
  view('night');
  mapTo(4.58, 100); mapCam(40, 60);
  move('A', 'crew b', 0); move('V', 'crew a', 0);
  labels(false);
  meter('morale', 33);
  note('A quiet day has passed. The crew know where the pulse comes from now, and a known thing is easier to sleep beside: morale 33. Privacy hours again. One dot keeps the watch on the bridge.');
  wait(5);
  note('A second dot leaves quarters A and walks to the bridge, the same walk as two nights ago. Nothing else on the ship moves.');
  move('V', 'bridge', 6);
  wait(7.5);
  say('O', 'Captain. You are not due until six.');
  say('V', 'I could not sleep, Mr Okafor.');
  wait(2);
  say('O', 'Private channel, if you will allow it.');
  say('V', 'Go ahead.', { priv: true });
  wait(1.5);
  mark('watch');
  say('O', 'I saw you come onto the bridge at 02:12.', { priv: true });
  wait(4);
  say('O', 'You logged that you were asleep. I logged a quiet board.', { priv: true });
  wait(3);
  say('O', 'I have said nothing. I will go on saying nothing for a while. Tell me why.', { priv: true });
  note('The two dots stand a console apart. The strip pulses once, twice, before she answers.');
  wait(6);
  say('V', 'Not yet.', { priv: true });
  wait(3);
  say('O', 'Then I will ask again at Beacon 2.', { priv: true });
  wait(2.5);
  say('O', 'I have the watch, Captain. Get some sleep.');
  note('She does not leave. She opens the log at the bridge console, with Okafor three metres away.');
  wait(2);
  logOpen('day 417 · 01:50');
  logType('Mr Okafor has');
  mark('erase');
  wait(2.5);
  logErase();
  note('She stops after three words, deletes them, and writes the entry she wants on record.');
  wait(1);
  logType('Nothing further to report.');
  wait(3);
  note('The captain walks back to quarters A. Okafor keeps the watch alone. Behind them both, in the cargo bay, the relay counts to seven.');
  move('V', 'crew a', 6);
  wait(7);
  end({ next: 'three empty suits', line: 'it is still counting' });

  trailer({
    hook: 'Someone on this ship answered it.',
    cuts: [
      { at: 'badges', from: -6, dur: 7, caption: 'The captain opens an inquiry.' },
      { at: 'crate', from: 0, dur: 7, caption: 'There is a crate nobody counted.' },
      { at: 'turn', from: 6, dur: 8, caption: 'The signal has followed them. Dead astern.' },
      { at: 'relay', from: 3, dur: 8, caption: 'It is not behind the ship.' },
      { at: 'watch', from: -0.5, dur: 7, caption: 'And one man knows who sent it.' }
    ]
  });
  thumb({ at: 'relay', from: 8, big: '7', title: 'Dead astern', sub: 'it is still counting', body: 'tau9', R: 60 });
});
