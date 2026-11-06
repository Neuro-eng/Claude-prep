# CCAR-P practice questions (63)

_Original practice questions, not real exam items._

### ccar-p-001  ·  D1 Integration

**An agent needs to read customer records and update orders. Which permission design is best?** 

- **A.** Let the model decide its own permissions
- **B.** Embed API keys in the system prompt
- **C.** Least-privilege, scoped credentials; read-only by default, writes gated
- **D.** One admin credential shared by all tools

<details><summary>Answer</summary>

**C**: Least privilege, with gated write actions.

</details>

### ccar-p-002  ·  D1 Integration

**Where should API secrets be handled?** 

- **A.** In the user message
- **B.** In the system prompt
- **C.** In a shared doc
- **D.** In a secrets manager/environment, never in model context or repos

<details><summary>Answer</summary>

**D**: Secrets never go through prompts or code.

</details>

### ccar-p-003  ·  D1 Integration

**A RAG assistant gives wrong answers; logs show the correct passage was never retrieved. What should you fix?** 

- **A.** Increase output length
- **B.** Add more context to the prompt
- **C.** Use a larger model
- **D.** Retrieval: chunking, search config, filters

<details><summary>Answer</summary>

**D**: Diagnose retrieval vs model; here retrieval failed.

</details>

### ccar-p-004  ·  D1 Integration

**Select TWO controls that correctly enforce per-user data access in RAG.** Select TWO

- **A.** Hope users ask politely
- **B.** Tell the model not to reveal restricted docs
- **C.** Filter by the user's permissions before content enters context
- **D.** Apply document-level access control at retrieval time

<details><summary>Answer</summary>

**C, D**: Enforcement belongs in the retrieval layer, not the prompt.

</details>

### ccar-p-005  ·  D1 Integration

**A write-action tool call times out; retrying may duplicate the order. Best design?** 

- **A.** Never retry
- **B.** Let the model guess the result
- **C.** Use idempotency keys with backoff and surface failures clearly
- **D.** Retry blindly

<details><summary>Answer</summary>

**C**: Idempotency + backoff makes retries safe.

</details>

### ccar-p-006  ·  D1 Integration

**Why does MCP matter when integrating many internal systems?** 

- **A.** It removes the need for permissions
- **B.** It makes models smarter
- **C.** A standard protocol to expose tools/data reduces bespoke glue and enables reuse
- **D.** It replaces evals

<details><summary>Answer</summary>

**C**: Standardised tool/data connectivity.

</details>

### ccar-p-007  ·  D2 Solution design

**A task has fixed, known steps and needs reliability. What is the best architecture?** 

- **A.** Human only
- **B.** Deterministic workflow / prompt chain
- **C.** Autonomous multi-agent system
- **D.** Single prompt with no structure

<details><summary>Answer</summary>

**B**: Known steps → workflow; use the simplest pattern that meets the need.

</details>

### ccar-p-008  ·  D2 Solution design

**When does a multi-agent design make most sense?** 

- **A.** Always, for better quality
- **B.** For simple classification
- **C.** When subtasks are parallel/independent or need isolated contexts and the benefit outweighs cost and coordination risk
- **D.** When there is no time to design

<details><summary>Answer</summary>

**C**: Multi-agent adds cost and failure modes; justify it.

</details>

### ccar-p-009  ·  D2 Solution design

**A client asks for 'an agent' to extract 5 fields from invoices. Best recommendation?** 

- **A.** A single structured LLM call (possibly a small model) with schema validation
- **B.** Manual entry
- **C.** Fine-tune a model
- **D.** Multi-agent swarm

<details><summary>Answer</summary>

**A**: Simplest design that meets the requirement.

</details>

### ccar-p-010  ·  D2 Solution design

**Before proposing an architecture, you should first:** 

- **A.** Choose the model
- **B.** Select the cloud provider
- **C.** Build a prototype agent
- **D.** Agree measurable success criteria and constraints with the stakeholders

<details><summary>Answer</summary>

**D**: Discovery and success criteria come first.

</details>

### ccar-p-011  ·  D3 Evaluation & testing

