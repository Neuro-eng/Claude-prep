# Domain 4: Governance, Safety & Risk Management (14%)

## Controls beat instructions
> **Compliance needs real controls in the system. A line in the prompt is not enough.**
Prompts can be bypassed (injection, drift). Enforce with: access control, input/output filters, validation, logging, approvals.

## Guardrails
Layered: input screening → system constraints → output validation/moderation → action gating.
Place them **in code/infrastructure** at trust boundaries.

## Human review
Require human approval for irreversible, high-value, regulated or externally visible actions. Define escalation criteria and SLAs.

## Data access
Least privilege; enforce user's permissions on retrieved data; data minimisation; retention/deletion policy; separate tenants; PII redaction.

## Compliance frameworks
- **GDPR**: lawful basis, minimisation, purpose limitation, data-subject rights, cross-border transfer rules.
- **HIPAA**: PHI safeguards, BAAs with vendors, audit controls, minimum necessary.
- Also think: SOC 2, ISO 27001, sector rules.
Map each requirement to a **technical control + evidence** (audit logs).

## Incident handling
Detect → contain (kill switch, revoke creds) → investigate (logs) → remediate → notify as required → post-mortem → add to eval set.

## Prompt-injection defence (architect view)
Untrusted content = data; privilege separation; limit tool scope; confirm sensitive actions; sandbox; monitor.
