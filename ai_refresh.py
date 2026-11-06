#!/usr/bin/env python3
"""Drafts study-material updates with Claude (optional, needs ANTHROPIC_API_KEY).

Inputs (any of): inbox/*.pdf or *.txt|*.md  (e.g. a newly downloaded Exam Guide from Skilljar),
                 state/changes/*.diff        (changes detected on public pages).
Outputs (NEVER auto-merged; a human reviews the PR):
   ai-reports/<date>-<exam>.md                       what changed vs. current notes + suggested note edits
   questions/pending/<exam>-<date>.json              draft new questions (move to questions/approved/ once verified)
usage: ai_refresh.py [--exam ccao-f|ccar-p|both] [--model claude-sonnet-5-5] [--dry-run]"""
import argparse, json, os, pathlib, datetime, urllib.request, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent

def read_inputs():
    parts=[]
    for f in sorted((ROOT/"inbox").glob("*")):
        if f.name.startswith("."): continue
        if f.suffix.lower()==".pdf":
            from pypdf import PdfReader
            txt="\n".join((p.extract_text() or "") for p in PdfReader(str(f)).pages)
        elif f.suffix.lower() in (".txt",".md"): txt=f.read_text()
        else: continue
        parts.append(f"=== INBOX FILE: {f.name} ===\n{txt[:60000]}")
    for f in sorted((ROOT/"state"/"changes").glob("*.diff"))[-5:]:
        parts.append(f"=== PAGE CHANGE: {f.name} ===\n{f.read_text()[:8000]}")
    return "\n\n".join(parts)

def current_notes(exam):
    return "\n\n".join(f.read_text() for f in sorted((ROOT/exam/"notes").glob("[0-9]*.md")))[:40000]

PROMPT = """You maintain a study repo for the Anthropic exam {exam}. Below are (1) the repo's CURRENT notes and (2) NEW source material
(an official exam guide excerpt and/or detected page changes). Respond with ONLY a JSON object:
{{"report_md": "markdown: what changed (domains, weights, scope, exam rules/dates), which notes are now wrong or missing, and concrete edits",
  "new_questions": [{{"domain": <int>, "domain_name": "<str>", "type": "single"|"multi", "question": "<str>",
      "options": {{"A":"..","B":"..","C":"..","D":".."}}, "answer": ["A"], "explanation": "<str>"}}]}}
Rules: write ORIGINAL scenario questions only (never reproduce real exam items); 4 options; exactly one correct answer for 'single', two for 'multi';
only cover content actually supported by the NEW source material; 5-15 questions; if the new material doesn't concern {exam}, return an empty list and say so.

CURRENT NOTES:
{notes}

NEW SOURCE MATERIAL:
{new}
"""

def call(model, prompt):
    key=os.environ["ANTHROPIC_API_KEY"]
    body=json.dumps({"model":model,"max_tokens":8000,"messages":[{"role":"user","content":prompt}]}).encode()
    req=urllib.request.Request("https://api.anthropic.com/v1/messages",body,{"x-api-key":key,"anthropic-version":"2023-06-01","content-type":"application/json"})
    with urllib.request.urlopen(req,timeout=300) as r: data=json.load(r)
    return "".join(b.get("text","") for b in data["content"] if b.get("type")=="text")

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--exam",default="both"); ap.add_argument("--model",default=os.environ.get("MODEL","claude-sonnet-5-5")); ap.add_argument("--dry-run",action="store_true"); a=ap.parse_args()
    new=read_inputs()
    if not new.strip(): print("Nothing to process (inbox/ empty, no page diffs)."); return
    exams=["ccao-f","ccar-p"] if a.exam=="both" else [a.exam]; today=datetime.date.today().isoformat()
    for ex in exams:
        prompt=PROMPT.format(exam=ex.upper(),notes=current_notes(ex),new=new)
        if a.dry_run: print(f"[dry-run] {ex}: prompt {len(prompt)} chars"); continue
        raw=call(a.model,prompt); raw=raw[raw.find("{"):raw.rfind("}")+1]
        try: res=json.loads(raw)
        except json.JSONDecodeError: print(f"{ex}: model did not return valid JSON; skipping"); continue
        good=[]
        for i,q in enumerate(res.get("new_questions",[]),1):
            try:
                assert set(q["options"])=={"A","B","C","D"} and q["answer"] and set(q["answer"])<=set("ABCD")
                assert q["type"]==("multi" if len(q["answer"])>1 else "single")
                good.append({"id":f"{ex}-ai{today.replace('-','')}-{i:02d}",**{k:q[k] for k in("domain","domain_name","type","question","options","answer","explanation")}})
            except (AssertionError,KeyError): continue
        (ROOT/"ai-reports"/f"{today}-{ex}.md").write_text(f"# AI refresh report: {ex.upper()} ({today})\n\n_Draft by Claude; verify against the official guide._\n\n{res.get('report_md','')}\n")
        if good: (ROOT/"questions"/"pending"/f"{ex}-{today}.json").write_text(json.dumps(good,indent=2,ensure_ascii=False))
        print(f"{ex}: report written, {len(good)} draft questions → questions/pending/")

if __name__=="__main__": main()