**Which grader is best for validating that output is valid JSON matching a schema?** 

- **A.** LLM-as-judge
- **B.** Code-based grader (schema validation)
- **C.** User survey
- **D.** Human review of every item

<details><summary>Answer</summary>

**B**: Objective, verifiable checks → code graders.

</details>

### ccar-p-012  ·  D3 Evaluation & testing

**You introduce an LLM-as-judge for tone. What must you do?** 

- **A.** Trust it blindly
- **B.** Provide a clear rubric and calibrate against human labels
- **C.** Skip humans entirely
- **D.** Use the same model without a rubric

<details><summary>Answer</summary>

**B**: Calibrate judges against human ratings.

</details>

### ccar-p-013  ·  D3 Evaluation & testing

**After a prompt change, overall score rises but one customer segment drops. Best action?** 

- **A.** Revert without looking
- **B.** Ignore the segment
- **C.** Analyse by segment, investigate the regression, then decide
- **D.** Ship it

<details><summary>Answer</summary>

**C**: Segmented analysis and regression testing.

</details>

### ccar-p-014  ·  D3 Evaluation & testing

**Select TWO elements of a good eval dataset.** Select TWO

- **A.** Only easy cases
- **B.** Edge and adversarial cases
- **C.** One example per feature
- **D.** Cases added from real production failures

<details><summary>Answer</summary>

**B, D**: Representative + edge + production-derived failures.

</details>

### ccar-p-015  ·  D4 Governance & safety

**A hospital requires that Claude never exposes PHI to unauthorised staff. Best approach?** 

- **A.** Trust the model
- **B.** Tell users not to ask
- **C.** Implement access controls, filtering and audit logging in the system; BAA with the vendor; plus HITL where needed
- **D.** Add 'never share PHI' to the system prompt

<details><summary>Answer</summary>

**C**: Compliance needs real controls, not a line in the prompt.

</details>

### ccar-p-016  ·  D4 Governance & safety

**Which action should always have human approval?** 

- **A.** Summarising public docs
- **B.** Translating a paragraph internally
- **C.** Formatting text
- **D.** Issuing refunds above a defined threshold or other irreversible financial actions

<details><summary>Answer</summary>

**D**: High-impact irreversible actions need approval gates.

</details>

### ccar-p-017  ·  D4 Governance & safety

**A prompt-injection incident is detected in production. Correct sequence?** 

- **A.** Ignore → wait
- **B.** Blame the user
- **C.** Contain (revoke/kill switch) → investigate logs → remediate → notify as required → add cases to evals
- **D.** Rewrite the prompt only

<details><summary>Answer</summary>

**C**: Standard incident response, feeding learnings back to evals.

</details>

### ccar-p-018  ·  D5 Stakeholders & lifecycle

**The client wants to start building immediately. You lack baselines and success metrics. Best response?** 

- **A.** Ship a demo to impress
- **B.** Start building
- **C.** Run discovery: define goals, baseline, success criteria and risks first
- **D.** Pick the best model

<details><summary>Answer</summary>

**C**: Skipping discovery is a classic anti-pattern.

</details>

### ccar-p-019  ·  D5 Stakeholders & lifecycle

**How should you explain a trade-off between accuracy and cost to a business sponsor?** 

- **A.** Avoid discussing it
- **B.** Express it in business terms (risk, cost, time, value) with options and a recommendation
- **C.** Use token-level jargon
- **D.** Pick one without telling them

<details><summary>Answer</summary>

**B**: Translate technical trade-offs into business impact.

</details>

### ccar-p-020  ·  D5 Stakeholders & lifecycle

**A prompt change will go to production. Which lifecycle practice applies?** 

- **A.** Let users test it
- **B.** Version it, regression-test against evals, gated release with rollback plan
- **C.** Announce by email only
- **D.** Edit live

<details><summary>Answer</summary>

**B**: Change control for prompts/models/tools.

</details>

### ccar-p-021  ·  D6 Models, prompting & context

**Which statement about model selection is correct?** 

