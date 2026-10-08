import { episode } from '../engine/timeline.js';

export default episode({
  id: 's01e04',
  number: 4,
  title: 'Blind skim',
  logline: 'The third beacon orbits a gas giant that could fill the tanks. Reading its depth means transmitting, and this ship does not transmit. The engineer offers another way.',
  start: {
    clock: [426, '05:40'], loc: 'Kiln system · sublight', status: 'nominal',
    view: 'orbit', viewOpts: { body: 'kiln', R: 40, cx: 470 },
    map: 5.9, mapKnown: 5, mapCam: 150, music: 'wonder',
    crew: { V: 'bridge', O: 'bridge', A: 'bridge', P: 'lab', H: 'med', C: 'store', M: 'drive' },
    meters: { fuel: 46, hull: 88, morale: 30 },
    sig: { other: { on: true, period: 0.7, name: 'cargo relay' } }
  }
}, ({ scene, note, music, wait, mark, clock, loc, status, theme, view, blip, readout, mapTo, mapKnown, course, sig, move, meter, log, say, end, trailer, thumb }) => {

  /* Scene 1 */
  scene('Kiln');
  music('wonder');
  view('orbit', { body: 'kiln', R: 100, cx: 440, dur: 26 });
  mapTo(6, 16);
  note('Open on a hot amber gas giant, small and off centre, growing. The teal relay trace keeps its seven-second count underneath everything. Madrigal is in the drive room, where she has been for 426 days.');
  log('day 426 · 05:40', 'Six days out from the Shallows. Three suits on a rack and a recorder I left where it sat. Nobody has asked me to go back for it. Kiln is ahead, and beacon 3.');
  wait(1.5);
  say('O', 'Sublight. Kiln on screen, Captain.');
  say('P', 'Cloud tops at nine hundred kelvin. It was named honestly.');
  say('M', 'Braking burn. It will cost five points.');
  say('V', 'We cannot arrive without stopping, Madrigal.');
  say('M', 'I did not object. I priced it.');
  meter('fuel', 41, 6);
  mapKnown(6);
  note('The fuel meter drains from 46 to 41 while the planet grows. Nobody speaks. The ship marker settles on Kiln.');
  wait(7);
  mark('pulse');
  sig('beacon', { on: true, period: 4.4, name: 'beacon 3' });
  blip('beacon', { label: 'beacon 3', orbit: true, ch: 'beacon' });
  loc('orbit · Kiln');
  note('The amber trace wakes on the signal strip. Achterberg lets it pulse twice before she says the number.');
  wait(6);
  say('A', 'Beacon 3. Aphelion ident. Timing the interval.');
  wait(4.5);
  say('A', 'Forty-four seconds.');
  wait(1.5);
  say('O', 'Fourteen fewer.');
  say('H', 'Fourteen, between one star and the next.');
  say('C', 'Nobody loses fourteen to bad luck. That is a decision.');
  wait(1.5);
  say('V', 'Tightbeam, Achterberg. Receive only.');
  clock(426, '06:30'); status('tightbeam · beacon 3');
  view('screen', { object: 'beacon', caption: 'beacon 3 · Aphelion issue' });
  note('The viewscreen switches to the beacon wireframe. Two entries print beside it.');
  wait(1.5);
  say('A', 'Locked. Its memory holds two entries.');
  mark('entry1');
  readout('entry 1 · Aphelion day 512', 'Fourteen voted to leave with the lander. I let them. A captain who counts her crew each morning has already lost them.');
  wait(3.5);
  say('C', 'I count stores each morning. Stores do not vote.');
  say('O', 'She let them go.');
  say('V', 'She could not have held fourteen. She says so.');
  wait(1.5);
  mark('entry2');
  readout('entry 2 · Aphelion day 512', 'The giant will fill your tanks. Do not range it. Ranging is answering.');
  note('Hold on the second entry. The fuel meter reads 41 beside it.');
  wait(5.5);
  say('O', 'A fuel stop, with conditions.');
  say('V', 'Madrigal. I want a fuel state within the hour.');
  say('M', 'You will not like it.');
  wait(2);

  /* Scene 2 */
  scene('The price');
  music('unease');
  clock(426, '08:15'); status('fuel state · review');
  view('screen', { object: 'none', label: 'fuel state' });
  move('C', 'bridge'); move('P', 'bridge');
  note('Castellanos and Pell walk to the bridge. Five dots there now. The doctor listens from med, Madrigal from the drive room. The viewscreen prints her arithmetic.');
  readout('tanks', 'Fuel 41 percent. Transit to Vesper: 33. Remaining on arrival: 8.');
  readout('return', 'Nearest charted star from Vesper: 38. Shortfall: 30.');
  wait(4);
  say('M', 'Enough to reach Vesper. Not enough to leave it for anywhere.');
  say('V', 'And the giant?');
  say('M', 'A skim fills us. A normal skim ranges the cloud deck twice a second to read depth.');
  say('C', 'That is transmitting.');
  say('M', 'That is how everyone who has done it is still alive.');
  wait(2);
  mark('argue');
  say('A', 'Captain. We have answered once already. What does a second time cost?');
  wait(1.5);
  say('C', 'Ask the Aphelion.');
  wait(2.5);
  say('P', 'A ranging pulse carries nothing. No names, no words. It is a ruler.');
  say('O', 'It counted seven of us from eight tenths of a second.');
  note('Okafor says it to the room. The captain does not look at him. Nothing on the console shows that, so the pause has to.');
  wait(3);
  say('H', 'Without ranging, how does anyone know how deep we are?');
  mark('offer');
  say('M', 'I can fly it blind, on drive pressure alone. The drive feels the gas before the hull does.');
  wait(1.5);
  say('M', 'Note that I think it is a bad idea. Note that I am offering.');
  wait(2);
  say('V', 'Noted. Twice.');
  mark('decision');
  status('decision · blind skim');
  wait(3.5);
  say('P', 'I can stand in the drive room with her. A second pair of hands.');
  say('M', 'No. One person in here is a crowd.');
  view('orbit', { R: 100, cx: 440, dur: 0 });
  log('day 426 · 09:10', 'The standing order holds: this ship does not transmit. We will skim Kiln without ranging, on Madrigal and her pressure gauges. She has objected and she has volunteered. I have accepted both.');
  say('C', 'Thirty-one crates to tie down. I will count them again after.');
  say('H', 'Med is ready. I would like it to stay empty.');
  move('C', 'store'); move('P', 'lab');
  view('orbit', { R: 124, cx: 420, dur: 8 });
  note('Castellanos walks back to the store and Pell to the lab. Kiln creeps larger. One dot in the drive room, alone, as always.');
  wait(7);

  /* Scene 3 */
  scene('Blind skim');
  music('crisis');
  theme('red');
  clock(426, '13:20'); loc('Kiln · upper atmosphere'); status('blind skim · descent', 'red');
  blip('beacon');
  view('orbit', { R: 760, cx: 700, dur: 34 });
  note('The console frame turns red. The planet swells until there is no edge left on the viewscreen, only bands. From here the story is two meters: fuel going up, hull going down.');
  wait(4);
  say('M', 'Scoop open. Taking pressure.');
  meter('fuel', 47, 1.5);
  wait(3);
  say('O', 'Fuel forty-seven.');
  say('M', 'Deeper.');
  mark('jolt');
  status('shear · frame 12', 'red');
  meter('hull', 84, 0.4);
  note('First jolt. Hull 88 to 84 in less than a second.');
  wait(2.5);
  say('A', 'Hull eighty-four.');
  meter('fuel', 54, 1.5);
  wait(3);
  status('shear · frame 31', 'red');
  meter('hull', 79, 0.4);
  meter('fuel', 61, 1.5);
  note('Second jolt. Hull 79, fuel 61. The lines cross somewhere ahead and everyone on the bridge can see where.');
  wait(3);
  say('V', 'Madrigal. Depth.');
  say('M', 'Unknown. That was the arrangement.');
  status('overpressure · scoop throat', 'red');
  meter('hull', 73, 0.4);
  meter('fuel', 68, 1.5);
  wait(3);
  say('O', 'Fuel sixty-eight. Hull seventy-three.');
  say('V', 'Enough. Bring us up.');
  say('M', 'Ten more points. Then up.');
  wait(2);
  mark('breach');
  status('breach · drive conduit 4', 'red');
  meter('hull', 64, 0.3);
  meter('fuel', 74, 1.2);
  note('The worst jolt. Hull 73 to 64 at once. The status line names a conduit in the drive room.');
  wait(3.5);
  music('silence');
  mark('silence');
  say('V', 'Madrigal?');
  note('No answer. Her dot is still in the drive room. It is not moving, but it never does.');
  wait(5.5);
  meter('fuel', 78, 2);
  say('V', 'Madrigal, respond.');
  meter('morale', 26, 2);
  wait(6);
  say('O', 'Tanks at seventy-eight. The drive is holding trim on its own.');
  say('V', 'I have the helm. Climbing. Doctor, drive room.');
  status('climbing · drive room silent', 'red');
  view('orbit', { R: 150, cx: 430, dur: 18 });
  move('H', 'drive', 3);
  note('The doctor runs: med to the drive room in three seconds, the fastest any dot has moved on this ship. The planet begins to fall away.');
  wait(2.5);
  say('V', 'Mr Okafor. Go.');
  move('O', 'drive', 3.5);
  wait(5);
  say('H', 'She is breathing. Conduit burn. Help me lift.');
  mark('carried');
  move('M', 'med', 9); move('H', 'med', 9); move('O', 'med', 9);
  note('Three dots leave the drive room together, slowly, one of them carried. It is the first time Madrigal has left it. No dialogue until the scene ends.');
  wait(10);
  mark('empty');
  status('drive room · unattended', 'red');
  note('Hold on the deck plan. The drive room is empty. It has not been empty since the ship left dock.');
  wait(8);

  /* Scene 4 */
  scene('Empty drive room');
  music('unease');
  theme('amber');
  clock(427, '06:10'); loc('high orbit · Kiln'); status('nominal');
  view('orbit', { R: 96, cx: 440, dur: 0 });
  blip('beacon', { label: 'beacon 3', orbit: true, ch: 'beacon' });
  move('P', 'drive'); move('O', 'bridge');
  note('Day 427. The frame is amber again. Pell walks from the lab to the drive room and Okafor returns to the bridge. Madrigal and the doctor are in med.');
  wait(5);
  say('H', 'Conduit burn, left arm and shoulder. She keeps both.');
  say('H', 'She set the trim before she went down. Then she went down.');
  say('C', 'Tanks at seventy-eight. I counted twice.');
  say('A', 'Hull at sixty-four. Frames 12 and 31 are braced.');
  wait(2.5);
  mark('awake');
  say('M', 'Who is in my drive room?');
  say('V', 'Pell.');
  say('M', 'Tell him not to touch the trim.');
  say('P', 'I have touched nothing. I am standing in the middle.');
  meter('morale', 36);
  note('Morale climbs from 26 to 36 on the sound of her voice. Nobody remarks on it.');
  wait(3.5);
  log('day 427 · 06:40', 'We took thirty-seven points of fuel from Kiln and paid twenty-four of hull. No pulse left this ship. Madrigal is stable. Her objection is on record. So is my answer.');
  wait(2);
  clock(427, '22:05'); status('ship night');
  view('night', { R: 96, cx: 440, dur: 0 });
  move('H', 'mess'); move('A', 'crew b'); move('C', 'crew b');
  note('22:05. The doctor goes to the mess, as he does. Tonight med is not empty behind him. Achterberg and Castellanos turn in. Captain and first officer have the bridge.');
  wait(6.5);
  mark('private');
  say('O', 'After Kiln, you said.', { priv: true });
  wait(2);
  say('V', 'She nearly died keeping my order. Give me until she is on her feet.', { priv: true });
  wait(2.5);
  say('O', 'That is the last time I wait.', { priv: true });
  note('The private channel closes. Two dots on the bridge, not speaking. The relay pulses every seven seconds.');
  wait(5);
  move('H', 'med');
  say('V', 'Set course for Vesper, Mr Okafor.');
  course(true);
  loc('departing Kiln · Vesper in 10 days'); status('nominal');
  view('night', { R: 30, cx: 640, dur: 16 });
  mapTo(6.1, 14);
  note('A dashed course line reaches for Vesper. Kiln falls astern. The doctor walks back to med and his patient. Pell stands his watch in a room that is not his.');
  wait(8);
  end({ next: 'eight', line: 'her objection is on record' });

  trailer({
    hook: 'To refuel, they must fly blind.',
    cuts: [
      { at: 'pulse', from: 6, dur: 7, caption: 'The third beacon counts forty-four.' },
      { at: 'entry2', from: 0, dur: 7, caption: 'It offers fuel, on one condition.' },
      { at: 'offer', from: 0, dur: 8, caption: 'The engineer offers another way.' },
      { at: 'jolt', from: -1, dur: 7, caption: 'No ranging. Only the feel of the drive.' },
      { at: 'silence', from: -1, dur: 9, caption: 'Then the drive room stops answering.' }
    ]
  });
  thumb({ at: 'pulse', from: 12, big: '44', title: 'Blind skim', sub: 'ranging is answering', R: 96 });
});
