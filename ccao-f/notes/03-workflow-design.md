# 3. Workflow integration & solution design

## What the exam tests
Deciding **where** Claude fits in a business process, how to structure multi-step work, and how to communicate honestly with stakeholders.

## 3.1 Automate, augment, or keep human
| Mode | Characteristics | Example |
|---|---|---|
| **Automate** | Repetitive, rule-like, low risk, easy to check | Tagging support tickets by topic, with sampling QA |
| **Augment** | Judgement needed; AI drafts, human decides | Drafting a proposal; analyst reviews and edits |
| **Human-only** | High-stakes, ambiguous, ethical or relationship-critical | Firing decisions, final legal advice, crisis communications |

**Method:** (1) map the process step by step; (2) for each step rate *volume, risk, verifiability*; (3) assign a mode; (4) pilot small; (5) measure; (6) expand.

## 3.2 Multi-stage workflows (prompt chaining)
Break a big task into stages whose outputs you can inspect.

*Example, monthly board report:*
1. **Extract** key figures from source spreadsheets → check numbers.
2. **Analyse** trends and anomalies → analyst reviews.
3. **Draft** narrative using only the verified figures.
4. **Review** tone/accuracy against a checklist → human sign-off.

Why chains beat one giant prompt: easier debugging, smaller context per step, checkpoints for review, reuse of stages.

## 3.3 SOPs and prompt libraries
A **prompt library** is a shared catalogue of tested prompts. Each entry should have:
- Purpose and when to use
- Template with **placeholders** (`{audience}`, `{document}`)
- Required inputs and an example input/output
- Review checklist
- Owner and **version history**

Benefits: consistency regardless of who runs it, faster onboarding, auditability, continuous improvement.

## 3.4 Stakeholder communication
- **Be honest about limits:** Claude is a strong assistant, not infallible; accuracy depends on design and review.
- **Explain benefits and risks together;** state where human review stays.
- **Set measurable expectations** (e.g. "cuts first-draft time 40%, with review").
- **Avoid:** "AI will replace the team", "100% accurate", hiding limitations.
- **Change management:** train users, name an owner, collect feedback, report results.

## Worked example
A finance team wants Claude to "do the month-end commentary".
- Map: pull numbers (automate with checks) → variance explanations (augment: analyst supplies drivers) → final commentary (human sign-off).
- Template stored in the library; each month's run logged.
- Message to stakeholders: "Draft time falls from 6h to 2h; the controller still approves every number."

## Exam traps
- ❌ Automating a high-risk, hard-to-verify step "to save time".
- ❌ One enormous prompt for a multi-step process.
- ❌ Promising perfection to win support.
- ✅ Pilot → measure → expand; humans at risk points; shared templates.

## Self-check
<details><summary>Q1. What are the 3 modes?</summary>Automate, augment, human-only.</details>
<details><summary>Q2. Why chain prompts?</summary>Checkpoints, easier debugging, smaller steps, reuse.</details>
<details><summary>Q3. List four fields of a good prompt-library entry.</summary>Purpose, template/placeholders, example, review checklist, owner, version.</details>

## Learn more
- Chain complex prompts (Anthropic docs): https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/chain-prompts
- Prompt library (Anthropic docs): https://docs.claude.com/en/resources/prompt-library/library
- Building effective agents (workflow patterns): https://www.anthropic.com/engineering/building-effective-agents
