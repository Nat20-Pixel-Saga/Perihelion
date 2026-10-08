#!/usr/bin/env node
// Serves the repo so preview/index.html can load the engine and the episodes in a browser.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.js';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.ttf': 'font/ttf', '.png': 'image/png', '.css': 'text/css' };
const port = +process.env.PORT || 4173;
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/episodes.json') {
    const ids = fs.readdirSync(path.join(ROOT, 'episodes')).filter(f => /^s\d\de\d\d\.js$/.test(f)).map(f => f.slice(0, -3)).sort();
    res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify(ids)); return;
  }
  const file = path.normalize(path.join(ROOT, url === '/' ? 'preview/index.html' : url));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log('Preview at http://localhost:' + port));
