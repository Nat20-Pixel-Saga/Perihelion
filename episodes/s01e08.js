import { episode } from '../engine/timeline.js';

const LAMP = { name: 'Lamp', tone: 'paper' };

export default episode({
  id: 's01e08',
  number: 8,
  title: 'Aphelion',
  logline: 'The Perihelion comes alongside the lost ship. Her lights are on, her beacon counts one, and somebody answers a signal lamp. The captain goes across herself.',
  start: {
    clock: [440, '10:00'], loc: 'holding · 2 km off DSV Aphelion', status: 'nominal',
    view: 'orbit', viewOpts: { body: 'aphelion', R: 150, cx: 400 },
    map: 8, mapKnown: 8, mapCam: 300, logMode: 'open', music: 'unease',
    crew: { V: 'bridge', O: 'bridge', A: 'bridge', P: 'lab', H: 'med', C: 'cargo', M: 'drive' },
    meters: { fuel: 63, hull: 70, morale: 35 },
    sig: {
      beacon: { on: true, period: 0.1, label: 'Aphelion hull beacon every 1 s' },
      other: { on: true, period: 0.8, name: 'cargo relay' }
    }
  }
}, ({ scene, note, music, wait, mark, clock, loc, status, view, blip, readout, mapTo, mapKnown, course, sig, plan, move, meter, log, say, end, trailer, thumb }) => {

  /* Scene 1 */
  scene('Alongside');
  note('Open on the Aphelion, large on the viewscreen, lit from bow to stern. The amber trace on the signal strip pulses once a second. Under it the teal relay keeps its eight.');
  wait(3);
  log('day 440 · 10:00', 'Holding two kilometres off the Aphelion. Her lights are on. Eleven years out, she looks like a ship tidied for visitors.');
  say('O', 'No drift and no tumble, Captain. Somebody is trimming her.');
  say('M', 'Standing still beside her costs five points. Note my objection.');
  say('V', 'Noted. Hold station.');
  meter('fuel', 58);
  status('station-keeping · 2 km');
  wait(2);
  say('A', 'No radio. I have a lamp rigged at the forward port.');
  say('V', 'Send our name. Ask leave to come aboard.');
  status('lamp · sending');
  note('No dialogue. Achterberg works the lamp by hand. The Aphelion turns slowly on the viewscreen and nothing on the strip changes.');
  wait(6);
  mark('lamp');
  blip('lamp', { label: 'lamp · one flash', at: [-0.62, -0.2], tone: 'paper', dy: -18 });
  status('lamp · one flash in reply');
  note('A single point of light near the bow of the Aphelion, labelled on the viewscreen. Then dark again.');
  say(LAMP, 'One flash. Bridge deck, port side.');
  wait(2);
  say('O', 'One flash. Is that yes, or is that one aboard?');
  say('A', 'With her, I think it is both.');
  wait(2);
  blip('lamp');
  mark('decide');
  say('V', 'I am going across. Doctor, Mr Pell, with me.');
  say('O', 'Captain, I object. A captain does not board first.');
  say('V', 'My brother sailed in that ship. I will not send you to look for me.');
  say('O', 'That is the reason I object.');
  say('V', 'You have the ship, Mr Okafor.');
  wait(1.5);
  say('O', 'I have the ship.');
  log('day 440 · 10:50', 'I am boarding the Aphelion with Halloran and Pell. Mr Okafor objects and has the ship. My reason is Dominik. I am writing that down before I go, not after.');
  status('boarding party · pod');
  move('V', 'cargo', 5); move('H', 'cargo', 5); move('P', 'cargo', 5);
  note('Three dots walk aft to cargo, where Castellanos has the pod ready. Okafor and Achterberg keep the bridge.');
  wait(5.5);
  say('C', 'Pod is fuelled. Three suits. I counted them twice.');
  wait(1);

  /* Scene 2 */
  scene('Sixty-three doors');
  music('dread');
  clock(440, '11:30'); status('boarding party · Aphelion');
  plan('aphelion');
  move('B', 'aphelion:bridge', 0);
  move('V', 'aphelion:airlock', 0); move('H', 'aphelion:airlock', 0); move('P', 'aphelion:airlock', 0);
  view('orbit', { R: 172, cx: 380, dur: 20 });
  note('The deck panel swaps to a plan of the Aphelion, its rooms unnamed. Three dots stand in the airlock at the stern. At the far end of the ship, one pale dot is already there. It does not move.');
  wait(3);
  say('V', 'Lock cycled. Air is good. The lights came on ahead of us.');
  move('V', 'aphelion:hangar'); move('H', 'aphelion:hangar'); move('P', 'aphelion:hangar');
  wait(4.5);
  say('P', 'Hangar. Two cradles, both empty.');
  say('O', 'Captain, we read one heat trace, far forward. It has not moved.');
  say('V', 'We will go to it. The long way.');
  move('V', 'aphelion:cabins 43-63'); move('H', 'aphelion:cabins 43-63'); move('P', 'aphelion:cabins 43-63');
  view('screen', { object: 'none', label: 'suit camera · Pell' });
  note('The viewscreen switches to Pell\'s suit camera, rendered as text: the name plates, one door at a time.');
  wait(4.5);
  readout('cabin 63', 'Lindqvist, A. Sealed. Bed made. Locker empty.');
  say('P', 'Every door is sealed. Every door has a name plate.');
  say('H', 'The beds are made. Nobody packed in a hurry. Nobody packed.');
  move('V', 'aphelion:cabins 22-42'); move('H', 'aphelion:cabins 22-42'); move('P', 'aphelion:cabins 22-42');
  wait(4.5);
  mark('count');
  say('C', 'Sixty-three cabins. Sixty-three names. I counted from here.');
  wait(2);
  mark('cabin31');
  readout('cabin 31', 'Varga, D. Hydrology. Sealed. Bed made.');
  say('P', 'Varga, D. Cabin 31.');
  move('H', 'aphelion:cabins 1-21'); move('P', 'aphelion:cabins 1-21');
  note('Pell and the doctor walk on. The captain\'s dot does not. It stays alone in the middle section, at her brother\'s door, and nobody on either ship speaks.');
  wait(7);
  say('H', 'Captain.');
  say('V', 'It is sealed like the others. Go on, Doctor. I am behind you.');
  move('V', 'aphelion:cabins 1-21');
  wait(4.5);
  move('V', 'aphelion:commons'); move('H', 'aphelion:commons'); move('P', 'aphelion:commons');
  view('screen', { object: 'none', label: 'suit camera · Pell' });
  wait(4.5);
  readout('commons', 'Sixty-four chairs. One place laid. One tray.');
  say('H', 'A table set for one.');
  say('P', 'The cup is warm.');
  wait(1.5);
  move('V', 'aphelion:hydro'); move('H', 'aphelion:hydro'); move('P', 'aphelion:hydro');
  wait(4.5);
  mark('garden');
  readout('hydroponics', 'All beds planted. Soil damp. Pruned within the day.');
  say('P', 'Hydroponics. It is alive. All of it.');
  say('V', 'These beds were Dominik\'s work. Somebody has kept his rows.');
  wait(1.5);
  say('O', 'One door ahead of you, Captain. The trace has not moved.');
  say('V', 'Then we knock.');
  wait(1);

  /* Scene 3 */
  scene('Brandt');
  music('night');
  clock(440, '12:40'); status('contact · Aphelion bridge');
  view('orbit', { R: 172, cx: 380, dur: 0 });
  move('V', 'aphelion:bridge', 6); move('H', 'aphelion:bridge', 6); move('P', 'aphelion:bridge', 6);
  note('Three dots walk the length of the corridor to the bridge. The pale dot has been waiting there since they docked. It still does not move. No dialogue until they arrive.');
  wait(7.5);
  mark('brandt');
  say('B', 'You are late. I set the last beacon nine years ago.');
  wait(1.5);
  say('V', 'Commander Brandt. Ilse Varga, DSV Perihelion.');
  say('B', 'Which of you answered?');
  wait(2);
  say('V', 'I did.');
  say('B', 'Of course. It is always the one who came for someone.');
  say('V', 'My brother. Dominik Varga.');
  say('B', 'Cabin 31. He was one of the last nineteen. He told me first.');
  say('V', 'Is he dead?');
  say('B', 'No. That is the difficulty.');
  wait(2);
  say('H', 'Sixty-three people, Commander. What took them?');
  say('B', 'Nothing took them. Nobody was forced.');
  say('B', 'They went one at a time, to something that sounded like whoever they missed.');
  say('P', 'You were in command. You could have ordered them to stay.');
  say('B', 'I ordered it twice. I could not order grief to stay.');
  wait(2);
  say('V', 'Why did you stay?');
  say('B', 'Somebody had to keep the count honest.');
  mark('lock');
  say('B', 'I am the lock on the door.');
  wait(2);
  say('V', 'What door?');
  say('B', 'The one that leads home.');
  say('B', 'It wants a relay that reaches home. Whatever answers there, it counts.');
  say('B', 'Mine I broke with a wrench in year two.');
  mark('relay');
  say('B', 'Yours is still pulsing in your cargo bay.');
  status('cargo relay · every 8 s', 'teal');
  note('Nobody answers her. On the signal strip the teal trace crosses again, and again, eight seconds apart, as it has since day 430.');
  wait(6);
  say('A', 'She is right, Captain. It has not missed a beat since Tau-9.');
  wait(2);
  say('V', 'Come aboard, Commander. You have kept this door long enough.');
  say('B', 'I have not left this ship in nine years.');
  wait(2);
  say('B', 'Give me a minute. I will put out the lamp.');
  wait(2);

  /* Scene 4 */
  scene('Nine');
  music('calm');
  clock(440, '16:30'); status('pod recovered');
  plan();
  move('V', 'cargo', 0); move('H', 'cargo', 0); move('P', 'cargo', 0); move('B', 'cargo', 0);
  note('The deck panel returns to the Perihelion. Four dots stand in cargo where three left. The fourth is pale.');
  log('day 440 · 16:30', 'Pod recovered with four aboard. Commander Adaeze Brandt is the fourth. She kept the Aphelion alone for nine years.');
  say('C', 'Three out, four back. I will recount the stores.');
  move('V', 'bridge', 6); move('P', 'lab', 6); move('H', 'med', 5); move('B', 'med', 5);
  note('The captain returns to the bridge and Pell to the lab. The doctor walks Brandt to the medical bay: her first steps off the Aphelion in nine years.');
  wait(6.5);
  mark('silent');
  sig('beacon', { on: false, name: 'Aphelion hull beacon' });
  status('Aphelion hull beacon · silent');
  note('The amber trace goes flat. For the first time in eleven years the Aphelion is counting nobody. Hold on the strip.');
  wait(6);
  say('A', 'The hull beacon has stopped, Captain.');
  say('B', 'I stopped it. Nobody is aboard. Zero is also an honest number.');
  wait(2);
  say('O', 'One of sixty-four, found alive. The crew will take that.');
  meter('morale', 44);
  wait(2);
  mark('nine');
  music('dread');
  sig('other', { period: 0.9 });
  status('cargo relay · every 9 s', 'teal');
  note('The teal trace slows by one second. Nobody has touched the relay.');
  wait(6);
  say('A', 'Captain. The relay changed as she crossed the hatch. Nine seconds.');
  say('B', 'Nine years it left me uncounted. One step, and it has me.');
  wait(2);
  say('C', 'Forty hull plates from her stores. Every one tagged.');
  say('M', 'Same yard, same frames. They fit.');
  meter('hull', 72);
  wait(3);
  clock(440, '22:05'); status('nominal');
  move('H', 'mess');
  note('22:05. The doctor goes to the mess, as he does. Brandt\'s dot stays in the medical bay by itself, which is how it has spent nine years.');
  wait(5);
  clock(441, '08:00');
  move('H', 'med'); move('B', 'bridge', 5);
  wait(5.5);
  mark('ask');
  say('B', 'Take me to it, Captain.');
  say('B', 'I have listened to it for nine years. I never once went to look.');
  wait(2);
  say('O', 'She warned every ship away from it. Now she asks to be taken.');
  say('V', 'She asks to see what she guarded. So do I.');
  say('V', 'Set course for the source.');
  mapKnown(9); course(true);
  view('orbit', { R: 34, cx: 650, dur: 18 }); loc('departing the Aphelion · source in 2 days');
  mapTo(8.25, 16);
  note('A dashed course line reaches past the last beacon to a node the chart now names. The Aphelion falls astern, lights still on, beacon dark.');
  log('day 441 · 08:20', 'Commander Brandt is aboard. Sixty-three cabins are sealed behind her and her beacon is out. The relay counts nine. It is our only voice home. It stays, on my order.');
  log('day 441 · 08:30', 'Dominik went by choice and told her first. I do not know what I will say to him. Course is set for the source.');
  wait(2);
  say('A', 'Nine seconds, Captain. Steady.');
  wait(3);
  end({ next: 'the register', line: 'nine aboard' });

  trailer({
    hook: 'Sixty-three empty cabins. One light still on.',
    cuts: [
      { at: 'lamp', from: -3, dur: 8, caption: 'No radio. They signal by lamp.' },
      { at: 'count', from: 0, dur: 6, caption: 'Every cabin sealed. Every bed made.' },
      { at: 'cabin31', from: 0, dur: 8, caption: 'One door has her name on it.' },
      { at: 'brandt', from: -1, dur: 7, caption: 'Someone has waited nine years.' },
      { at: 'lock', from: -0.5, dur: 6, caption: 'She is guarding a door.' },
      { at: 'nine', from: 5, dur: 6, caption: 'And now it has counted her.' }
    ]
  });
  thumb({ at: 'lamp', from: 2, big: '1', title: 'Aphelion', sub: 'someone is still aboard', R: 96 });
});
