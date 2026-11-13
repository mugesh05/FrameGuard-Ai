# Capability Map

This document maps every UGOS capability that FrameGuard AI uses to the official expert agent, required inputs, outputs, and error‑handling method. All capabilities are listed in the official **Uliya Skill Development Standard** and are available through the **UGOS Skill Creation Tool**.

| Capability | Expert Agent | Command / Interface | Required Inputs | Expected Output | Error‑Handling |
|---|---|---|---|---|---|
| `document_understanding` | `document-agent` | `document_understanding <NAS‑path>` | - Path to a document (PDF, DOCX, TXT) containing the creative brief. | - Extracted plain‑text content. - Structured sections (if supported). | - If file unreadable (permission denied, unsupported format) → return error code `DOC_READ_ERR` and message. - Skill must ask user to paste brief text.
| `file_search` | `file-agent` | `file_search <folder‑path> [filters]` | - Root folder path to scan. - Optional filters (extensions, date range). | - List of file metadata: path, type, size, modification time. | - If folder inaccessible → error `FOLDER_ACCESS_ERR`. - If no files → empty list (treated as valid).
| `photo_search` | `photo-agent` | `photo_search <folder‑path> <keyword>` | - Folder scope. - Keyword(s) derived from brief (e.g., "hero", "vertical"). | - List of photo entries with path, tags, and any available metadata (faces, location). | - If photo index unavailable → error `PHOTO_INDEX_UNAVAILABLE`. Skill degrades to file‑only search.
| `duplicate_detection` | `file-agent` | `duplicate_detection <folder‑path>` | - Folder path to evaluate. | - Groups of potential duplicate files (paths, reason: name match, hash match). | - If capability not present → error `DUPLICATE_UNSUPPORTED`. Skill reports limitation.
| `file_organize` | `file-agent` | `file_organize <operations‑json>` | - JSON describing move/copy operations (source, destination). Must be user‑approved. | - Confirmation of performed operations. | - If operation fails (e.g., permission) → error `ORGANIZE_OP_ERR`. Skill aborts further moves.

All commands are executed via the UGOS CLI and are **read‑only** unless the user explicitly approves a write operation (organize, archive, report save). The Skill never invokes custom scripts or external binaries.
