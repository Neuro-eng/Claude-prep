# 5. Prompting & task execution

## What the exam tests
Writing and improving prompts: structure, examples, format control, decomposition and iteration.

## 5.1 The five building blocks: R-C-G-C-F
| Block | Purpose | Example |
|---|---|---|
| **R**ole | Perspective/expertise | "You are a senior HR business partner." |
| **C**ontext | Background, audience, source text | "This is for 300 retail staff; policy text below." |
| **G**oal | The exact task + success criteria | "Write a 150-word announcement explaining the new leave policy." |
| **C**onstraints | Limits and must/must-not rules | "Plain English, no legal jargon, mention the 1 Jan start date." |
| **F**ormat | Output shape | "Subject line, then 3 bullets, then one-line call to action." |

**Weak:** "Write something about our new policy."
**Strong:** all five blocks filled in.

## 5.2 Core techniques
1. **Be clear and direct.** Say what you want, not what you hope it infers. Treat Claude like a smart new colleague with no context.
2. **Explain the why.** Purpose and audience let Claude make good trade-offs.
3. **Positive instructions** ("write in short sentences") beat only-negative ones ("don't be wordy").
4. **Decompose** big tasks into steps (or several prompts).
5. **Few-shot (multishot) examples:** show 2–5 input→output pairs. This is the best tool for consistent *format and style*.
6. **XML tags** (`<document>…</document>`, `<instructions>`, `<example>`) separate your instructions from your data and reduce confusion.
7. **Specify the output format** (table, JSON, bullets, length, reading level).
8. **Let Claude think** on hard problems: "Think step by step, then give the final answer in <answer> tags."
9. **Put long documents first** and the question after them.
10. **Give an out:** "If the answer isn't in the text, say 'not stated'."

## 5.3 Iteration
Treat the first output as a draft:
- Point to specific problems: "Shorten section 2 to 3 sentences; remove jargon."
- Compare versions side by side.
- If a conversation has drifted or accumulated contradictions, **start a fresh chat** with an improved prompt.
- Save prompts that work in the team library.

## Worked example (before → after)
**Before:** "Summarise this meeting."
**After:**
```
You are an executive assistant.
<transcript> …pasted text… </transcript>
Summarise for the VP who missed the meeting. Include: 1) decisions, 2) action items with owner and due date, 3) open risks.
Rules: max 150 words; if an owner or date isn't stated write "TBD"; do not invent anything.
Format: three headed sections with bullets.
```
Result: consistent, checkable, and safe against made-up owners.

## Few-shot example pattern
```
<example>
Input: "Printer jammed again, 3rd time this week!!"
Output: {"category":"Hardware","urgency":"Medium","sentiment":"Frustrated"}
</example>
(2–3 more examples) …
Now classify: "{new ticket}"
```

## Exam traps
- ❌ Vague prompt + "try again 10 times".
- ❌ Piling on adjectives or ALL CAPS instead of specifics.
- ❌ One enormous multi-task prompt.
- ✅ Specific goal/audience/format; examples for consistency; XML tags for structure; iterate on specifics.

## Self-check
<details><summary>Q1. Expand R-C-G-C-F.</summary>Role, Context, Goal, Constraints, Format.</details>
<details><summary>Q2. Best technique for consistent style/format?</summary>Few-shot examples plus an explicit format.</details>
<details><summary>Q3. Why XML tags?</summary>They separate instructions from content, reducing ambiguity.</details>

## Learn more
- Prompt engineering overview: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview
- Be clear and direct: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct
- Multishot prompting: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting
- Use XML tags: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags
- Let Claude think: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought
- Long-context tips: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips
