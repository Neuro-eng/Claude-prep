# Domain 1: Integration (19%)

## MCP (Model Context Protocol)
Open standard for connecting Claude to tools and data sources.
- Servers expose **tools** (actions), **resources** (data), **prompts** (templates).
- Prefer MCP over bespoke glue when integrating many systems; reuse and standardisation.
- Tool descriptions drive tool selection: write them precisely; overlapping/vague tools cause misuse.

## Permissions and secrets
- **Least privilege**: scope each tool/credential to the minimum.
- Read-only by default; write/delete actions need explicit approval or HITL.
- Secrets in a **secrets manager / environment**, never in prompts, code, or repos; never passed through model context.
- Separate credentials per environment; rotate; audit access.

## RAG (retrieval-augmented generation)
Retrieve relevant chunks → place in context → answer grounded in them.
- Quality levers: **chunking**, embeddings, hybrid (keyword + semantic) search, metadata filters, reranking, freshness/ACLs.
- Enforce **document-level access control at retrieval**, not just in the prompt.
- Require citations; allow "not found".
- Poor answers? First check **was the right chunk retrieved?** (retrieval) before blaming the model or adding more context.

## Failure handling
- Timeouts, rate limits (429), partial failures, malformed tool output.
- Retries with **exponential backoff + jitter**; **idempotency** for write actions; circuit breakers; graceful degradation; clear error surfaced to the model/user.
- Don't silently swallow failures; don't let the model fabricate a result when a tool failed.

## Agent-to-agent / API integration
Define clear contracts and schemas; validate structured output; version interfaces.
