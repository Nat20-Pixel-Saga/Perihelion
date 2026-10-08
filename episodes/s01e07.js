import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e07',
  number: 7,
  title: 'What we deleted',
  logline: 'At the red dwarf Vesper the fourth beacon counts nineteen, and warns that the thing ahead has learned to write. That night it writes to the doctor, and then to the signals officer.',
  start: {
    clock: [437, '19:00'], loc: 'Vesper system · sublight', status: 'nominal',
    view: 'orbit', viewOpts: { body: 'vesper', R: 36, cx: 480 },
    map: 6.9, mapKnown: 6, mapCam: 240, logMode: 'open', music: 'wonder',
    crew: { V: 'bridge', O: 'bridge', A: 'bridge', P: 'lab', H: 'med', C: 'store', M: 'drive' },
    meters: { fuel: 71, hull: 69, morale: 41 },
    sig: { other: { on: true, period: 0.8, name: 'cargo relay' } }
  }
}, ({ scene, note, music, wait, mark, clock, loc, status, view, blip, readout, mapTo, mapKnown, mapCam, course, sig, move, meter, log, say, end, trailer, thumb }) => {

  /* Scene 1 */
  scene('Vesper');
  view('orbit', { body: 'vesper', R: 92, cx: 440, dur: 20 });
  mapTo(7, 14);
  note('Open on the full console. A small red sun grows on the viewscreen. The log panel reads "open, no erase". Madrigal\'s dot is back in the drive room; she walked there herself.');
  log('day 437 · 19:00', 'Five days since the vote. The log is open and I have erased nothing. Madrigal walked back to her drive room unassisted. She asked that it be noted.');
  say('O', 'Sublight. Vesper on screen. A red dwarf, old and quiet.');
  say('M', 'Frame 12 is welded. One point of hull back.');
  meter('hull', 70);
  say('M', 'Note that I objected to nothing today.');
  say('V', 'Noted.');
  wait(1.5);
  mapKnown(7);
  sig('beacon', { on: true, period: 1.9, name: 'beacon 4' });
  blip('beacon', { label: 'beacon 4', orbit: true, ch: 'beacon' });
  note('The signal strip gains an amber trace. It pulses fast, more than twice in the time the last beacon took to pulse once. Nobody speaks while it runs.');
  wait(5.5);
  say('A', 'Beacon 4. Aphelion ident. It pulses every 19 seconds.');
  mark('nineteen');
  wait(2.5);
  say('O', 'Kiln said forty-four.');
  say('A', 'They lost twenty-five between Kiln and here.');
  wait(2.5);
  say('C', 'That is not an accident. That is a queue.');
  wait(2);
  status('decision · close orbit');
  say('M', 'Close orbit is five points. I have no objection. Note that too.');
  say('V', 'Noted. Take us in.');
  meter('fuel', 66);
  view('orbit', { R: 112, cx: 420, dur: 7 }); loc('orbit · Vesper'); status('nominal');
  wait(5);

  clock(437, '19:50'); status('tightbeam · beacon 4');
  view('screen', { object: 'beacon', caption: 'beacon 4 · Aphelion issue' });
  note('The viewscreen switches to the beacon wireframe. Its memory holds two entries, both from the same day.');
  wait(1.5);
  say('A', 'Tightbeam locked. Two entries this time.');
  readout('entry 1 · Aphelion day 603', 'It writes to us now. It uses what we deleted. Everything you erase, it keeps, and it reads it back in the voice of whoever you miss.');
  mark('entry1');
  wait(3);
  say('P', 'Everything you erase.');
  say('A', 'It read the captain\'s log buffer. It will have read theirs.');
  say('V', 'It read mine. Go on.');
  wait(1);
  readout('entry 2 · Aphelion day 603', 'Nineteen of us. I have stopped asking them to stay. I only ask them to tell me first.');
  mark('entry2');
  wait(3);
  say('H', 'That is a doctor\'s request. Not a captain\'s.');
  say('V', 'It may be what a captain has left.');
  wait(2);
  log('day 437 · 20:10', 'Beacon 4 counts nineteen. Brandt writes that the thing ahead now writes to her crew, using what they deleted. My own deletions are on every console. I do not know what the others have erased.');
  wait(2);

  /* Scene 2 */
  scene('Letters');
  music('night');
  clock(437, '22:05'); status('nominal');
  view('night', { body: 'vesper', R: 112, cx: 420, dur: 0 });
  move('H', 'mess');
  note('22:05. The doctor walks from the medical bay to the mess, as he does every night. The red dwarf sits dimmed on the viewscreen. Hold on the single dot in the mess.');
  wait(5);
  status('cargo relay · reading medical log', 'teal');
  note('The status line turns teal. A voice arrives on the mess console. It is tender, and it is not on any channel the ship owns.');
  wait(2);
  mark('mateo');
  say('T', 'Ren. You never sent the one about the garden.');
  wait(3.5);
  say('T', 'The tomatoes came up without me. You wrote that. Then you deleted it.');
  wait(2.5);
  say('H', 'Who is on this channel.');
  say('T', 'You have set the second tray again. I would have told you to eat.');
  wait(2);
  say('H', 'Mateo is dead. I signed the certificate myself.');
  say('T', 'You wrote that too. Day 12. You deleted it before the full stop.');
  wait(3);
  view('screen', { object: 'none', label: 'medical log · deleted drafts' });
  note('The viewscreen fills with drafts from the medical log, each marked deleted, each addressed to the same name. They type themselves. Nobody speaks.');
  readout('draft · day 96 · to Mateo · deleted', 'The tomatoes came up without you. I did not know whether to be glad.');
  readout('draft · day 301 · to Mateo · deleted', 'I still set your place. The quartermaster has noticed. She is kind enough not to count it aloud.');
  mark('drafts');
  wait(5);
  note('Castellanos leaves the store and walks to the mess.');
  move('C', 'mess');
  wait(4.5);
  say('C', 'Doctor. Your console is talking.');
  say('H', 'Yes.');
  say('C', 'Two trays. Four hundred and thirty-seven nights. I counted.');
  wait(1.5);
  say('T', 'Ren. Read me the one from the winter.');
  wait(2.5);
  say('H', 'I know it is not him. I wrote those letters.');
  say('H', 'It is my own words in his mouth.');
  wait(2);
  say('C', 'Then stop reading.');
  wait(1.5);
  mark('wouldyou');
  say('H', 'Would you?');
  note('Castellanos does not answer. Her dot stays in the mess beside his. Hold.');
  meter('morale', 37);
  wait(5);
  say('T', 'Good night, Ren. Your tray is going cold.');
  say('H', 'It always does.');
  wait(2.5);
  status('nominal');
  view('night', { body: 'vesper', R: 112, cx: 420, dur: 0 });
  say('V', 'Doctor, bridge. Do you want that console cut?');
  say('H', 'No, Captain. I would only wonder what it said.');
  wait(1.5);
  log('day 437 · 22:40', 'It wrote to Dr Halloran tonight in the voice of his late husband, from letters he drafted and deleted. He knows what it is. He has not left the mess. I have not ordered him to.');
  wait(2);

  /* Scene 3 */
  scene('One word');
  music('night');
  clock(438, '03:00'); status('ship night');
  move('V', 'crew a'); move('O', 'crew a'); move('H', 'crew b'); move('C', 'crew b');
  note('Ship night. Since the vote the night watch rotates, and tonight it is Achterberg\'s. She is alone on the bridge. One other dot is awake: Pell, in the lab. The relay keeps its count of eight.');
  wait(5);
  status('incoming · cargo relay', 'teal');
  view('screen', { object: 'wave', label: 'incoming', caption: 'cargo relay · inbound text' });
  wait(1.5);
  readout('addressed to Achterberg, S.', 'You count our pulses. Ask us what they mean. One word is enough.', { tone: 'teal' });
  mark('oneword');
  note('The message sits on the viewscreen. She does not wake the captain. She does not answer it either. For a long moment the only thing moving is the signal strip.');
  wait(6.5);
  clock(438, '03:08');
  music('dread');
  note('Achterberg leaves her station while a signal is live. She has done that once before, to find the relay. Her dot walks the length of the corridor, past the lab, past the quarters where the others sleep.');
  move('A', 'cargo', 14);
  wait(5);
  clock(438, '03:10');
  wait(5);
  clock(438, '03:11');
  wait(4.5);
  clock(438, '03:12');
  status('relay armed', 'red');
  mark('armed');
  note('The status line turns red: relay armed. No alarm. One dot stands in cargo beside the ship\'s only link home.');
  wait(5);
  say('P', 'Bridge, lab. Who armed the relay?');
  wait(3.5);
  note('The bridge is empty. Nobody answers him. Pell goes to cargo at a run.');
  move('P', 'cargo', 3.5);
  wait(4);
  clock(438, '03:14');
  say('P', 'Suni. Step back from it.');
  wait(1.5);
  say('A', 'I only want to ask one question.');
  mark('captainsaid');
  say('P', 'That is what the captain said.');
  wait(4);
  say('A', 'It answered her.');
  say('P', 'It counted her. We have paid for that answer for 24 days.');
  say('A', 'One word, Jonah. It says one word is enough.');
  say('P', 'Enough for it.');
  wait(3.5);
  clock(438, '03:15');
  status('relay safe · nothing sent');
  mark('disarmed');
  note('The red clears. Achterberg has stepped back. The strip shows no transmission spike: nothing left the ship.');
  wait(4);
  say('A', 'Disarmed. Nothing was sent.');
  say('A', 'I will tell the captain myself.');
  move('A', 'crew a', 5); move('P', 'lab', 5);
  status('ship night');
  view('night', { body: 'vesper', R: 112, cx: 420, dur: 0 });
  note('Achterberg walks to the captain\'s quarters. Pell goes back to the lab. The message is gone from the viewscreen.');
  wait(6);
  clock(438, '03:20');
  say('A', 'Captain. I armed the relay at 03:12. I disarmed it at 03:15.');
  say('V', 'Why did you stop?');
  say('A', 'Pell quoted you.');
  wait(3);
  log('day 438 · 03:40', 'Achterberg armed the relay at 03:12 and disarmed it at 03:15. She told me herself. It is in the log because everything is.');
  meter('morale', 35);
  wait(3);

  /* Scene 4 */
  scene('One second');
  music('unease');
  clock(438, '11:00'); status('nominal'); loc('orbit · Vesper');
  view('orbit', { body: 'vesper', R: 112, cx: 420, dur: 0 });
  move('V', 'bridge'); move('O', 'bridge'); move('A', 'bridge'); move('H', 'med'); move('C', 'store');
  note('Morning. Everyone is back at a station. The doctor is in the medical bay. The red dwarf fills a third of the viewscreen.');
  wait(4.5);
  say('A', 'Captain. Passive optics have a hull. Outward, two days.');
  status('contact · long range');
  blip('beacon');
  view('screen', { object: 'aphelion', label: 'long range', caption: 'passive optics · no ranging' });
  wait(1.5);
  readout('contact · bearing outward', 'Hull: deep survey vessel. Registry: Aphelion. Power: nominal. Lights: on.');
  mark('lights');
  wait(4);
  say('O', 'Eleven years out here, and the lights are on.');
  wait(2);
  sig('beacon', { on: true, period: 0.1, label: 'Aphelion hull beacon every 1 s' });
  note('The amber trace changes. It no longer pulses; it ticks, once a second, like a clock. Hold on the strip.');
  wait(5);
  say('A', 'Her hull beacon. Interval one second.');
  mark('one');
  wait(2);
  say('V', 'One.');
  wait(3.5);
  say('H', 'Someone is still aboard.');
  wait(2);
  say('O', 'Captain. One aboard.', { priv: true });
  say('V', 'I know what you are asking. I do not know.', { priv: true });
  say('V', 'Dominik could never sit through a meal alone.', { priv: true });
  wait(3);
  say('V', 'Mr Okafor, lay in a course. No hail. We will show a lamp.');
  say('M', 'Three points to break orbit. I want to see who is home.');
  meter('fuel', 63);
  mapKnown(8); course(true); mapCam(300, 8);
  status('nominal');
  view('orbit', { body: 'vesper', R: 34, cx: 630, dur: 16 }); loc('departing Vesper · Aphelion in 2 days');
  mapTo(7.3, 16);
  mark('depart');
  note('The star map labels a new node: the Aphelion herself. A dashed course line reaches for it. Vesper falls away. Two traces run on the strip: one second, and eight.');
  wait(3);
  log('day 438 · 11:40', 'Sixty-four went out. Her hull now counts one. I want it on the open record that I hope it is my brother, and that I know it is unlikely. Course is set.');
  wait(6);
  end({ next: 'aphelion', line: 'one light still on' });

  trailer({
    hook: 'It writes to them now, in voices they miss.',
    cuts: [
      { at: 'nineteen', from: -4, dur: 7, caption: 'Beacon 4 counts nineteen.' },
      { at: 'entry1', from: -5, dur: 8, caption: 'It keeps what they delete.' },
      { at: 'mateo', from: 0, dur: 7.5, caption: 'Tonight it writes to the doctor.' },
      { at: 'armed', from: -3, dur: 7, caption: 'Then to the one who listens.' },
      { at: 'one', from: -1, dur: 7, caption: 'And ahead, one light is still on.' }
    ]
  });
  thumb({ at: 'nineteen', from: 2, big: '19', title: 'What we deleted', sub: 'it keeps what you delete', R: 96 });
});
