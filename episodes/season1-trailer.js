// The season trailer: cuts taken from several episodes, in story order.
// It shows nothing past the sighting of the Aphelion and explains nothing about the Register.
// `wide` is the 16:9 cut; `short` is the 9:16 cut and must stay under 58 seconds with its cards.

const cut = (ep, at, from, dur, caption) => ({ ep, at, from, dur, caption });

export default {
  id: 'season1',
  title: 'Season 1 trailer',
  hook: 'Sixty-four people went out. None came back.',
  outro: ['season one · ten episodes', 'watch the instruments'],
  moods: ['wonder', 'unease', 'dread', 'crisis'],
  wide: [
    cut('s01e01', 'pulse', 6, 6, 'They left a beacon. It should pulse every 60.'),
    cut('s01e01', 'entry2', 0, 9, 'It pulses every 61.'),
    cut('s01e01', 'entry3', 0, 4.5, 'Its memory carries a warning.'),
    cut('s01e01', 'tx', -3, 7, 'That night, someone aboard answers.'),
    cut('s01e01', 'seven', -1, 5, 'Now something is counting them.'),
    cut('s01e02', 'relay', 0, 7, 'The signal is inside the ship.'),
    cut('s01e03', 'entry2', 0, 6, 'The missing were not taken.'),
    cut('s01e04', 'breach', -4, 6, 'Every stop has a price.'),
    cut('s01e05', 'teal', 1, 7, 'The log begins to write itself.'),
    cut('s01e06', 'three', -1, 6, 'The crew vote on their captain.'),
    cut('s01e07', 'lights', 0, 6.5, 'And far ahead, the lights are still on.')
  ],
  short: [
    cut('s01e01', 'entry2', 0, 8, 'The beacon pulses every 61 seconds.'),
    cut('s01e01', 'tx', -3, 6.5, 'That night, someone aboard answers.'),
    cut('s01e01', 'seven', -1, 4.5, 'Now something is counting them.'),
    cut('s01e02', 'relay', 0, 6, 'The signal is inside the ship.'),
    cut('s01e04', 'breach', -4, 5, 'Every stop has a price.'),
    cut('s01e05', 'teal', 1, 6, 'The log begins to write itself.'),
    cut('s01e06', 'three', -1, 5, 'The crew vote on their captain.'),
    cut('s01e07', 'lights', 0, 5.5, 'Far ahead, the lights are still on.')
  ]
};
