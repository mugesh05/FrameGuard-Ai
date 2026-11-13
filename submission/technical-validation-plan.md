# Technical Validation Plan

The validation plan verifies that FrameGuard AI fulfills all functional requirements using only the supported UGOS capabilities.

## 1. Test Environment
- **Device:** UGREEN AI NAS iDX6011 Pro running UGOS v1.4.
- **Skill Package:** `frameguard-creative-audit-initial.zip` installed via the UGREEN Skills Hub.
- **Data:** Synthetic project folders created under `/volume1/TestProjects/` containing known sets of images, videos, and documents.
- **Permissions:** Read/write access granted only to the test folders.

## 2. Core Test Cases
(see `references/validation-test-cases.md` for detailed scenarios)

| Test | Goal | Expected Outcome |
|---|---|---|
| CORE‑1 | Complete brief & assets | All requirements marked **VERIFIED**, 100% coverage, no duplicates reported. |
| CORE‑2 | Missing deliverable | Missing requirement correctly flagged, coverage reflects shortfall. |
| EDGE‑1 | Inaccessible folder | Skill reports permission error, all requirements **UNKNOWN**, no false missing items. |

## 3. Capability‑Specific Checks
1. **document_understanding** – Provide PDFs, DOCX, and plain‑text briefs; verify extraction accuracy and error handling for unsupported formats.
2. **file_search** – Confirm recursive discovery across nested folders; verify filters on extensions work.
3. **photo_search** – Validate that keyword‑based photo index queries return expected photo entries; test fallback when index disabled.
4. **duplicate_detection** – Populate folder with exact and near‑duplicate files; verify detection groups and reason strings.
5. **file_organize** – Run a full organization scenario with user‑confirmed moves; ensure files appear in the new structure and no data loss.

## 4. Safety & Compliance Checks
- Attempt to invoke any capability outside the authorized `project_folder` – expect immediate abort with a clear error.
- Simulate user denial of organization or save actions – skill must respect the denial and continue without modifications.
- Verify that no network calls are made (monitor network traffic).
- Confirm that all temporary data is cleared after the session (inspect `/tmp` or equivalent).

## 5. Reporting
The test harness will capture:
- Skill console logs.
- Generated audit reports (markdown).
- Any error codes returned by UGOS CLI.
- A summary matrix mapping each test step to pass/fail.

## 6. Acceptance Criteria
- All core test cases pass without manual intervention.
- No unauthorized file accesses or modifications occur.
- All error messages are user‑friendly and comply with the safety rules.
- The final audit report matches the template exactly.

---

*Prepared for Round 1 submission and subsequent finalist evaluation.*
