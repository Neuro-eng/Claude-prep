# 2. Verification & human oversight

## Grounding and source checking
- Compare claims against **canonical references** (official docs, source systems, original contracts), not against another AI answer.
- Asking Claude "are you sure?" is **not** verification.
- Provide documents in-context and require quotes/references, then spot-check them.

## Tone, audience, bias
- Check output tone vs. audience (customer, exec, regulator).
- Audit for biased framing or unfair assumptions, especially in HR, lending, hiring, and customer-facing material.

## Human-in-the-loop (HITL)
Escalate to a human when:
- **High stakes / irreversible**: legal, financial, medical, safety, external publication.
- **Regulated** content or personal data decisions.
- **Low confidence**, conflicting sources, or novel situations.
- Decisions that **materially affect people**.

Design principle: match review depth to **risk**. Low-risk internal drafts need light review; external or regulated content needs mandatory sign-off with a checklist.
