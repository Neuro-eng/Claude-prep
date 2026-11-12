# Domain 4: Governance, Safety & Risk Management (14%)

## What the exam tests
Designing **enforced** controls, mapping regulations to technical measures, and handling incidents.

## 4.1 The core principle
> **Instructions are requests; controls are guarantees.** A sentence in a prompt can be bypassed by injection, drift or a model update. Anything that *must* hold (access, compliance, limits) is enforced in code, infrastructure or process.

## 4.2 Threat model (map to OWASP LLM Top 10)
| Risk | Meaning | Control |
|---|---|---|
| **Prompt injection** (direct/indirect) | Attacker text overrides behaviour | Untrusted-data handling, privilege separation, tool allow-lists, approvals |
| **Sensitive data disclosure** | Leaks PII/secrets/other users' data | ACL at retrieval, redaction, output filtering, no secrets in context |
| **Excessive agency** | Agent has too much power | Least privilege, scoped tools, approval for high-impact actions |
| **Insecure output handling** | Output executed/rendered unsafely | Treat output as untrusted: escape, sandbox, validate |
| **Supply chain** | Untrusted tools/MCP servers/models | Vet and pin, review permissions, monitor |
| **Over-reliance / hallucination** | Users trust wrong output | Grounding, citations, HITL, UI that signals uncertainty |
| **Denial of wallet / DoS** | Cost or load abuse | Rate limits, budgets, input size caps |

## 4.3 Layered guardrails (defence in depth)
1. **Input:** length limits, injection/PII screening (rules or a small classifier model).
2. **Design:** privilege separation: the component that reads untrusted text cannot call sensitive tools.
3. **Model:** clear system prompt (helpful but not relied upon).
4. **Action gating:** allow-lists, parameter validation, spending caps, **human approval** for irreversible steps.
5. **Output:** schema validation, moderation, PII/secret scanning, citation checks.
6. **Monitoring:** logs, anomaly alerts, red-team tests.
Place guardrails at **trust boundaries**, in code.

## 4.4 Human oversight design
Define: *which actions need approval*, who approves, SLA, what context they see, what happens on timeout (default = **deny**), how decisions are logged. Avoid "rubber-stamp" fatigue: only gate what matters, show clear diffs.

## 4.5 Data governance
- **Minimisation:** send only needed data; redact/pseudonymise.
- **Access:** end-user permissions flow to data; separate tenants; no cross-customer retrieval.
- **Retention & deletion:** define how long prompts/outputs/logs are kept; support deletion requests; know vendor retention terms and options (confirm current terms).
- **Residency & transfers:** where data is processed; legal basis for cross-border transfer.
- **Audit logging:** who asked, what data was retrieved, which tools ran, who approved; tamper-resistant; retention per policy.

## 4.6 Regulatory mapping (know the principle, not legal advice)
| Regime | Key ideas → technical control |
|---|---|
| **GDPR** | Lawful basis, purpose limitation, **minimisation**, accuracy, storage limits, data-subject rights (access/erasure), **processor contracts (DPA)**, DPIA for high-risk processing, restrictions on solely automated significant decisions → minimisation pipeline, deletion workflow, human review of significant decisions, DPA with vendor |
| **HIPAA** | Protect PHI; **Business Associate Agreement** with vendors; minimum necessary; safeguards; audit controls → BAA in place, de-identify where possible, access logs, role-based access |
| **SOC 2 / ISO 27001** | Security management evidence | Vendor attestations + your own controls |
| **EU AI Act** | Risk-tiered obligations (e.g. transparency, high-risk system requirements) | Classify use case, document, human oversight, logging (verify current requirements) |
Approach: list each requirement → name the **control** → name the **evidence** (log, policy, test report) → assign an owner.

## 4.7 Incident response
**Detect** (alerts/reports) → **Contain** (kill switch, revoke tokens, disable tool) → **Assess** (logs: scope, data, users) → **Eradicate/fix** → **Notify** (legal/regulatory/customers as required, within deadlines) → **Recover** → **Post-mortem** → **add cases to eval suite**. Practise with tabletop exercises; keep an on-call owner.

## 4.8 Red-teaming
Test regularly with adversarial prompts (injection, jailbreaks, data extraction, tool abuse). Automate a regression set. Fix classes of issues, not single strings.

## Scenario
*A hospital assistant summarises patient notes for clinicians.*
- Vendor: BAA signed; data processed in approved environment.
- Access: clinician identity → retrieval filtered to patients they treat.
- Guardrails: output PII scanner for other patients' IDs; summaries labelled "AI-generated, verify".
- HITL: any suggested order/medication change is **only** shown for clinician confirmation.
- Logging: immutable access log; incident runbook tested quarterly.

## Exam traps
- ❌ "Add 'never share PHI' to the system prompt" as the control.
- ❌ Giving one broad credential to the agent. ❌ Auto-executing irreversible actions.
- ❌ Treating compliance as a one-off document rather than controls + evidence.
- ✅ Enforce in code; least privilege; approvals; logs; BAA/DPA; incident runbook.

## Self-check
<details><summary>Q1. Why isn't a prompt rule enough?</summary>It can be bypassed or drift; enforce with access control, validation and gating.</details>
<details><summary>Q2. Give the incident-response order.</summary>Detect, contain, assess, fix, notify, recover, post-mortem, add to evals.</details>
<details><summary>Q3. What does HIPAA require of a vendor handling PHI?</summary>A Business Associate Agreement plus safeguards.</details>
<details><summary>Q4. Timeout on an approval request: default?</summary>Deny (fail safe).</details>

## Learn more
- Mitigate jailbreaks & prompt injections: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
- Reduce hallucinations: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- OWASP Top 10 for LLM Apps: https://genai.owasp.org/llm-top-10/
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- GDPR text and guide: https://gdpr-info.eu/
- HHS HIPAA overview: https://www.hhs.gov/hipaa/index.html
- Anthropic Trust Center: https://trust.anthropic.com
