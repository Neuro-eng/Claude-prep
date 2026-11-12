# 6. Product & model selection

> Model names and plan features change often. Treat the **principles** as stable and verify names in the official guide and docs.

## What the exam tests
Matching the **task** to the right model tier and the right Claude feature.

## 6.1 Model tiers (principle: match the model to the task)
| Tier | Strengths | Use for | Avoid for |
|---|---|---|---|
| **Haiku-class** | Fastest, lowest cost | High-volume simple work: classification, extraction, routing, short drafts | Deep multi-step reasoning |
| **Sonnet-class** | Best balance | Default for most work: writing, analysis, coding help, summaries | (rarely wrong as a default) |
| **Opus-class** | Deepest reasoning | Hard, nuanced, long multi-step problems | Cheap bulk tasks |
| **Mythos-tier** (e.g. Fable) | Frontier capability, limited availability | Most demanding work, where available | Everyday tasks |

Selection factors: **capability needed, speed, cost, volume, risk of error.** The exam rewards "right-size it", not "always use the biggest".

Rule of thumb: start with the mid tier; move **down** if quality is equal on your tests (cheaper/faster), **up** if it fails on hard cases.

## 6.2 Product surfaces and features
| Feature | What it is | Best for |
|---|---|---|
| **Chat** (web/desktop/mobile) | Conversations with files and images | Everyday tasks |
| **Projects** | Workspace with **custom instructions + knowledge files + chats** | Recurring work needing shared context |
| **Artifacts** | Standalone output (document, page, code, interactive tool) shown beside chat | Substantial, reusable content, e.g. a calculator, one-pager, dashboard |
| **Connectors / MCP apps** | Let Claude read/act in other apps (Drive, Slack, etc.) | Using live company data |
| **Search / research tools** | Web search and deeper research | Current information, multi-source reports |
| **Team / Enterprise plans** | Shared Projects, admin and security controls, org data terms | Organisations |
| **Claude Code / API** | Developer tools | Engineering (not the focus of CCAO-F) |

**Artifacts vs chat reply:** use an Artifact when the output is long, standalone, will be edited or reused; reply inline for short answers and conversation.

**Connectors:** increase power *and* risk (permissions, prompt injection from retrieved content). Grant least access and review actions.

## 6.3 Choosing: decision flow
1. Is the task simple, high-volume, low-risk? → small tier, template, automate with sampling QA.
2. Needs thoughtful analysis or writing? → mid tier.
3. Deep reasoning, ambiguity, high stakes? → top tier **plus** human review.
4. Recurring with shared context? → Project.
5. Producing a reusable deliverable? → Artifact.
6. Needs live internal data? → connector (with permissions review).

## Worked example
A support team needs: (a) daily tagging of 20,000 emails; (b) a weekly insight memo for executives; (c) a contract-risk review.
- (a) small tier, strict categories, spot-check 2%.
- (b) mid tier in a Project holding the memo template + past memos.
- (c) top tier, with lawyer review before anything is relied on.

## Exam traps
- ❌ "Always use the most powerful model." ❌ "Always use the cheapest."
- ❌ Using an Artifact for a one-line answer.
- ✅ Right-size; Projects for shared context; Artifacts for substantial deliverables.

## Self-check
<details><summary>Q1. Best tier for high-volume tagging?</summary>Small/fast tier (Haiku-class), validated on samples.</details>
<details><summary>Q2. Project = ?</summary>Custom instructions + knowledge files + chats, shared with a team if desired.</details>
<details><summary>Q3. When Artifact?</summary>Substantial standalone reusable output (doc, page, tool).</details>

## Learn more
- Models overview: https://platform.claude.com/docs/en/about-claude/models/overview
- What are Projects?: https://support.claude.com/en/articles/9517075-what-are-projects
- What are Artifacts?: https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them
- Choosing a model: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
- Claude support centre: https://support.claude.com
