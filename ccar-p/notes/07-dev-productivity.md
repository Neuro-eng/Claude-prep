# Domain 7: Developer Productivity & Operational Enablement (7%)

## What the exam tests
Helping engineering teams adopt Claude (typically via **Claude Code**) safely and consistently: shared configuration, permissions, automation and rollout.

## 7.1 Project guidance: `CLAUDE.md`
A Markdown file Claude Code reads at the start of sessions for project conventions.
- **Locations (hierarchy):** organisation/managed policy → **project** `./CLAUDE.md` (commit to Git, shared) → **user** `~/.claude/CLAUDE.md` (personal) → sub-folder files for local rules.
- **Put in it:** build/test/lint commands, architecture overview, code style, naming, "do/don't" rules, where things live, PR conventions.
- **Keep it concise and current;** it is context on every session (long files dilute).
- Shared in repo = consistent behaviour across the team.

## 7.2 Settings and permissions
- `.claude/settings.json` → **shared** project settings (commit); `.claude/settings.local.json` → **personal**, not committed; user-level and managed (enterprise) settings also exist; managed policy can enforce rules.
- **Permission rules:** `allow` (run without asking), `ask`, `deny` for tools/commands/paths, e.g. allow `npm test`, deny reading `.env` or running `rm -rf`, deny network tools in CI.
- Principle: **least privilege**, deny sensitive paths, allow only safe repeatable commands; require review for the rest.
- Modes: ask-per-action (default), plan mode (propose first), auto-accept edits: choose by risk.

## 7.3 Hooks, commands, subagents, MCP
| Feature | Purpose |
|---|---|
| **Hooks** | Run your scripts at lifecycle events (e.g. before/after a tool runs) to **enforce** rules deterministically: run linter/tests, block edits to protected files, scan for secrets |
| **Slash commands** | Saved prompts the team shares (e.g. `/review`, `/release-notes`) |
| **Subagents** | Specialised assistants with own context and tool limits (e.g. security-reviewer) |
| **MCP servers** | Connect issue trackers, docs, databases; project-scoped config shared via `.mcp.json` |
Key idea (links back to Domain 4): **hooks/permissions enforce; CLAUDE.md guides.**

## 7.4 Automation and CI
- **Headless/non-interactive mode** (e.g. `claude -p "…"`) for scripts and CI: structured output, no human at the keyboard.
- GitHub Actions integration for PR review/triage/issue-to-PR.
- **CI safety:** least-privilege token, no production credentials, sandboxed runner, restricted tool allow-list, **human review before merge**, log outputs, spend limits.
- Validate any generated code with tests, linters, SAST, dependency checks like any other contribution.

## 7.5 Rollout and enablement
1. **Pilot** with willing team; baseline metrics.
2. Provide **starter CLAUDE.md**, settings, command library, and a short training (what it's good/bad at, security rules).
3. **Champions** + support channel; share prompts that work.
4. Measure: cycle time, PR throughput/size, review time, test pass rate, defect escape, developer satisfaction, **cost per developer**. Beware vanity metrics (lines of code).
5. Governance: approved plans/data policies, secret handling, code-review standards, licence/IP checks.
6. Iterate configuration as the team learns.

## 7.6 Documentation as enablement
Good README, architecture notes, runbooks and test instructions help humans and Claude. Treat docs as part of the product.

## Scenario
*A 40-developer team wants consistent, safe Claude Code use, with CI PR reviews.*
- Commit `CLAUDE.md` (commands, conventions) + `.claude/settings.json` (allow test/lint; deny `.env`, deploy scripts).
- Hook: run formatter and secret-scan after edits.
- Shared `/review` command and security-reviewer subagent.
- CI: PR-review job with read-only token, no prod secrets; humans approve merges.
- Pilot with 8 devs for 3 weeks; track review time and defect rate; then expand.

## Exam traps
- ❌ Giving CI/headless runs production credentials or broad permissions.
- ❌ Relying on CLAUDE.md text alone to *enforce* security (use permissions/hooks).
- ❌ Each dev with different, uncommitted guidance.
- ✅ Shared committed config; least-privilege permissions; hooks for enforcement; staged rollout with metrics.

## Self-check
<details><summary>Q1. Shared vs personal settings files?</summary>`.claude/settings.json` shared (committed); `settings.local.json` personal.</details>
<details><summary>Q2. Guide vs enforce?</summary>CLAUDE.md guides; permissions and hooks enforce.</details>
<details><summary>Q3. Safe CI posture?</summary>Least-privilege token, sandbox, allow-listed tools, no prod secrets, human merge approval.</details>

## Learn more
- Claude Code overview: https://code.claude.com/docs/en/overview
- Memory / CLAUDE.md: https://code.claude.com/docs/en/memory
- Settings & permissions: https://code.claude.com/docs/en/settings
- Hooks: https://code.claude.com/docs/en/hooks-guide
- Subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code MCP: https://code.claude.com/docs/en/mcp
- Headless mode / GitHub Actions: https://code.claude.com/docs/en/github-actions