- **A.** Always use the cheapest
- **B.** Use whichever was used last
- **C.** Always use the most powerful model
- **D.** Choose by capability, cost and speed, justified by evals; smaller models often suffice

<details><summary>Answer</summary>

**D**: Right-size the model to the task.

</details>

### ccar-p-022  ·  D6 Models, prompting & context

**An app sends the same 20k-token policy document with every request. Best optimisation?** 

- **A.** Shorten answers
- **B.** Use prompt caching with the stable prefix first
- **C.** Retrain the model
- **D.** Remove the document

<details><summary>Answer</summary>

**B**: Cache the static prefix to cut cost and latency.

</details>

### ccar-p-023  ·  D6 Models, prompting & context

**Answers are poor because the model is given 50 loosely related chunks. Best fix?** 

- **A.** Improve retrieval/reranking so only relevant context is included
- **B.** Add even more chunks
- **C.** Use a larger window only
- **D.** Lower the temperature

<details><summary>Answer</summary>

**A**: Context engineering: relevance over volume.

</details>

### ccar-p-024  ·  D7 Developer productivity

**Which is the safest practice for Claude in a shared CI pipeline?** 

- **A.** Disable logging
- **B.** Give it production credentials for convenience
- **C.** Run as root
- **D.** Least-privilege permissions, allow-listed commands, sandboxed runner, review before merge

<details><summary>Answer</summary>

**D**: Safe permissions in shared/CI environments.

</details>

### ccar-p-025  ·  D7 Developer productivity

**A team wants consistent Claude behaviour on a repository. Best approach?** 

- **A.** Email instructions weekly
- **B.** Use no guidance
- **C.** Each dev writes their own prompts
- **D.** Commit shared project guidance/settings and keep personal prefs local

<details><summary>Answer</summary>

**D**: Shared, versioned project settings.

</details>

### ccar-p-026  ·  D1 Integration

**Two MCP tools both read 'customer data' and have near-identical descriptions; the agent keeps picking the wrong one. Best fix?** 

- **A.** Remove all descriptions
- **B.** Use a bigger model only
- **C.** Rewrite the tool descriptions to be distinct and precise, or merge the tools
- **D.** Add 'pick correctly' to the prompt

<details><summary>Answer</summary>

**C**: Tool descriptions drive selection; ambiguity causes misuse.

</details>

### ccar-p-027  ·  D1 Integration

**A third-party API returns 429 errors during peak load. Best handling?** 

- **A.** Exponential backoff with jitter, plus rate limiting or queueing on your side
- **B.** Retry instantly in a tight loop
- **C.** Ignore the error
- **D.** Let the model invent a response

<details><summary>Answer</summary>

**A**: Backoff and rate management protect both systems.

</details>

### ccar-p-028  ·  D1 Integration

**Which RAG change most directly helps both keyword-specific and semantic queries?** 

- **A.** Longer prompts
- **B.** Lower temperature
- **C.** Bigger chunks only
- **D.** Hybrid search (keyword plus embeddings) with reranking

<details><summary>Answer</summary>

**D**: Hybrid search plus reranking improves recall and precision.

</details>

### ccar-p-029  ·  D1 Integration

**A tool call fails. What should the agent do with the failure?** Select TWO

- **A.** never fabricate a result
- **B.** Hide it from logs
- **C.** Retry forever
- **D.** Surface the error clearly and handle it
- **E.** Pretend it succeeded

<details><summary>Answer</summary>

**A, D**: Failures must be visible and handled safely.

</details>

### ccar-p-030  ·  D1 Integration

**Select TWO secure ways to give an integration its credentials.** Select TWO

- **A.** Environment-injected short-lived tokens
- **B.** Commit the key to the repo
- **C.** Hard-code keys in the prompt
- **D.** Secrets manager with scoped, rotating credentials

<details><summary>Answer</summary>

**A, D**: Keep secrets out of model context and repos; scope and rotate.

</details>

### ccar-p-031  ·  D1 Integration

**An internal knowledge base is updated hourly. What matters most for RAG correctness?** 

- **A.** Using a bigger model
- **B.** Freshness: re-indexing or incremental updates with versioning
- **C.** Shorter answers
- **D.** More examples in the prompt

