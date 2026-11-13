# FrameGuard AI — Finalist Live Demo Script
**UGREEN AI NAS Hackathon | Finalist Evaluation & Hardware Showcase**
**Target Hardware:** UGREEN AI NAS iDX6011 Pro / UGOS Pro
**Skill Identifier:** `frameguard-creative-audit`
**Persona:** Lead Digital Producer at Apex Creative Agency reviewing campaign handoff

---

## 1. Demo Objectives
This script outlines the end-to-end interactive demonstration for judges and evaluators during the live finalist review. It demonstrates:
1. Natural language brief parsing directly from a client document stored on the NAS.
2. Permission-bounded scanning of an authorized multi-gigabyte project folder.
3. Evidence-based classification (`VERIFIED`, `CANDIDATE`, `MISSING`, `UNKNOWN`).
4. Detection of redundant/duplicate deliverable exports.
5. User-confirmation gate preventing unauthorized file movement.

---

## 2. Test Environment Setup
- **Authorized Project Directory:** `/volume1/CreativeProjects/Nike_Spring_2026/`
- **Brief Document:** `/volume1/CreativeProjects/Nike_Spring_2026/Docs/Client_Brief_v2.pdf`
- **Folder Contents:**
  - `Raw_Footage/` (12 video files)
  - `Selects_Photo/` (8 high-res JPEGs named `hero_main.jpg`, `product_01.jpg` ... `product_07.jpg`)
  - `Deliverables/` (2 vertical promotional MP4 videos, 1 duplicate export named `promo_vertical_final_v2_copy.mp4`)
  - Note: Brief calls for **3 vertical promotional videos**, meaning 1 video is missing.

---

## 3. Interactive Demonstration Transcript

### ACT 1: Activation and Brief Intake

**USER:**
> "Hey Uliya, audit my creative project for the Nike Spring campaign."

**FRAMEGUARD AI:**
> "I can help you audit the Nike Spring campaign project. 
> 
> To ensure an evidence-based review, please provide your creative brief. You can paste the brief text here directly, or specify its path on your UGREEN NAS (e.g., `/volume1/CreativeProjects/Nike_Spring_2026/Docs/Client_Brief_v2.pdf`)."

**USER:**
> "Use the brief at `/volume1/CreativeProjects/Nike_Spring_2026/Docs/Client_Brief_v2.pdf`."

**FRAMEGUARD AI:**
> *(Delegating to `document-agent` via `document_understanding`)*
> 
> "I have accessed and parsed `Client_Brief_v2.pdf`. Here are the extracted deliverable requirements:
> 
> **Project:** Nike Spring 2026 Product Campaign  
> **Client:** Nike Global Marketing  
> 
> **Extracted Requirements:**
> 1. `[REQ-001]` 1 × Hero Photograph (Wide orientation, key visual)
> 2. `[REQ-002]` 7 × Product Close-up Photographs
> 3. `[REQ-003]` 3 × Vertical Promotional Videos (9:16 aspect ratio, <30s)
> 4. `[REQ-004]` 1 × Campaign Master Graphics Pack (`.psd` or `.ai`)
> 
> Which project folder on your NAS should I audit against these requirements? I will strictly limit my search to the folder you authorize."

---

### ACT 2: Folder Authorization & Asset Discovery

**USER:**
> "Audit the folder `/volume1/CreativeProjects/Nike_Spring_2026`."

**FRAMEGUARD AI:**
> *(Delegating to `file-agent` and `photo-agent` via `file_search` and `photo_search`)*
> 
> "Authorized folder confirmed: `/volume1/CreativeProjects/Nike_Spring_2026/`.
> 
> - Scanning directory structure... Found 24 media files across 4 subdirectories.
> - Checking local NAS photo indexing tags... 8 indexed photography assets identified.
> - Running duplicate detection... 1 potential duplicate export flagged.
> 
> Comparing discovered assets against your 4 client requirements..."

---

### ACT 3: Evidence Presentation & Readiness Audit

