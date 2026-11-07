# 1. Output evaluation & quality

## What the exam tests
Whether you can look at a Claude answer and say *how good it is and why*, rather than just "it looks fine". Expect scenarios where an answer is fluent but wrong, incomplete, or off-topic, and you pick the right next step.

## 1.1 The three quality axes
| Axis | Question to ask | Typical failure |
|---|---|---|
| **Accuracy** | Are facts, numbers, names and citations correct? | Invented statistic, wrong date |
| **Completeness** | Did it do *every* part of the request? | Two of five requested sections missing |
| **Relevance** | Does it fit the purpose and audience? | Analyses the wrong company or drifts into side topics |

A fourth, practical axis is **fitness for use**: right length, tone, format and reading level for the audience.

## 1.2 Hallucination: what it is and where it hides
A *hallucination* is content that sounds plausible but is not supported by facts or by the material you supplied. It is not lying; the model produces likely-sounding text.

**Highest-risk content (always check):**
- Specific numbers, percentages, dates, prices
- Citations, URLs, case names, paper titles, page numbers
- Direct quotes attributed to people
- Legal, medical, tax or regulatory claims
- Niche or very recent facts, internal company details Claude was never given

**Lower-risk content:** reformatting your own text, summarising a document you pasted, brainstorming, restyling tone.

**Reducing hallucination (these appear in exam answers):**
1. Give the source material in the prompt.
2. Say "answer only from the provided document; if it isn't there, say so".
3. Ask for supporting quotes, then spot-check them.
4. Allow "I don't know" explicitly.
5. Verify independently anything high-stakes.

## 1.3 Fluent ≠ correct
Claude's tone is equally confident when right and when wrong. Never use *confidence*, *length* or *good formatting* as evidence of correctness.

## 1.4 Reasoning and numbers
- Ask Claude to show its steps, then check the logic *and* recompute the arithmetic yourself (spreadsheet or calculator).
- Look for **internal contradictions**, e.g. the summary says +12% but the table says +9%.
- Long structured answers can hide one wrong number. Check the ones that drive decisions.

## 1.5 A repeatable evaluation routine (use on the job and in the exam)
1. **Re-read the request.** List what was asked.
2. **Completeness pass:** tick off each requirement.
3. **Relevance pass:** audience, scope, purpose.
4. **Fact pass:** mark every checkable claim; verify high-risk ones against a source of record.
5. **Consistency pass:** numbers and names agree across sections.
6. **Decide:** accept, revise with a targeted follow-up, or escalate to a human.

## Worked example
*Request:* "Summarise this 12-page vendor contract: payment terms, termination, liability cap, renewal."
*Output:* Good prose covering payment, termination and renewal; says the liability cap is "$2M".
- Completeness: ✔ all four topics? Liability cap is mentioned but check the clause.
- Fact pass: find the cap clause in the contract. It says **12 months of fees**, not $2M. → Error caught.
- Action: correct, and re-prompt "quote the clause for each item".

## Exam traps
- ❌ "Accept the answer because Claude cited a source." → citations can be invented; verify them.
- ❌ "Ask Claude if it is sure." → not verification.
- ❌ "Discard everything." → over-reaction; fix the specific error.
- ✅ Look for: *verify against the original source / canonical reference*.

## Self-check
<details><summary>Q1. A summary omits one requested section. Which axis failed?</summary>Completeness.</details>
<details><summary>Q2. Name three content types most likely to be hallucinated.</summary>Statistics, citations/URLs, quotes (also legal/medical specifics, niche facts).</details>
<details><summary>Q3. Why is "Claude sounds confident" not evidence?</summary>Tone does not vary with correctness; always verify risky claims independently.</details>

## Learn more
- Reduce hallucinations (Anthropic docs): https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Define success criteria: https://docs.claude.com/en/docs/test-and-evaluate/define-success
- Anthropic Academy (free courses, incl. AI Fluency): https://anthropic.skilljar.com
