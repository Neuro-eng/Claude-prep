# CCAR-P Easy Guide (simple words)

Read this first. Each topic has: **what it means**, **one example**, **what to remember**, and **where to read more on Anthropic's site**. The Study tab has the deep version.

**The exam in one sentence:** a client describes a problem, and you pick the **simplest, safest, measurable** solution and explain why.

**Five habits that win answers:**
1. Choose the **simplest** design that works.
2. **Measure** with tests before changing things.
3. **Enforce** rules in the system, not just in the prompt.
4. Talk to stakeholders and set goals **before** building.
5. Put a **human** in front of risky, irreversible actions.

---

## 1. Tool use (how Claude uses your systems)
**What it means:** You give Claude a list of tools (functions). Claude says *which tool to call and with what inputs*. **Your code** runs it and returns the result.
**Example:** Tool `get_order(order_id)`. Customer asks "Where is order 123?" → Claude asks to call `get_order(123)` → your code fetches it → Claude answers.
**Remember:** Claude never runs the tool itself. Good tool **descriptions** decide whether Claude picks the right tool.
**Read more:** https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview and https://www.anthropic.com/engineering/writing-tools-for-agents

## 2. MCP (a standard plug for tools and data)
**What it means:** MCP is an open standard so you build a connector once and many AI apps can use it. A server offers **tools** (actions), **resources** (data) and **prompts** (templates).
**Example:** One MCP server for your company wiki. Claude Desktop, Claude Code and your own app all use the same server.
**Remember:** Only trust vetted servers. Give least access. Ask a human before write actions.
**Read more:** https://modelcontextprotocol.io/docs/getting-started/intro

## 3. Permissions and secrets (least privilege)
**What it means:** Give each tool only the access it truly needs. Keep passwords and API keys out of prompts.
**Example:** A support bot gets a **read-only** order tool and a separate refund tool that needs approval above $200. The API key sits in a secrets vault, never in the prompt.
**Remember:** Start read-only. Secrets live in a secrets manager.
**Read more:** https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks

## 4. RAG (look up documents, then answer)
**What it means:** Search your documents for the best pieces, hand them to Claude, and Claude answers from them with references.
**Example:** Employee asks about parental leave. The system finds the 3 best paragraphs from the HR policy and Claude answers, quoting the section.
**Remember:** Bad answer? First check **was the right piece found?** That is a retrieval problem, not a "bigger model" problem. Use keyword + meaning search together (hybrid) and re-rank. Check **who is allowed to see** a document **during search**.
**Read more:** https://www.anthropic.com/news/contextual-retrieval

## 5. Handling failures (retries done safely)
**What it means:** Things fail: timeouts, rate limits (HTTP 429). Retry in a smart way and never fake a result.
**Example:** Refund API times out. Retry with the **same idempotency key** so the customer is not refunded twice. Wait longer between tries (exponential backoff). After 3 failures, hand over to a human.
**Remember:** Backoff + idempotency + clear errors. Never let Claude invent a result.
**Read more:** https://platform.claude.com/docs/en/api/errors

## 6. Workflow vs agent (pick the simplest)
**What it means:** A **workflow** = your code controls the steps. An **agent** = Claude decides the steps. More freedom = more cost and risk.
**Example:** Extracting 5 fields from invoices every day → a simple workflow with one Claude call and a check. Researching an open-ended question across the web → an agent.
**Remember:** Climb the ladder only when forced: single call → workflow → agent → multi-agent.
**Read more:** https://www.anthropic.com/engineering/building-effective-agents

## 7. Multi-agent (many Claudes working together)
**What it means:** One lead agent hands parts of a job to helper agents, which work in parallel and report back.
**Example:** "Research 20 competitors" → 20 helper agents each study one competitor; the lead combines the results.
**Remember:** Good for big, parallel, breadth-first jobs. It costs many more tokens and is harder to debug. Don't use it for small or tightly linked tasks.
**Read more:** https://www.anthropic.com/engineering/multi-agent-research-system

## 8. Batch and caching (save money)
**What it means:** **Batch** = send many requests to be done later, at lower price. **Prompt caching** = reuse a long unchanged part of the prompt so repeats are cheaper and faster.
**Example:** Overnight, summarise 200,000 documents → Batch. A chatbot that sends the same 20-page policy with every question → cache that policy.
**Remember:** For caching, put **fixed** content first and the **changing** question last. Batch is for work that is not urgent.
**Read more:** https://platform.claude.com/docs/en/build-with-claude/prompt-caching and https://platform.claude.com/docs/en/build-with-claude/batch-processing

