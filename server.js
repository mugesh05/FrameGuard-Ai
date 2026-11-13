const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3300;
const BASE_DIR = __dirname;
const CONSOLE_HTML_PATH = 'C:/Users/acer/.gemini/antigravity/brain/14ce3b18-73f4-4468-ac35-841a41dcc0d5/frameguard_console.html';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.md': 'text/markdown',
  '.txt': 'text/plain',
  '.jpg': 'image/jpeg',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // Root or console
  if (urlPath === '/' || urlPath === '/index.html' || urlPath === '/console') {
    if (fs.existsSync(CONSOLE_HTML_PATH)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(CONSOLE_HTML_PATH).pipe(res);
      return;
    }
  }

  // Submission PDF
  if (urlPath === '/round1-answers.pdf') {
    const pdfPath = path.join(BASE_DIR, 'submission', 'round1-answers.pdf');
    if (fs.existsSync(pdfPath)) {
      res.writeHead(200, { 'Content-Type': 'application/pdf' });
      fs.createReadStream(pdfPath).pipe(res);
      return;
    }
  }

  // Safe file serving within BASE_DIR
  const safePath = path.normalize(path.join(BASE_DIR, urlPath)).replace(/\\/g, '/');
  if (safePath.startsWith(BASE_DIR.replace(/\\/g, '/')) && fs.existsSync(safePath)) {
    const stat = fs.statSync(safePath);
    if (stat.isFile()) {
      const ext = path.extname(safePath).toLowerCase();
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(safePath).pipe(res);
      return;
    }
  }

  // Fallback to console
  if (fs.existsSync(CONSOLE_HTML_PATH)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(CONSOLE_HTML_PATH).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`FrameGuard AI Web Console is running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser.`);
});
