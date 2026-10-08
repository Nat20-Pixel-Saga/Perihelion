// Monospace word wrap by character count. The renderer and the linter share it,
// so "fits on screen" means the same thing in both.
export function wrapChars(text, cap) {
  const lines = [];
  let cur = '', start = 0, pos = 0;
  for (const w of text.split(' ')) {
    const next = cur ? cur + ' ' + w : w;
    if (cur && next.length > cap) { lines.push({ text: cur, start }); start = pos; cur = w; } else cur = next;
    pos += w.length + 1;
  }
  lines.push({ text: cur, start });
  return lines;
}
// Character capacities of each text area at its nominal size (IBM Plex Mono advances 0.6 em).
export const CAP = { log: 41, logLines: 6, comms: 57, commsLines: 2, readout: 44, readoutWide: 69, readoutLines: 10, status: 36, loc: 46 };
