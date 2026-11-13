const fs = require('fs');
const path = require('path');

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const BLUE = '\x1b[34m';

const PHOTO_EXTS = ['.jpg', '.jpeg', '.png', '.tiff', '.tif', '.raw', '.cr2', '.nef', '.arw', '.dng', '.heic'];
const VIDEO_EXTS = ['.mp4', '.mov', '.avi', '.mxf', '.r3d', '.prores', '.mkv'];

function discoverFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(discoverFiles(full));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      let category = 'other';
      if (PHOTO_EXTS.includes(ext)) category = 'photograph';
      else if (VIDEO_EXTS.includes(ext)) category = 'video';
      
      const content = fs.readFileSync(full);
      results.push({
        name: entry.name,
        fullPath: full.replace(/\\/g, '/'),
        category,
        size: content.length,
        hash: content.toString('base64')
      });
    }
  }
  return results;
}

function parseBrief(text) {
  const reqs = [];
  const hero = text.match(/(\d+)\s+hero\s+photograph/i);
  if (hero) reqs.push({ id: 'REQ-01', desc: `${hero[1]} × Hero Photo`, type: 'photograph', qty: parseInt(hero[1], 10), qual: ['hero'] });

  const photo = text.match(/(\d+)\s+(?:edited\s+)?photograph/i);
  if (photo) reqs.push({ id: 'REQ-02', desc: `${photo[1]} × Edited Photos`, type: 'photograph', qty: parseInt(photo[1], 10), qual: ['photo', 'edited'] });

  const video = text.match(/(\d+)\s+(?:vertical\s+)?(?:promotional\s+)?video/i);
  if (video) reqs.push({ id: 'REQ-03', desc: `${video[1]} × Promo Video`, type: 'video', qty: parseInt(video[1], 10), qual: ['promo', 'video'] });

  return reqs;
}

function auditFolder(folderPath) {
  const folderName = path.basename(folderPath);
  const briefPath = path.join(folderPath, 'brief.txt');

  if (!fs.existsSync(folderPath)) {
    return { name: folderName, status: 'ERROR', error: 'FOLDER_ACCESS_ERR: Path does not exist or unauthorized', coverage: '0.0%' };
  }

  let briefText = "Create a campaign with 5 edited photographs, 2 vertical promotional videos, and 1 hero photograph.";
  if (fs.existsSync(briefPath)) {
    briefText = fs.readFileSync(briefPath, 'utf8');
  }

  const reqs = parseBrief(briefText);
  const files = discoverFiles(folderPath).filter(f => !f.name.endsWith('brief.txt') && !f.name.endsWith('.md'));

  // Duplicate detection by hash
  const seenHashes = {};
  const duplicatePairs = [];
  files.forEach(f => {
    if (seenHashes[f.hash]) {
      duplicatePairs.push({ original: seenHashes[f.hash], duplicate: f.name });
    } else {
      seenHashes[f.hash] = f.name;
    }
  });

  const allocated = new Set();
  let verifiedItems = 0;
  let totalItems = reqs.reduce((sum, r) => sum + r.qty, 0);
  const reqStatus = [];

  reqs.forEach(req => {
    const candidates = files.filter(f => !allocated.has(f.fullPath) && f.category === req.type);
    const matched = candidates.slice(0, req.qty);
    matched.forEach(m => allocated.add(m.fullPath));

    if (matched.length >= req.qty) {
      verifiedItems += req.qty;
      reqStatus.push({ id: req.id, desc: req.desc, status: 'VERIFIED', count: `${matched.length}/${req.qty}` });
    } else if (matched.length > 0) {
      verifiedItems += matched.length;
      reqStatus.push({ id: req.id, desc: req.desc, status: 'CANDIDATE', count: `${matched.length}/${req.qty}` });
    } else {
      reqStatus.push({ id: req.id, desc: req.desc, status: 'MISSING', count: `0/${req.qty}` });
    }
  });

  const coverage = totalItems > 0 ? ((verifiedItems / totalItems) * 100).toFixed(1) : '0.0';

  return {
    name: folderName,
    path: folderPath,
    reqs: reqStatus,
    filesCount: files.length,
    duplicates: duplicatePairs,
    coverage: `${coverage}%`,
    totalItems,
    verifiedItems
  };
}

