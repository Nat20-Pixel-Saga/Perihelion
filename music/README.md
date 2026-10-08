# Music

The pipeline has two sources of music, and it works with either.

**Procedural score (default).** `engine/audio.js` synthesises the whole soundtrack from the episode's events: an engine hum, slow chord pads chosen by `music(mood)`, signal pings in time with the strip chart, typing, comms chirps and stings. It is original to this project, so there is nothing to license and nothing for Content ID to match.

**CC0 tracks (optional).** `manifest.json` maps each mood to a public-domain track. Run `npm run music` to download them into `music/tracks/` (ignored by git), then build as usual. Each `music(mood)` span plays its track under the sound effects, looped and faded; moods without a track keep the procedural pad. `node tools/cli.js music` shows what is mapped and what is on disk.

## Before publishing with a CC0 track

1. Listen to it against the episode. The mapping in the manifest was made from the tracks' descriptions, not by ear.
2. Open the track's page and confirm it still says CC0. Keep a screenshot or a saved copy of the page with the date.
3. The description generator credits each track used, with its page. CC0 does not require credit; the credit is there so a Content ID dispute can be answered in one message.
4. If a third party claims a CC0 track on YouTube, dispute the claim with the page link. To avoid the question entirely, build with `PERIHELION_NO_MUSIC=1` and ship the procedural score.

## Where to find more

- OpenGameArt.org, filtered to CC0, is the best source for this show: search "space", "ambient", "sci-fi", "drone".
- Freesound.org, filtered to "Creative Commons 0", for drones and room tone.
- Free Music Archive has CC0 and public-domain releases, but check each album: an artist's catalogue is not always under one licence.
- Pixabay Music is not CC0 for anything published after 9 January 2019. Its own licence allows use in videos but is a different set of terms.

To add a track, put an entry in `tracks` with `id`, `title`, `author`, `license`, `page`, `url`, `file` and `gain` (0.3 to 0.6), and point a mood at its `id`.
