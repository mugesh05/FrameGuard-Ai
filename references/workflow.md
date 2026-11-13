# Workflow Diagram

```mermaid
flowchart TD
    A[Start] --> B{Brief Source?}
    B -->|NAS path| C[Document Agent: document_understanding]
    B -->|Direct text| D[Use provided text]
    C --> E[Parse requirements (document_understanding)]
    D --> E
    E --> F[Ask for project folder]
    F --> G{Folder accessible?}
    G -->|Yes| H[File Agent: file_search]
    G -->|No| I[Report error & stop]
    H --> J[Photo Agent: photo_search (optional)]
    J --> K[Consolidate asset inventory]
    K --> L[Match requirements to assets]
    L --> M[Duplicate detection (optional)]
    M --> N[Readiness analysis]
    N --> O[Propose organization options]
    O --> P[User confirms actions]
    P -->|Yes| Q[Execute file_organize / create album]
    P -->|No| R[Skip organization]
    Q --> S[Generate audit report]
    R --> S
    S --> T[Present report & optional save]
    T --> U[End]
```