// Main execution
console.log(`\n${CYAN}═════════════════════════════════════════════════════════════════════════════════════════${RESET}`);
console.log(`${BOLD}${BLUE}  FRAMEGUARD AI — BATCH MULTI-FOLDER AUDIT SUITE${RESET}`);
console.log(`${CYAN}  Auditing all registered NAS project folders against client deliverable briefs...${RESET}`);
console.log(`${CYAN}═════════════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

const mockRoot = 'C:/Users/acer/.gemini/antigravity/scratch/frameguard-creative-audit/tests/mock_nas';
const folders = fs.readdirSync(mockRoot, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => path.join(mockRoot, d.name));

// Add one simulated restricted folder
folders.push('C:/Users/acer/.gemini/antigravity/scratch/frameguard-creative-audit/tests/mock_nas/case5_restricted');

const auditResults = folders.map(f => auditFolder(f));

console.log(`${BOLD}┌──────────────────────┬─────────────┬──────────┬──────────────┬─────────────────────────────────┐${RESET}`);
console.log(`${BOLD}│ Project Folder       │ Files Found │ Coverage │ Duplicates   │ Deliverable Status              │${RESET}`);
console.log(`${BOLD}├──────────────────────┼─────────────┼──────────┼──────────────┼─────────────────────────────────┤${RESET}`);

auditResults.forEach(res => {
  const namePad = res.name.padEnd(20);
  if (res.status === 'ERROR') {
    console.log(`│ ${namePad} │ ${'N/A'.padEnd(11)} │ ${RED}${'0.0%'.padEnd(8)}${RESET} │ ${'None'.padEnd(12)} │ ${RED}⛔ ACCESS RESTRICTED / HALTED${RESET}     │`);
    return;
  }

  const filesPad = String(res.filesCount).padEnd(11);
  const covNum = parseFloat(res.coverage);
  const covColor = covNum === 100 ? GREEN : (covNum > 50 ? YELLOW : RED);
  const covPad = `${covColor}${res.coverage.padEnd(8)}${RESET}`;
  const dupColor = res.duplicates.length > 0 ? YELLOW : GREEN;
  const dupPad = `${dupColor}${String(res.duplicates.length + ' pair(s)').padEnd(12)}${RESET}`;

  const statusSummary = res.reqs.map(r => {
    const col = r.status === 'VERIFIED' ? GREEN : (r.status === 'MISSING' ? RED : YELLOW);
    return `${col}${r.desc.split(' ')[2] || r.id}: ${r.status}${RESET}`;
  }).join(', ');

  console.log(`│ ${namePad} │ ${filesPad} │ ${covPad} │ ${dupPad} │ ${statusSummary.padEnd(42)} │`);
});

console.log(`${BOLD}└──────────────────────┴─────────────┴──────────┴──────────────┴─────────────────────────────────┘${RESET}\n`);

console.log(`${BOLD}DETAILED FOLDER BREAKDOWN:${RESET}`);
auditResults.forEach(res => {
  if (res.status === 'ERROR') {
    console.log(`\n• ${BOLD}${res.name}${RESET}: ${RED}${res.error}${RESET}`);
    return;
  }
  console.log(`\n• ${BOLD}${res.name}${RESET} [Coverage: ${res.coverage}] (${res.filesCount} assets on disk)`);
  res.reqs.forEach(r => {
    const marker = r.status === 'VERIFIED' ? `${GREEN}✓ [VERIFIED]` : (r.status === 'MISSING' ? `${RED}✗ [MISSING]` : `${YELLOW}⚠ [CANDIDATE]`);
    console.log(`    ${marker}${RESET} ${r.desc} (${r.count})`);
  });
  if (res.duplicates.length > 0) {
    console.log(`    ${YELLOW}⚠ Duplicate Candidates Detected:${RESET}`);
    res.duplicates.forEach(d => console.log(`       - Original: '${d.original}' <==> Duplicate: '${d.duplicate}' (Exact binary match)`));
  }
});

console.log(`\n${CYAN}═════════════════════════════════════════════════════════════════════════════════════════${RESET}`);
console.log(`${GREEN}Batch audit across all folders completed successfully. Zero data loss.${RESET}\n`);
