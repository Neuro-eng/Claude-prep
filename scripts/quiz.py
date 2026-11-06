#!/usr/bin/env python3
"""Terminal quiz runner.  usage: quiz.py {ccao-f|ccar-p} [-n N] [-d DOMAIN] | quiz.py --export"""
import argparse, json, random, pathlib, sys
Q = pathlib.Path(__file__).resolve().parent.parent / "questions"

def load(exam): return json.loads((Q / f"{exam}.json").read_text())

def export():
    for f in sorted(Q.glob("*.json")):
        qs = json.loads(f.read_text()); lines = [f"# {f.stem.upper()} practice questions ({len(qs)})\n",
            "_Original practice questions, not real exam items._\n"]
        for q in qs:
            sel = "Select TWO" if q["type"]=="multi" else ""
            lines.append(f"### {q['id']}  ·  D{q['domain']} {q['domain_name']}\n\n**{q['question']}** {sel}\n")
            lines += [f"- **{k}.** {v}" for k,v in q["options"].items()]
            lines.append(f"\n<details><summary>Answer</summary>\n\n**{', '.join(q['answer'])}**: {q['explanation']}\n\n</details>\n")
        (Q / f"{f.stem}.md").write_text("\n".join(lines)); print("wrote", f.stem + ".md")

def run(exam, n, domain):
    qs = load(exam)
    if domain: qs = [q for q in qs if q["domain"]==domain]
    if not qs: sys.exit("No questions for that selection.")
    random.shuffle(qs); qs = qs[:n]; score = 0; missed = {}
    for i,q in enumerate(qs,1):
        need = len(q["answer"])
        print(f"\n[{i}/{len(qs)}] D{q['domain']} {q['domain_name']}\n{q['question']}" + (f"  (Select {need})" if need>1 else ""))
        for k,v in q["options"].items(): print(f"  {k}. {v}")
        got = sorted(set(input("> ").upper().replace(",", " ").replace(" ", "")))
        ok = got == sorted(q["answer"]); score += ok
        print("✔ Correct" if ok else f"✘ Answer: {', '.join(q['answer'])}"); print("  →", q["explanation"])
        if not ok: missed[q["domain_name"]] = missed.get(q["domain_name"],0)+1
    pct = round(100*score/len(qs))
    print(f"\nScore: {score}/{len(qs)} ({pct}%).  Target ≥ 80% before booking.")
    if missed: print("Review:", ", ".join(f"{k} ({v})" for k,v in sorted(missed.items(), key=lambda x:-x[1])))

if __name__ == "__main__":
    p = argparse.ArgumentParser(); p.add_argument("exam", nargs="?", choices=["ccao-f","ccar-p"])
    p.add_argument("-n", type=int, default=10); p.add_argument("-d", type=int, help="domain number")
    p.add_argument("--export", action="store_true"); a = p.parse_args()
    export() if a.export else (run(a.exam, a.n, a.d) if a.exam else p.print_help())
