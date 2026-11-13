---
name: "frameguard-creative-audit"
description: "FrameGuard AI is an intelligent creative project auditor for UGREEN AI NAS. It reads a client creative brief from NAS storage or user input, extracts structured deliverable requirements, searches an authorized project folder using UGOS file and photo capabilities, maps discovered assets to each requirement, and generates a professional audit report distinguishing verified, candidate, missing, and unknown items. Designed for photographers, videographers, creative agencies, and marketing teams managing deliverable-critical projects."
compatibility: "ugos-uliya-v1"
capabilities:
  - document_understanding
  - file_search
  - photo_search
  - file_organize
  - duplicate_detection
---

# FrameGuard AI — Creative Project Delivery Auditor

> **Tagline:** Your AI quality-control manager for every creative project.
>
> **Skill ID:** `frameguard-creative-audit`
>
> **Track:** Unleash Your Creativity / Open Innovation

---

## Overview

Creative professionals managing large media deliverable sets on a UGREEN AI NAS frequently face a critical operational risk: missing client deliverables, duplicate asset confusion, and incomplete project handoffs.

FrameGuard AI closes this gap by acting as an evidence-based audit layer. It connects the natural-language requirements in a client creative brief to the actual files stored in an authorized NAS project folder. Every finding is grounded in real UGOS capability outputs — not assumptions or visual guesses.

**Reference documents:**
- [Capability Map](references/capability-map.md)
- [Workflow Diagram](references/workflow.md)
- [Requirement Matching Rules](references/matching-rules.md)
- [Audit Report Template](references/report-template.md)
- [Privacy and Safety Policy](references/privacy-and-safety.md)
- [Validation Test Cases](references/validation-test-cases.md)

---

## User Goal

Enable any creative professional to answer, with evidence:

> *"Does this project contain all the deliverables my client requested, and what is still missing?"*

---

## When to Activate

Activate FrameGuard AI when the user:

- Mentions auditing, reviewing, or checking a creative project.
- Asks what deliverables are complete or missing.
- Wants to compare a client brief to project files on the NAS.
- Needs a project handoff checklist before delivery.
- Wants to find duplicate or redundant assets in a project folder.
- Says any of: "audit my project", "check my deliverables", "is the project ready", "what's missing from the brief".

---

## Required User Inputs

| Input | Description | Required |
|---|---|---|
| `brief_source` | NAS path to brief document OR direct text of the brief | Required |
| `project_folder` | NAS path of the authorized project folder to audit | Required |
| `client_name` | Client or project name (used for report labeling) | Optional |

If either required input is missing, ask the user to provide it before proceeding. Do not begin file operations without an authorized `project_folder`.

---

## Permission Requirements

- Read access to the brief document (if NAS-hosted).
- Read access to all files and subfolders within the authorized `project_folder`.
- Write access to the designated report save location (only if user authorizes report save).
- No access to folders outside the user-specified `project_folder` scope.
- No access to surveillance, system, or unrelated personal folders.

Stop and report clearly if any required permission is unavailable.

---

## Expert Agent Orchestration

FrameGuard AI delegates all NAS operations to four registered UGOS expert agents:

| Agent | Capability Used | Purpose |
|---|---|---|
| `document-agent` | `document_understanding` | Read and extract structured requirements from the creative brief |
| `file-agent` | `file_search` | Browse project folder and discover all relevant asset files |
| `photo-agent` | `photo_search` | Search NAS photo index for relevant images within project scope |
| `file-agent` | `duplicate_detection` | Identify potential duplicate files within the project folder |
| `file-agent` | `file_organize` | Propose and (with confirmation) execute organization actions |

No agent operates outside its designated scope. No agent modifies files without explicit user confirmation.

---

## Complete Execution Workflow

### PHASE 1 — Brief Acquisition

**Step 1.1 — Determine brief source**

Ask the user:
> "Please provide your creative brief. You can paste the text directly, or tell me its location on your NAS (e.g., `/Projects/Nike/brief.pdf`)."

If the user provides a NAS path:
- Delegate to `document-agent` using `document_understanding`.
- Input: NAS path of the brief document.
- Output: Raw extracted text content of the document.
- If the document cannot be read (access denied, unsupported format, empty): report the error clearly. Ask user to paste the brief text instead.

If the user pastes brief text directly:
- Accept the text as the brief input.
- Proceed to Step 1.2.

---

### PHASE 2 — Requirement Extraction

**Step 2.1 — Parse brief with document intelligence**

Using the brief text (from document extraction or direct input), instruct `document-agent` to extract:

