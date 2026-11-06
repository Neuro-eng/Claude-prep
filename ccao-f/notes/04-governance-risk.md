# 4. Governance, risk & responsible use

## Data classification & privacy
- Classify data (public / internal / confidential / regulated) **before** using it with AI.
- **Sanitise/redact** PII, PHI, client identifiers when not needed for the task.
- Follow org policy on what may go into which Claude plan/workspace. Enterprise and team plans have different data terms from consumer ones; check your policy.

## Intellectual property
- Don't paste trade secrets or third-party confidential material into tools not approved for it.
- Review output for copyright/IP risk before publishing; Claude output is not automatically cleared for reuse.

## Prompt injection
- **Direct**: user types instructions to override behaviour.
- **Indirect**: malicious instructions hidden in content Claude reads (web page, email, document, file).
- Defences: treat external content as **untrusted data**, not instructions; limit what actions Claude can take; require human approval before sensitive actions; don't auto-act on instructions found inside documents.

## Acceptable-use policy & ethics
- A good AI policy: approved tools, data rules, disclosure expectations, human review requirements, accountability, incident reporting, training.
- Be transparent when AI contributes, according to policy.
