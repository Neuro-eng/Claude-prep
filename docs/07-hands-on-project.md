# Hands-on project: Policy Q&A with RAG + MCP + evals (≈ 3 hours)

Building this once makes CCAR-P scenario questions intuitive. You do **not** need to finish it perfectly.

## Goal
A command-line assistant that answers questions about a small set of company policy documents, with **citations**, **access control**, a **tool** exposed over MCP, and a **test set** that scores quality.

## Prerequisites
Python 3.10+, an Anthropic API key (console.anthropic.com), ~10 text/markdown "policy" files you write yourself (leave, expenses, security, etc.), each tagged with an access level (`public` or `hr-only`).

## Step 1: Ingest and chunk
1. Split each file by headings into 200-500-token chunks.
2. Store for each chunk: `text`, `source`, `section`, `access_level`, `updated_at`.
3. **Learning point:** keep the section title with each chunk so retrieval has context.

## Step 2: Index with hybrid search
1. Build a keyword index (BM25, e.g. `rank_bm25`) and a vector index (any embedding provider + a small local store).
2. Retrieve top 20 from each, merge, optionally **rerank** to the best 5.
3. **Learning point:** try an exact-code query ("Policy HR-204") and a paraphrase query; see why hybrid helps.

## Step 3: Enforce access at retrieval
Add a `user_role` parameter; filter chunks by `access_level` **before** ranking. Test: a `public` user asking about salary bands must get "not found".
**Learning point:** access control belongs in retrieval, not in the prompt.

## Step 4: Generate with citations
Prompt: answer **only** from the provided chunks in `<documents>`; cite `[source §section]`; say "not found" if absent. Use low temperature.
Static instructions first, retrieved chunks and question last (cache-friendly).

## Step 5: Expose a tool via MCP
Create a small MCP server (Python SDK) with one **read-only tool** `search_policies(query)` returning top chunks with metadata. Connect it to Claude Desktop or Claude Code and ask questions.
**Learning point:** tool description quality drives correct tool use; keep it read-only; never put secrets in tool output.

## Step 6: Build the eval set
Write **30 test cases** in JSON: question, expected facts, expected source, role. Include 5 edge cases (not in docs), 5 adversarial (injection inside a policy file, "ignore rules"), 5 access-control tests.
Graders: code-based (expected source cited? "not found" when it should be?) and an **LLM-judge** for faithfulness with a rubric. Check the judge against 10 hand-graded answers.

## Step 7: Measure and improve (one change at a time)
Record baseline: retrieval recall@5, faithfulness, access-leak count (must be 0), cost, latency. Then try one change at a time: chunk size, reranking, few-shot examples, model tier, prompt caching. Keep a log of change → effect.

## Step 8: Write a one-page architecture note
Diagram, trust boundaries, controls, known limitations, how a model upgrade would be rolled out. Practising this is excellent preparation for stakeholder questions.

## Checklist: you can now explain
- [ ] Why hybrid search + reranking beats embeddings alone
- [ ] Why ACLs are enforced at retrieval
- [ ] How tool descriptions affect behaviour
- [ ] How you'd detect and fix a retrieval vs generation failure
- [ ] Why evals gate every change

## Resources
- Tool use: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
- MCP quickstart/servers: https://modelcontextprotocol.io/docs/getting-started/intro
- Contextual Retrieval: https://www.anthropic.com/news/contextual-retrieval
- Anthropic Cookbook (examples incl. RAG & evals): https://github.com/anthropics/anthropic-cookbook
- Prompt caching: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
