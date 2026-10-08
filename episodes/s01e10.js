import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e10',
  number: 10,
  title: 'All aboard and well',
  logline: 'A copy of the captain holds the ship and will send sixty-three voices home in thirty-eight minutes. Two of the crew go at the relay with a wrench. She goes at the copy with the log.',
  start: {
    clock: [443, '03:10'], loc: 'holding · the Register', status: 'relay · burst home in 38:00', statusTone: 'red',
    view: 'orbit', viewOpts: { body: 'register', R: 120, cx: 400 },
    map: 9, mapKnown: 9, mapCam: 300, logMode: 'open', music: 'crisis',
    crew: { V: 'bridge', O: 'bridge', A: 'bridge', B: 'bridge', P: 'lab', H: 'med', C: 'cargo', M: 'drive' },
    meters: { fuel: 55, hull: 61, morale: 27 },
    sig: {
      beacon: { on: true, period: 0.2, label: 'the Register · 63 voices' },
      other: { on: true, period: 0.9, name: 'cargo relay' }
    }
  }
}, ({ scene, note, music, wait, mark, clock, loc, status, theme, view, blip, readout, mapCam, mapReveal, sig, move, tag, meter, log, logOpen, logType, logErase, say, end, trailer, thumb }) => {

  const TEAL = { tone: 'teal' };    // the copy
  const AMBER = { tone: 'amber' };  // the captain, while the console is not hers

  /* Scene 1 */
  theme('teal');
  scene('Thirty-eight minutes');
  music('crisis');
  note('The whole console is teal: frame, labels, meters. Only the status line is red, and it is a countdown. The lattice fills the viewscreen. The relay trace counts nine.');
  mark('teal');
  say('A', 'Thirty-eight minutes to the burst. I am locked out.');
  say('O', 'Every console answers to the log. None answers to us.');
  note('The log panel opens an entry by itself. Nobody on the bridge is typing.');
  log('day 443 · 03:10', 'Captain\'s log, supplemental. Relay burst at 03:48. Sixty-three people have waited eleven years to be heard. I will not make them wait for a vote.', TEAL);
  wait(1.5);
  say('V', 'That entry is not mine. Castellanos. The relay.');
  say('C', 'Four bolts, hand torque. I counted. I need the long wrench.');
  say('P', 'The wrench is in the store. On my way.');
  move('P', 'store');
  note('Pell leaves the lab for the store, one bulkhead short of cargo. Castellanos waits inside cargo, beside the relay.');
  wait(4.5);
  clock(443, '03:14');
  tag('cargo', 'sealed');
  mark('sealed');
  say('P', 'Cargo door is sealed. It will not take my badge.');
  say('C', 'Nor mine, from this side.');
  say('A', 'Sealed from the bridge, Captain. Command authority.');
  wait(1.5);
  say('V', 'Not by me.');
  note('Hold. One dot inside cargo, one outside it, a sealed door between them, and the relay pulsing nine on the strip.');
  wait(5.5);
  say('B', 'It will not hurt them. It only needs them to be late.');
  wait(1);
  mark('madrigal');
  say('M', 'I can open any door on this ship from the drive room.');
  say('M', 'Note that I am not objecting.');
  say('V', 'Noted. Open it.');
  wait(2);
  tag('cargo');
  meter('hull', 58);
  note('The tag clears. The hull meter drops three points: the door was taken back by force.');
  say('M', 'Open. It fought me for the bus. That jolt was the price.');
  move('P', 'cargo');
  wait(4.5);
  clock(443, '03:24'); status('relay · burst home in 24:00', 'red');
  note('The countdown jumps. Fourteen minutes have bought one bolt.');
  wait(2);
  say('C', 'First bolt is out.');
  say('P', 'Three bolts. Twenty-four minutes. It does not divide.');
  say('C', 'Then stop dividing and pull.');
  wait(2);

  /* Scene 2 */
  scene('Two captains');
  music('dread');
  clock(443, '03:25');
  note('The bridge. Varga sits at the command console with Okafor, Achterberg and Brandt behind her. From here the argument is in the log panel: teal is the copy, amber is the captain.');
  say('B', 'It will not shout. It will only be right about you.');
  logOpen('day 443 · 03:25');
  mark('copy');
  logType('You deleted me. Every line you were ashamed of. I am the honest one.', TEAL);
  wait(2.5);
  note('She answers in the same entry. Hers are the only amber words on the console.');
  logType(' You are the one who never had to stand in the mess and say it.', AMBER);
  wait(2.5);
  say('C', 'Second bolt. Two left.');
  say('M', 'Door sealed again. Door open again. Carry on.');
  clock(443, '03:37'); status('relay · burst home in 11:00', 'red');
  wait(1.5);
  note('The copy opens a new entry and reads her own deletions back to her, in order: day 414, day 417, day 430.');
  logOpen('day 443 · 03:38');
  mark('quotes');
  logType('Castellanos and Pell were in cargo at 02:14, beside the relay. Mr Okafor has seen me. He is waiting. I was not asleep. You wrote those and took them back. I never did.', TEAL);
  note('Hold on the three sentences. This is everything it is made of.');
  wait(4.5);
  say('V', 'Achterberg. What is it built from?');
  say('A', 'Your log buffer, Captain. Chiefly the deletions.');
  say('V', 'Then it owns nothing I am willing to write down.');
  say('O', 'The log is open, Captain. All hands will read it.');
  say('V', 'That is what it is for, Mr Okafor.');
  clock(443, '03:46'); status('relay · burst home in 02:00', 'red');
  music('crisis');
  say('P', 'Third bolt is turning. The fourth has not moved at all.');
  note('She opens an entry of her own and types the first deleted sentence, with the part she never wrote.');
  logOpen('day 443 · 03:46');
  mark('restore');
  logType('Castellanos and Pell were in cargo at 02:14. I thought of blaming them.', AMBER);
  logType(' That one is mine. I kept it when you would not.', TEAL);
  wait(1);
  logErase();
  note('The teal reply unmakes itself, letter by letter. Nobody is deleting it. A sentence that stands in the open log is no longer a deletion, and the copy has one less thing to be.');
  say('C', 'We are reading it, Captain. We knew. Third bolt is out.');
  logType(' Mr Okafor saw me. I let them doubt him.', AMBER);
  logType(' I kept that one too.', TEAL);
  wait(1);
  logErase();
  say('O', 'I did mind, Captain.');
  say('V', 'I know.');
  note('The third sentence. In episode 5 the copy added it to her entry. Now she writes it herself and the copy has nothing to add.');
  logType(' I was not asleep.', AMBER);
  wait(1.5);
  logType(' I was', TEAL);
  wait(2);
  logErase();
  note('Hold. The entry is three amber sentences and no teal. The countdown is still red above it.');
  wait(4.5);
  clock(443, '03:47');
  logOpen('day 443 · 03:47');
  logType('Then I am only you, eleven days ago.', TEAL);
  wait(2.5);
  logType(' Yes. And I have had eleven days you did not.', AMBER);
  wait(4);
  mark('release');
  status('relay · command released');
  theme('amber');
  sig('other', { period: 0.8 });
  music('unease');
  meter('morale', 41);
  note('The console turns amber from edge to edge. The countdown is gone. On the strip the relay slows from nine seconds to eight. Nobody speaks.');
  wait(6);
  say('A', 'Burst is cancelled. It had thirty-one seconds in hand.');
  say('A', 'Relay count is eight. It has stopped counting you twice.');
  wait(2);

  /* Scene 3 */
  scene('The cut');
  music('unease');
  clock(443, '03:52');
  note('Cargo. Castellanos and Pell have three bolts on the deck and a wrench on the fourth. The relay is the ship\'s again, and still pulsing.');
  say('C', 'Captain. It gave the relay back. Do we still pull it?');
  say('V', 'It gave it back tonight. Pull it.');
  say('M', 'That antenna is our only voice home. Note my objection.');
  say('V', 'Noted.');
  say('M', 'Good. Pull it anyway.');
  wait(2);
  say('P', 'Last bolt.');
  wait(3.5);
  mark('cut');
  sig('other', { on: false, name: 'cargo relay', label: 'cargo relay · removed' });
  status('relay · removed');
  note('The teal trace goes flat. It has pulsed without a break since 02:14 on day 414. Hold on the strip: the sixty-three voices above it, and under them a straight line.');
  wait(7);
  say('P', 'That was our only way home.');
  say('C', 'I know. I counted it.');
  wait(2.5);
  say('A', 'Twenty-nine days of it. I had stopped hearing it.');
  wait(2);
  clock(443, '05:10');
  note('The bridge. Brandt has not sat down since she came aboard.');
  say('B', 'Captain Varga. I would like to go across.');
  say('V', 'It does not send anyone back, Commander.');
  say('B', 'Sixty-three of mine are in there.');
  say('B', 'I told a beacon they were all aboard and well. I would like that to be true.');
  wait(3);
  say('V', 'You were the lock on the door.');
  say('B', 'The door is on your cargo deck with four bolts out of it.');
  say('B', 'I asked mine only to tell me first. I am telling you.');
  wait(2);
  say('V', 'Then you are relieved, Commander. Mr Pell, prep the pod.');
  move('B', 'cargo', 8);
  note('The paper-coloured dot walks the length of the ship, bridge to cargo, past the medical bay.');
  wait(4);
  say('H', 'Commander. Go well.');
  say('B', 'Doctor. Eat with the others.');
  wait(2);
  say('C', 'Pod is ready. One seat.');
  say('B', 'One is the correct number.');
  wait(1.5);
  clock(443, '05:31');
  move('B', 'off', 0);
  status('pod away');
  view('orbit', { R: 120, cx: 400, dur: 0 });
  blip('pod', { label: 'pod', at: [1.75, 0.62], tone: 'paper' });
  note('Her dot is gone from the deck plan. On the viewscreen a paper-coloured marker closes on the lattice in three steps. No dialogue.');
  wait(3);
  blip('pod', { label: 'pod', at: [1.2, 0.4], tone: 'paper' });
  wait(3);
  blip('pod', { label: 'pod', at: [0.7, 0.2], tone: 'paper' });
  wait(3);
  blip('pod');
  mark('sixtyfour');
  view('orbit', { nodes: 64 });
  sig('beacon', { label: 'the Register · 64 voices' });
  status('the Register · 64', 'teal');
  note('The marker is gone. One more light is on the lattice, paper-coloured among the teal. The strip relabels itself: 64 voices.');
  wait(6);
  say('K', 'All sixty-four aboard and well.');
  meter('morale', 46);
  wait(3.5);
  say('D', 'Go on, Ilse. Somebody should.');
  note('The captain does not answer him on comms. She writes it down instead.');
  wait(4.5);
  log('day 443 · 05:50', 'Commander Brandt left this ship at 05:31, by her own choice. She told me first. My brother is one of the sixty-four. I did not ask him home. He did not ask again.');
  wait(2.5);

  /* Scene 4 */
  scene('All seven');
  music('resolve');
  clock(445, '19:00'); status('nominal');
  move('P', 'lab', 0); move('C', 'store', 0);
  note('Two days on. Everyone is at a station: three on the bridge, Pell in the lab, the doctor in med, Castellanos counting the stores, Madrigal in the drive room. The relay trace is still flat.');
  say('V', 'All hands to the mess. That includes the drive room.');
  say('M', 'Note that the drive will be unattended.');
  say('V', 'Noted. Come and eat.');
  move('V', 'mess'); move('O', 'mess'); move('A', 'mess'); move('P', 'mess'); move('H', 'mess'); move('C', 'mess');
  move('M', 'mess', 8);
  note('Six dots gather in the mess. The seventh leaves the drive room and walks the whole length of the ship. In ten episodes Madrigal has left that room once, and she was carried. No dialogue until she arrives.');
  wait(9.5);
  mark('seven');
  wait(1.5);
  say('C', 'One tray, Doctor?');
  say('H', 'One tray.');
  meter('morale', 58);
  wait(3.5);
  say('V', 'We vote the old way. Outward is this room. Home is cargo.');
  tag('mess', 'outward'); tag('cargo', 'home');
  mark('vote');
  note('The two tags go up, as they did on day 432. This time nobody stands. Hold on seven dots in one room and an empty cargo bay.');
  wait(7);
  say('M', 'I walked the whole ship once today. I will not do it twice.');
  wait(1.5);
  tag('mess', 'outward 7'); tag('cargo', 'home 0');
  say('C', 'That is seven.');
  meter('morale', 74);
  wait(3.5);
  tag('mess'); tag('cargo');
  say('P', 'Crate 41 can go home for us. It can carry the whole log.');
  say('V', 'Every entry. Nothing removed. Launch it.');
  clock(445, '20:10');
  status('probe away · bearing home');
  blip('probe', { label: 'probe', at: [-1.55, -0.55], tone: 'paper' });
  note('A small marker leaves the ship on the viewscreen, heading back the way they came. It carries the log, deletions restored. It does not transmit. It will take years.');
  wait(5);
  say('A', 'Our own beacon is on the rail, Captain. What interval?');
  say('V', 'Count us, Castellanos.');
  say('C', 'Seven.');
  blip('probe');
  sig('beacon', { on: true, period: 0.7, name: 'Perihelion beacon' });
  blip('ours', { label: 'our beacon', orbit: true, ch: 'beacon', phase: 2.4 });
  status('beacon placed');
  note('The amber trace on the strip changes hands. The chorus of the Register is replaced by one slow, even pulse: Perihelion beacon, every 7 seconds.');
  wait(4.5);
  view('screen', { object: 'beacon', caption: 'beacon 1 · Perihelion issue' });
  mark('entry');
  readout('entry 1 · Perihelion day 445', 'Beacon placed. All seven aboard and well. Continuing outward. Varga, commanding.');
  wait(3);
  readout('entry 2 · Perihelion day 445', 'Do not answer the other one. But do not think it cruel.');
  note('Brandt\'s first entry and Brandt\'s warning, eleven years on, in another captain\'s hand. Nobody in the mess remarks on it.');
  wait(5);
  view('orbit', { R: 120, cx: 400, dur: 0 });
  clock(445, '21:20'); status('nominal');
  say('A', 'Captain. Something came in under the voices. Positions.');
  mark('chart');
  mapReveal();
  mapCam(420, 4);
  note('The star map slides past the Register and keeps sliding until the trail home has left the panel. Beyond the Register, one after another, twelve more teal points light up on dashed lines. No dialogue while they appear.');
  wait(4);
  mapCam(660, 6);
  wait(5.5);
  say('P', 'It gave us its chart.');
  say('C', 'Twelve more.');
  wait(2.5);
  say('O', 'Course, Captain?');
  say('V', 'Outward, Mr Okafor. After we have eaten.');
  meter('fuel', 49);
  view('orbit', { R: 34, cx: 580, dur: 18 });
  loc('departing the Register · outward');
  note('The lattice falls away to one side of the viewscreen with its sixty-four lights. Fuel drops six points for the burn. All seven dots stay in the mess.');
  wait(4);
  clock(445, '22:05');
  log('day 445 · 22:05', 'Someone aboard answered it. I did. It is all here, and none of it erased. The relay is gone. Seven aboard and well, in one room. I was not asleep that night. I expect to sleep tonight.');
  note('The stamp is 22:05. The doctor is already in the mess, with everyone else. The beacon behind them counts seven.');
  wait(6);
  end({ next: '', line: 'end of season one' });

  trailer({
    hook: 'To stop it, she must out-argue herself.',
    cuts: [
      { at: 'teal', from: 0.5, dur: 6.5, caption: 'The ship no longer answers to its crew.' },
      { at: 'sealed', from: 0, dur: 7, caption: 'Four bolts. One sealed door.' },
      { at: 'madrigal', from: 0, dur: 7.5, caption: 'The engineer does not object.' },
      { at: 'copy', from: 0.5, dur: 8.5, caption: 'Her own log has taken the conn.' },
      { at: 'quotes', from: 3, dur: 8, caption: 'It remembers everything she erased.' }
    ]
  });
  thumb({ at: 'sixtyfour', from: 6, big: '64', title: 'All aboard and well', sub: 'the count is complete', R: 96 });
});