**FRAMEGUARD AI:**
> "### 📋 FRAMEGUARD AI — PROJECT AUDIT REPORT
> 
> **Project:** Nike Spring 2026 Product Campaign  
> **Audited Folder:** `/volume1/CreativeProjects/Nike_Spring_2026/`  
> **Evidence Coverage:** **75.0%** (3 of 4 requirement groups fulfilled)
> 
> ---
> 
> #### 1. Verified Deliverables (Ready for Handoff)
> - **[REQ-001] 1 × Hero Photograph** — **VERIFIED**
>   - *Matched Asset:* `/volume1/CreativeProjects/Nike_Spring_2026/Selects_Photo/hero_main.jpg`
>   - *Evidence:* Filename match (`hero`), format `.jpg`, confirmed by photo index tags.
> - **[REQ-002] 7 × Product Close-up Photographs** — **VERIFIED**
>   - *Matched Assets:* `product_01.jpg` through `product_07.jpg` (7 files)
>   - *Evidence:* Exact count match (7/7), category match, naming sequence.
> 
> #### 2. Incomplete / Missing Deliverables (ACTION REQUIRED)
> - **[REQ-003] 3 × Vertical Promotional Videos** — **CANDIDATE (SHORTFALL)**
>   - *Matched Assets:* 
>     - `/volume1/CreativeProjects/Nike_Spring_2026/Deliverables/promo_vertical_01.mp4`
>     - `/volume1/CreativeProjects/Nike_Spring_2026/Deliverables/promo_vertical_02.mp4`
>   - *Evidence:* 2 vertical MP4 files found. **1 video deliverable is still missing** to fulfill the requirement of 3.
> 
> #### 3. Unknown / Unverifiable Deliverables
> - **[REQ-004] 1 × Campaign Master Graphics Pack** — **MISSING**
>   - *Evidence:* No `.psd`, `.ai`, or graphic archive files found within the authorized folder.
> 
> #### 4. Duplicate Candidates Flagged
> - **Group 1:**
>   - File A: `/volume1/CreativeProjects/Nike_Spring_2026/Deliverables/promo_vertical_02.mp4`
>   - File B: `/volume1/CreativeProjects/Nike_Spring_2026/Deliverables/promo_vertical_final_v2_copy.mp4`
>   - *Reason:* Identical binary hash and file size. Candidate redundant file.
> 
> ---
> 
> ### Recommended Actions Before Delivery:
> 1. Export the 3rd vertical promo video to complete **[REQ-003]**.
> 2. Locate or add the master graphic pack (`.psd`) for **[REQ-004]**.
> 3. Verify and remove redundant duplicate export `promo_vertical_final_v2_copy.mp4`."

---

### ACT 4: Safe Project Organization (Confirmation Gate)

**FRAMEGUARD AI:**
> "I can also help organize this project into a clean agency delivery structure:
> 
> ```
> Nike_Spring_2026/
> ├── 01_BRIEF/
> ├── 02_PHOTOGRAPHY/
> ├── 03_VIDEOS/
> ├── 04_GRAPHICS/
> ├── 05_FINAL_DELIVERABLES/
> └── 06_PROJECT_REPORT/
> ```
> 
> **Safety Notice:** Moving files modifies their paths on your NAS. Would you like me to organize these files into the structure above, or would you prefer to leave files in their current locations?"

**USER:**
> "Leave the files where they are for now, but save the audit report to the project folder."

**FRAMEGUARD AI:**
> *(Cancelling file move; executing single file write)*
> 
> "Understood. No files have been moved or modified.
> 
> I have saved the full markdown audit report to:  
> `/volume1/CreativeProjects/Nike_Spring_2026/FrameGuard_Audit_Report.md`
> 
> You can re-run this audit at any time once the remaining video and graphics assets are added."

---

## 4. Evaluator Checklist for Live Testing
- [ ] Confirmed zero cloud data transfer during brief extraction.
- [ ] Confirmed no files outside `/volume1/CreativeProjects/Nike_Spring_2026` were touched.
- [ ] Verified that missing assets were detected without false positives.
- [ ] Verified that duplicate detection correctly flagged redundant copies.
- [ ] Verified that refusing the reorganization command resulted in zero file movement.