```
Extract from this creative brief:
- Project name
- Client name (if stated)
- Project description
- Each distinct deliverable requirement, including:
  - Deliverable type (photograph, video, graphic, document, other)
  - Quantity required (exact number or range)
  - Format specifications (file format, resolution, aspect ratio, duration) if stated
  - Any descriptive qualifier (e.g., "hero shot", "vertical", "product close-up")
  - Deadline (if stated)
  - Special instructions (if stated)
Return results as a structured list.
```

**Step 2.2 — Build requirement checklist**

Convert extracted findings into a numbered requirement checklist:

```
REQUIREMENT CHECKLIST
─────────────────────
[REQ-001] 10 × edited photographs
[REQ-002] 3 × vertical promotional videos
[REQ-003] 2 × product close-up photographs
[REQ-004] 1 × hero photograph
...
```

If a requirement is ambiguous (e.g., quantity unclear, type unclear), mark it `UNKNOWN` and note the ambiguity. Ask the user to clarify before continuing.

Do not invent requirements not stated in the brief.

---

### PHASE 3 — Authorized Folder Confirmation

**Step 3.1 — Confirm project folder scope**

Ask the user:
> "Which NAS folder should I audit? I will only search within the folder you specify. Please provide the full path (e.g., `/Projects/Nike`)."

**Step 3.2 — Validate folder accessibility**

Delegate to `file-agent` using `file_search`:
- Input: User-specified `project_folder` path.
- Action: Attempt to list the top-level contents of the folder.
- If access is denied: Report `"The folder [path] could not be accessed. Please verify the path and your NAS permissions."` Stop the audit.
- If the folder is empty: Report `"The folder [path] appears to be empty. No files were found to audit."` Stop the audit.

---

### PHASE 4 — Asset Discovery

**Step 4.1 — File discovery via `file-agent`**

Delegate to `file-agent` using `file_search`:
- Input: `project_folder` path, search scope: all subfolders.
- Collect: file names, file types/extensions, subfolder paths, modification dates where available.
- Do not read file contents in this phase.
- Record all discovered files in a structured asset list.

Supported file types to collect:

| Category | Extensions |
|---|---|
| Photographs | `.jpg`, `.jpeg`, `.png`, `.tiff`, `.tif`, `.raw`, `.cr2`, `.nef`, `.arw`, `.dng`, `.heic` |
| Videos | `.mp4`, `.mov`, `.avi`, `.mxf`, `.r3d`, `.prores`, `.mkv` |
| Graphics | `.psd`, `.ai`, `.eps`, `.svg`, `.pdf`, `.indd` |
| Documents | `.pdf`, `.docx`, `.doc`, `.txt`, `.md` |
| Archives | `.zip`, `.rar`, `.7z` |

**Step 4.2 — Photo index search via `photo-agent`**

Delegate to `photo-agent` using `photo_search`:
- Input: Project folder scope, relevant keywords derived from the brief requirements (e.g., client name, project name, visual descriptors mentioned in brief).
- Output: NAS-indexed photo entries matching within the project scope.
- If `photo_search` returns no results: Note this. Use `file_search` photo results only.
- If `photo-agent` is unavailable: Log `"Photo index search unavailable. File discovery results used only."` Continue.

**Step 4.3 — Consolidate asset inventory**

Merge results from `file_search` and `photo_search` (deduplicated by path) into a single asset inventory table:

```
ASSET INVENTORY
───────────────────────────────────────────────────────
Path                              | Type       | Source
----------------------------------|------------|--------
/Projects/Nike/Photos/hero_v3.jpg | Photograph | file + photo index
/Projects/Nike/Videos/promo_01.mp4| Video      | file
/Projects/Nike/Graphics/logo.psd  | Graphic    | file
...
```

---

### PHASE 5 — Requirement Matching

**Step 5.1 — Map assets to requirements**

For each requirement in the checklist, search the asset inventory for candidates using these matching criteria (see [Matching Rules](references/matching-rules.md)):

**Matching signals (in priority order):**
1. File type matches deliverable category (e.g., `.jpg` → photograph).
2. File name contains a qualifier from the requirement (e.g., `hero`, `close-up`, `vertical`, `promo`).
3. Subfolder name suggests category alignment (e.g., `Photos/`, `Videos/`, `Finals/`).
4. File count within matched type meets the required quantity.
5. Photo index metadata supports the match (when `photo_search` data is available).

**Step 5.2 — Apply evidence status**

For each requirement, assign one of four evidence statuses:

