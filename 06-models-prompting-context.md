# Domain 6: Claude Models, Prompting & Context Engineering (13%)

## Model selection
Choose by **capability, cost, speed**; justify with evals.
- Small/fast tier for high-volume simple tasks; mid tier as default; top tier for hardest reasoning.
- Mixed architectures: cheap model routes/extracts, stronger model reasons.
- ⚠️ Trap: "pick the most powerful model for everything".
- Check current lineup in docs (models change).

## Prompting techniques
- Clear instructions, role, structure with XML tags
- **Few-shot** examples for format/style consistency
- **Chain-of-thought / extended thinking** for multi-step reasoning
- Prefill / structured output to enforce format; validate output
- System prompt for persistent behaviour; keep it organised

## Prompt caching
Cache stable prefix (system prompt, tool defs, large documents) to cut **cost and latency** on repeated calls. Put static content first, variable content last.

## Context engineering
What goes into the window, and in what order.
- Include only **relevant** information; more ≠ better.
- Long docs first, question last; clear delimiters.
- Summarise/compact long histories; retrieve just-in-time; use subagents to isolate context.
- ⚠️ Trap: "add more context" when the real problem is **retrieval quality**.
- Context rot/dilution; contradictory context hurts.
