// CC0 music: list what the manifest maps to each mood, and download the tracks.
// Without any tracks on disk the build uses the procedural score, so this step is optional.

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, musicManifest, ensureDir } from './lib.js';

export function musicStatus() {
  const m = musicManifest(), dir = path.join(ROOT, 'music/tracks');
  for (const mood of Object.keys(m.moods)) {
    const t = m.tracks.find(x => x.id === m.moods[mood]);
    const have = t && fs.existsSync(path.join(dir, t.file));
    console.log(mood.padEnd(9) + (t ? ('"' + t.title + '" by ' + t.author).padEnd(52) + (have ? 'on disk' : 'not downloaded') : 'procedural pad'));
  }
}

export async function musicFetch() {
  const m = musicManifest(), dir = ensureDir(path.join(ROOT, 'music/tracks'));
  for (const t of m.tracks) {
    const out = path.join(dir, t.file);
    if (fs.existsSync(out)) { console.log('have   ' + t.file); continue; }
    try {
      const res = await fetch(t.url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
      console.log('saved  ' + t.file + ' · ' + t.license + ' · ' + t.page);
    } catch (x) { console.log('FAILED ' + t.file + ' · ' + x.message + ' · download it by hand from ' + t.page); }
  }
}
