# Auto-update: how it works and how to switch it on

## What happens automatically
1. **Daily watcher** (`.github/workflows/watch-anthropic.yml`, 03:17 UTC) fetches the pages in `sources.json`
   (Anthropic news, Partner Academy certification pages, FAQ, eligibility, Claude models page).
2. If a page's text changed it saves a **diff** in `state/changes/`, adds a line to the site's **changelog**,
   opens a GitHub **issue** labelled `exam-update`, rebuilds the site and **redeploys** it.
3. The website's **Update** button (top right) shows a red dot when a newer version is live. Click it to see the
   changelog and watcher status, then **Install** the new content. Your progress is untouched.

## One-time setup (5 minutes)
1. Push this repo to GitHub (branch `main`).
2. **Settings → Pages → Source: GitHub Actions.** Your site appears at `https://<user>.github.io/<repo>/`.
3. **Settings → Actions → General → Workflow permissions: Read and write**, and tick *Allow GitHub Actions to create and approve pull requests*.
4. *(Optional, for AI-drafted updates)* **Settings → Secrets → Actions → `ANTHROPIC_API_KEY`**.
5. Run **Actions → Watch Anthropic for exam updates → Run workflow** once to save the baseline.

## Getting new official material in (the important part)
The Partner Academy (Skilljar) needs your company login, so a bot **cannot download the Exam Guide PDF**.
When the new guides appear (**17 Nov 2026**):
1. Download the CCAO-F and CCAR-P guide PDFs while logged in.
2. Drop them into `inbox/` and push. The **AI draft update** workflow reads them and opens a **pull request** containing:
   - `ai-reports/<date>-<exam>.md`: what changed (domains, weights, scope, rules) and which notes need edits
   - `questions/pending/<exam>-<date>.json`: draft **original** questions
3. Review against the guide. Fix the notes in `ccao-f/notes` / `ccar-p/notes`. Publish good draft questions with
   `python scripts/approve_pending.py questions/pending/<file>.json`. Merge → the site redeploys → click **Update**.

No API key? Skip step 2 and edit the notes by hand; the deploy/update flow is the same.

## Limits (be aware)
- Page watching detects **that** something changed, not **what it means**. Nothing is merged without you.
- AI-drafted questions can be wrong. They stay in `pending/` until you approve them.
- The watcher can't see content behind the Skilljar login; it records those pages as "login required".
- Don't put real exam questions (brain dumps) in this repo. That breaches the exam agreement.

## Run locally
```bash
pip install markdown pypdf
python scripts/build_site.py          # regenerate site/data/content.json
python3 -m http.server -d site 8000   # open http://localhost:8000
python scripts/watch_sources.py       # run the watcher by hand
```