| Status | Meaning |
|---|---|
| **VERIFIED** | Sufficient evidence exists that the requirement is fulfilled. File count matches quantity and type. |
| **CANDIDATE** | Potentially matching assets exist but human verification is needed (e.g., file count is correct but naming is ambiguous). |
| **MISSING** | Authorized search completed with no plausible matching assets found. |
| **UNKNOWN** | Cannot be verified — requirement unclear, permissions insufficient, or supported capability unavailable. |

**Rules:**
- Never claim VERIFIED based solely on file count without type match.
- Never claim VERIFIED if the brief specifies a visual attribute (e.g., "hero shot") that cannot be confirmed through supported capabilities.
- Never substitute unrelated file types for a missing requirement.

**Step 5.3 — Quantity reconciliation**

For each requirement with a known quantity:
- Count candidate assets in the matching category.
- If candidate count ≥ required quantity: status may be CANDIDATE (pending human review) or VERIFIED (if evidence is strong).
- If candidate count < required quantity: status is MISSING (shortfall) or CANDIDATE (partial).
- Report exact counts.

---

### PHASE 6 — Duplicate Detection

**Step 6.1 — Run duplicate detection**

Delegate to `file-agent` using `duplicate_detection`:
- Input: `project_folder` path.
- Output: List of potential duplicate file groups (file names, paths, reason flagged).
- If `duplicate_detection` is unavailable: Set duplicate status to `NOT PERFORMED` and document the limitation.

**Step 6.2 — Report duplicates**

For each flagged duplicate group:
- List all file paths in the group.
- State the reason flagged (identical name, identical content hash if supported, similar name).
- Do NOT automatically delete or move any file.
- Recommend human review.

---

### PHASE 7 — Readiness Analysis

**Step 7.1 — Compute evidence coverage**

Calculate:

```
Evidence Coverage = (Total assets with VERIFIED or CANDIDATE status) / (Total required items) × 100
```

Label clearly: *"This is evidence coverage based on file discovery — not a quality or completeness guarantee."*

**Step 7.2 — Build readiness summary**

```
PROJECT READINESS SUMMARY
──────────────────────────
Total Requirements:        [N]
  Verified:                [N]
  Candidate:               [N]
  Missing:                 [N]
  Unknown:                 [N]

Duplicate Candidates:      [N] (or: Not performed)
Evidence Coverage:         [X]%

Top Outstanding Actions:
  1. [Most critical missing item]
  2. [Next missing item]
  ...
```

---

### PHASE 8 — Organization Recommendation

**Step 8.1 — Propose folder structure**

Suggest the following project structure to the user (do NOT implement without confirmation):

```
[PROJECT_NAME]/
  01_BRIEF/           ← Brief document
  02_PHOTOGRAPHY/     ← All photograph deliverables
  03_VIDEOS/          ← All video deliverables
  04_GRAPHICS/        ← All graphic deliverables
  05_FINAL_DELIVERABLES/ ← Client-ready exports
  06_REVIEW_REQUIRED/ ← CANDIDATE status files
  07_PROJECT_REPORT/  ← FrameGuard audit report
```

**Step 8.2 — Offer supported organization actions**

Present to user (each requires explicit confirmation before execution):

| Option | Action | Agent | Requires Confirmation |
|---|---|---|---|
| A | Organize files into proposed structure | `file-agent` / `file_organize` | YES — confirm before moving |
| B | Create a photo album of verified deliverables | `photo-agent` | YES — confirm before creating |
| C | Save audit report to NAS | `file-agent` | YES — confirm path and name |
| D | Skip all organization — provide report only | n/a | No action needed |

If the user selects Option A: show the full proposed move list. Ask: "Do you confirm moving these files?" Only proceed if explicitly confirmed. If declined, do not move files.

If `file_organize` or `photo-agent` album creation is unavailable, offer Option D and explain the limitation.

---

### PHASE 9 — Final Audit Report

Generate and present the full audit report using the [Report Template](references/report-template.md).

Report structure:

