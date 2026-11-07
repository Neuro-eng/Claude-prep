# 7. Configuration & knowledge management

## What the exam tests
Setting up Projects properly and keeping knowledge clean so Claude's answers stay accurate and consistent.

## 7.1 Two places to put things
| Put here | What | Example |
|---|---|---|
| **Custom instructions** | *Behaviour* that applies to every chat | Tone, role, format rules, "always cite the policy section", escalation rules |
| **Project knowledge** | *Reference material* Claude can look up | Policies, product specs, FAQs, templates, past examples |

Rule: **stable guidance → instructions; reference documents → knowledge.** Don't paste a 50-page spec into the instructions box.

## 7.2 Writing good custom instructions
- Short, specific, organised (headings/bullets or XML tags).
- State role, audience, tone, output format, hard rules, what to do when unsure.
- Avoid contradictions ("be brief" + "explain everything in detail").
- Update when processes change; assign an owner.

## 7.3 Curating knowledge
**Do:** current versions only · clear file names (`Refund-Policy-2026-v3.pdf`) · one topic per file where possible · remove duplicates · sanitise sensitive data · add a short index file saying what each document covers.

**Don't:** keep old and new versions together · upload everything "just in case" · include contradictory sources · store passwords/secrets or unneeded personal data.

## 7.4 The context window and "dilution"
The **context window** is Claude's working memory for one conversation: instructions + knowledge in use + chat history + your message + its reply. It is large but finite.
- Too much loosely relevant material **dilutes** attention → vaguer or wrong answers.
- Long chats accumulate stale or conflicting details.
- Fix: keep inputs focused, summarise, split topics into separate chats, remove outdated files.

## 7.5 Sharing and permissions
In Team/Enterprise, decide who can **view vs edit** a shared Project; review who has access to sensitive knowledge; keep one owner for each Project.

## Worked example
HR Project "Leave Policy Helper":
- **Instructions:** "You answer employee leave questions for ACME. Use only the knowledge files. Quote the policy section number. If unsure or the case is unusual, say so and direct to hr@…; never give legal advice. Reply in under 120 words."
- **Knowledge:** current `Leave-Policy-2026.pdf`, `Leave-FAQ.pdf`, `Holiday-Calendar-2026.pdf`. Old 2024 policy **removed**.
- Result: consistent answers with citations and clear escalation.

## Exam traps
- ❌ Uploading outdated and current versions together.
- ❌ Putting reference documents in the instructions box.
- ❌ Giant "kitchen-sink" knowledge base.
- ✅ Curated, current, well-named knowledge + concise instructions.

## Self-check
<details><summary>Q1. Instructions vs knowledge?</summary>Instructions = behaviour rules every chat; knowledge = reference files to consult.</details>
<details><summary>Q2. What is context dilution?</summary>Too much loosely relevant content weakens focus and answer quality.</details>
<details><summary>Q3. Old and new policy both uploaded: fix?</summary>Remove the outdated file.</details>

## Learn more
- What are Projects?: https://support.claude.com/en/articles/9517075-what-are-projects
- Long-context tips: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips
- System prompts (role/instructions): https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/system-prompts
- Claude support centre: https://support.claude.com
