# 5. Prompting & task execution

## Core prompt architecture: Role · Context · Goal · Constraints · Format
- **Role**: who Claude should act as
- **Context**: background, audience, source material
- **Goal**: the specific task and success criteria
- **Constraints**: length, tone, things to avoid, scope
- **Format**: bullets/table/JSON/email, etc.

## Principles
- Be **clear and direct**; vague prompts get vague outputs.
- Give **why** (purpose/audience), not just what.
- **Decompose** complex tasks into steps.
- **Few-shot**: give 2–5 examples of desired input→output for consistent style/format.
- **XML tags** (`<document>`, `<instructions>`, `<example>`) separate content from instructions and reduce confusion.
- Specify the format explicitly.
- Say what *to do* rather than only what not to do.

## Iterating
Treat first output as a draft. Refine by pointing at specific problems ("shorten section 2, remove jargon"). If a conversation goes off the rails, start fresh with an improved prompt rather than piling on corrections.
