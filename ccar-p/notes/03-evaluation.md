# Domain 3: Evaluation, Testing & Optimization (16%)

## Build evals before (and after) launch
- Representative **test dataset**: typical, edge, adversarial, and known-failure cases; grows from production failures.
- Define **success criteria and metrics** tied to business outcome.

## Graders
| Grader | Best for | Caveat |
|---|---|---|
| **Code-based** (exact match, regex, schema, unit tests) | Objective, verifiable outputs; cheap, fast, deterministic | Can't judge nuance |
| **LLM-as-judge** | Subjective quality, tone, faithfulness at scale | Needs a clear rubric; validate against humans; watch bias |
| **Human review** | Gold standard, calibration, high-stakes | Slow, costly |

Use a mix; **calibrate LLM judges against human labels**.

## Diagnosing problems
- **Retrieval issue**: right info never reached the model → fix chunking/search.
- **Model/prompt issue**: info present but answer wrong → fix prompt, examples, model choice.
- Segment results by category to find *where* it fails.
- Regression-test every change (prompt, model version, retrieval config).

## Optimisation
Change one variable at a time; measure cost/latency/quality together; use smaller models where evals show parity; monitor in production for drift.
