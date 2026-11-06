# Domain 7: Developer Productivity & Operational Enablement (7%)

Smallest domain; day-to-day team use of Claude.

- **Shared project settings**: commit shared config/instructions (e.g. `CLAUDE.md`-style project guidance) so the team gets consistent behaviour; keep personal prefs local.
- **Documentation**: conventions, architecture notes, how to run/test: helps Claude *and* humans.
- **Rollout checks**: pilot group, training, feedback loop, usage/cost monitoring.
- **Safe permissions** in shared/CI environments: least privilege, allow/deny lists for commands and tools, no production credentials, sandboxed runners, require review before merge.
- Headless/CI use: non-interactive modes need tightly scoped permissions and output validation.
- Hooks / automation for guardrails (lint, tests, secret scanning) rather than relying on instructions.
