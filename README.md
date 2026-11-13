# FrameGuard AI — UGREEN AI NAS Hackathon

<div align="center">
  <img src="https://img.shields.io/badge/UGREEN-AI%20NAS%20Hackathon-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIvPjwvc3ZnPg=="/>
  <img src="https://img.shields.io/badge/Track-Unleash%20Your%20Creativity-purple?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Skill%20ID-frameguard--creative--audit-green?style=for-the-badge"/>
</div>

<br/>

> **Your AI quality-control manager for every creative project on UGREEN AI NAS.**

FrameGuard AI is an intelligent creative project auditor built as a native **UGOS / Uliya AI Skill** for UGREEN AI NAS. It compares a client's creative brief against actual project files stored in an authorized NAS folder — finding fulfilled, candidate, missing, and duplicate deliverables with traceable, evidence-based results.

---

## Why FrameGuard AI?

Creative professionals — photographers, videographers, studios, agencies — manage thousands of media files across massive drives. Overlooked missing deliverables, duplicate exports, and incomplete project handoffs are expensive mistakes. FrameGuard eliminates this risk through **on-device, evidence-backed deliverable auditing**.

---

## Core Workflow

```
Client Brief (PDF/DOCX/Text)
         ↓
  document-agent: Extract Structured Requirements
         ↓
  Authorized Project Folder (user-specified)
         ↓
  file-agent: Recursive Asset Discovery (file_search)
  photo-agent: Visual Index Lookup (photo_search)
         ↓
  Duplicate Analysis (duplicate_detection)
         ↓
  Evidence-Based Requirement Matching
  (VERIFIED | CANDIDATE | MISSING | UNKNOWN)
         ↓
  Professional Audit Report
         ↓
  Optional: Safe Project Organization (file_organize)
           [Requires explicit user confirmation]
```

---

## Status Labels

| Status | Meaning |
|---|---|
| ✅ `VERIFIED` | Evidence confirms the requirement is fulfilled |
| ⚠️ `CANDIDATE` | Potential match exists; human review required |
| ❌ `MISSING` | No matching asset found in authorized scope |
| ❓ `UNKNOWN` | Cannot verify — insufficient permissions or capability |

---

## Supported UGOS Capabilities

| Capability | Expert Agent | Purpose |
|---|---|---|
| `document_understanding` | `document-agent` | Extract requirements from creative briefs |
| `file_search` | `file-agent` | Discover media assets in authorized folder |
| `photo_search` | `photo-agent` | Photo index lookup for visual tag evidence |
| `duplicate_detection` | `file-agent` | Flag identical/redundant exports |
| `file_organize` | `file-agent` | Safe file structuring (user-confirmed only) |

---

## Project Structure

```
frameguard-creative-audit/
├── SKILL.md                        # Core Uliya Skill manifest (UGOS Skill Standard)
├── README.md                       # This file
├── audit_runner.js                 # CLI audit engine (local simulation)
├── batch_audit_all.js              # Batch multi-folder audit
├── server.js                       # Local web server for interactive console
├── run_audit.cmd                   # Windows CLI shortcut
├── run_all.cmd                     # Batch audit CLI shortcut
├── references/
│   ├── capability-map.md           # UGOS CLI ↔ Expert agent mapping
│   ├── workflow.md                 # Architecture flow diagram
│   ├── matching-rules.md           # Evidence-based matching hierarchy
│   ├── report-template.md          # 12-section professional report template
│   ├── privacy-and-safety.md       # Zero-cloud, permission-boundary policy
│   └── validation-test-cases.md   # Core + edge case test protocols
├── submission/
│   ├── round1-answers.md           # Round 1 answers (447 words)
│   ├── round1-answers.pdf          # Official submission PDF
│   ├── technical-architecture.md   # Agent pipeline specification
│   ├── technical-validation-plan.md
│   ├── development-status.md
│   └── finalist-demo-script.md
├── tests/
│   └── mock_nas/
│       ├── case1_complete/         # All deliverables present (100% coverage)
│       ├── case2_missing/          # Missing video deliverable (75% coverage)
│       ├── case3_duplicates/       # Duplicate export detection
│       └── case4_empty/            # Empty project folder (0% coverage)
└── dist/
    └── frameguard-creative-audit-initial.zip  # Submission-ready Skill package
```

---

## Validation Results

| Test Case | Scenario | Coverage | Result |
|---|---|---|---|
| Core 1 | Complete project (5 photos, 2 videos, 1 hero) | **100.0%** | ✅ All VERIFIED |
| Core 2 | Missing video deliverables | **75.0%** | ✅ MISSING correctly detected |
| Core 3 | Duplicate export files | **100.0%** | ✅ 2 duplicate pairs flagged |
| Core 4 | Empty project folder | **0.0%** | ✅ MISSING reported |
| Edge 1 | Restricted/non-existent folder | **N/A** | ✅ Safe abort, zero modifications |

---

## Running the CLI Locally

```powershell
# Single folder audit
run_audit.cmd "C:\Projects\Nike_Spring" "10 edited photographs, 3 vertical videos, 1 hero photograph"

# Batch audit all test folders
run_all.cmd

# Start interactive web console (requires Node.js)
node server.js
# → Open http://localhost:3300
```

---

## Privacy & Safety

- 🔒 **100% on-device processing** — no project data transmitted to external services
- 🛡️ **Permission-scoped** — strictly reads from the user-authorized folder only
- ✋ **No automatic writes** — all file moves require explicit user confirmation
- 🚫 **No credentials or personal data** hardcoded anywhere

---

## Hackathon Submission

- **Competition:** UGREEN AI NAS Hackathon 2026
- **Track:** Unleash Your Creativity / Open Innovation
- **Skill ID:** `frameguard-creative-audit`
- **Submission Package:** `dist/frameguard-creative-audit-initial.zip`
- **Round 1 Document:** `submission/round1-answers.pdf`

---

<div align="center">Made with ❤️ for creators who deserve reliable, evidence-backed project audits.</div>
