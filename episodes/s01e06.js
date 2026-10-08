import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e06',
  number: 6,
  title: 'The seventh',
  logline: 'The first officer calls a vote of confidence in the captain. Before anyone walks, she has to account for one night, and for eight tenths of a second.',
  start: {
    clock: [432, '08:00'], loc: 'in transit · Vesper in 5 days', status: 'all hands · mess',
    view: 'transit', map: 6.5, mapKnown: 6, mapCam: 150, course: true, music: 'dread',
    crew: { V: 'mess', O: 'mess', A: 'mess', P: 'mess', H: 'mess', C: 'mess', M: 'med' },
    meters: { fuel: 74, hull: 67, morale: 22 },
    sig: { other: { on: true, period: 0.8, name: 'cargo relay' } }
  }
}, ({ scene, note, music, wait, mark, clock, status, view, readout, mapTo, sig, move, tag, meter, log, logOpen, logType, logMode, say, end, trailer, thumb }) => {

  /* Scene 1 */
  scene('Article nine');
  mapTo(6.58, 300);
  note('Open on the deck plan. Six dots in the mess, one in medical. The bridge, the lab and the drive room are empty. The relay pulses every eight seconds.');
  log('day 432 · 07:55', 'All hands in the mess at 08:00, at Mr Okafor\'s request. The bridge is on automatic. I know what he is going to ask. I have not asked him to wait.');
  wait(1);
  say('O', 'All hands. Madrigal, do you have us in medical?');
  say('M', 'I have you. And a view of the ceiling.');
  wait(1);
  mark('article');
  say('O', 'Under article nine I am calling a vote of confidence in the captain.');
  status('article nine · invoked');
  wait(2);
  say('C', 'Article nine needs a second.');
  wait(1);
  say('P', 'Seconded.');
  wait(1.5);
  say('O', 'Before anyone votes. Captain, account for 02:14 on day 414.');
  say('V', 'You are entitled to that. All of you.');
  wait(2);
  note('The captain gives her account standing. She does not raise her voice and she does not hurry.');
  say('V', 'My brother is Dominik Varga. Hydrologist, DSV Aphelion.');
  wait(1.5);
  say('H', 'You never said you had anyone aboard her.');
  say('V', 'No. I did not.');
  wait(1);
  say('V', 'Beacon 1 said three were gone. It did not say which three.');
  say('V', 'At 02:14 I sent a roster query through the relay. Eight tenths of a second.');
  wait(1.5);
  mark('asked');
  say('V', 'I asked a machine if my brother was alive.');
  wait(3);
  say('P', 'Did it answer?');
  say('V', 'The beacon did not. Something else did.');
  note('Nobody speaks. On the signal strip the teal trace crosses once, and eight seconds later crosses again. It is the answer she got.');
  wait(6.5);
  say('A', 'Did it tell you if he is among them?');
  say('V', 'It told me seven. Nothing else.');
  wait(1.5);
  say('C', 'And the log.');
  say('V', 'I logged that I was asleep in my quarters. That was a lie.');
  say('V', 'Mr Pell. Ms Castellanos. I wrote that you were beside the relay. Then I erased it and let the doubt stand.');
  say('P', 'You held an inquiry. You sat at the head of this table.');
  say('V', 'I did.');
  wait(1.5);
  say('V', 'Then I let it rest on Mr Okafor. Eighteen days. He knew the truth and he carried it for me.');
  say('O', 'I chose to. I should not have been asked to.');
  wait(1.5);
  say('H', 'Why not tell us the first morning?');
  say('V', 'I had given the order not to transmit. I broke it in six hours.');
  wait(2);
  say('V', 'That is the account. I have no defence to add to it.');
  say('O', 'Then it is on record.');
  wait(2);

  /* Scene 2 */
  scene('Madrigal\'s list');
  music('unease');
  clock(432, '08:40'); status('article nine · statements');
  note('Madrigal speaks from her bed in medical. Her dot has not been in the drive room for six days. Nobody else is in it either.');
  say('M', 'Before anyone walks anywhere. I have a list.');
  say('O', 'Go ahead, Madrigal.');
  view('screen', { object: 'none', label: 'drive room log' });
  note('The viewscreen switches to the drive room log. Her objections print as she reads them, each with its date.');
  wait(1);
  readout('day 412 · approach to Tau-9', 'Engineer requests slower approach. Granted.');
  say('M', 'Day 412. I asked for a slower approach. She granted it.');
  readout('day 413 · close orbit, Tau-9 c', 'Cost seven points of fuel. Objection noted. Overruled.');
  say('M', 'Day 413. Seven points of fuel. Noted. We read the beacon.');
  readout('day 420 · debris, the Shallows', 'Cost three points of fuel. Objection noted. Overruled.');
  say('M', 'Day 420. The debris. Noted. We found the shuttle.');
  mark('list');
  readout('day 426 · blind skim, Kiln', 'Flown on drive pressure alone. Objection noted, twice. Overruled.');
  say('M', 'Day 426. The blind skim. Noted twice. The tanks are full.');
  wait(1);
  say('H', 'And you are in my medical bay.');
  say('M', 'The tanks are full, Doctor.');
  note('Hold on the four entries. Three of them end in the same word.');
  wait(4.5);
  say('M', 'Four notes. She was right to overrule me three times. I want that noted as well.');
  wait(1.5);
  say('V', 'Noted.');
  wait(2);
  view('transit');
  say('P', 'Nobody says she cannot command the ship.');
  say('C', 'We say she lied to it.');
  wait(1.5);
  log('day 432 · 08:55', 'Madrigal has read her objections into the record from the medical bay. Four. I had remembered three.');
  wait(2);

  /* Scene 3 */
  scene('The vote');
  music('silence');
  clock(432, '09:10'); status('article nine · vote');
  say('O', 'The vote is by standing. To retain, stay in the mess. To relieve, walk to cargo.');
  tag('mess', 'retain'); tag('cargo', 'relieve');
  say('H', 'Why cargo?');
  say('O', 'It is where the relay is.');
  wait(1.5);
  say('V', 'I do not vote. I will be on the bridge. Somebody should be.');
  move('V', 'bridge', 5);
  note('The captain walks out of the mess alone and takes the empty bridge. Five dots are left to decide. The sixth is in medical.');
  wait(5.5);
  say('O', 'Relieve. I kept her silence for eighteen days. It was never mine to keep.');
  move('O', 'cargo', 5);
  wait(5.5);
  tag('cargo', 'relieve 1');
  wait(2);
  say('P', 'Relieve. She opened an inquiry into herself and let me sit in it.');
  move('P', 'cargo', 5);
  wait(5.5);
  tag('cargo', 'relieve 2');
  note('Two dots in cargo, beside the relay. Three in the mess. Nobody has yet said the word retain.');
  wait(3);
  say('A', 'Retain. I have wanted to answer it since Tau-9. She only did it first.');
  tag('mess', 'retain 1');
  wait(3);
  say('H', 'Retain. I know what a person will do to hear one voice again.');
  tag('mess', 'retain 2');
  wait(3);
  note('Castellanos has not moved. She looks at the two rooms the way she looks at a shelf.');
  say('C', 'Two and two. I counted.');
  wait(3);
  say('C', 'Relieve. I can forgive the query. I cannot count on a log that changes.');
  move('C', 'cargo', 6);
  wait(6.5);
  mark('three');
  tag('cargo', 'relieve 3');
  note('Hold on the deck plan. Three dots in cargo, two in the mess, one on the bridge, one in medical. No dialogue.');
  wait(6);
  say('O', 'Three to relieve. Two to retain. Madrigal, you are the last.');
  wait(1.5);
  say('M', 'I cannot walk to either room.');
  say('O', 'Your word will do.');
  wait(3.5);
  mark('seventh');
  say('M', 'Retain. On one condition.');
  tag('mess', 'retain 3');
  wait(3);
  say('P', 'That is three and three.');
  say('O', 'Article nine. A tie keeps the captain.');
  status('article nine · tie · retained');
  wait(2);
  say('C', 'The condition, Madrigal.');
  say('M', 'The log is open. Every console, every hand. And nothing in it is erased again.');
  say('M', 'If she writes it, it stays written. Note that.');
  wait(1.5);
  say('O', 'Captain. Do you accept?');
  wait(2);
  say('V', 'I accept. Open it.');
  mark('open');
  logMode('open');
  meter('morale', 30);
  note('The log panel gains a line it will carry for the rest of the season: open, no erase.');
  wait(3);
  say('A', 'It reads what we delete. Now there is nothing to read.');
  wait(2);

  /* Scene 4 */
  scene('Open log');
  music('resolve');
  clock(432, '10:30'); status('nominal');
  tag('mess'); tag('cargo');
  move('A', 'bridge'); move('H', 'med'); move('P', 'drive'); move('C', 'store');
  note('The tags come off the rooms. The crew go back to work. Okafor stays in cargo a while, beside the relay.');
  wait(3.5);
  logOpen('day 432 · 10:30');
  logType('I sent the transmission. ');
  wait(1);
  logType('My brother is Dominik Varga. ');
  wait(1);
  logType('I do not know if he is alive. ');
  note('The cursor waits at the end of the sentence. This is where she used to erase. She goes on.');
  wait(3);
  mark('entry');
  logType('I have stopped pretending I am not looking for him.');
  note('Every console on the ship shows the entry as she types it. The last time that happened, the text was teal. No teal text answers now.');
  wait(6.5);
  say('A', 'It is still eight.');
  say('V', 'Let it count.');
  wait(2);
  clock(432, '15:20');
  say('C', 'Frame 12 is patched. Pell held the plate. I counted the welds.');
  meter('hull', 69);
  wait(1.5);
  note('Okafor leaves cargo and walks the length of the ship to the bridge. He stops beside the captain, where he always stands.');
  move('O', 'bridge', 6);
  wait(6.5);
  say('O', 'Course, Captain?');
  wait(1);
  mark('course');
  say('V', 'Vesper.');
  meter('fuel', 71);
  status('trim burn · course Vesper');
  wait(2);
  say('V', 'You voted to relieve me, Mr Okafor.');
  say('O', 'I did. It is in the log.');
  say('V', 'Good.');
  meter('morale', 41);
  status('nominal');
  wait(2);
  log('day 432 · 21:50', 'Article nine: three to retain, three to relieve. I keep the command by a tie and a condition. Both are fair. Mr Okafor has the watch.');
  wait(1.5);
  clock(432, '22:05');
  move('H', 'mess');
  note('At 22:05 the doctor walks to the mess, alone. The relay keeps its count of eight. Nothing on the ship is hidden tonight except what he carries on the second tray.');
  wait(6);
  end({ next: 'what we deleted', line: 'open, no erase' });

  trailer({
    hook: 'The crew will vote on their captain.',
    cuts: [
      { at: 'article', from: -1, dur: 7, caption: 'Article nine.' },
      { at: 'asked', from: -1, dur: 7, caption: 'First, she must account for 02:14.' },
      { at: 'list', from: -2, dur: 7, caption: 'Every objection was noted.' },
      { at: 'three', from: -5, dur: 8, caption: 'They vote by walking.' },
      { at: 'seventh', from: -2, dur: 8, caption: 'The seventh vote decides.' }
    ]
  });
  thumb({ at: 'seventh', from: 2, big: '3-3', title: 'The seventh', sub: 'the seventh vote decides', body: 'vesper', R: 60 });
});