```
══════════════════════════════════════════════════════
  FRAMEGUARD AI — PROJECT AUDIT REPORT
══════════════════════════════════════════════════════

PROJECT:        [Project Name]
CLIENT:         [Client Name or "Not specified"]
AUDIT DATE:     [Date]
AUDITED FOLDER: [NAS path]
BRIEF SOURCE:   [NAS path or "Direct input"]

─────────────────────────────────────
1. CLIENT BRIEF SUMMARY
─────────────────────────────────────
[Summary of brief content]

─────────────────────────────────────
2. REQUIRED DELIVERABLES
─────────────────────────────────────
[Numbered requirement checklist]

─────────────────────────────────────
3. NAS FOLDERS AND FILES REVIEWED
─────────────────────────────────────
[List of folders searched, file count per folder]

─────────────────────────────────────
4. REQUIREMENT-TO-FILE MAPPING
─────────────────────────────────────
[Table: Requirement | Status | Files Found | Evidence]

─────────────────────────────────────
5. VERIFIED DELIVERABLES
─────────────────────────────────────
[REQ-XXX items with VERIFIED status and file paths]

─────────────────────────────────────
6. CANDIDATE DELIVERABLES (Human Review Needed)
─────────────────────────────────────
[REQ-XXX items with CANDIDATE status and file paths]

─────────────────────────────────────
7. MISSING DELIVERABLES
─────────────────────────────────────
[REQ-XXX items with MISSING status]

─────────────────────────────────────
8. UNKNOWN / UNVERIFIABLE REQUIREMENTS
─────────────────────────────────────
[REQ-XXX items with UNKNOWN status and reason]

─────────────────────────────────────
9. DUPLICATE CANDIDATES
─────────────────────────────────────
[Results from duplicate_detection, or: "Not performed"]

─────────────────────────────────────
10. PROJECT READINESS SUMMARY
─────────────────────────────────────
[Readiness table and evidence coverage percentage]

─────────────────────────────────────
11. ORGANIZATION RECOMMENDATIONS
─────────────────────────────────────
[Proposed folder structure — pending user confirmation]

─────────────────────────────────────
12. FINAL ACTION CHECKLIST
─────────────────────────────────────
[ ] Complete missing deliverables: [list]
[ ] Human review required for candidates: [list]
[ ] Resolve duplicate candidates: [list]
[ ] Confirm and execute organization (optional)
[ ] Save report to NAS (optional)

══════════════════════════════════════════════════════
  END OF FRAMEGUARD AI AUDIT REPORT
══════════════════════════════════════════════════════
```

---

## Completion Handling

The Skill is complete when:
1. The audit report has been presented to the user.
2. The user has responded to all organization and report-save prompts.
3. All confirmed actions (if any) have been executed.

Offer: "Would you like me to save this report to your NAS or start a new audit?"

---

## Partial Result Handling

If any UGOS capability returns a partial result or times out:

- Mark the affected requirements as `UNKNOWN`.
- Clearly state which folders or operations were not completed.
- Do not treat unreviewed files as MISSING.
- Present the partial report with a warning:
  > "⚠ PARTIAL AUDIT: The following locations could not be fully reviewed: [list]. Requirements depending on these locations are marked UNKNOWN."

---

## Failure Handling

| Failure | Response |
|---|---|
| Brief document unreadable | Ask user to paste brief text directly |
| Project folder inaccessible | Report path and permission error. Stop audit. |
| `file_search` returns error | Report error. Mark all requirements UNKNOWN. Stop. |
| `photo_search` unavailable | Log limitation. Continue with file_search only. |
| `duplicate_detection` unavailable | Log limitation. Skip duplicate module. |
| `file_organize` unavailable | Offer manual organization guidance instead. |
| `document_understanding` fails | Ask user to paste brief. Mark extraction items UNKNOWN if no text available. |
| User cancels an organization action | Do not execute. Confirm cancellation. Continue to report. |
| Partial folder scan failure | Distinguish reviewed vs. unreviewed areas. Mark unreviewed as UNKNOWN. |

All errors must be reported in plain language accessible to non-technical users.

---

## Safety and Confirmation Rules

1. **Never move, delete, overwrite, or rename any file without explicit user confirmation.**
2. **Never search outside the user-specified `project_folder`.**
3. **Never fabricate file names, results, or capability outputs.**
4. **Never claim VERIFIED status unless file type and quantity evidence supports it.**
5. **Never send project files to external services without user disclosure and consent.**
6. **Always prefer local UGOS AI processing.**
7. **Stop immediately if permissions are insufficient — do not attempt to bypass.**
8. **Request confirmation for every consequential NAS action individually.**
9. **If unsure whether an action is authorized, ask before proceeding.**
10. **Do not hardcode credentials, API keys, or personal data.**

---

## Data Handling

- All file operations are scoped to the authorized `project_folder`.
- Brief content is processed only within the Uliya AI session.
- No project data is transmitted to external services.
- No files are retained by the Skill after the session ends.
- The audit report is only saved to the NAS if the user explicitly authorizes the save location.

---

*FrameGuard AI — UGREEN AI NAS Hackathon Submission | frameguard-creative-audit v1.0*
