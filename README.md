# Claude Certification Prep: CCAO-F + CCAR-P

Study repo for two Anthropic certifications, built for a **deadline of 11 Dec 2026**:

| Exam | Full name | Questions | Time | Fee | Pass |
|---|---|---|---|---|---|
| **CCAO-F** | Claude Certified Associate – Foundations | 60 | 120 min | $99 | 720/1000 scaled |
| **CCAR-P** | Claude Certified Architect – Professional | 63 | 120 min | $175 | 720/1000 scaled |

> ⚠️ **Exam content changes on 7 Dec 2026** (CCAO-F, CCDV-F, CCAR-P). Updated exam guides are due **17 Nov 2026**.
> Read `docs/00-exam-facts-and-deadline.md` first. It changes your plan.

## Start here: the Easy Guide
`easy/ccao-f.md` and `easy/ccar-p.md` explain every topic in simple words with **one example and one Anthropic link each**. In the web app it is the **Easy Guide** tab. Read it first, then use the detailed notes.

## Web app (with one-click updates)
Open the site (GitHub Pages) or run `python3 -m http.server -d site 8000`. It has study notes, domain quizzes (Learn/Test mode),
**full-length timed mock exams** (CCAO-F 60 q, CCAR-P 63 q, 120 min), flashcards, progress tracking and a missed-question bank.
The **Update** button (top right) shows new content and Anthropic-page changes found by the daily watcher. Setup: `docs/04-auto-update-setup.md`.

## What's inside

```
easy/            plain-language guides (start here)
site/            the web app (static; content.json is rebuilt by CI)
.github/         daily watcher, Pages deploy, AI-draft update workflows
sources.json     Anthropic pages the watcher checks
inbox/           drop new Exam Guide PDFs here → AI-drafted PR for review
docs/            exam facts, study plan, resources/URLs, checklist, glossary, case studies, hands-on project, auto-update setup
ccao-f/notes/    8 detailed chapters (concepts, worked examples, traps, self-checks, links)
ccar-p/notes/    7 detailed domains with weights, scenarios and links
cheatsheets/     one-page revision sheets for each exam
flashcards/      CSV decks (import into Anki / Quizlet)
questions/       original practice questions: 60 CCAO-F + 63 CCAR-P (JSON)
scripts/quiz.py  terminal quiz runner + markdown exporter
```

## Quick start

```bash
python3 scripts/quiz.py ccao-f            # 10 random questions
python3 scripts/quiz.py ccar-p -n 20      # 20 random questions
python3 scripts/quiz.py ccar-p -d 1       # only domain 1
python3 scripts/quiz.py --export          # regenerate questions/*.md
```

## Important disclaimers

- Notes are **independent study summaries**, compiled from public exam blueprints and community guides. They are **not** official Anthropic material and contain **no real exam questions**.
- **The official Exam Guide PDF (Partner Academy → Certifications) is the authoritative scope.** If anything here disagrees with it, the guide wins.
- Anthropic's exam rules **ban AI assistance during the exam** itself. Use AI to study, never in the exam.
- Check all fees, retake rules and facts on the Partner Academy / Pearson VUE pages before booking.
