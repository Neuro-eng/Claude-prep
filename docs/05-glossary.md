# Glossary (both exams)

| Term | Meaning |
|---|---|
| **Agent** | System where the model chooses its own steps and tools in a loop |
| **Workflow** | Fixed, code-controlled sequence of steps that may include LLM calls |
| **Artifact** | Standalone output (doc, page, code, tool) displayed beside the chat |
| **Batch API** | Asynchronous bulk processing at lower price (not for interactive use) |
| **BAA** | Business Associate Agreement: HIPAA contract with vendors handling PHI |
| **Chain-of-thought** | Asking the model to reason step by step before answering |
| **Chunking** | Splitting documents into pieces for retrieval |
| **CLAUDE.md** | Project guidance file read by Claude Code |
| **Compaction** | Summarising long context to free window space |
| **Context window** | Maximum tokens (instructions + data + history + output) the model can use at once |
| **Context engineering** | Deliberately choosing what goes into the context window and how |
| **Context dilution / rot** | Quality loss from filling context with marginal or conflicting content |
| **Contextual retrieval** | Adding situating context to each chunk before indexing to improve search |
| **DPA / DPIA** | GDPR Data Processing Agreement / Data Protection Impact Assessment |
| **Embedding** | Numeric vector capturing meaning of text, used for semantic search |
| **Eval** | Repeatable test measuring solution quality against criteria |
| **Excessive agency** | Giving an AI system more permissions/autonomy than needed |
| **Extended thinking** | Mode allowing longer internal reasoning before answering (more latency/cost) |
| **Few-shot / multishot** | Including examples in the prompt to show the desired output |
| **Grounding** | Anchoring answers to supplied or authoritative sources |
| **Guardrail** | Enforced check on inputs, actions or outputs |
| **Hallucination** | Plausible but unsupported or false generated content |
| **Hook** | Script run automatically at Claude Code lifecycle events |
| **HITL** | Human-in-the-loop: a person reviews or approves |
| **Hybrid search** | Combined keyword (BM25) and semantic retrieval |
| **Idempotency key** | Token making a repeated request safe (no duplicate effect) |
| **Indirect prompt injection** | Malicious instructions hidden in content the model reads |
| **LLM-as-judge** | Using a model to grade outputs against a rubric |
| **MCP** | Model Context Protocol: open standard to connect AI apps to tools/data |
| **Least privilege** | Granting only the minimum access needed |
| **PII / PHI** | Personally identifiable / protected health information |
| **Prompt caching** | Reusing a static prompt prefix to cut cost and latency |
| **Prompt chaining** | Splitting a task across sequential prompts |
| **Prompt injection** | Attempt to override a model's instructions via text |
| **Project** | Workspace with custom instructions, knowledge files and chats |
| **RAG** | Retrieval-augmented generation: fetch relevant data, then generate |
| **Recall@k** | Share of relevant items found in the top k retrieved |
| **Reranking** | Re-scoring retrieved candidates to pick the best few |
| **Routing** | Directing each input to the most suitable handler/model |
| **Subagent** | Specialised agent with its own context, used by an orchestrator |
| **System prompt** | Persistent instructions defining role, rules and format |
| **Temperature** | Randomness setting (low = consistent, high = varied) |
| **Tool use** | Model requests function calls that your code executes |
| **Tool result** | Data your code returns to the model after running a tool |
