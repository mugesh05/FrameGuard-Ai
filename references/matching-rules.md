# Requirement Matching Rules

FrameGuard AI must only label a requirement as **VERIFIED** when the following evidence hierarchy is satisfied (see Capability Map for available data).

## 1. Type Match
- The file extension must belong to the category defined for the requirement (see SKILL.md table).
- If the requirement specifies a format (e.g., `JPEG`, `MP4`), the extension must match exactly. If only a generic type is mentioned (e.g., "photographs"), any known photograph extension qualifies.

## 2. Quantity Match
- The number of files that satisfy **Type Match** and any additional qualifier (see 3) must be **greater than or equal** to the required quantity.
- If the required quantity is a range (e.g., "5‑10"), the actual count must fall within the range.

## 3. Qualifier Match (Optional)
- **Keyword in filename** – the filename (excluding extension) contains a case‑insensitive keyword derived from the requirement description (e.g., "hero", "vertical", "close‑up").
- **Folder context** – the file resides in a subfolder whose name matches a qualifier (e.g., `/hero/`, `/vertical/`).
- **Photo index tags** – if `photo_search` returns matching tags (person, location, custom tags) that align with the qualifier, treat as evidence.
- **When qualifiers cannot be verified** (e.g., visual attributes like composition), the status must be **CANDIDATE** even if type and quantity match.

## 4. Evidence Status Determination
| Evidence Present | Status |
|---|---|
| Type ✅, Quantity ✅, Qualifier ✅ (or not required) | **VERIFIED** |
| Type ✅, Quantity ✅, Qualifier ❓ (insufficient evidence) | **CANDIDATE** |
| Type ✅, Quantity ❌ (shortfall) | **MISSING** |
| Type ❓ (unsupported file type or missing capability) | **UNKNOWN** |
| Any required capability unavailable (e.g., `photo_search` disabled) | **UNKNOWN** |

## 5. Edge Cases
- **Zero‑quantity requirement** – treat as automatically satisfied.
- **Duplicate files** – do not double‑count duplicates when assessing quantity. Each unique file path counts once.
- **Multiple requirements of the same type** – allocate distinct candidate files to each requirement greedily; if a file could satisfy multiple requirements, prefer the one with the highest qualifier match.

## 6. Reporting
- The audit report must list for each requirement: required quantity, matched file count, status, and the file paths used for the decision.
- For **CANDIDATE** items, include a note like "requires human verification of visual attributes".
- For **UNKNOWN** items, include a reason (e.g., "photo index unavailable", "file type not searchable").