## 9. Success criteria (decide "good" before you build)
**What it means:** Write down numbers that mean success, before building.
**Example:** "At least 95% of invoices fully correct, under 4 seconds, under $0.02 each, and zero personal data leaks."
**Remember:** Specific + measurable + tied to the business goal.
**Read more:** https://platform.claude.com/docs/en/test-and-evaluate/define-success

## 10. Evals (tests for AI) and graders
**What it means:** An *eval* is a set of test cases you run again and again. Graders mark the answers: **code** (exact checks), **LLM judge** (a model with a rubric), **human** (best, slowest).
**Example:** 300 test questions for a support bot. Code checks the citation exists. An LLM judge checks it stayed faithful to the document. Humans check 20 samples to make sure the judge is fair.
**Remember:** Code for facts you can check; LLM judge for style (calibrate against humans); look at results **by segment**, not only the average. Re-run after **every** change.
**Read more:** https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

## 11. Guardrails (rules that are enforced)
**What it means:** A guardrail is a check built into code or systems. A line in the prompt is only a request.
**Example:** "Never show salary data" in the prompt can be bypassed. Instead, the search itself only returns documents the user may see.
**Remember:** **Controls beat instructions.** Layers: input check → limited tools → human approval → output check → logs.
**Read more:** https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks

## 12. Rules and laws (GDPR, HIPAA) in simple form
**What it means:** For each rule, name the **control** and the **evidence**.
**Example:** HIPAA + hospital notes → sign a **BAA** with the vendor, limit who can see which patients, keep access logs, show "AI-generated, doctor must verify".
**Remember:** GDPR = minimise data, lawful reason, deletion rights, processor contract. HIPAA = protect patient data, BAA, minimum necessary.
**Read more:** https://trust.anthropic.com

## 13. Talking to stakeholders (discovery first)
**What it means:** Before building, ask about goals, users, data, limits, risks and today's performance. Set honest expectations.
**Example:** Sponsor says "make it answer everything". You say: "Let's launch the top 50 questions with human handoff in 4 weeks, measure it, then grow."
**Remember:** Never promise 100% accuracy. Use business words: cost, time, risk, value. Pilot first with clear exit goals.
**Read more:** https://www.anthropic.com/engineering/building-effective-agents (start simple, measure)

## 14. Lifecycle (keep it healthy after launch)
**What it means:** Version your prompts, tools and models. Test every change. Release slowly. Be ready to roll back.
**Example:** A model will retire in 6 months. You test the new model on your evals, send 10% of traffic to it, watch results, then switch fully.
**Remember:** Model changes are *planned work*, not surprises.
**Read more:** https://platform.claude.com/docs/en/about-claude/model-deprecations

## 15. Prompting and context (what goes in the window)
**What it means:** Choose models by testing. Use examples, clear instructions, and reasoning ("think step by step" or extended thinking) when the task is hard. Keep only **relevant** information in the context.
**Example:** A bot pastes a 25-page manual every time and gives wrong sections. Fix: retrieve only the needed sections, cache the fixed instructions.
**Remember:** More context is **not** better. Summarise long chats, keep notes outside the window, let helper agents have their own context.
**Read more:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents and https://platform.claude.com/docs/en/build-with-claude/extended-thinking

## 16. Claude Code for teams
**What it means:** `CLAUDE.md` tells Claude Code your project's rules. `settings.json` sets what it is allowed to do. **Hooks** are scripts that run automatically and can **block** actions.
**Example:** Team commits a `CLAUDE.md` (how to run tests) and settings that **deny** reading `.env`. A hook runs the linter after every edit. The CI job uses a read-only token and a human approves merges.
**Remember:** CLAUDE.md **guides**; permissions and hooks **enforce**. Never give CI production passwords.
**Read more:** https://code.claude.com/docs/en/memory and https://code.claude.com/docs/en/hooks-guide and https://code.claude.com/docs/en/settings

---

## Free official courses that match this exam
- Building with the Claude API: https://anthropic.skilljar.com/claude-with-the-anthropic-api
- Claude Code in Action: https://anthropic.skilljar.com/claude-code-in-action
- All courses: https://academy.claude.com
