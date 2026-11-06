# 8. Troubleshooting & optimization

## Diagnose before fixing
Bad output usually traces to: **ambiguous prompt**, **missing context**, **conflicting instructions**, **wrong model**, **bloated/outdated knowledge**, or a **too-complex single request**.
Change **one thing at a time** and compare.

## Long conversations & drift
Over many turns Claude can lose early details or drift from instructions.
- Re-state key constraints; summarise progress.
- **Fork/start a new chat** with a concise summary of decisions so far.
- Separate tasks into separate chats.

## Consistency & reliability
- Use templates, explicit formats, few-shot examples.
- Fixed structure (XML/JSON-style) improves repeatability.
- Accept that wording varies; define **acceptance criteria** and check against them.
- Build a checklist for review rather than hoping for identical output.
