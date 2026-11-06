# 3. Workflow integration & solution design

## Automate vs. augment vs. human-only
| Use | When |
|---|---|
| **Automate** | Repetitive, low-risk, well-defined, easily verifiable |
| **Augment** (human + Claude) | Judgement needed; Claude drafts, human decides |
| **Human-only** | High-stakes, ambiguous, relationship/ethical, or where errors are unacceptable |

Map the process, find the steps, classify each, then pilot small.

## Multi-stage workflows / prompt chaining
Break complex work into stages (extract → analyse → draft → review), with each stage's output checked before the next. Easier to debug than one giant prompt.

## SOPs and prompt libraries
- Capture proven prompts as **templates** with placeholders, usage notes, an owner, and version history.
- Standardise across the team so quality doesn't depend on who wrote the prompt.
- Pair each template with a review checklist.

## Stakeholder communication
- Set expectations: Claude is a strong assistant, **not infallible**; describe limits honestly.
- Explain benefits **and** risks; share what human review remains.
- Avoid overselling ("it will replace the team") and under-delivering.
