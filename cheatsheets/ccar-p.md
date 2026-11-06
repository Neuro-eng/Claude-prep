# CCAR-P cheat sheet

**63 q · 120 min · $175 · 720/1000 scaled · scenario/consulting style**

| Domain (weight) | Core ideas |
|---|---|
| **Integration 19%** | MCP · least privilege · secrets managers · RAG (chunking, hybrid, rerank, ACL at retrieval) · idempotent retries + backoff |
| **Design 17%** | Single call → workflow → agent → multi-agent: **simplest that works**. Success criteria first. |
| **Eval 16%** | Code graders (objective) · LLM-judge (rubric + calibrate) · humans (gold). Retrieval vs model diagnosis. Regression + segments. |
| **Governance 14%** | **Controls > prompt lines.** Layered guardrails in code. HITL for irreversible. GDPR/HIPAA → control + evidence. Incident runbook. |
| **Stakeholders 14%** | Discovery before build. Honest expectations. Business-term trade-offs. Change control, gated release, rollback. |
| **Models/Context 13%** | Right-size model. Few-shot, CoT. Prompt caching (static prefix first). Relevant context only. |
| **DevProd 7%** | Shared committed config · docs · safe CI permissions · rollout checks |

## Top 5 wrong-answer patterns
1. Biggest model for everything
2. Agent where a workflow works
3. Compliance via prompt wording
4. "Add more context" for a retrieval problem
5. Build before discovery / success criteria

## Elimination order
Simplest design → enforced control → least privilege → measure before changing → HITL for high-risk.
