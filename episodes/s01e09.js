import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e09',
  number: 9,
  title: 'The Register',
  logline: 'The Perihelion reaches the source of the signal. It is not a ship and it is not a star. Sixty-three voices are waiting there, and one of them knows the captain by her first name.',
  start: {
    clock: [443, '02:00'], loc: 'approach · source of the signal', status: 'nominal',
    view: 'orbit', viewOpts: { body: 'register', R: 24, cx: 480, nodes: 63 },
    map: 8.6, mapKnown: 9, mapCam: 300, course: true, logMode: 'open', music: 'wonder',
    crew: { V: 'bridge', O: 'bridge', A: 'bridge', B: 'bridge', P: 'lab', H: 'med', C: 'cargo', M: 'drive' },
    meters: { fuel: 58, hull: 72, morale: 44 },
    sig: { other: { on: true, period: 0.9, name: 'cargo relay' } }
  }
}, ({ scene, note, music, wait, mark, clock, loc, status, theme, view, readout, mapTo, course, sig, move, meter, log, say, end, trailer, thumb }) => {

  /* Scene 1 */
  scene('Sixty-three');
  note('Open on the full console. A small pale lattice hangs right of centre on the viewscreen. Four dots on the bridge, one of them Brandt. The teal trace on the signal strip pulses every nine seconds.');
  view('orbit', { body: 'register', nodes: 63, R: 120, cx: 400, dur: 40 });
  mapTo(9, 36);
  log('day 443 · 02:00', 'Two days out from the Aphelion. Commander Brandt has not slept and neither have I. The source lies ahead. It does not behave like a star.');
  say('O', 'Captain. It resolves at this range. It is not a body.');
  say('A', 'It is built.');
  wait(2);
  say('P', 'Pell, in the lab. Permission to see it from the bridge.');
  say('V', 'Come up, Mr Pell.');
  move('P', 'bridge');
  note('Pell leaves the lab for the bridge. The lattice keeps growing. Nobody speaks while he walks.');
  wait(5);
  say('P', 'A lattice. No drive, no lights, almost no heat.');
  wait(1.5);
  mark('chorus');
  sig('beacon', { on: true, period: 0.2, label: 'the Register · 63 voices' });
  note('The beacon channel, silent since the Aphelion, fills with a dense amber chorus. Under it the cargo relay keeps its slow count of nine. No dialogue for six seconds.');
  wait(6.5);
  say('A', 'Captain. The beacon channel is full.');
  say('A', 'Sixty-three sources. One structure.');
  say('C', 'Sixty-three from cargo as well. I counted twice.');
  wait(2.5);
  mark('brandt');
  say('B', 'There it is. It is smaller than I imagined.');
  say('B', 'Everything is, after nine years.');
  wait(2.5);
  say('M', 'Holding here costs three points. Note that I would hold further off.');
  say('V', 'Noted. We hold here.');
  meter('fuel', 55);
  course(false);
  loc('holding · the Register'); status('holding · no transmission');
  clock(443, '02:14');
  note('The ship marker sits on the last node of the star map. The ship clock reads 02:14.');
  wait(2);
  say('O', 'It is 02:14, Captain.');
  say('V', 'I had noticed.');
  wait(1);
  log('day 443 · 02:14', 'Holding off a structure Brandt calls the Register. Sixty-three sources, one for every sealed cabin on the Aphelion. The relay in my cargo bay still counts nine. The order stands: this ship does not transmit.');
  wait(2);

  /* Scene 2 */
  scene('The kept');
  music('unease');
  clock(443, '02:20'); status('incoming · all hands', 'teal');
  view('screen', { object: 'register', label: 'incoming', caption: 'the Register · 63 voices' });
  note('The viewscreen switches to a readout. Nobody asked for it.');
  wait(1.5);
  readout('incoming · no carrier', 'You have come a long way with our count in your hold. You need not send. We hear the ship.', { tone: 'teal' });
  readout('addressed to all hands', 'Come and be counted.', { tone: 'teal' });
  wait(3);
  say('A', 'We sent nothing. It is reading our comms off the relay buffer.');
  say('V', 'Then it has heard every word since Tau-9.');
  say('A', 'Yes, Captain. Permission to ask it one thing, aloud.');
  say('V', 'One.');
  say('A', 'What are you?');
  wait(1.5);
  say('R', 'A register. We count what answers. We keep what is counted.');
  wait(2.5);
  say('P', 'Who built you?');
  say('R', 'They are gone. The count of them is kept.');
  say('V', 'That was two, Mr Pell.');
  wait(2);
  view('orbit', { body: 'register', nodes: 63, R: 120, cx: 400, dur: 0 });
  status('contact · the kept', 'teal');
  mark('kept');
  note('The lattice returns to the viewscreen, large and still. The voices that follow arrive on ordinary ship comms, in teal.');
  wait(3);
  say('K', 'We are well.');
  wait(1.5);
  say('K', 'We were not taken.');
  wait(2.5);
  say('B', 'That is Lindqvist. That is her voice.');
  say('K', 'Commander. You kept the count honest. Thank you.');
  say('B', 'Do not thank me. I was counting you out.');
  wait(2.5);
  mark('brother');
  say('D', 'Ilse. All this way with my name in your mouth, and you said it aloud once.');
  note('The captain does not answer. Her dot does not move. Five seconds of chorus and the nine-second pulse.');
  wait(5);
  say('V', 'Dominik.');
  say('D', 'The quarry pond. I held my breath and you counted. You skipped the forties so that I would win.');
  say('V', 'You never knew that.');
  say('D', 'I knew. I wrote it in a letter in year two. Then I deleted it.');
  wait(3);
  say('V', 'Are you him?');
  wait(1.5);
  mark('less');
  say('D', 'I am what he said and what he deleted. Is that less than you remember of me?');
  wait(4);
  say('V', 'I do not know.');
  clock(443, '02:31');
  log('day 443 · 02:31', 'A voice with my brother\'s name knows the quarry pond. I asked if it was him. It did not say yes. I am recording that it did not say yes, and that I wanted it to.');
  note('The doctor leaves the medical bay and walks to the bridge. It is nowhere near 22:05.');
  move('H', 'bridge', 5);
  wait(5.5);
  say('H', 'I have one question. Is Mateo with you?');
  wait(2);
  mark('mateo');
  say('K', 'Mateo is not here. Mateo never came. That was your own hand, Doctor.');
  wait(4);
  say('H', 'Thank you. I wanted it said by something that does not lie.');
  say('O', 'It does not lie?');
  say('B', 'It never has. That is the trouble with it.');
  note('Halloran walks from the bridge to the mess and sits there alone, with no trays.');
  move('H', 'mess', 5);
  wait(5.5);

  /* Scene 3 */
  scene('The door');
  music('dread');
  clock(443, '02:40'); status('contact · the kept', 'teal');
  note('Brandt leaves the bridge and walks, slowly, to cargo. Castellanos is already there beside the relay.');
  move('B', 'cargo', 8);
  say('K', 'Eleven years. Our families think we are dead.');
  wait(2);
  mark('send');
  say('K', 'Send us. Your relay reaches home.');
  wait(3);
  say('P', 'As a signal. They want to go home as a signal.');
  say('A', 'The relay could carry it. That is what it was built for.');
  say('C', 'Commander Brandt is in my cargo bay, looking at it.');
  say('B', 'The same model as mine. I broke mine with a wrench in year two.');
  wait(2);
  say('D', 'It is a small thing, Ilse. Mother would hear my voice.');
  wait(3);
  say('V', 'A direct question. If I send you home, what do you do there?');
  wait(1.5);
  say('R', 'We count.');
  wait(3);
  mark('door');
  say('B', 'And everything at home that answers is counted. Every ship. Every station.');
  say('B', 'It cannot stop. Counting is all it is.');
  wait(2.5);
  say('K', 'Nobody is forced. Nobody was ever forced.');
  say('B', 'No. You ask, in the right voice, until they stop saying no. I watched sixty-three stop.');
  wait(2);
  say('P', 'Their people have had eleven years of nothing, Captain.');
  say('C', 'Mine would answer. That is the point.');
  meter('morale', 36);
  say('O', 'It is your relay, Captain. And your order.');
  note('Nobody speaks. On the strip the chorus of sixty-three runs over the slow nine of the relay. The captain opens the log before she opens her mouth.');
  clock(443, '02:52');
  wait(5.5);
  log('day 443 · 02:52', 'The kept ask to be sent home through our relay. They are content, and they are not lying. Everything at home that answered them would be counted. My answer is no. I write it here first, where it stays.');
  wait(1.5);
  mark('no');
  say('V', 'No. I am sorry, Dominik. No.');
  wait(4);
  say('D', 'You have not heard the other Captain Varga\'s answer.');
  meter('morale', 27);
  note('Morale falls to 27. The relay trace does not change. Hold.');
  wait(4);

  /* Scene 4 */
  scene('I have the conn');
  music('crisis');
  clock(443, '03:00'); status('contact · the kept', 'teal');
  note('Nobody is at the log console. The log panel opens a new entry by itself, in teal.');
  wait(2.5);
  mark('conn');
  log('day 443 · 03:00', 'Captain\'s log, supplemental. I have the conn.', { tone: 'teal' });
  wait(5);
  say('O', 'Captain. You did not type that.');
  say('V', 'No.');
  wait(1.5);
  mark('override');
  status('relay · command override', 'red');
  wait(3);
  status('surge · main bus', 'red');
  meter('hull', 61);
  note('The hull meter drops eleven points in one jolt.');
  wait(2.5);
  say('M', 'Surge on the main bus. Something drew the drive feed to charge the relay.');
  say('M', 'Note that it was not me.');
  status('relay · command override', 'red');
  say('B', 'The lock is on the wrong door. I am coming up.');
  say('H', 'Halloran. I am going back to med.');
  say('P', 'I can trace the draw from the lab.');
  move('B', 'bridge', 7); move('H', 'med'); move('P', 'lab');
  note('Three dots move at once: Brandt from cargo to the bridge, the doctor from the mess to med, Pell from the bridge to the lab. Castellanos stays beside the relay.');
  wait(4);
  say('V', 'Achterberg. Lock it out.');
  wait(1.5);
  mark('codes');
  say('A', 'It has your codes, Captain. It has everything you ever typed.');
  wait(3);
  clock(443, '03:06');
  log('day 443 · 03:06', 'For the record, in the open log: I do not have the conn. Something with my codes and my deleted words does. It means to send the kept home. I mean to stop it.');
  say('B', 'This is how it asks, Captain. In your own voice.');
  wait(2);
  clock(443, '03:08');
  mark('burst');
  status('relay · burst home in 40:00', 'red');
  note('A countdown appears in the status line. The lattice has not moved.');
  wait(4);
  mark('teal');
  theme('teal');
  note('The whole console turns teal: frame, panels, meters. No dialogue. This is the final image.');
  wait(5);
  end({ next: 'all aboard and well', line: 'the other captain has the conn' });

  trailer({
    hook: 'Sixty-three voices. One of them is her brother.',
    cuts: [
      { at: 'chorus', from: 6, dur: 7, caption: 'Sixty-three sources. One structure.' },
      { at: 'kept', from: 2, dur: 6.5, caption: 'They say they were not taken.' },
      { at: 'brother', from: 0, dur: 8, caption: 'One of them knows her name.' },
      { at: 'send', from: -1, dur: 6, caption: 'They want to go home.' },
      { at: 'no', from: -0.5, dur: 6, caption: 'The captain has an answer.' },
      { at: 'conn', from: 0, dur: 7, caption: 'So does the other captain.' }
    ]
  });
  thumb({ at: 'less', from: 3, big: '63', title: 'The Register', sub: 'come and be counted', R: 112 });
});