<details><summary>Answer</summary>

**B**: Stale indexes produce stale answers.

</details>

### ccar-p-032  ·  D2 Solution design

**Requirement: classify inbound emails into 6 categories at high volume and low cost. Best design?** 

- **A.** Autonomous agent with web access
- **B.** Fine-tune immediately
- **C.** Multi-agent debate
- **D.** Single call to a small model with a strict schema, validated by an eval set

<details><summary>Answer</summary>

**D**: Simplest viable design wins.

</details>

### ccar-p-033  ·  D2 Solution design

**Open-ended research tasks with an unpredictable number of steps. Which pattern fits?** 

- **A.** A single prompt
- **B.** An agent with defined tools, limits and checkpoints
- **C.** Manual only
- **D.** A rigid 3-step chain

<details><summary>Answer</summary>

**B**: Unpredictable paths justify an agent, with guardrails.

</details>

### ccar-p-034  ·  D2 Solution design

**A task's parts are independent and each needs a large separate context. Best structure?** 

- **A.** Random assignment
- **B.** Only a single prompt
- **C.** Orchestrator with parallel sub-agents, aggregating results
- **D.** One agent doing all sequentially in one context

<details><summary>Answer</summary>

**C**: Context isolation and parallelism justify subagents.

</details>

### ccar-p-035  ·  D2 Solution design

**Which is a real downside of multi-agent systems?** 

- **A.** They cannot call tools
- **B.** They always need fine-tuning
- **C.** Higher token cost and added coordination failure modes
- **D.** They remove the need for evals

<details><summary>Answer</summary>

**C**: Multi-agent adds cost and complexity.

</details>

### ccar-p-036  ·  D2 Solution design

**A client wants a nightly bulk summarisation of 200k documents, no urgency. What optimisation fits?** 

- **A.** Batch processing, possibly with prompt caching
- **B.** Streaming UI
- **C.** Real-time agent per document
- **D.** Human summarisation

<details><summary>Answer</summary>

**A**: Non-urgent bulk work suits batch for cost savings.

</details>

### ccar-p-037  ·  D2 Solution design

**Select TWO design elements that make an agent safer to run.** Select TWO

- **A.** Hidden actions with no logs
- **B.** Unlimited autonomy
- **C.** Human approval for irreversible actions
- **D.** Step and budget limits

<details><summary>Answer</summary>

**C, D**: Limits and approvals bound risk.

</details>

### ccar-p-038  ·  D2 Solution design

**Before choosing between workflow and agent, what do you need?** 

- **A.** Clear requirements and success criteria, including risk and latency needs
- **B.** A model release date
- **C.** A logo
- **D.** The largest context window

<details><summary>Answer</summary>

**A**: Requirements drive architecture.

</details>

### ccar-p-039  ·  D3 Evaluation & testing

**You need to check that a generated SQL query returns the expected rows. Best grader?** 

- **A.** None
- **B.** Code-based: execute against a test database and compare
- **C.** Human vote
- **D.** LLM-as-judge on style

<details><summary>Answer</summary>

**B**: Executable, objective checks beat judgement here.

</details>

### ccar-p-040  ·  D3 Evaluation & testing

**A summarisation app's quality is subjective. Which approach scales best?** 

- **A.** Only developer opinion
- **B.** No evaluation
- **C.** Exact string match
- **D.** LLM-as-judge with a rubric, calibrated on a human-labelled sample

<details><summary>Answer</summary>

**D**: Calibrated LLM judges scale subjective grading.

</details>

### ccar-p-041  ·  D3 Evaluation & testing

**Production users report a new failure type. Best use of it?** 

- **A.** Delete the report
- **B.** Add it to the eval set and regression-test fixes
- **C.** Edit the prompt blindly
- **D.** Dismiss as rare

<details><summary>Answer</summary>

**B**: Production failures should feed the eval dataset.

</details>

### ccar-p-042  ·  D3 Evaluation & testing

**Quality dropped after switching model versions. What process would have caught it?** 

- **A.** Checking one example
- **B.** Waiting for tickets
- **C.** Running the regression eval suite before release
- **D.** Hoping

