const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT     = process.env.PORT || 3300;
const BASE_DIR = path.join(__dirname, 'public');
const PDF_PATH = path.join(__dirname, 'submission', 'round1-answers.pdf');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.json': 'application/json',
  '.pdf':  'application/pdf',
  '.md':   'text/plain',
  '.txt':  'text/plain',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // Submission PDF
  if (urlPath === '/round1-answers.pdf') {
    if (fs.existsSync(PDF_PATH)) {
      res.writeHead(200, { 'Content-Type': 'application/pdf' });
      fs.createReadStream(PDF_PATH).pipe(res);
    } else {
      res.writeHead(404); res.end('PDF not found');
    }
    return;
  }

  // Static files from /public
  let filePath = path.join(BASE_DIR, urlPath === '/' ? 'index.html' : urlPath);
  const safe = path.normalize(filePath);
  if (!safe.startsWith(BASE_DIR)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  if (fs.existsSync(safe) && fs.statSync(safe).isFile()) {
    const ext  = path.extname(safe).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(safe).pipe(res);
    return;
  }

  // SPA fallback → index.html
  const index = path.join(BASE_DIR, 'index.html');
  if (fs.existsSync(index)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(index).pipe(res);
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`FrameGuard AI running on port ${PORT}`);
});
