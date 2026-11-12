# 8. Troubleshooting & optimisation

## What the exam tests
Diagnosing *why* results are poor and choosing the smallest effective fix.

## 8.1 Diagnose before you fix
| Symptom | Likely causes | First fix |
|---|---|---|
| Ignores a rule | Rule buried, vague, or contradicted elsewhere | Make it explicit, near the end of the prompt, remove conflicts |
| Wrong facts | Missing source, hallucination | Provide source, require quotes, verify |
| Wrong tone/level | Audience not stated | State audience + give an example |
| Inconsistent format | No format/examples | Add template + few-shot examples |
| Shallow answer | Task too big/vague; model too small | Decompose; add detail; consider stronger tier |
| Drifts in long chat | Context grew/conflicted | Restate constraints; new chat with summary |
| Contradicts earlier answers | Conflicting files/instructions | Clean knowledge and instructions |
| Slow/expensive at volume | Model too large for task | Smaller tier + tests |

## 8.2 Change one thing at a time
If you change prompt, model and files together, you can't tell what helped. Keep a before/after log.

## 8.3 Long conversations and drift
Models can lose early details or follow later contradictory messages. Good habits:
- One task per chat.
- Periodically summarise decisions.
- When it goes wrong, start a **new chat** with: goal, constraints, key decisions, relevant text.
- Re-state critical constraints instead of assuming they're remembered.

## 8.4 Getting consistent results
- Use **templates** with fixed structure (XML or headings).
- Add **few-shot examples**.
- Define **acceptance criteria** ("must include date, owner, risk; ≤120 words") and check them.
- Expect natural wording variation; judge against criteria, not word-for-word sameness.
- Use review checklists for recurring outputs.

## 8.5 Optimising
Quality first, then speed/cost: confirm quality on a sample set, then try a smaller model or a shorter prompt and re-check.

## Worked example
Complaint: "Claude's weekly status emails keep changing format and sometimes omit risks."
Diagnosis: no template, no examples, risks only mentioned in passing.
Fix (one change at a time): (1) add a fixed template with a mandatory "Risks" section → better; (2) add two example emails → consistent; (3) checklist: "includes Risks and Owner" before sending.

## Exam traps
- ❌ Rewriting everything at once. ❌ "Switch tools" as the first move.
- ❌ Adding more and more corrections in a derailed chat.
- ✅ Identify the likely cause; make a targeted fix; test; restart a drifted chat with a summary.

## Self-check
<details><summary>Q1. Chat drifting: best action?</summary>Start a new chat with a concise summary of goal, constraints and decisions.</details>
<details><summary>Q2. Why change one variable at a time?</summary>To learn what actually caused the improvement.</details>
<details><summary>Q3. How to improve format consistency?</summary>Template + few-shot examples + acceptance checklist.</details>

## Learn more
- Prompt engineering overview: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- Increase output consistency: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency
- Define success criteria: https://platform.claude.com/docs/en/test-and-evaluate/define-success
