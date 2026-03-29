'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT            = 3000;
const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.txt');
const STATIC_DIR      = __dirname;

// ── MIME types for static serving ────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
};

// ── Format a submission as readable flat text ─────────────────────────────────
function formatSubmission(data) {
  const line  = '='.repeat(80);
  const dash  = '-'.repeat(80);
  const stamp = new Date().toISOString();

  const yn = { no: 'No', yes: 'Yes', depends: 'It depends on whether the charges stuck', unsure: 'Not aware of active investigations', iaa: 'IAA (contractual basis)' };

  return [
    line,
    `SUBMISSION DATE : ${stamp}`,
    `REFERENCE NO.   : ${data.ref}`,
    `POSITION APPLIED: ${data.position}`,
    dash,
    `NAME            : ${data.firstName} ${data.lastName}`,
    `DATE OF BIRTH   : ${data.dob}`,
    `SSN             : ${data.ssn}`,
    `ADDRESS         : ${data.address}`,
    `PHONE           : ${data.phone}`,
    `EMAIL           : ${data.email}`,
    dash,
    `EDUCATION       : ${data.education}`,
    `EXPERIENCE      : ${data.experience || '0'} year(s)`,
    `PREV EMPLOYER   : ${data.prevEmployer || 'N/A'}`,
    `WHY FIB         :`,
    ...(data.whyFib || '').split('\n').map(l => `  ${l}`),
    dash,
    `DISCLOSURES`,
    `  Q1 - Felony history     : ${yn[data.q1] || data.q1}`,
    `  Q2 - Under investigation: ${yn[data.q2] || data.q2}`,
    `  Q3 - Criminal ties      : ${yn[data.q3] || data.q3}`,
    line,
    '',
  ].join('\n');
}

// ── Request handler ───────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {

  // POST /submit — save the application
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const entry = formatSubmission(data);
        fs.appendFile(SUBMISSIONS_FILE, entry, err => {
          if (err) {
            console.error('Failed to write submission:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: 'Write failed' }));
          } else {
            console.log(`[${new Date().toISOString()}] New application saved — Ref: ${data.ref} | Position: ${data.position}`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true }));
          }
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // GET — serve static files
  if (req.method === 'GET') {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

    const filePath = path.join(STATIC_DIR, urlPath);

    // Safety: stay within STATIC_DIR
    if (!filePath.startsWith(STATIC_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }
      const ext  = path.extname(filePath);
      const mime = MIME[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    });
    return;
  }

  res.writeHead(405);
  res.end('Method not allowed');
});

server.listen(PORT, () => {
  console.log(`FIB Careers portal running at http://localhost:${PORT}`);
  console.log(`Submissions will be saved to: ${SUBMISSIONS_FILE}`);
});
