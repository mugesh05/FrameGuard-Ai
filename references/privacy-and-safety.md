# Privacy and Safety Policy

FrameGuard AI is built to operate **entirely on‑device** within the UGREEN AI NAS environment. All processing happens locally; no data is transmitted to external services unless the user explicitly authorizes a share or export operation.

## Core Principles

1. **Scope‑Limited Access**
   - The Skill only reads files inside the **user‑specified `project_folder`** and the brief document (if provided as a NAS path).
   - No access is requested outside this scope. Any attempt to read beyond the authorized path triggers an immediate error and the Skill aborts.

2. **Read‑Only by Default**
   - All UGOS capabilities used (`document_understanding`, `file_search`, `photo_search`, `duplicate_detection`) are read‑only.
   - Write‑capable actions (`file_organize`, report save) are executed **only after** the user gives explicit confirmation.

3. **No External Transmission**
   - The Skill never uploads raw files, extracted text, or metadata to cloud APIs.
   - All AI inference (e.g., document parsing) runs on the local Uliya model bundled with the NAS.

4. **User‑Controlled Persistence**
   - Audit reports are stored on the NAS **only** if the user approves a save location.
   - If the user declines, the report is returned as plain text within the chat session and is not persisted.

5. **Transparent Error Reporting**
   - Any permission denial, capability unavailability, or unexpected error is reported verbatim to the user.
   - The Skill does not attempt retries that could bypass security controls.

## Data Handling Details

| Data Type | Where Processed | Retention | Export Allowed |
|---|---|---|---|
| Creative brief text | In‑memory Uliya LLM session | Deleted after session ends | Only if user explicitly copies/pastes it out of the chat |
| File metadata (paths, sizes, timestamps) | In‑memory; used for matching | Deleted after session ends | No – never exported unless user asks for a report copy |
| Duplicate detection hashes | In‑memory; derived from file content (if supported) | Deleted after session ends | No – never exported |
| Audit report | In‑memory; optionally written to NAS path upon user consent | Persists on NAS only if saved by user | User may download the report manually |

## User Confirmation Prompts

- **Organize Files** – "Do you want me to move the discovered files into the proposed folder structure? This will modify file locations on your NAS."
- **Save Report** – "Would you like me to save the audit report to `[path]`?"
- **External Share** – No external sharing is offered. If a future extension required it, the Skill would first request explicit consent and disclose the destination.

## Failure Modes & Safeguards

- **Permission Denied** – Skill aborts the operation, reports the exact path and required permission, and does not attempt fallback reads.
- **Capability Unavailable** – Skill logs the limitation, proceeds with reduced functionality, and marks affected requirements as `UNKNOWN`.
- **User Declines Action** – Skill respects the decision, skips the operation, and continues with remaining steps.
- **Unexpected Crash** – All in‑memory data is cleared; no partial writes are left on the NAS.

## Compliance

- **GDPR / Data Minimisation** – Only the minimal necessary data (file paths and brief text) is processed.
- **Security** – All operations respect UGOS ACLs; the Skill does not elevate privileges.
- **Auditability** – The final audit report includes a section listing any permissions that were denied or capabilities that were unavailable, providing a clear audit trail.

---

**FrameGuard AI** adheres to the UGREEN AI NAS privacy guidelines and the Uliya Skill Development Standard, ensuring a safe, transparent, and on‑device experience for creative professionals.
