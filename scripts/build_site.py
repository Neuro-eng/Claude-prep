#!/usr/bin/env python3
"""Builds site/data/content.json (notes, cheat sheets, flashcards, questions) and refreshes the manifest hash.
Run in CI before every Pages deploy:  python scripts/build_site.py"""
import csv, hashlib, json, pathlib, datetime, re
import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
MD = lambda t: markdown.markdown(t, extensions=["tables", "fenced_code", "sane_lists"])

EXAMS = {
  "ccao-f": dict(title="CCAO-F", full="Claude Certified Associate – Foundations", exam_items=60, minutes=120, fee="$99"),
  "ccar-p": dict(title="CCAR-P", full="Claude Certified Architect – Professional", exam_items=63, minutes=120, fee="$175"),
}

def title_of(text, fallback):
    m = re.search(r"^#\s+(.+)$", text, re.M); return m.group(1).strip() if m else fallback

def load_questions(exam):
    qs = json.loads((ROOT / "questions" / f"{exam}.json").read_text())
    for f in sorted((ROOT / "questions" / "approved").glob(f"{exam}-*.json")):   # human-approved AI additions
        qs += json.loads(f.read_text())
    seen, out = set(), []
    for q in qs:
        if q["id"] not in seen: seen.add(q["id"]); out.append(q)
    return out

def main():
    content = {"exams": {}, "docs": []}
    for ex, meta in EXAMS.items():
        qs = load_questions(ex)
        notes = []
        for f in sorted((ROOT / ex / "notes").glob("[0-9]*.md")):
            t = f.read_text(); notes.append({"id": f.stem, "title": title_of(t, f.stem), "html": MD(t)})
        cheat = (ROOT / "cheatsheets" / f"{ex}.md").read_text()
        cards = list(csv.reader(open(ROOT / "flashcards" / f"{ex}.csv")))[1:]
        domains = {}
        for q in qs: domains[str(q["domain"])] = q["domain_name"]
        content["exams"][ex] = {**meta, "domains": domains, "notes": notes,
                                "cheatsheet": MD(cheat), "flashcards": cards, "questions": qs}
    for f in sorted((ROOT / "docs").glob("*.md")):
        t = f.read_text(); content["docs"].append({"id": f.stem, "title": title_of(t, f.stem), "html": MD(t)})

    body = json.dumps(content, sort_keys=True, ensure_ascii=False)
    h = hashlib.sha256(body.encode()).hexdigest()[:12]
    content["hash"] = h
    mpath = ROOT / "site" / "data" / "manifest.json"
    man = json.loads(mpath.read_text()) if mpath.exists() else {"version": "1.0.0", "changelog": [], "sources": []}
    now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%MZ")
    if man.get("content_hash") != h:      # content changed → bump patch + log
        if man.get("content_hash"):
            a, b, c = map(int, man["version"].split(".")); man["version"] = f"{a}.{b}.{c+1}"
            man["changelog"].insert(0, {"date": now, "version": man["version"], "type": "content",
                                        "text": f"Study content or questions updated (ccao-f {len(content['exams']['ccao-f']['questions'])} q, ccar-p {len(content['exams']['ccar-p']['questions'])} q)."})
        man["content_hash"] = h; man["built"] = now
    content["version"] = man["version"]
    man["counts"] = {k: len(v["questions"]) for k, v in content["exams"].items()}
    man.setdefault("dates", {"guide_release": "2026-11-17", "content_change": "2026-12-07", "deadline": "2026-12-11"})
    (ROOT / "site" / "data" / "content.json").write_text(json.dumps(content, ensure_ascii=False))
    mpath.write_text(json.dumps(man, indent=2, ensure_ascii=False))
    print("built", man["version"], h, man["counts"])

if __name__ == "__main__": main()