<details><summary>Answer</summary>

**C**: Evals gate model/prompt changes.

</details>

### ccar-p-043  ·  D3 Evaluation & testing

**Select TWO signs a metric is well chosen.** Select TWO

- **A.** It ties to the business outcome
- **B.** It can be measured consistently
- **C.** It is easy to inflate
- **D.** Nobody understands it

<details><summary>Answer</summary>

**A, B**: Good metrics are tied to value and measurable reliably.

</details>

### ccar-p-044  ·  D3 Evaluation & testing

**Aggregate accuracy is 92% but one high-value segment is at 60%. Right reading?** Select TWO

- **A.** investigate by segment
- **B.** Lower the bar
- **C.** The aggregate hides a serious segment problem
- **D.** Segments never matter
- **E.** Success, ship it

<details><summary>Answer</summary>

**A, C**: Segment analysis reveals hidden failures.

</details>

### ccar-p-045  ·  D4 Governance & safety

**A bank requires an audit trail for every AI-assisted decision. Best control?** 

- **A.** Rely on chat history
- **B.** Skip logging for privacy
- **C.** Add 'be auditable' to the prompt
- **D.** Log inputs, outputs, tool calls and approver identity immutably

<details><summary>Answer</summary>

**D**: Auditability needs real logging infrastructure.

</details>

### ccar-p-046  ·  D4 Governance & safety

**Where should output moderation for a public chatbot sit?** 

- **A.** As a separate validation layer in code that checks responses before display
- **B.** Only in the system prompt
- **C.** Only in user training
- **D.** Nowhere

<details><summary>Answer</summary>

**A**: Guardrails belong in enforced layers.

</details>

### ccar-p-047  ·  D4 Governance & safety

**Under GDPR-style principles, which practice is most aligned?** 

- **A.** Send entire databases for convenience
- **B.** Retain everything forever
- **C.** Ignore deletion requests
- **D.** Data minimisation: send only the personal data the task needs

<details><summary>Answer</summary>

**D**: Minimisation and purpose limitation.

</details>

### ccar-p-048  ·  D4 Governance & safety

**A vendor will process PHI. What is required before proceeding (HIPAA context)?** 

- **A.** A marketing brochure
- **B.** A business associate agreement and appropriate safeguards
- **C.** Nothing
- **D.** A verbal promise

<details><summary>Answer</summary>

**B**: BAAs are required for vendors handling PHI.

</details>

### ccar-p-049  ·  D4 Governance & safety

**An agent can send external emails. Which control is most appropriate?** 

- **A.** Human approval or strict allow-lists before sending
- **B.** Let it send freely
- **C.** Hide the tool
- **D.** Rely on a polite system prompt

<details><summary>Answer</summary>

**A**: Gate externally visible irreversible actions.

</details>

### ccar-p-050  ·  D4 Governance & safety

**Select TWO incident-response steps after discovering an agent leaked data.** Select TWO

- **A.** Investigate using logs and notify as required
- **B.** Delete the logs
- **C.** Contain: revoke credentials or disable the tool
- **D.** Wait to see if it repeats

<details><summary>Answer</summary>

**A, C**: Contain, investigate, and notify; preserve evidence.

</details>

### ccar-p-051  ·  D5 Stakeholders & lifecycle

**A sponsor says 'just make it work like magic'. First step?** 

- **A.** Agree to everything
- **B.** Pick an LLM
- **C.** Run discovery to translate goals into measurable success criteria and constraints
- **D.** Start coding

<details><summary>Answer</summary>

**C**: Discovery and measurable criteria come first.

</details>

### ccar-p-052  ·  D5 Stakeholders & lifecycle

**Legal is worried about data risk and is blocking the project. Best approach?** 

- **A.** Bypass legal
- **B.** Escalate to ignore them
- **C.** Engage early, show controls and evidence, and propose a staged scope
- **D.** Hide the data flows

<details><summary>Answer</summary>

**C**: Collaborate and evidence controls.

</details>

### ccar-p-053  ·  D5 Stakeholders & lifecycle

