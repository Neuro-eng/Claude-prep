# 1. Output evaluation & quality

## Evaluate on three axes
- **Accuracy**: are facts, figures, names, citations correct?
- **Completeness**: did it address every part of the request?
- **Relevance**: does it fit the audience and purpose, or drift?

## Hallucinations
Plausible but fabricated content: invented citations, statistics, quotes, URLs, policy details.
- Highest risk: specific numbers, legal/medical claims, named sources, niche facts, anything beyond the supplied material.
- Mitigations: give source material and tell Claude to answer **only from it**; allow "I don't know"; ask it to quote supporting text; verify independently.
- Fluent and confident tone ≠ correct.

## Reasoning and maths
- Check multi-step logic step by step; ask Claude to show its work, then **verify arithmetic independently** (spreadsheet/calculator).
- Look for internal contradictions between sections of a long output.
- Do not assume a long, structured answer is right because it *looks* thorough.

## Exam angle
"What should the user do first/next?" → usually *verify against a canonical source* rather than "trust it" or "discard everything".
