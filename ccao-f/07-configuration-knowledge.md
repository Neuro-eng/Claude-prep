# 7. Configuration & knowledge management

## Projects
- **Custom instructions**: persistent role, tone, format rules, constraints applied to every chat in the project.
- **Project knowledge**: uploaded files Claude can reference.

## Knowledge-base best practice
- Upload **curated, current, relevant** documents.
- Clear file names and structure; remove duplicates/outdated versions.
- Put **stable** guidance in instructions, **reference** material in knowledge.

## Anti-patterns
- Dumping everything ("kitchen-sink" knowledge): causes **context dilution**; Claude's attention is spread thin.
- Contradictory or outdated files.
- Sensitive/unsanitised data in shared projects.
- Instructions that are a wall of vague text.

## Context window
Finite working memory for the conversation + files + instructions. Long threads and giant uploads crowd it. Keep inputs focused; summarise; start new chats for new topics.