**How should a pilot be structured?** 

- **A.** Open-ended with no metrics
- **B.** Launch to all customers
- **C.** Defined scope, success metrics and exit criteria agreed upfront
- **D.** No owner

<details><summary>Answer</summary>

**C**: Pilots need measurable exit criteria.

</details>

### ccar-p-054  ·  D5 Stakeholders & lifecycle

**The model provider announces a deprecation. How should this be treated?** 

- **A.** As irrelevant
- **B.** As a surprise to react to later
- **C.** As a planned change: assess, test with evals, schedule migration and rollback
- **D.** As a reason to cancel evals

<details><summary>Answer</summary>

**C**: Plan model lifecycle changes.

</details>

### ccar-p-055  ·  D5 Stakeholders & lifecycle

**Which is the best way to present options to executives?** 

- **A.** A 60-page appendix
- **B.** Token-level metrics only
- **C.** 2–3 options with trade-offs in cost, risk and value, plus a recommendation
- **D.** A single option, no rationale

<details><summary>Answer</summary>

**C**: Business-term trade-offs and a recommendation.

</details>

### ccar-p-056  ·  D5 Stakeholders & lifecycle

**Select TWO lifecycle practices after release.** Select TWO

- **A.** Schedule periodic reviews and re-evaluation
- **B.** Monitor quality, cost and incidents
- **C.** Stop monitoring after launch
- **D.** Change prompts without records

<details><summary>Answer</summary>

**A, B**: Operate and improve continuously.

</details>

### ccar-p-057  ·  D6 Models, prompting & context

**A support bot is slow and costly because every request resends a long static policy. Best fix?** 

- **A.** Remove the policy
- **B.** Use larger output
- **C.** Retrain the model
- **D.** Prompt caching with the static content at the start of the prompt

<details><summary>Answer</summary>

**D**: Cache the stable prefix.

</details>

### ccar-p-058  ·  D6 Models, prompting & context

**For reliable multi-step math or logic, which technique helps?** 

- **A.** Higher randomness
- **B.** Shorter prompts only
- **C.** Chain-of-thought or extended thinking, validated by checks
- **D.** Removing instructions

<details><summary>Answer</summary>

**C**: Reasoning techniques improve multi-step accuracy.

</details>

### ccar-p-059  ·  D6 Models, prompting & context

**Which prompt layout is generally better with a very long document?** 

- **A.** Random order
- **B.** No delimiters
- **C.** Question buried in the middle
- **D.** Place the document first, with the question and instructions after it

<details><summary>Answer</summary>

**D**: Long content first, clear delimiters, then the ask.

</details>

### ccar-p-060  ·  D6 Models, prompting & context

**Select TWO benefits of few-shot examples.** Select TWO

- **A.** More consistent output format
- **B.** Guaranteed correctness
- **C.** Free of cost
- **D.** Better alignment to desired style

<details><summary>Answer</summary>

**A, D**: Examples steer format and style, not guarantee truth.

</details>

### ccar-p-061  ·  D6 Models, prompting & context

**A chat agent's history grows until quality degrades. Best context technique?** 

- **A.** Increase temperature
- **B.** Delete the system prompt
- **C.** Summarise or compact history and retrieve details just in time
- **D.** Keep everything forever

<details><summary>Answer</summary>

**C**: Context management prevents dilution.

</details>

### ccar-p-062  ·  D7 Developer productivity

**Which hook-style practice best enforces code-quality rules in team workflows?** 

- **A.** A reminder email
- **B.** Instruction text only
- **C.** Automated checks (lint, tests, secret scanning) run as hooks or CI gates
- **D.** Trusting memory

<details><summary>Answer</summary>

**C**: Enforce with automation, not only instructions.

</details>

### ccar-p-063  ·  D7 Developer productivity

**A new team is adopting Claude for engineering. Best rollout step?** 

- **A.** No training
- **B.** Disable logging
- **C.** Pilot with a small group, gather feedback and measure usage and cost
- **D.** Mandate for all on day one

<details><summary>Answer</summary>

**C**: Staged rollout with feedback and monitoring.

</details>
