# CCAR-P case studies: practise the thinking

For each: read the situation, decide your answer, then open the model answer.

## Case 1: "We need an agent!"
**Situation:** A logistics firm wants to read supplier emails and put the order number, ship date and quantity into their ERP. ~30k emails/day, 3 email templates plus free text. Errors must be <2%. Latency isn't critical.
<details><summary>Model answer</summary>

**Design:** workflow, not an agent. Small/mid model, **structured output** (schema), code validation (date/quantity formats, order exists in ERP), low-confidence → human queue, nightly **batch** for backlog.
**Why:** steps are fixed and verifiable; an agent adds cost and unpredictability.
**Controls:** write to ERP via a scoped service account with idempotency keys; audit log.
**Evals:** 1,000 labelled emails incl. edge cases; track per-field accuracy and segment by template/language; gate release at agreed threshold.
**Rejected:** multi-agent (unneeded), real-time streaming (not required), prompt-only validation.
</details>

## Case 2: The leaky knowledge assistant
**Situation:** An HR RAG assistant sometimes shows salary data to managers who shouldn't see it. The team proposes adding "never reveal salary of other teams" to the system prompt.
<details><summary>Model answer</summary>

**Reject** prompt-only fix. Enforce **document-level access control at retrieval**: filter the index by the asking user's entitlements (pass identity through), so restricted chunks never enter the context. Add output scanning, audit logs, and adversarial tests (injection asking for salaries). Add these cases to the eval suite.
**Why:** prompts can be bypassed; compliance needs enforced controls.
</details>

## Case 3: Bad answers: model or retrieval?
**Situation:** A support bot answers 70% correctly. Stakeholders say "use the biggest model".
<details><summary>Model answer</summary>

**Diagnose first.** Take 100 failures; classify: right chunk **not retrieved** vs retrieved-but-misused vs source wrong/stale vs format. If retrieval misses dominate → hybrid search, reranking, better chunking, contextual retrieval, metadata filters. If misuse → clearer prompt/few-shot examples. Only test a bigger model via the **eval suite**, comparing quality vs cost.
**Why:** measuring locates the cause; "bigger model" is an untested, costly guess.
</details>

## Case 4: Cost blow-up
**Situation:** A contract Q&A tool sends a 40-page contract plus a 5k-token instruction set with every question. Users ask ~10 questions per contract. Bills are high; responses slow.
<details><summary>Model answer</summary>

**Prompt caching:** put instructions + contract first (static prefix, marked for caching), the question last. Subsequent questions hit the cache (cheaper reads, lower latency) within the TTL. Consider retrieving relevant clauses if contracts are huge. Keep eval baseline to confirm no quality loss. If bulk offline analysis is needed, use **batch**.
**Rejected:** shortening instructions blindly, switching to the smallest model without evals.
</details>

## Case 5: Autonomous finance agent
**Situation:** The CFO wants an agent that reconciles invoices and pays suppliers automatically.
<details><summary>Model answer</summary>

Agent/workflow may **prepare** reconciliation, but **payments are irreversible and high-impact → human approval gate** (and dual control above a threshold). Least-privilege tools (read vs payment separated), idempotency keys, spend caps, full audit trail, anomaly alerts, kill switch. Start with shadow mode (suggest only), compare to humans, then graduated autonomy for low-value, low-risk categories.
**Messaging:** autonomy earned with evidence, not granted up front.
</details>

## Case 6: Regulator and the clinical summariser
**Situation:** A health provider wants Claude to summarise patient notes. Compliance asks "how do we prove HIPAA compliance?"
<details><summary>Model answer</summary>

Map requirements → controls → evidence: **BAA** with vendor; approved environment; role-based access and retrieval filtering by treating relationship; minimum-necessary inputs/de-identification where possible; audit logs of access; output labelled AI-generated with clinician verification; incident runbook; periodic access reviews and red-team tests. Provide a control matrix and logs as evidence.
</details>

## Case 7: Upgrading the model
**Situation:** A newer model version is available and the old one will be deprecated in 6 months.
<details><summary>Model answer</summary>

Planned change: run full eval suite on the new model (quality, cost, latency, safety); examine **segment** regressions; adjust prompts/examples; **canary** (e.g. 5–10% traffic) with monitoring; keep **rollback**; communicate dates; update documentation and cost forecasts. Make model IDs configuration, not hard-coded.
</details>

## Case 8: Team adoption of Claude Code
**Situation:** 60 developers; leadership wants "AI everywhere" and plans to give CI full repo and cloud credentials so Claude can "fix things automatically".
<details><summary>Model answer</summary>

Pilot first; commit `CLAUDE.md` + shared settings with **deny** rules for secrets; hooks for lint/tests/secret scanning; CI uses **read-only, least-privilege tokens, no production credentials**, sandboxed runners; Claude proposes PRs, **humans approve merges**. Track review time, defects, cost per dev; expand by evidence.
</details>
