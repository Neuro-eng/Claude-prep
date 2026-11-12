# Domain 6: Claude Models, Prompting & Context Engineering (13%)

## What the exam tests
Choosing models by evidence, applying prompting techniques, using caching/batching for cost, and managing the context window.

## 6.1 Model selection
Choose on **capability, latency, cost**, validated by your **evals**, not by reputation.
- **Small/fast tier:** classification, extraction, routing, high volume.
- **Mid tier:** default for most production work.
- **Top tier:** hardest reasoning, long multi-step work, ambiguity.
- **Mixed architectures:** a cheap model **routes/pre-processes**, a stronger one handles hard cases; or a stronger model plans and cheaper ones execute.
- **Process:** shortlist 2–3 → run your eval suite → compare quality **and** cost/latency → pick the cheapest that meets criteria → re-test on every new model.
Check current model names/limits in docs; they change.

## 6.2 Prompting techniques (production view)
- **System prompt:** role, rules, tone, output contract, escalation behaviour; version-controlled.
- **Clear, specific instructions;** explain *why*; give an out ("say not found").
- **XML tags** to separate instructions, documents, examples.
- **Few-shot examples:** diverse, realistic, include edge cases; the most reliable way to lock format/style.
- **Reasoning:** chain-of-thought ("think step by step") or **extended thinking** for multi-step logic/math/planning: trades latency/cost for accuracy; not needed for simple tasks.
- **Structured output:** request JSON matching a schema (or use tool-use with an input schema as the output format); **validate** and retry once on failure. (Prefill support varies by model; check docs.)
- **Temperature:** low for extraction/classification/consistency; higher for brainstorming.
- **Prompt chaining** for complex tasks; **role/audience** context for tone.
- **Citations/quotes first:** have the model extract supporting quotes, then answer from them.

## 6.3 Prompt caching (cost + latency)
Reuse a **stable prefix** (system prompt, tool definitions, big reference documents) across calls.
- Mark cacheable content with `cache_control`; cache covers the prefix **up to** the marker.
- **Order matters:** static content first, variable content (user question) last. Any change **before** the marker invalidates the cache.
- **Price:** a cache *hit* costs only a small fraction of normal input price (roughly 10% on older models, and even less, such as 5% or 2.5%, on newer ones). A cache *write* costs a bit more than normal input.
- **Lifetime (TTL):** 5 minutes by default, and the timer resets every time the cache is used. A 1-hour option exists at about 2× the base input price.
- **Easy mode:** "automatic caching" lets you add one top-level `cache_control` field; or you can mark exact blocks yourself. Check the pricing table in the docs for current numbers.
- Best for: chatbots with a long policy/KB in the prompt, agents with many tool definitions, repeated Q&A over one large document.
- Not helpful when each request's prefix is different, or traffic is too sparse to hit within the TTL.

## 6.4 Batch processing
Submit many requests asynchronously (completion within up to ~24 h) at roughly **half price**. Use for evals, bulk classification, nightly summarisation, backfills. Not for interactive/user-facing latency.

## 6.5 Context engineering
Context engineering = deciding **what information is in the window, in what form and order**, at each step.
| Principle | Practice |
|---|---|
| **Relevance over volume** | Retrieve the few best chunks; more tokens ≠ better answers |
| **Structure** | Documents in XML/labelled sections; long docs first, question last |
| **Just-in-time retrieval** | Keep lightweight references (IDs, paths); load details only when needed via tools |
| **Compaction** | Summarise long histories; keep decisions and open items; drop chatter |
| **External memory/notes** | Agents write progress notes/files outside the window and re-read them |
| **Isolation** | Subagents work in their own windows and return concise results |
| **Tool-result hygiene** | Truncate/paginate large outputs; clear stale tool results |
| **Conflict avoidance** | Remove contradictory instructions/docs |
**Context rot/dilution:** as the window fills with marginal content, accuracy and instruction-following can degrade. First suspect irrelevant or conflicting context, then retrieval quality.

## 6.6 Token budgeting
Plan: system + tools + retrieved context + history + output limit ≤ window, with headroom. Set `max_tokens` sensibly; stream long outputs; monitor tokens per request in production.

## Scenario
*Support assistant embeds a 25k-token policy manual in every request; cost and latency are high, answers occasionally cite wrong sections.*
- Cache the manual (static prefix first) → big cost/latency cut.
- Replace "paste whole manual" with **retrieve relevant sections** + section IDs → better precision.
- Few-shot examples of correct citation format; schema-validated output; eval on 300 historical tickets before/after.

## Exam traps
- ❌ "Always use the largest model." ❌ "Add more context" for retrieval failures.
- ❌ Variable text placed *before* the cached prefix. ❌ Extended thinking for trivial tasks.
- ✅ Evals decide model; caching for stable prefixes; batch for non-urgent; relevance-first context.

## Self-check
<details><summary>Q1. Where do static vs variable parts go for caching?</summary>Static first (cached prefix), variable last.</details>
<details><summary>Q2. When use Batch API?</summary>Non-urgent bulk work (evals, backfills, nightly jobs) for lower cost.</details>
<details><summary>Q3. Name three context-engineering techniques for long-running agents.</summary>Compaction, external notes/memory, subagent isolation, just-in-time retrieval.</details>
<details><summary>Q4. Best temperature for extraction?</summary>Low.</details>

## Learn more
- Prompt engineering overview: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- Extended thinking: https://platform.claude.com/docs/en/build-with-claude/extended-thinking
- Prompt caching: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- Batch processing: https://platform.claude.com/docs/en/build-with-claude/batch-processing
- Effective context engineering for AI agents: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Models overview & choosing a model: https://platform.claude.com/docs/en/about-claude/models/overview
