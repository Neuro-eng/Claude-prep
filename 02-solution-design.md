# Domain 2: Solution Design & Architecture (17%)

## What the exam tests
Choosing the right *shape* of solution for a business requirement and justifying it with trade-offs.

## 2.1 The complexity ladder: climb only when forced
1. **Single LLM call** (good prompt, retrieved context)
2. **Workflow:** code-controlled steps (chains, routing, parallel calls)
3. **Agent:** the model decides steps and tools in a loop
4. **Multi-agent:** several agents (often orchestrator + subagents)

> Each rung adds cost, latency, unpredictability and failure modes. Pick the **lowest rung that meets the requirement**.

## 2.2 Workflow patterns (from Anthropic's "Building effective agents")
| Pattern | Use when | Example |
|---|---|---|
| **Prompt chaining** | Task splits into fixed sequential steps | Outline → draft → translate |
| **Routing** | Different inputs need different handling | Triage: billing → small model flow; legal → specialist flow |
| **Parallelisation: sectioning** | Independent subtasks | Check a doc for 5 risk types at once |
| **Parallelisation: voting** | Need higher confidence | Run 3 reviews; flag disagreement |
| **Orchestrator-workers** | Subtasks unknown in advance | Multi-file code change |
| **Evaluator-optimiser** | Clear quality criteria; iterate | Draft → critique → revise |

## 2.3 Agents
Use when the path can't be predicted (open-ended research, debugging, multi-tool tasks).
**Guardrails every agent needs:** step/token/time/cost **budgets**; **stop conditions**; tool allow-list; **human approval** for irreversible actions; full **logging/tracing**; loop detection; sandboxing.
**Context for long tasks:** summarise/compact, write notes to memory, retrieve just-in-time.

## 2.4 Multi-agent systems
**Good fit:** broad, parallelisable, breadth-first work (research across many sources); tasks needing **separate contexts** (too large for one window); distinct specialisations/permissions.
**Poor fit:** tightly interdependent steps (e.g. most coding), small tasks, tight latency/cost.
Anthropic's research-system write-up reports multi-agent runs use many times more tokens than single-agent chats, so the value must justify it. **Costs:** tokens, coordination bugs (duplicate work, conflicting outputs), harder debugging. **Mitigate:** clear task briefs per subagent, an orchestrator that merges, tracing, budgets.

## 2.5 Requirement → design mapping
| Requirement signal | Lean toward |
|---|---|
| Fixed known steps, auditability | Workflow |
| High volume, simple, cheap | Single call, small model, schema validation |
| Open-ended, unpredictable steps | Agent + budgets + HITL |
| Parallel independent subtasks / huge context | Orchestrator + subagents |
| Non-urgent bulk | **Batch API** (about 50% cheaper, async up to 24h) |
| Repeated long static prefix | **Prompt caching** |
| Irreversible/regulated actions | Human approval gate |
| Strict latency (<2s) | Smaller model, streaming, fewer hops, cache |
| Must be explainable | Deterministic workflow + logged evidence + citations |

## 2.6 Cross-cutting design concerns
- **Success criteria first** (accuracy target, latency, cost per task, risk tolerance).
- **State & memory:** where conversation/task state lives; retention policy.
- **Observability:** log prompts, tool calls, outputs, latency, tokens, user feedback; trace across hops.
- **Resilience:** retries, fallbacks, circuit breakers, graceful degradation.
- **Cost model:** estimate tokens per task × volume; use caching, batch, small models.
- **Human interaction:** where reviewers sit; escalation paths.
- **Evolvability:** version prompts/tools/models; swap models via config.

## Scenario
*Insurer wants claims triage: read email + attachments, classify, extract fields, route to the right team; complex fraud suspicion to humans.*
- Design: **routing workflow**, not an agent. Step 1 small-model classifier (schema output); step 2 extraction with validation; step 3 rules route; suspected fraud → human queue.
- Why not multi-agent: steps are fixed; adds cost/risk without benefit.
- Controls: confidence threshold → human; audit log; evals on 500 labelled claims; batch re-processing overnight for backlog.

## Exam traps
- ❌ "Agent/multi-agent" as the default answer to everything.
- ❌ Designing before agreeing success criteria.
- ❌ Real-time architecture for non-urgent bulk work (use batch).
- ✅ Simplest sufficient pattern; budgets + HITL; measure; justify extra complexity.

## Self-check
<details><summary>Q1. Workflow vs agent?</summary>Workflow: code controls the steps. Agent: model chooses steps/tools dynamically.</details>
<details><summary>Q2. Name two good fits for multi-agent.</summary>Parallel breadth-first research; separate large contexts; distinct permissions.</details>
<details><summary>Q3. Nightly 200k documents, no urgency?</summary>Batch processing (cheaper, async), possibly with caching.</details>

## Learn more
- Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- How we built our multi-agent research system: https://www.anthropic.com/engineering/multi-agent-research-system
- Batch processing: https://docs.claude.com/en/docs/build-with-claude/batch-processing
- Prompt caching: https://docs.claude.com/en/docs/build-with-claude/prompt-caching
- Effective context engineering for agents: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
