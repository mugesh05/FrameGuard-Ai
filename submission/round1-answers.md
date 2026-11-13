# FrameGuard AI — Round 1 Submission Answers
**UGREEN AI NAS Hackathon | Track: Unleash Your Creativity / Open Innovation**
**Skill Identifier:** `frameguard-creative-audit`

---

### 1. One-sentence Skill description
FrameGuard AI is an intelligent on-device creative project auditor for UGREEN AI NAS that reconciles client brief deliverables against stored media files to identify fulfilled, candidate, missing, and duplicate assets with verifiable evidence.

### 2. Target user and problem
Creative agencies, commercial photographers, video production studios, and marketing teams manage massive deliverable sets across multi-terabyte drives. Overlooked missing assets, version confusion, and duplicate files routinely trigger costly client disputes and delayed project handoffs.

### 3. Proposed solution
An automated, permission-scoped quality-control workflow that parses client briefs into structured deliverable checklists, audits authorized NAS folders using native UGOS capabilities, performs evidence-based matching, and delivers actionable readiness reports with optional safe project organization.

### 4. Core user flow
The creator supplies a creative brief (text or NAS document) and designates an authorized project folder. FrameGuard extracts deliverable requirements, scans assets, maps discovered files to requirements, flags candidate or missing items, presents an audit report, and requests confirmation before organizing files.

### 5. Substantive difference from existing tools and conventional AI solutions
Conventional AI chatbots lack secure NAS storage integration, while storage tools lack requirement comprehension. FrameGuard connects natural-language brief requirements directly to concrete NAS files via local UGOS agents, completely eliminating cloud uploads, recurring subscriptions, and manual checklist auditing.

### 6. UGREEN AI NAS capabilities and workflow steps
Phase 1: `document_understanding` extracts structured requirements from the brief. Phase 2: `file_search` and `photo_search` discover assets and photo index tags. Phase 3: `duplicate_detection` flags redundant assets. Phase 4: `file_organize` structures approved assets into standard directories.

### 7. Technical approach, supported CLI capabilities, expert-agent orchestration, inputs, permissions, AI models, and data handling
Pure Markdown architecture complying with the Uliya Skill Standard. Orchestrates registered agents (`document-agent`, `file-agent`, `photo-agent`) via official UGOS CLI capabilities without external scripts or runtimes. Requires read permissions strictly within the target folder. Employs local Uliya neural models, guaranteeing zero external telemetry or cloud leakage.

### 8. Current development status
Specification complete. Core `SKILL.md` manifest, capability mapping, workflow schemas, safety protocols, and report templates are fully authored and statically validated. Runtime testing on physical NAS hardware is scheduled for the finalist stage upon access to UGREEN AI NAS hardware.

### 9. Two core validation cases and one edge case
Core 1: Full delivery brief matched against complete campaign folder; verifies 100% evidence coverage across photos and videos. Core 2: Mixed delivery brief where video assets are omitted; verifies accurate detection of MISSING status without false substitutions. Edge Case: Restricted-permission folder; confirms graceful abort, zero file modifications, and explicit error feedback.

### 10. Known limitations and dependencies
Requires UGOS Pro with active `file-agent`, `document-agent`, and `photo-agent`. Visual aesthetic quality inspection is deliberately excluded, relying strictly on file-level and index evidence. Write operations require explicit user approval.
