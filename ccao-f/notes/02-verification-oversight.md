# 2. Verification & human oversight

## What the exam tests
Knowing **how** to verify AI output properly and **when** a human must review or decide. Questions give you a situation and ask for the right control or escalation.

## 2.1 What counts as verification
**Real verification** compares a claim to an independent, authoritative source:
- The original contract/policy/spec
- The system of record (CRM, ERP, database)
- Official regulator/vendor documentation
- A domain expert

**Not verification:**
- Asking Claude "are you sure?" or "double-check yourself" (it may just repeat itself)
- Asking another AI and trusting its answer
- "It looks right"

Useful *support* techniques (they help you verify faster, but don't replace it): ask for quotes, ask Claude to flag claims it can't support from the source, ask for step-by-step reasoning.

## 2.2 Risk-proportional review
Match effort to the **cost of being wrong**.

| Risk | Example | Review level |
|---|---|---|
| Low | Brainstorm lunch-and-learn topics; private rough notes | Glance |
| Medium | Internal report for managers; code for non-critical tool | Owner reads fully, checks key facts |
| High | Customer-facing regulated notice; legal clause; medical info; financial advice | **Mandatory expert sign-off with checklist** |
| Critical / irreversible | Sending payments, deleting data, hiring/firing decisions | Human decides; AI only assists |

## 2.3 Human-in-the-loop (HITL): when to escalate
Escalate when **any** apply:
1. High stakes or irreversible outcome
2. Regulated domain (legal, medical, financial, HR)
3. Decision materially affects a person (employment, credit, benefits, safety)
4. Low confidence, conflicting sources, or an unusual case
5. Externally published content
6. The output contradicts an authoritative source

**HITL patterns:** approval gate before action; sampling review (e.g. 1 in 20); exception queue for low-confidence items; dual control for high-value actions.

## 2.4 Bias, tone and audience checks
- **Bias:** look for different wording/standards for different people or groups (names, gender, age, region), especially in hiring, performance, lending, support triage. Test by swapping names and comparing outputs. Keep a human accountable for the decision.
- **Tone:** match the audience (angry customer ≠ board member ≠ regulator).
- **Inclusivity & compliance wording:** check required disclaimers and regulated language.

## 2.5 Accountability
The human who publishes or acts on AI output **owns** it. "The AI wrote it" is never a defence. Good processes record: who reviewed, what was checked, against which source.

## Worked example
A bank drafts customer emails with Claude about a new overdraft fee.
- Risk: external + regulated → **mandatory compliance review**.
- Checklist: fee amount vs. approved fee schedule (source of record), required disclosure text, tone for vulnerable customers, no promises beyond policy.
- Reviewer signs off; template stored with approval date.

## Exam traps
- ❌ "Ask Claude to verify its own answer."
- ❌ "Review everything equally" (inefficient) or "review nothing because it's low-cost" (unsafe). The answer is *risk-based*.
- ❌ Fully automating decisions that affect people.
- ✅ "Escalate to a qualified human / verify against the source of record."

## Self-check
<details><summary>Q1. Name two things that are NOT verification.</summary>Asking Claude "are you sure"; trusting another AI's answer.</details>
<details><summary>Q2. Give three triggers for human review.</summary>High stakes/irreversible, regulated content, materially affects a person, low confidence, conflicts with an authoritative source.</details>
<details><summary>Q3. How do you test for bias in screening summaries?</summary>Swap names/attributes and compare; audit patterns; keep humans accountable.</details>

## Learn more
- Claude Academy, AI Fluency course (covers Discernment and Diligence): https://anthropic.skilljar.com/ai-fluency-framework-foundations
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- Reduce hallucinations (grounding techniques): https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
