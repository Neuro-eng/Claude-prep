# Domain 3: Evaluation, Testing & Optimization (16%)

## What the exam tests
Proving a solution works, finding *where* it fails, and improving it without breaking other things.

## 3.1 Define success criteria first
Good criteria are **specific, measurable, achievable, relevant** and tied to a business outcome.
- Weak: "Works well."
- Strong: "≥95% of invoices extracted with all 5 fields correct; p95 latency <4 s; cost <$0.02 per invoice; zero PII leakage in 1,000 adversarial tests."
Write criteria **before** building; get stakeholder sign-off; define the baseline (current human performance).

## 3.2 Building the test set
- **Representative:** sampled from real traffic (scrubbed).
- **Edge cases:** rare formats, long inputs, ambiguous requests, multilingual.
- **Adversarial:** injection attempts, policy violations, malformed data.
- **Known failures:** every production bug becomes a test.
- **Labelled** with ground truth or rubric. Keep a held-out set you don't tune against.
- Size: enough to see differences (hundreds beats dozens); stratify by segment.

## 3.3 Graders
| Grader | Best for | Pros | Cons |
|---|---|---|---|
| **Code-based** (exact/regex, schema, unit tests, run the SQL) | Objective, checkable output | Fast, cheap, deterministic | Can't judge nuance |
| **LLM-as-judge** | Tone, helpfulness, faithfulness to source at scale | Scales, flexible | Needs clear **rubric**; bias (position, verbosity); must be **calibrated** |
| **Human** | Gold standard, ambiguous, high-stakes, calibrating judges | Most trustworthy | Slow, expensive |

**LLM-judge best practice:** detailed rubric with scored levels; ask for reasoning *then* verdict; use a different/stronger model if possible; pairwise comparison with randomised order; **validate agreement with humans** on a sample (e.g. ≥85–90%); periodically re-check.

## 3.4 Metrics to know
- **Classification/extraction:** accuracy, precision, recall, F1 (precision = of flagged, how many right; recall = of all true, how many found).
- **RAG retrieval:** recall@k, precision@k, MRR. **Generation:** *faithfulness/groundedness* (supported by context), answer relevance, citation correctness.
- **Agents:** task success rate, tool-call correctness, steps/cost per task, trajectory quality, safe-action rate.
- **Ops:** latency (p50/p95), cost per task, error/timeout rate, escalation/override rate.
- **Safety:** refusal accuracy (right refusals, no over-refusal), leakage rate.
Choose metrics that reflect **costs of errors** (missed fraud vs false alarm → favour recall).

## 3.5 Diagnosing failures: error analysis
1. Collect failures; **categorise** (retrieval miss, wrong tool, bad reasoning, format error, stale data, ambiguous input).
2. Count by category and **segment** (by customer type, language, document type).
3. Fix the biggest bucket; re-run the whole suite.
- **Retrieval problem:** needed info never in context → fix chunking/search/filters.
- **Generation problem:** info in context but answer wrong → fix prompt/examples/model.
- **Data problem:** source wrong/outdated → fix data.
Aggregate scores hide segment failures (92% overall but 60% on your biggest client).

## 3.6 Optimisation loop
Change **one variable** → run full eval → compare quality, cost, latency together → keep or revert. Try: prompt clarity, few-shot examples, retrieval settings, model tier (smaller if parity), caching, output length limits, parallelism.

## 3.7 Regression & release gating
Run the suite on **every** change to prompts, tools, retrieval config or model version. Set **pass thresholds** and block release below them. Use **A/B or canary** rollouts; keep rollback ready.

## 3.8 Production monitoring
Sample live traffic for review; track metrics and drift (data changes, new query types, model updates); user feedback (thumbs); alerts on spikes in errors, cost, escalations. Feed new failures back into the test set.

## Scenario
Quality dropped after upgrading to a newer model version. Overall accuracy 91→89, but by segment: invoices in German fell 90→61.
- Action: error analysis on German failures → prompt assumed English date formats; add examples, re-run suite, canary 10% before full release. Keep prior model as rollback.

## Exam traps
- ❌ Shipping on a handful of demo examples. ❌ Trusting an uncalibrated LLM judge.
- ❌ Looking only at the aggregate score. ❌ Tuning on the same data you report.
- ✅ Criteria first; mixed graders; segment analysis; one change at a time; regression gate.

## Self-check
<details><summary>Q1. Best grader to check JSON schema validity?</summary>Code-based.</details>
<details><summary>Q2. What must you do before trusting an LLM judge?</summary>Give a rubric and calibrate against human labels.</details>
<details><summary>Q3. Right chunk never retrieved: which fix?</summary>Retrieval (chunking, hybrid search, filters), not the prompt.</details>
<details><summary>Q4. Missing fraud is costly: favour which metric?</summary>Recall (accepting more false alarms).</details>

## Learn more
- Define success criteria: https://platform.claude.com/docs/en/test-and-evaluate/define-success
- Develop test cases: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
- Using the Evaluation tool: https://platform.claude.com/docs/en/test-and-evaluate/eval-tool
