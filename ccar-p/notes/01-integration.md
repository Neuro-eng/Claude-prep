# Domain 1: Integration (19%)

## What the exam tests
Connecting Claude safely and reliably to tools, data and systems: MCP, tool use, RAG, permissions, secrets, and failure handling.

## 1.1 Tool use: the basic loop
1. You send a request with **tool definitions** (name, description, JSON-schema inputs).
2. Claude decides to call a tool → response has `stop_reason: "tool_use"` and a `tool_use` block with arguments.
3. **Your code** executes the tool (Claude never runs it itself).
4. You return a `tool_result` block (include errors with `is_error`).
5. Claude continues, possibly calling more tools, until it answers.

**Tool design rules (heavily tested):**
- **Descriptions drive selection.** Say what the tool does, when to use it, when *not* to, and what it returns. Overlapping or vague descriptions cause wrong-tool calls.
- Narrow, well-named tools beat one giant "do_anything" tool; but don't create near-duplicates.
- Strict **input schemas** (enums, required fields) reduce bad calls; **validate** inputs server-side anyway.
- Return **concise, relevant** results (not 10 MB of JSON); include IDs Claude can pass on.
- Return **actionable error messages** ("order 123 not found; try search_orders") so the model can recover.
- `tool_choice` can be `auto` (model decides), `any` (must call some tool) or a specific tool (force it).

## 1.2 Model Context Protocol (MCP)
An open standard for connecting AI apps to tools and data, so you build a connector **once** and reuse it everywhere.
- **Roles:** *Host* (the app, e.g. Claude Desktop/Code) → runs one *client* per *server*; each **server** exposes capabilities.
- **Server primitives:** **Tools** (actions), **Resources** (data/context to read), **Prompts** (reusable templates).
- **Client features** servers may use: sampling (ask the host's model), roots, elicitation (ask the user).
- **Transports:** **stdio** (local process) and **Streamable HTTP** (remote servers).
- **Auth:** remote servers use OAuth-style authorisation; keep tokens out of model context.
- **When to use MCP:** many systems, many AI clients, need reuse/governance. **When a plain API call is enough:** one app, one simple integration.
- **Security:** trust only vetted servers; least-privilege tokens; treat tool outputs as untrusted (injection risk); human approval for write actions; log all calls.

## 1.3 Permissions & secrets
- **Least privilege:** each tool/credential gets the minimum scope; separate **read** and **write** tools.
- **Default read-only;** writes/deletes/payments need approval or explicit allow-listing.
- **Secrets** live in a secrets manager/env, injected at runtime; **never** in prompts, tool descriptions, logs or repos. Rotate; use short-lived tokens; separate dev/test/prod credentials.
- **Act on behalf of the user:** pass the end-user's identity/permissions down to data systems so Claude can't see more than the user could.

## 1.4 RAG (retrieval-augmented generation)
**Pipeline:** ingest → clean → **chunk** → embed → index → *(query)* → retrieve → rerank → assemble context → generate with citations.

| Lever | Guidance |
|---|---|
| **Chunking** | Split on semantic boundaries (headings/paragraphs), ~200-800 tokens, small overlap; keep titles/section path with each chunk |
| **Embeddings** | Capture meaning; weak on exact IDs/codes |
| **Hybrid search** | Combine **keyword (BM25)** + **semantic** → covers both exact terms and meaning |
| **Reranking** | Re-score top-N (e.g. 50) to pick best few (e.g. 5): big precision gain |
| **Contextual retrieval** | Prepend a short LLM-written context to each chunk before embedding/indexing; Anthropic reports large drops in failed retrievals (about 49%, ~67% with reranking) |
| **Metadata filters** | Filter by product, date, region, **access group** |
| **Freshness** | Re-index on change; store version/date; prefer newest |
| **Citations & abstention** | Require source references; allow "not found" |

**Security in RAG:** enforce **document-level ACLs at retrieval time** (filter the index by user permissions). Telling the model "don't reveal X" is not access control. Retrieved text is untrusted (indirect injection).

**Debugging poor RAG answers:** (1) was the right chunk **retrieved**? (recall@k) → fix retrieval; (2) was it in context but ignored/misread? → fix prompt/model; (3) is the source wrong/stale? → fix data.

## 1.5 Failure handling & reliability
| Problem | Handling |
|---|---|
| Rate limit (HTTP 429) / overloaded (529) | Honour `retry-after`; **exponential backoff + jitter**; queue; lower concurrency |
| Timeouts | Set explicit timeouts; retry safe operations; cancel long ones |
| Write actions retried | **Idempotency keys** so a retry can't double-charge/double-create |
| Tool errors | Return structured error to Claude; cap retries; escalate to human |
| Downstream outage | **Circuit breaker**; degrade gracefully (cached answer, human handoff) |
| Malformed model output | Validate against schema; one repair retry; fall back |
| Partial failure in multi-step work | Checkpoint state; resume, don't restart; compensate (undo) if needed |

Never let the model **invent** a result when a tool failed.

## 1.6 Structured data & contracts
Define schemas for inputs/outputs; validate with code; version interfaces; keep prompts and schemas in source control.

## Scenario
*A retailer's support bot must read orders and issue refunds.*
- Tools: `get_order` (read), `refund_order` (write, **idempotency key**, amount cap, **human approval above $200**).
- Credentials: scoped service account; secret in vault; customer identity passed through.
- Failures: refund API timeout → retry with same idempotency key; after 3 failures → hand to agent with context.
- Injection: order notes are untrusted text; the refund tool can't be triggered by instructions inside notes.

## Exam traps
- ❌ Fixing bad answers with "more context" when retrieval missed the chunk.
- ❌ Access control via system prompt. ❌ API keys in prompts.
- ❌ Blind retries on write actions. ❌ One mega-tool with a vague description.
- ✅ Least privilege, ACL at retrieval, idempotency, hybrid search + rerank, precise tool descriptions.

## Self-check
<details><summary>Q1. Who executes a tool call?</summary>Your application code; Claude only requests it.</details>
<details><summary>Q2. Two RAG levers that help exact-ID queries?</summary>Hybrid keyword + semantic search; metadata filters.</details>
<details><summary>Q3. Safe retry for a payment call?</summary>Idempotency key with backoff.</details>
<details><summary>Q4. Where is per-user access enforced in RAG?</summary>At retrieval (filter by user permissions), not in the prompt.</details>

## Learn more
- Tool use overview: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
- Model Context Protocol intro: https://modelcontextprotocol.io/docs/getting-started/intro
- MCP specification: https://modelcontextprotocol.io/specification
- Contextual Retrieval (Anthropic): https://www.anthropic.com/news/contextual-retrieval
- Writing tools for agents (Anthropic engineering): https://www.anthropic.com/engineering/writing-tools-for-agents
- API errors & rate limits: https://platform.claude.com/docs/en/api/errors
