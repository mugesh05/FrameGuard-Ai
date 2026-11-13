# Technical Architecture

FrameGuard AI follows the Uliya Skill Development Standard and relies exclusively on UGOS‑exposed capabilities. The architecture is a **linear orchestrated workflow** composed of registered expert agents:

1. **Document Agent (`document-agent`)** – Executes `document_understanding` to extract plain‑text from a brief document or processes user‑provided text directly.
2. **File Agent (`file-agent`)** – Executes `file_search` to recursively list files in the authorized project folder and `duplicate_detection` to locate potential duplicate assets.
3. **Photo Agent (`photo-agent`)** – Executes `photo_search` to retrieve indexed photo metadata (tags, locations, people) within the project scope.
4. **File Agent (write)** – Executes `file_organize` for user‑approved moves, and writes the final audit report (`file_write`).

All communication between the skill and agents is performed via the UGOS CLI, which abstracts the underlying system calls. No custom scripts, external binaries, or third‑party runtimes are introduced.

**Data Flow:**
```
User Input → Document Agent (parse brief) → Requirement List
Requirement List + Project Folder → File Agent (search) → Asset Inventory
Requirement List + Asset Inventory → Matching Engine (local logic) → Status Mapping
Asset Inventory → Duplicate Detection (optional) → Duplicate List
Status Mapping + Duplicate List → Readiness Summary → Report Template
User Confirmation → File Agent (organize / save) → Final Report
```

Each step validates its inputs and aborts with a clear error if permissions or capabilities are insufficient. The skill is fully deterministic and stateless beyond the current session.
