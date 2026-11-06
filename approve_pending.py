#!/usr/bin/env python3
"""Promote reviewed AI-drafted questions:  approve_pending.py questions/pending/ccar-p-2026-11-18.json
Moves the file into questions/approved/ (the site builder picks it up on the next deploy)."""
import json, pathlib, shutil, sys
for p in sys.argv[1:]:
    p=pathlib.Path(p); json.loads(p.read_text())
    dest=p.parent.parent/"approved"/p.name; shutil.move(str(p),dest); print("approved →",dest)
