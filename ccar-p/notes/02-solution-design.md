# Domain 2: Solution Design & Architecture (17%)

## The complexity ladder (pick the lowest rung that works)
1. **Single LLM call** (with good prompt/context)
2. **Prompt chain / fixed workflow**: predictable steps, code-controlled flow
3. **Routing / parallelisation / orchestrator-workers**: variable subtasks
4. **Autonomous agent**: model decides steps and tools dynamically
5. **Multi-agent**: only when work is genuinely parallel, needs separate contexts, or specialisation pays off

> "The safest pattern is usually the simplest one that meets the requirement."

## Decision cues
| Signal | Choose |
|---|---|
| Steps known in advance, need reliability | Workflow |
| Open-ended, unpredictable path | Agent (with guardrails) |
| Context would overflow / independent subtasks | Subagents / multi-agent |
| Latency/cost-critical, simple classification | Single call, smaller model |
| High-risk actions | Add HITL checkpoints |

## Design considerations
- Business need → measurable success criteria **first**.
- Trade-offs: cost, latency, accuracy, maintainability, risk, auditability.
- Multi-agent costs more tokens and adds coordination failure modes; justify it.
- Build in observability (logging, tracing) from the start.
- Prompt caching, batch processing for non-urgent bulk work.
