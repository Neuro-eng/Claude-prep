#!/usr/bin/env python3
"""Checks the pages in sources.json for changes. Designed for a daily GitHub Action.

 * First run stores a baseline (no alert).
 * On change: saves a diff to state/changes/, logs it in site/data/manifest.json, and sets the
   GitHub Actions output `changed=true` so the workflow can open an issue and redeploy.
 * Login-gated or unreachable pages are recorded as such (never crash the run).
usage: watch_sources.py [--config sources.json]"""
import argparse, difflib, hashlib, json, os, pathlib, re, sys, datetime, urllib.request, urllib.error
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent.parent
STATE = ROOT / "state"; MAN = ROOT / "site" / "data" / "manifest.json"

class T(HTMLParser):
    def __init__(s): super().__init__(); s.out=[]; s.skip=0
    def handle_starttag(s,t,a):
        if t in("script","style","noscript","svg"): s.skip+=1
        if t in("p","div","li","h1","h2","h3","h4","br","tr","section"): s.out.append("\n")
    def handle_endtag(s,t):
        if t in("script","style","noscript","svg"): s.skip=max(0,s.skip-1)
    def handle_data(s,d):
        if not s.skip: s.out.append(d)

def to_text(html):
    p=T(); p.feed(html)
    lines=[re.sub(r"\s+"," ",l).strip() for l in "".join(p.out).splitlines()]
    return [l for l in lines if len(l)>2]

def fetch(url):
    req=urllib.request.Request(url,headers={"User-Agent":"claude-cert-prep-watcher/1.0 (+study repo)"})
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.status, r.geturl(), r.read().decode("utf-8","replace")

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--config",default=str(ROOT/"sources.json")); a=ap.parse_args()
    cfg=json.loads(pathlib.Path(a.config).read_text())["sources"]
    STATE.mkdir(exist_ok=True); (STATE/"changes").mkdir(exist_ok=True)
    man=json.loads(MAN.read_text()) if MAN.exists() else {"version":"1.0.0","changelog":[],"sources":[]}
    now=datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%MZ")
    status={s["id"]:s for s in man.get("sources",[])}; changed=[]
    for s in cfg:
        rec=status.get(s["id"],{"id":s["id"]}); rec.update(name=s["name"],url=s["url"],last_checked=now)
        try:
            code,final,html=fetch(s["url"])
            if "login" in final.lower() or "sign_in" in final.lower() or "/auth" in final.lower():
                rec["status"]="login-required"; status[s["id"]]=rec; continue
            lines=to_text(html)
            if s.get("keywords"):
                kws=[k.lower() for k in s["keywords"]]; lines=[l for l in lines if any(k in l.lower() for k in kws)]
            text="\n".join(lines); h=hashlib.sha256(text.encode()).hexdigest()[:12]
            f=STATE/f"{s['id']}.txt"; old=f.read_text() if f.exists() else None
            if old is None: rec.update(status="baseline",hash=h)
            elif rec.get("hash")!=h:
                diff="\n".join(difflib.unified_diff(old.splitlines(),lines,"previous","current",lineterm="",n=1))
                (STATE/"changes"/f"{now[:10]}-{s['id']}.diff").write_text(diff)
                rec.update(status="changed",hash=h,last_changed=now); changed.append(s["id"])
                man["changelog"].insert(0,{"date":now,"version":man["version"],"type":"source",
                    "text":f"Change detected on “{s['name']}”. Review exam guide / notes.","source":s["url"]})
            else: rec["status"]="unchanged"
            f.write_text(text)
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            rec["status"]="unreachable"; rec["error"]=str(e)[:120]
        status[s["id"]]=rec
    man["sources"]=list(status.values()); man["last_checked"]=now
    MAN.parent.mkdir(parents=True,exist_ok=True); MAN.write_text(json.dumps(man,indent=2,ensure_ascii=False))
    print("changed:",changed or "none")
    out=os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out,"a") as fh: fh.write(f"changed={'true' if changed else 'false'}\nids={','.join(changed)}\n")

if __name__=="__main__": main()
