/* Claude Cert Prep: single-page app. No build step, no dependencies.
   Content comes from data/content.json (rebuilt by CI). Progress lives in localStorage and survives updates. */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const LS = {
  get(k, d) { try { const v = localStorage.getItem("ccp." + k); return v ? JSON.parse(v) : d } catch { return d } },
  set(k, v) { try { localStorage.setItem("ccp." + k, JSON.stringify(v)) } catch { } }
};
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]] } return a };
const same = (a, b) => a.length === b.length && [...a].sort().join() === [...b].sort().join();
const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

let C = null;            // content
let M = null;            // latest manifest from server
let S = null;            // active quiz session
let timer = null;
const Q = {};            // id → question

/* ---------- loading & updating ---------- */
async function getJSON(url) { const r = await fetch(url + (url.includes("?") ? "&" : "?") + "cb=" + Date.now(), { cache: "no-store" }); if (!r.ok) throw new Error(r.status); return r.json() }
function index() { for (const e of Object.values(C.exams)) for (const q of e.questions) Q[q.id] = q }
async function boot() {
  C = LS.get("content", null);
  if (!C) { try { C = await getJSON("data/content.json"); LS.set("content", C) } catch (e) { $("#app").innerHTML = `<div class="card"><h1>Couldn’t load study content</h1><p>Serve this folder over HTTP (for example <code>python3 -m http.server -d site</code>) or open the GitHub Pages link. ${esc(e.message)}</p></div>`; return } }
  index(); applyTheme(LS.get("theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  window.addEventListener("hashchange", route); route(); checkUpdate(true);
  setInterval(() => checkUpdate(true), 30 * 60 * 1000);
}
async function checkUpdate(silent) {
  try { M = await getJSON("data/manifest.json") } catch { M = null; if (!silent) throw 0; return }
  const need = M.version !== C.version || M.content_hash !== C.hash;
  $("#dot").hidden = !need; return need;
}
async function applyUpdate() {
  C = await getJSON("data/content.json"); LS.set("content", C); index(); await checkUpdate(true); route();
}
function repoLinks() {
  const m = location.hostname.match(/^(.+)\.github\.io$/), p = location.pathname.split("/")[1];
  return m && p ? `https://github.com/${m[1]}/${p}` : null;
}
const stLabel = { unchanged: ["ok", "No change"], changed: ["warn", "Changed"], baseline: ["", "Baseline saved"], "login-required": ["", "Login required (use inbox/ PDF)"], unreachable: ["bad", "Unreachable"] };
function openUpdate() {
  const dlg = $("#updateDlg"); dlg.showModal(); renderUpdate("Checking…");
  checkUpdate(false).then(() => renderUpdate()).catch(() => renderUpdate("Couldn’t reach the server. You’re offline or the site isn’t deployed yet; your cached content still works."));
}
function renderUpdate(msg) {
  const need = M && (M.version !== C.version || M.content_hash !== C.hash), repo = repoLinks();
  const src = (M?.sources || []).map(s => { const [k, t] = stLabel[s.status] || ["", s.status || "-"]; return `<tr><td><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></td><td><span class="pill ${k}">${t}</span></td><td class="small muted">${s.last_changed ? s.last_changed.slice(0, 10) : "-"}</td></tr>` }).join("");
  const log = (M?.changelog || []).slice(0, 8).map(c => `<li><span class="pill ${c.type === "source" ? "warn" : ""}">${c.type === "source" ? "Anthropic page changed" : "Content updated"}</span> <span class="small muted">${esc(c.date.slice(0, 10))} · v${esc(c.version)}</span><br>${esc(c.text)}${c.source ? ` <a href="${esc(c.source)}" target="_blank" rel="noopener">source</a>` : ""}</li>`).join("");
  $("#udBody").innerHTML = `<h2 id="udTitle" style="margin-top:0">Updates</h2>
  ${msg ? `<p class="muted">${esc(msg)}</p>` : ""}
  <div class="card" style="margin-bottom:14px"><div class="row" style="justify-content:space-between"><div>
   <b>Installed:</b> v${esc(C.version)} <span class="muted small">(${esc(C.hash)})</span><br>
   <b>Latest:</b> ${M ? `v${esc(M.version)} <span class="muted small">checked ${esc((M.last_checked || M.built || "").slice(0, 16).replace("T", " "))} UTC</span>` : "unknown"}</div>
   <div class="row">${need ? `<button class="btn pri" id="applyBtn">Install v${esc(M.version)}</button>` : `<span class="pill ok">Up to date</span>`}<button class="btn" id="recheckBtn">Check again</button></div></div>
   <p class="small muted" style="margin:10px 0 0">Your progress, missed questions and flashcard marks are kept when content updates.</p></div>
  <h3>Anthropic sources watched daily</h3>
  ${src ? `<table><tr><th>Page</th><th>Status</th><th>Changed</th></tr>${src}</table>` : `<p class="muted small">No watcher results yet. They appear after the first scheduled run of the “Watch Anthropic” workflow.</p>`}
  <h3>Recent changes</h3>${log ? `<ul class="log">${log}</ul>` : `<p class="muted small">Nothing logged yet.</p>`}
  <div class="row" style="margin-top:18px;justify-content:space-between">
   <span class="small muted">${repo ? `<a href="${repo}/actions/workflows/watch-anthropic.yml" target="_blank" rel="noopener">Run the watcher now</a> · <a href="${repo}/issues?q=label%3Aexam-update" target="_blank" rel="noopener">Update issues</a>` : "Deploy to GitHub Pages to get watcher links."}</span>
   <button class="btn" id="closeUd">Close</button></div>`;
  $("#closeUd").onclick = () => $("#updateDlg").close();
  $("#recheckBtn").onclick = () => { renderUpdate("Checking…"); checkUpdate(false).then(() => renderUpdate("Checked just now.")).catch(() => renderUpdate("Couldn’t reach the server.")) };
  const ab = $("#applyBtn"); if (ab) ab.onclick = async () => { ab.disabled = true; ab.textContent = "Installing…"; try { await applyUpdate(); renderUpdate("Updated. New questions and notes are live.") } catch { renderUpdate("Update failed; try again.") } };
}

/* ---------- theme & routing ---------- */
function applyTheme(t) { document.documentElement.dataset.theme = t; LS.set("theme", t) }
$("#themeBtn").onclick = () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
$("#updateBtn").onclick = openUpdate;
function route() {
  clearInterval(timer); const [r = "", a, b] = location.hash.replace(/^#\/?/, "").split("/");
  document.querySelectorAll("#nav a").forEach(x => x.classList.toggle("on", x.dataset.r === r));
  if (S && S.active && r !== "run") S.active = false;
  const v = { "": home, easy, study, practice, mock, cards, progress, run: () => run() }[r] || home; v(a, b);
  $("#app").focus({ preventScroll: true }); scrollTo(0, 0);
}
const app = h => { $("#app").innerHTML = h };
const days = d => Math.ceil((new Date(d + "T23:59:59") - new Date()) / 864e5);

/* ---------- history helpers ---------- */
const hist = () => LS.get("history", []);
function domainStats(ex) {
  const st = {}; for (const h of hist()) if (h.exam === ex) for (const [d, [c, t]] of Object.entries(h.dom)) { st[d] = st[d] || [0, 0]; st[d][0] += c; st[d][1] += t } return st
}
function readiness(ex) { const m = hist().filter(h => h.exam === ex && h.kind === "mock").slice(-3); if (!m.length) return null; return Math.round(m.reduce((s, h) => s + h.pct, 0) / m.length) }

/* ---------- dashboard ---------- */
function home() {
  const D = M?.dates || { guide_release: "2026-11-17", content_change: "2026-12-07", deadline: "2026-12-11" };
  const cd = (l, d, hint) => { const n = days(d); return `<div class="card count"><b>${n < 0 ? "Passed" : n}</b><span>${n < 0 ? "" : "days to "}${l}</span><div class="small muted">${hint}</div></div>` };
  const ex = Object.entries(C.exams).map(([k, e]) => {
    const r = readiness(k), missed = Object.keys(LS.get("missed", {})).filter(id => id.startsWith(k)).length;
    return `<div class="card"><h2 style="margin-top:0">${e.title}</h2><p class="muted" style="margin:0 0 12px">${esc(e.full)}</p>
    <p class="small">${e.questions.length} practice questions · mock = ${e.exam_items} items / ${e.minutes} min · ${e.fee}</p>
    <p>${r == null ? `<span class="pill">No mock exam taken yet</span>` : `<span class="pill ${r >= 80 ? "ok" : r >= 70 ? "warn" : "bad"}">Mock average ${r}% ${r >= 80 ? "· ready" : "· aim for 80%+"}</span>`} ${missed ? `<span class="pill warn">${missed} missed to review</span>` : ""}</p>
    <div class="row"><a class="btn" href="#/study/${k}">Study notes</a><a class="btn" href="#/practice/${k}">Practice</a><a class="btn pri" href="#/mock/${k}">Mock exam</a></div></div>`
  }).join("");
  const resume = LS.get("session", null);
  app(`<h1>Get both exams done before 11 Dec</h1><p class="sub">Notes, domain quizzes, full-length timed mock exams, flashcards and progress tracking for CCAO-F and CCAR-P.</p>
  <div class="card" style="margin-bottom:16px;border-color:var(--pencil)"><div class="row" style="justify-content:space-between"><span><b>New here?</b> Start with the Easy Guide: simple words, one example and an Anthropic link for every topic.</span><span class="row"><a class="btn pri" href="#/easy/ccao-f">Easy Guide: CCAO-F</a><a class="btn pri" href="#/easy/ccar-p">Easy Guide: CCAR-P</a></span></div></div>
  ${resume ? `<div class="card" style="margin-bottom:16px;border-color:var(--warn)"><div class="row" style="justify-content:space-between"><span><b>Unfinished ${resume.kind === "mock" ? "mock exam" : "quiz"}</b> (${resume.exam.toUpperCase()}), ${Object.keys(resume.ans).length}/${resume.items.length} answered</span><span class="row"><a class="btn pri" href="#/run/resume">Resume</a><button class="btn" id="discard">Discard</button></span></div></div>` : ""}
  <div class="grid g3">${cd("new exam guides", D.guide_release, "Re-download from Skilljar")}${cd("exam content change", D.content_change, "CCAO-F, CCAR-P update")}${cd("your deadline", D.deadline, "Book early; retakes wait 14 days")}</div>
  <div class="grid g2" style="margin-top:16px">${ex}</div>
  <div class="card" style="margin-top:16px"><b>Suggested loop:</b> read one domain’s notes → 10-question domain quiz in Learn mode → flashcards → a full mock under real timing. Review every wrong answer, then repeat until your mock average is 80%+.
  <p class="small muted" style="margin-bottom:0">Independent study aid built from public blueprints. Not official Anthropic material; the official Exam Guide is authoritative. Exam rules ban AI assistance during the exam.</p></div>`);
  const d = $("#discard"); if (d) d.onclick = () => { LS.set("session", null); home() };
}

/* ---------- easy guide ---------- */
function easy(ex = "ccao-f") {
  const e = C.exams[ex];
  app(`<div class="row" style="justify-content:space-between"><div><h1>Easy Guide</h1><p class="sub" style="margin:0">Simple words, one example and one Anthropic link per topic. Start here.</p></div><div class="row">${Object.keys(C.exams).map(k => `<a class="btn ${k === ex ? "pri" : ""}" href="#/easy/${k}">${C.exams[k].title}</a>`).join("")}</div></div>
  <article class="prose card easy" style="margin-top:18px">${e.easy}</article>
  <div class="row" style="margin-top:16px"><a class="btn" href="#/study/${ex}">Deeper notes</a><a class="btn" href="#/practice/${ex}">Practice quiz</a><a class="btn pri" href="#/mock/${ex}">Mock exam</a></div>`);
}

/* ---------- study ---------- */
function study(ex = "ccao-f", id) {
  if (ex === "guide") return guide(id);
  const e = C.exams[ex]; const items = [...e.notes.map(n => ({ id: n.id, title: n.title, html: n.html })), { id: "cheatsheet", title: "Cheat sheet", html: e.cheatsheet }];
  const cur = items.find(i => i.id === id) || items[0];
  app(`<div class="row" style="justify-content:space-between"><h1>Study</h1><div class="row">${Object.keys(C.exams).map(k => `<a class="btn ${k === ex ? "pri" : ""}" href="#/study/${k}">${C.exams[k].title}</a>`).join("")}<a class="btn" href="#/study/guide/${C.docs[0].id}">Guides & glossary</a></div></div>
  <div class="notes"><nav class="toc">${items.map(i => `<a href="#/study/${ex}/${i.id}" class="${i.id === cur.id ? "on" : ""}">${esc(i.title)}</a>`).join("")}</nav><article class="prose card">${cur.html}</article></div>`);
}
function guide(id) {
  const cur = C.docs.find(d => d.id === id) || C.docs[0];
  app(`<div class="row" style="justify-content:space-between"><h1>Guides & glossary</h1><a class="btn" href="#/study/ccao-f">Back to notes</a></div><div class="notes"><nav class="toc">${C.docs.map(d => `<a href="#/study/guide/${d.id}" class="${d.id === cur.id ? "on" : ""}">${esc(d.title)}</a>`).join("")}</nav><article class="prose card">${cur.html}</article></div>`);
}

/* ---------- setup screens ---------- */
function practice(ex = "ccao-f") {
  const e = C.exams[ex], missed = Object.keys(LS.get("missed", {})).filter(id => id.startsWith(ex)).length;
  app(`<h1>Practice quiz</h1><p class="sub">Pick a domain and a mode. Learn mode explains each answer straight away; Test mode saves feedback for the end.</p>
  <div class="card"><div class="row" style="gap:18px">
  <label class="f">Exam<select id="pe">${Object.entries(C.exams).map(([k, v]) => `<option value="${k}" ${k === ex ? "selected" : ""}>${v.title}</option>`).join("")}</select></label>
  <label class="f">Domain<select id="pd"><option value="0">All domains</option>${Object.entries(e.domains).map(([d, n]) => `<option value="${d}">${d}. ${esc(n)} (${e.questions.filter(q => q.domain == d).length})</option>`).join("")}</select></label>
  <label class="f">Questions<select id="pn"><option>10</option><option>20</option><option>30</option><option value="999">All</option></select></label>
  <label class="f">Mode<select id="pm"><option value="learn">Learn (instant feedback)</option><option value="test">Test (feedback at end)</option></select></label>
  <label class="f">Source<select id="ps"><option value="all">All questions</option><option value="missed">Only my missed (${missed})</option></select></label></div>
  <div class="row" style="margin-top:16px"><button class="btn pri" id="go">Start quiz</button></div></div>`);
  $("#pe").onchange = () => practice($("#pe").value);
  $("#go").onclick = () => {
    let qs = e.questions; const d = +$("#pd").value, m = LS.get("missed", {});
    if (d) qs = qs.filter(q => q.domain === d); if ($("#ps").value === "missed") qs = qs.filter(q => m[q.id]);
    if (!qs.length) return alert("No questions match that selection.");
    start(ex, $("#pm").value === "learn" ? "learn" : "test", shuffle(qs).slice(0, +$("#pn").value));
  };
}
function mock(ex = "ccao-f") {
  const e = C.exams[ex], h = hist().filter(x => x.exam === ex && x.kind === "mock").slice(-5).reverse();
  app(`<h1>Full mock exam</h1><p class="sub">Timed like the real thing: closed book, one pass, flag-and-return, results only at the end.</p>
  <div class="row" style="margin-bottom:14px">${Object.keys(C.exams).map(k => `<a class="btn ${k === ex ? "pri" : ""}" href="#/mock/${k}">${C.exams[k].title}</a>`).join("")}</div>
  <div class="card"><h2 style="margin-top:0">${e.title}: ${esc(e.full)}</h2>
  <p>${Math.min(e.questions.length, e.exam_items)} questions · ${e.minutes} minutes · domain-weighted · options reshuffled every attempt.</p>
  <ul class="small"><li>Real exam: scaled score 720/1000 to pass (not 72%). Treat <b>80%+</b> here as your readiness bar.</li><li>Multiple-response items say “Select N”: assume no partial credit.</li><li>Use no AI tools, notes or translation during the real exam.</li></ul>
  <div class="row"><button class="btn pri" id="go">Start ${e.title} mock exam</button></div></div>
  ${h.length ? `<h2>Recent attempts</h2><div class="card"><table><tr><th>Date</th><th>Score</th><th>Time used</th></tr>${h.map(x => `<tr><td>${x.date.slice(0, 10)}</td><td>${x.score}/${x.total} (${x.pct}%)</td><td>${fmt(x.used)}</td></tr>`).join("")}</table></div>` : ""}`);
  $("#go").onclick = () => start(ex, "mock", shuffle(e.questions).slice(0, e.exam_items), e.minutes * 60);
}

/* ---------- quiz engine ---------- */
function start(exam, kind, qs, secs) {
  S = { exam, kind, items: qs.map(q => ({ id: q.id, order: shuffle(Object.keys(q.options)) })), ans: {}, flag: {}, checked: {}, idx: 0, started: Date.now(), endAt: secs ? Date.now() + secs * 1000 : 0, total: secs || 0, active: true };
  save(); const again = location.hash === "#/run/new"; location.hash = "#/run/new"; if (again) route();
}
const save = () => LS.set("session", S);
function run() {
  if (!S || !S.items) { S = LS.get("session", null); if (!S) return home() }
  S.active = true; if (S.done) return results();
  if (S.endAt) timer = setInterval(tick, 500); draw();
}
function tick() { const t = $("#timer"); if (!t) return; const left = Math.max(0, Math.round((S.endAt - Date.now()) / 1000)); t.textContent = fmt(left); t.classList.toggle("low", left < 300); if (!left) { clearInterval(timer); finish(true) } }
function draw() {
  const it = S.items[S.idx], q = Q[it.id], sel = S.ans[it.id] || [], multi = q.type === "multi", checked = S.checked[it.id], learn = S.kind === "learn";
  const opts = it.order.map((k, i) => {
    const L = "ABCD"[i], on = sel.includes(k); let cls = on ? "sel" : "";
    if (checked) cls = q.answer.includes(k) ? "right" : on ? "wrong" : "";
    return `<button class="opt ${cls}" data-k="${k}" role="${multi ? "checkbox" : "radio"}" aria-checked="${on}"><span class="bub">${checked ? (q.answer.includes(k) ? "✓" : on ? "✗" : L) : on ? (multi ? "✓" : "●") : L}</span><span>${esc(q.options[k])}</span></button>`
  }).join("");
  const nav = S.items.map((x, i) => `<button data-i="${i}" class="${S.ans[x.id] ? "ans" : ""} ${i === S.idx ? "cur" : ""} ${S.flag[x.id] ? "flg" : ""}" aria-label="Question ${i + 1}${S.ans[x.id] ? ", answered" : ""}${S.flag[x.id] ? ", flagged" : ""}">${i + 1}</button>`).join("");
  const last = S.idx === S.items.length - 1, answered = Object.keys(S.ans).length;
  app(`<div class="exam"><section class="card"><div class="qhead"><span class="muted small">${S.exam.toUpperCase()} · Question ${S.idx + 1} of ${S.items.length} · ${esc(q.domain_name)}</span>${S.endAt ? `<span class="timer" id="timer" role="timer">${fmt(Math.max(0, Math.round((S.endAt - Date.now()) / 1000)))}</span>` : `<button class="btn" id="end">End quiz</button>`}</div>
   <p class="q">${esc(q.question)}</p>${multi ? `<p class="pill warn">Select ${q.answer.length}</p>` : ""}
   <div class="opts ${multi ? "multi" : ""}" role="${multi ? "group" : "radiogroup"}">${opts}</div>
   ${checked ? `<div class="expl"><b>${same(sel, q.answer) ? "Correct." : "Not quite."}</b> ${esc(q.explanation)}</div>` : ""}
   <div class="row" style="margin-top:18px;justify-content:space-between"><span class="row"><button class="btn" id="prev" ${S.idx ? "" : "disabled"}>Back</button>
   ${S.kind === "mock" ? `<button class="btn" id="flag">${S.flag[it.id] ? "Unflag" : "Flag for review"}</button>` : ""}</span>
   <span class="row">${learn && !checked ? `<button class="btn pri" id="check" ${sel.length ? "" : "disabled"}>Check answer</button>` : ""}
   ${last ? `<button class="btn pri" id="finish">Finish (${answered}/${S.items.length})</button>` : `<button class="btn ${learn && !checked ? "" : "pri"}" id="next">Next</button>`}</span></div></section>
   <aside class="card" style="align-self:start"><b class="small">Questions</b><div class="nav" style="margin-top:8px">${nav}</div><p class="small muted" style="margin:10px 0 0">${answered} answered${Object.keys(S.flag).length ? ` · ${Object.keys(S.flag).length} flagged` : ""}</p>
   ${S.kind === "mock" ? `<button class="btn" id="finish2" style="margin-top:10px;width:100%">Submit exam</button>` : ""}</aside></div>`);
  document.querySelectorAll(".opt").forEach(b => b.onclick = () => pick(b.dataset.k));
  document.querySelectorAll(".nav button").forEach(b => b.onclick = () => go(+b.dataset.i));
  const on = (id, f) => { const e = $(id); if (e) e.onclick = f };
  on("#prev", () => go(S.idx - 1)); on("#next", () => go(S.idx + 1)); on("#check", () => { S.checked[it.id] = 1; save(); draw() });
  on("#flag", () => { S.flag[it.id] = S.flag[it.id] ? 0 : 1; if (!S.flag[it.id]) delete S.flag[it.id]; save(); draw() });
  on("#finish", () => confirmFinish()); on("#finish2", () => confirmFinish()); on("#end", () => confirmFinish());
}
function go(i) { if (i < 0 || i >= S.items.length) return; S.idx = i; save(); draw() }
function pick(k) {
  const it = S.items[S.idx], q = Q[it.id]; if (S.checked[it.id]) return; let a = S.ans[it.id] || [];
  if (q.type === "multi") { a = a.includes(k) ? a.filter(x => x !== k) : [...a, k].slice(-q.answer.length) } else a = [k];
  a.length ? S.ans[it.id] = a : delete S.ans[it.id]; save(); draw();
}
function confirmFinish() {
  const un = S.items.length - Object.keys(S.ans).length, fl = Object.keys(S.flag).length;
  if ((un || fl) && !confirm(`${un ? un + " unanswered. " : ""}${fl ? fl + " flagged. " : ""}Submit anyway?`)) return; finish(false);
}
document.addEventListener("keydown", e => {
  if (!S || !S.active || S.done || !$(".exam") || ["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;
  const k = e.key.toUpperCase(), i = "ABCD".indexOf(k);
  if (i > -1 && i < 4) pick(S.items[S.idx].order[i]); else if (e.key === "ArrowRight") go(S.idx + 1); else if (e.key === "ArrowLeft") go(S.idx - 1);
});
function finish(timeUp) {
  clearInterval(timer); let score = 0; const dom = {}, m = LS.get("missed", {});
  for (const it of S.items) { const q = Q[it.id], ok = same(S.ans[it.id] || [], q.answer); score += ok; dom[q.domain] = dom[q.domain] || [0, 0]; dom[q.domain][1]++; if (ok) { dom[q.domain][0]++; if (m[q.id]) { m[q.id]--; if (!m[q.id]) delete m[q.id] } } else m[q.id] = (m[q.id] || 0) + 1 }
  LS.set("missed", m); const used = Math.round((Date.now() - S.started) / 1000);
  const h = hist(); h.push({ exam: S.exam, kind: S.kind === "mock" ? "mock" : "quiz", date: new Date().toISOString(), score, total: S.items.length, pct: Math.round(100 * score / S.items.length), used: Math.min(used, S.total || used), dom }); LS.set("history", h.slice(-200));
  S.done = true; S.score = score; S.timeUp = timeUp; S.dom = dom; S.active = true; LS.set("session", null); results();
}
function results() {
  const n = S.items.length, pct = Math.round(100 * S.score / n), bad = S.items.filter(it => !same(S.ans[it.id] || [], Q[it.id].answer));
  const rd = pct >= 80 ? ["ok", "Ready range"] : pct >= 70 ? ["warn", "Close: review weak domains"] : ["bad", "Keep studying"];
  const e = C.exams[S.exam];
  const rows = Object.entries(S.dom).sort((a, b) => a[0] - b[0]).map(([d, [c, t]]) => { const p = Math.round(100 * c / t); return `<tr><td>${d}. ${esc(e.domains[d])}</td><td style="width:40%"><div class="bar ${p >= 80 ? "ok" : p >= 65 ? "warn" : "bad"}"><i style="width:${p}%"></i></div></td><td>${c}/${t}</td></tr>` }).join("");
  const rev = S.items.map((it, i) => { const q = Q[it.id], ok = same(S.ans[it.id] || [], q.answer); return `<details class="card" style="margin-bottom:8px" ${ok ? "" : "open"}><summary><span class="pill ${ok ? "ok" : "bad"}">${ok ? "Correct" : (S.ans[it.id] ? "Wrong" : "Skipped")}</span> ${i + 1}. ${esc(q.question)}</summary>
   <div style="margin-top:10px">${it.order.map(k => `<div class="small" style="padding:3px 0;${q.answer.includes(k) ? "color:var(--ok);font-weight:600" : (S.ans[it.id] || []).includes(k) ? "color:var(--bad)" : ""}">${q.answer.includes(k) ? "✓" : (S.ans[it.id] || []).includes(k) ? "✗" : "·"} ${esc(q.options[k])}</div>`).join("")}<div class="expl">${esc(q.explanation)}</div></div></details>` }).join("");
  app(`<h1>${S.kind === "mock" ? "Mock exam" : "Quiz"} results ${S.timeUp ? `<span class="pill bad">Time up</span>` : ""}</h1><div class="grid g2"><div class="card"><div class="score">${pct}%</div><p>${S.score} of ${n} correct <span class="pill ${rd[0]}">${rd[1]}</span></p>
   <p class="small muted">The real exam uses a scaled 720/1000 pass mark, not 72%. Treat 80%+ on full mocks as your readiness bar.</p>
   <div class="row">${bad.length ? `<a class="btn pri" href="#/practice/${S.exam}">Practice missed questions</a>` : ""}<a class="btn" href="#/mock/${S.exam}">Another mock</a><a class="btn" href="#/">Dashboard</a></div></div>
   <div class="card"><b>By domain</b><table style="margin-top:8px">${rows}</table></div></div><h2>Review</h2>${rev}`);
}

/* ---------- flashcards ---------- */
function cards(ex = "ccao-f", i = "0") {
  const e = C.exams[ex], known = LS.get("cards", {}), k = known[ex] || {}; let deck = e.flashcards.map((c, n) => ({ c, n }));
  const idx = Math.min(+i, Math.max(0, deck.length - 1)), cur = deck[idx];
  const knownN = Object.keys(k).length;
  app(`<div class="row" style="justify-content:space-between"><h1>Flashcards</h1><div class="row">${Object.keys(C.exams).map(x => `<a class="btn ${x === ex ? "pri" : ""}" href="#/cards/${x}">${C.exams[x].title}</a>`).join("")}</div></div>
  <p class="sub">${knownN} of ${e.flashcards.length} marked known. Click the card (or press Space) to flip.</p>
  ${cur ? `<div class="card flip" id="card" tabindex="0" role="button" aria-label="Flip card"><div><span class="tag">Question · ${idx + 1} / ${deck.length}</span>${esc(cur.c[0])}</div></div>
  <div class="row" style="margin-top:14px;justify-content:space-between"><span class="row"><button class="btn" id="cp" ${idx ? "" : "disabled"}>Back</button><button class="btn" id="cs">Shuffle</button></span>
  <span class="row"><button class="btn" id="no">Still learning</button><button class="btn pri" id="yes">Known</button></span></div>` : `<div class="card">All cards in this deck are marked known. <button class="btn" id="reset">Reset deck</button></div>`}`);
  if (!cur) { $("#reset").onclick = () => { known[ex] = {}; LS.set("cards", known); cards(ex, 0) }; return }
  let back = false; const flip = () => { back = !back; $("#card").innerHTML = `<div><span class="tag">${back ? "Answer" : "Question"} · ${idx + 1} / ${deck.length}</span>${esc(back ? cur.c[1] : cur.c[0])}</div>` };
  $("#card").onclick = flip; $("#card").onkeydown = e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip() } };
  const mark = v => { known[ex] = known[ex] || {}; v ? known[ex][cur.n] = 1 : delete known[ex][cur.n]; LS.set("cards", known); cards(ex, v ? idx : idx + 1) };
  $("#yes").onclick = () => mark(true); $("#no").onclick = () => mark(false);
  $("#cp").onclick = () => cards(ex, idx - 1); $("#cs").onclick = () => { e.flashcards = shuffle(e.flashcards); cards(ex, 0) };
}

/* ---------- progress ---------- */
function progress() {
  const h = hist(), m = LS.get("missed", {});
  const per = Object.entries(C.exams).map(([k, e]) => {
    const st = domainStats(k), rows = Object.entries(e.domains).map(([d, n]) => { const [c, t] = st[d] || [0, 0], p = t ? Math.round(100 * c / t) : 0; return `<tr><td>${d}. ${esc(n)}</td><td style="width:38%"><div class="bar ${!t ? "" : p >= 80 ? "ok" : p >= 65 ? "warn" : "bad"}"><i style="width:${p}%"></i></div></td><td class="small">${t ? `${p}% (${t})` : "not attempted"}</td></tr>` }).join("");
    const weak = Object.entries(e.domains).filter(([d]) => st[d] && st[d][1] >= 3 && st[d][0] / st[d][1] < .75).map(([d, n]) => n);
    return `<div class="card"><h2 style="margin-top:0">${e.title}</h2><table>${rows}</table>${weak.length ? `<p class="small"><span class="pill warn">Focus</span> ${weak.map(esc).join(", ")}</p>` : ""}<a class="btn" style="margin-top:8px" href="#/practice/${k}">Practice ${e.title}</a></div>`
  }).join("");
  app(`<h1>Progress</h1><p class="sub">Stored in this browser only. Content updates never erase it.</p><div class="grid g2">${per}</div>
  <h2>History</h2>${h.length ? `<div class="card"><table><tr><th>Date</th><th>Exam</th><th>Type</th><th>Score</th></tr>${h.slice().reverse().slice(0, 25).map(x => `<tr><td>${x.date.slice(0, 16).replace("T", " ")}</td><td>${x.exam.toUpperCase()}</td><td>${x.kind}</td><td>${x.score}/${x.total} (${x.pct}%)</td></tr>`).join("")}</table></div>` : `<div class="card muted">No attempts yet.</div>`}
  <div class="row" style="margin-top:16px"><span class="pill">${Object.keys(m).length} questions in your missed bank</span><button class="btn" id="exp">Export progress</button><button class="btn" id="clr">Reset progress</button></div>`);
  $("#exp").onclick = () => { const b = new Blob([JSON.stringify({ history: h, missed: m, cards: LS.get("cards", {}) }, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "cert-prep-progress.json"; a.click() };
  $("#clr").onclick = () => { if (confirm("Delete all progress in this browser?")) { ["history", "missed", "cards", "session"].forEach(k => LS.set(k, null)); progress() } };
}
boot();
