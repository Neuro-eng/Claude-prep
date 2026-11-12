# Domain 5: Stakeholder Communication & Lifecycle Management (14%)

## What the exam tests
Consulting skill: discovery, expectation-setting, piloting, change control and long-term operation.

## 5.1 Discovery: ask before you design
| Area | Questions |
|---|---|
| **Business goal** | What outcome? How measured today? What does success look like in numbers? |
| **Users & process** | Who uses it? Current workflow, volumes, pain points, exceptions? |
| **Data** | Where is it, quality, owner, sensitivity, access rules, freshness? |
| **Constraints** | Budget, timeline, latency, tools/systems, languages, skills in team |
| **Risk & compliance** | Regulations, review requirements, past incidents, risk appetite |
| **Baseline** | Current cost/time/error rate (so you can prove improvement) |
| **Stakeholders** | Sponsor, owners, security/legal, end users, approvers |
Skipping discovery is a classic wrong answer. So is starting with "which model?".

## 5.2 Setting expectations honestly
- LLMs are **probabilistic**: you commit to measured targets (e.g. "≥95% on agreed test set"), not perfection.
- Describe **what Claude does, what humans still do**.
- Show **trade-offs** as options: Option A (cheaper, 90%, faster) vs Option B (costlier, 96%, slower) with a recommendation.
- Translate tech into **business terms**: cost per case, hours saved, risk reduced, time to value.
- Be upfront on limits (hallucination, edge cases, data quality) and mitigation.

## 5.3 Pilot → rollout
A good pilot has: narrow scope, real users, agreed **success metrics and exit criteria**, fixed duration, owner, feedback channel, risk controls, and a go/no-go decision.
**Phased rollout:** pilot → limited group → region/department → all; each gate requires evals + sign-off.

## 5.4 Stakeholder management
| Stakeholder | Cares about | Give them |
|---|---|---|
| Executive sponsor | ROI, risk, timeline | Value metrics, risk summary, decisions needed |
| Business owner | Process fit, adoption | Workflow design, training plan |
| Security / legal / compliance | Data, regulation | Data-flow diagram, control + evidence matrix, DPA/BAA status |
| IT/ops | Reliability, support | Architecture, runbooks, monitoring |
| End users | Usefulness, trust | Training, clear limits, feedback path |
**Pushback from security/legal:** engage early, show controls and evidence, offer staged scope, **don't bypass**.

## 5.5 Lifecycle management
**Stages:** discover → design → build/pilot → evaluate → **gated release** → operate/monitor → improve → retire.
- **Change control:** prompts, tools, retrieval configs, models are **versioned**; changes reviewed, regression-tested, released gradually, with **rollback**.
- **Model lifecycle:** models get new versions and are **deprecated**; treat as planned change: track dates, test candidate model on your eval suite, migrate with canary, keep configs swappable.
- **Operations:** dashboards (quality, cost, latency, escalations), on-call, incident process, periodic review (e.g. quarterly), feedback loop to improve.
- **Documentation & ownership:** architecture, prompt/tool inventory, RACI, runbooks, known limitations.
- **Training & adoption:** role-based training, champions, support channel.
- **Retirement:** data deletion, access removal, communications.

## 5.6 Cost estimation basics
Cost ≈ (input tokens + output tokens) × price × volume. Levers: smaller models, caching, batching, shorter outputs, retrieval of fewer/shorter chunks. Include build, evaluation, monitoring and human-review costs, not just API cost.

## Scenario
*Sponsor: "Launch a customer chatbot next month; just make it answer everything."*
- Response: short discovery sprint (goals, top 50 intents, data, escalation rules); define success (e.g. 80% resolution of top intents with ≥90% accuracy; escalate the rest); pilot with 5% traffic; legal reviews data flows; weekly metrics; go/no-go gate.
- Message: "We'll launch narrowly in 4 weeks with human handoff; expansion follows evidence."

## Exam traps
- ❌ Building before discovery/success criteria. ❌ Promising 100% accuracy.
- ❌ Editing prompts in production without version control. ❌ Ignoring model deprecation notices.
- ❌ Bypassing security/legal to hit a date.
- ✅ Discovery → pilot with exit criteria → gated rollout → monitor → improve; business-term communication.

## Self-check
<details><summary>Q1. Five discovery areas?</summary>Goal/metrics, users/process, data, constraints, risk/compliance (plus baseline, stakeholders).</details>
<details><summary>Q2. What belongs in pilot exit criteria?</summary>Measurable targets on quality, safety, cost/latency, adoption, plus go/no-go owner.</details>
<details><summary>Q3. Model deprecation: response?</summary>Treat as planned change: test new model on evals, canary migrate, keep rollback.</details>

## Learn more
- Anthropic model deprecations: https://platform.claude.com/docs/en/about-claude/model-deprecations
- Define success criteria: https://platform.claude.com/docs/en/test-and-evaluate/define-success
- Building effective agents (start simple, measure): https://www.anthropic.com/engineering/building-effective-agents
- NIST AI RMF (govern/map/measure/manage): https://www.nist.gov/itl/ai-risk-management-framework
