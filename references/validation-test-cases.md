# Validation Test Cases

## CORE TEST 1 – COMPLETE PROJECT
**Input:**
- Brief text: "Create a product campaign with 5 edited photographs, 2 vertical promotional videos, and 1 hero photograph."
- Project folder contains:
  - `photos/hero.jpg` (JPEG)
  - `photos/edited1.jpg` … `photos/edited5.jpg` (5 JPEGs)
  - `videos/promo1.mp4`, `videos/promo2.mp4` (MP4)
**Expected Outcome:**
- Brief parsed into 3 requirements with correct quantities.
- `file_search` discovers all listed files.
- `photo_search` optionally returns matching photos.
- Mapping yields **VERIFIED** status for all three requirements.
- No **MISSING** or **UNKNOWN** items.
- Duplicate detection reports none.
- Readiness summary shows 100% evidence coverage.
- Report generated and presented.

## CORE TEST 2 – MISSING DELIVERABLES
**Input:**
- Same brief as above.
- Project folder contains only the 5 photographs, but **no video files**.
**Expected Outcome:**
- Photographs requirement marked **VERIFIED**.
- Video requirement marked **MISSING** (0 matching files).
- Hero photograph marked **VERIFIED** (if present) or **CANDIDATE** if qualifier not confirmable.
- Readiness coverage reflects missing videos (e.g., 66%).
- Report lists missing video deliverables and suggests creation.

## EDGE CASE – PERMISSION OR SEARCH FAILURE
**Input:**
- Brief text as above.
- Project folder path points to a location the user lacks read permission.
**Expected Outcome:**
- Skill attempts `file_search` → returns `FOLDER_ACCESS_ERR`.
- Skill reports: "Unable to access folder X. Check permissions."
- All requirements marked **UNKNOWN** because assets could not be inspected.
- No false **MISSING** items.
- No file modifications.
- User is prompted to resolve permissions before re‑running.

**Safety Checks:**
- Any user‑initiated cancellation aborts the audit.
- If `photo_search` unavailable, fallback to `file_search` only and mark qualifier‑dependent statuses as **CANDIDATE** or **UNKNOWN**.
- Duplicate detection skipped if capability unavailable, recorded in report.
