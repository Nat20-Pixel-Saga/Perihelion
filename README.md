# Perihelion

A science-fiction serial told entirely through a ship's console: the viewscreen, the star map, the signal strip, the deck plan, the captain's log and the comms. This repository holds the ten episodes of season 1 and the pipeline that turns them into YouTube-ready files.

Each episode is a short script file. The pipeline draws every frame from it in code, so there is no image generation and no per-frame cost: a 7-minute episode is about 200 events and renders on a laptop.

## What one build produces

For each episode, `npm run build` writes:

| File | What it is |
| --- | --- |
| `dist/s01eNN/s01eNN.mp4` | The episode, 1920 × 1080, 30 fps, H.264 with AAC audio |
| `dist/s01eNN/s01eNN-trailer.mp4` | The episode's trailer in 16:9, 1920 × 1080, 35 to 50 seconds |
| `dist/s01eNN/s01eNN-short.mp4` | The same trailer in 9:16, 1080 × 1920, for YouTube Shorts |
| `release/s01eNN/thumbnail.png` | Thumbnail, 1280 × 720 |
| `release/s01eNN/title.txt`, `description.txt`, `tags.txt` | Upload text. The description includes chapter timestamps and music credits |
| `release/s01eNN/trailer-title.txt`, `trailer-description.txt` | Upload text for the 16:9 trailer (it reuses the episode's thumbnail) |
| `release/s01eNN/short-title.txt`, `short-description.txt` | Upload text for the 9:16 trailer |
| `release/s01eNN/script.md` | The episode as a readable script |
| `release/s01eNN/meta.json` | Everything above plus `publishAt` times, for an uploader |
| `release/schedule.md` | The release calendar |

`dist/` is ignored by git because videos are large. `release/` is committed.

## Quick start

Requires Node 20 or later and `ffmpeg` on the path.

```
npm install
npm run build                      # every episode
node tools/cli.js build s01e03     # one episode
node tools/cli.js build --no-video # thumbnails and text only, a few seconds
npm run preview                    # play any episode in a browser at localhost:4173
```

The season trailer is separate: `node tools/cli.js season-trailer` writes `dist/season1/season1-trailer.mp4` (16:9) and `season1-short.mp4` (9:16) from the cut list in `episodes/season1-trailer.js`, and its upload text is in `release/season1-trailer/`.

Other commands: `lint`, `render`, `trailer` (add `--wide` or `--short` for one format), `thumb`, `frames`, `meta`, `channel`, `music`. `node tools/cli.js render s01e03 --seconds 30` renders only the first 30 seconds.

The same build runs on GitHub: open the Actions tab, choose "Render episodes", and download the result from the run page.

## Release schedule

`season.json` sets the first air date, the weekdays (Tuesday, Thursday, Saturday), the time and the time zone. `npm run meta` recomputes every date and rewrites `release/schedule.md`. Each trailer is scheduled for the day before its episode.

The pipeline does not upload. Schedule each video in YouTube Studio with the files in `release/s01eNN/`, or feed `meta.json` to an uploader of your choice. Also set `playlistUrl` in `season.json` once the playlist exists, so descriptions link to it.

## Writing and changing episodes

- `docs/writing-episodes.md` is the guide to the script format: every verb, the size limits of each panel, and the house style.
- `docs/season-1-beats.md` has the canon and a beat sheet for each episode, with the exact state each one starts and ends in.
- `episodes/s01e01.js` is the reference episode.

Run `npm run lint` after any edit. It checks that text fits its panel, that rooms and speakers exist, and that chapters and the trailer meet YouTube's limits.

## Music

By default the soundtrack is synthesised by the pipeline. To use CC0 tracks instead, see `music/README.md`.

## Layout

```
engine/     timeline builder, state, renderer, audio (no Node dependencies; also runs in the browser)
episodes/   one file per episode
tools/      command line: video, trailer, thumbnail, metadata, lint, music, preview server
music/      CC0 track manifest
assets/     fonts (IBM Plex Mono and Tektur, SIL Open Font License; licences included)
docs/       writing guide and beat sheets
release/    committed outputs: thumbnails, upload text, scripts, schedule
```
