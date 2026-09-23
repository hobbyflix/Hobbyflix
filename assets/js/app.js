/* HobbyFlix — site behaviour. Depends on data.js; started by main.js via HobbyFlixApp.boot(user). */
/* ==================================================================
   STATE
================================================================== */
const SEED = {
  axes:{ca:50,so:50,pi:50,cr:50,ss:50,nm:50},
  hasProfile:false, archetype:null,
  explored:["photography","pottery","chess","guitar","djing","running","journaling"],
  completed:["origami","chess","journaling"],
  challenges:{ photography:[true,true,true,true,false,false,false] },
  active:"photography", streak:12, plan:null, booked:[], sent:[]
};
let USER = null;                 // set by boot(); the signed-in (or guest) account
let S = structuredClone(SEED);    // this user's progress
const stateKey = () => "hobbyflix.state.v2." + (USER ? USER.id : "guest");

function seedFor(u){
  const base = structuredClone(SEED);
  if(u && u.seed) Object.assign(base, structuredClone(u.seed));
  if(u && u.plan !== undefined) base.plan = u.plan;
  return base;
}
function load(){
  try{
    const raw = localStorage.getItem(stateKey());
    if(!raw) return seedFor(USER);
    return Object.assign(seedFor(USER), JSON.parse(raw));
  }catch(e){ return seedFor(USER); }
}
function save(){ try{ localStorage.setItem(stateKey(), JSON.stringify(S)); }catch(e){} }
const initialsOf = n => { const w = String(n||"?").trim().split(/\s+/); return (w.length > 1 ? w[0][0] + w[1][0] : w[0].slice(0,2)).toUpperCase(); };
const personal  = () => !!USER && !USER.guest && USER.personal !== false;
const firstName = () => personal() ? USER.name.split(" ")[0] : "you";

/* ==================================================================
   HELPERS
================================================================== */
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const H  = id => HOBBIES.find(h=>h.id===id);
const ico = n => `<svg><use href="#${n}"/></svg>`;
const grad = g => `background:linear-gradient(145deg, ${g[0]}, ${g[1]})`;
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const stars = n => "★★★★★".slice(0,n) + "☆☆☆☆☆".slice(0,5-n);

function matchOf(h){
  let d=0; for(const k in h.axes) d += Math.abs(h.axes[k]-S.axes[k]);
  d/=6;
  return Math.max(52, Math.min(99, Math.round(99 - d*0.80)));
}
function ranked(list){
  return (list||HOBBIES).map(h=>({h,m:matchOf(h)})).sort((a,b)=>b.m-a.m);
}
function archetypeOf(a){
  const A = [
    [a.ca<40 && a.so<45, "The Quiet Maker", "You build things alone and you'd rather show the object than talk about it."],
    [a.ca<40 && a.so>=58, "The Social Creator", "You make things, but the point is showing someone. Audience is part of the fun."],
    [a.ca<42, "The Curious Creator", "You start things to see what happens, and the making matters more than the mastering."],
    [a.ca>=62 && a.cr<44, "The Focused Competitor", "You want a scoreboard. Progress you can't measure feels like nothing happened."],
    [a.ca>=62, "The Systems Thinker", "You enjoy the mechanism more than the output. Understanding is the reward."],
    [a.pi<38, "The Restless Mover", "Sitting still is the problem. You need a hobby your body does."],
    [a.nm<40, "The Serial Sampler", "Novelty is your fuel. Seven days is exactly your attention span, and that's fine."],
    [a.so>=66, "The Social Explorer", "You'll try almost anything if someone comes with you."],
    [true, "The Balanced Explorer", "No strong pull in any direction — which means an unusually wide range fits you."]
  ];
  return A.find(r=>r[0]).slice(1);
}
function traitsOf(a){
  return [
    ["Creative", 100-a.ca],
    ["Curious", 100-a.nm],
    ["Social", a.so],
    ["Competitive", 100-a.cr],
    ["Hands-on", 100-a.pi]
  ];
}

/* ==================================================================
   TOASTS + OVERLAYS
================================================================== */
function toast(msg){
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="dot"></span><span>${msg}</span>`;
  $("#toasts").appendChild(el);
  setTimeout(()=>{ el.style.transition="opacity .3s,transform .3s"; el.style.opacity=0; el.style.transform="translateY(8px)"; setTimeout(()=>el.remove(),320); }, 2900);
}
let lastFocus=null;
function openOverlay(id){
  lastFocus = document.activeElement;
  $(id).classList.add("is-open");
  document.body.classList.add("is-locked");
}
function closeOverlays(){
  $$(".overlay").forEach(o=>o.classList.remove("is-open"));
  document.body.classList.remove("is-locked");
  if(lastFocus && lastFocus.focus) lastFocus.focus();
}
document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeOverlays(); closeAcct(); } });
$$(".overlay").forEach(o=>o.addEventListener("mousedown", e=>{ if(e.target===o) closeOverlays(); }));

/* ==================================================================
   CARDS
================================================================== */
function cardHTML(h){
  const m = matchOf(h);
  return `<button class="card" data-hobby="${h.id}">
    <div class="card-art" style="${grad(h.g)}">${ico(h.icon)}</div>
    <span class="match-tag">${m}% match</span>${h.isNew?'<span class="new-tag">New</span>':""}
    <div class="card-body">
      <div class="nm">${esc(h.name)}</div>
      <div class="meta">${h.tags.slice(0,2).join(" · ")} · ${["","Easy","Beginner","Steady","Demanding","Hard"][h.diff]}</div>
      <div class="chip-row"><span class="chip">${esc(h.time)}</span><span class="chip chip--ember">7-day trial</span></div>
    </div>
  </button>`;
}
function miniHTML(h, cls="mini-card"){
  const m = matchOf(h);
  return `<button class="${cls}" data-hobby="${h.id}">
    <span class="mini-thumb" style="${grad(h.g)}">${ico(h.icon)}</span>
    <span><span class="mt live-name">${esc(h.name)}</span><span class="ms live-meta">${h.tags.slice(0,2).join(" · ")}</span></span>
    <span class="mini-pct live-pct"><b>${m}%</b><span>match</span></span>
  </button>`;
}

function renderPhone(){
  const top = ranked().slice(0,4);
  $("#phoneFeed").innerHTML = top.map(({h})=>`
    <div class="mini-card">
      <span class="mini-thumb" style="${grad(h.g)}">${ico(h.icon)}</span>
      <div><div class="mt">${esc(h.name)}</div><div class="ms">${h.tags.slice(0,2).join(" · ")}</div></div>
      <div class="mini-pct">${matchOf(h)}%</div>
    </div>`).join("");
}
function updateRail(rail){
  const max = rail.scrollWidth - rail.clientWidth - 2;
  $$(`[data-rail="${rail.id}"]`).forEach(b=>{
    b.classList.toggle("is-off", +b.dataset.dir < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= max);
  });
}
const updateAllRails = () => requestAnimationFrame(()=>$$(".rail").forEach(updateRail));
document.addEventListener("scroll", e=>{ if(e.target.classList && e.target.classList.contains("rail")) updateRail(e.target); }, true);
window.addEventListener("resize", updateAllRails);

function renderHeroRail(){
  $("#heroRail").innerHTML = ranked().slice(0,10).map(({h})=>cardHTML(h)).join("");
  $$("#heroCount,.libTotal").forEach(el=>el.textContent = HOBBIES.length);
  updateAllRails();
}

/* ==================================================================
   DISCOVER FEED
================================================================== */
let activeFilter="All", query="";

function renderFilters(){
  $("#filters").innerHTML = FILTERS.map(f=>`<button class="fchip ${f===activeFilter?"on":""}" data-filter="${f}">${f}</button>`).join("");
}
function matchesFilter(h){
  if(activeFilter!=="All" && !h.tags.includes(activeFilter)) return false;
  if(!query) return true;
  const q = query.toLowerCase();
  return h.name.toLowerCase().includes(q) || h.tags.join(" ").toLowerCase().includes(q) || h.why.toLowerCase().includes(q);
}
function renderRails(){
  const filtering = activeFilter!=="All" || query.trim()!=="";
  const railsEl = $("#rails"), resEl = $("#results");
  if(filtering){
    railsEl.hidden = true; resEl.hidden = false;
    const list = HOBBIES.filter(matchesFilter);
    resEl.innerHTML = list.length
      ? ranked(list).map(({h})=>cardHTML(h)).join("")
      : `<div class="empty" style="grid-column:1/-1"><b>Nothing matches that yet</b>Try a different filter, or clear the search to see all ${HOBBIES.length} hobbies.</div>`;
    return;
  }
  railsEl.hidden = false; resEl.hidden = true;
  const rows = [];
  const seedName = H(S.active) ? H(S.active).name : "Photography";
  const because = (H(S.active)?H(S.active).related:["filmmaking","sketching","painting","journaling"]).map(H).filter(Boolean);
  rows.push({t:`Because you tried ${seedName}`, list:because});
  CATEGORIES.forEach(c=>{
    const list = c.ids ? c.ids.map(H).filter(Boolean)
                       : ranked(HOBBIES.filter(c.rule || (h=>h.tags.includes(c.tag)))).map(r=>r.h).slice(0,14);
    if(list.length) rows.push({t:c.t, list});
  });

  railsEl.innerHTML = rows.map((r,i)=>`
    <div class="rail-wrap">
      <div class="rail-head rail-pad"><h3>${esc(r.t)}</h3><span class="cnt">${r.list.length} hobbies</span></div>
      <button class="rail-btn prev" data-rail="rail${i}" data-dir="-1" aria-label="Scroll left">${ico("i-left")}</button>
      <div class="rail" id="rail${i}">${r.list.map(cardHTML).join("")}</div>
      <button class="rail-btn next" data-rail="rail${i}" data-dir="1" aria-label="Scroll right">${ico("i-right")}</button>
    </div>`).join("");
  updateAllRails();
}

/* ==================================================================
   HOBBY DETAIL
================================================================== */
function openHobby(id){
  const h = H(id); if(!h) return;
  if(!S.explored.includes(id)){ S.explored.push(id); save(); renderPassport(); }
  const m = matchOf(h);
  const exps = EXPERIENCES.slice().sort((a,b)=> (b.hobby===id) - (a.hobby===id)).slice(0,3);
  const inTrial = S.challenges[id];
  $("#detailContent").innerHTML = `
    <div class="sheet-hero" style="${grad(h.g)}">
      <div class="chip-row" style="margin:0 0 14px"><span class="chip chip--ember">${m}% match for you</span></div>
      <h2>${esc(h.name)}</h2>
      <p style="margin-top:12px;color:rgba(255,255,255,.82);font-size:15px">${h.tags.join(" · ")}</p>
    </div>
    <div class="sheet-body">
      <div class="blk">
        <h4>Why you'll like it</h4>
        <div class="why">${esc(h.why)}</div>
      </div>
      <div class="detail-grid">
        <div class="fact"><div class="k">Difficulty</div><div class="v stars">${stars(h.diff)}</div></div>
        <div class="fact"><div class="k">Time commitment</div><div class="v">${esc(h.time)}</div></div>
        <div class="fact"><div class="k">Cost to start</div><div class="v">${esc(h.cost)}</div></div>
        <div class="fact"><div class="k">Cohort starting</div><div class="v">Monday</div></div>
      </div>
      <div class="blk">
        <h4>The 7-day trial</h4>
        <div class="days">${h.days.map((d,i)=>`<div class="day"><div class="dn">DAY ${i+1}</div><div class="dt">${esc(d)}</div></div>`).join("")}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
          <button class="btn btn--primary" data-start="${h.id}">${inTrial?"Continue this trial":"Start this trial"}</button>
          <button class="btn" data-close>Keep browsing</button>
        </div>
      </div>
      <div class="blk">
        <h4>Related hobbies</h4>
        <div class="rel-row">${h.related.map(r=>H(r)?`<button class="rel" data-hobby="${r}">${esc(H(r).name)}</button>`:"").join("")}</div>
      </div>
      <div class="blk">
        <h4>Nearby experiences</h4>
        <div class="exp-mini">${exps.map(e=>`
          <div class="exp-card">
            <div class="nm">${esc(e.name)}</div>
            <div class="row"><span>${esc(e.host)}</span><span class="stars">★ ${e.rating}</span></div>
            <div class="row"><span>${e.km} km away</span><span>${esc(e.date)}</span></div>
            <button class="btn btn--sm btn--wide" data-book="${e.id}">Book · ${esc(e.price)}</button>
          </div>`).join("")}</div>
      </div>
    </div>`;
  $("#detailSheet").scrollTop = 0;
  openOverlay("#detailOverlay");
}

/* ==================================================================
   CHALLENGE SECTION
================================================================== */
function startChallenge(id){
  if(!S.challenges[id]) S.challenges[id] = [false,false,false,false,false,false,false];
  S.active = id;
  if(!S.explored.includes(id)) S.explored.push(id);
  save(); renderChallenge(); renderPassport(); renderRails();
  closeOverlays();
  toast(`Trial started — ${H(id).name}, day 1 of 7.`);
  document.getElementById("challenges").scrollIntoView({behavior: reduced?"auto":"smooth"});
}
function renderChallenge(){
  const h = H(S.active) || HOBBIES[0];
  const days = S.challenges[h.id] || [false,false,false,false,false,false,false];
  const done = days.filter(Boolean).length;
  $("#challengeTitle").textContent = `7-day ${h.name.toLowerCase()} trial`;
  $("#dayCount").textContent = done;
  $("#challengeBar").style.width = (done/7*100)+"%";
  $("#daysGrid").innerHTML = h.days.map((d,i)=>`
    <button class="day ${days[i]?"done":""}" data-day="${i}">
      <span class="tick">${ico("i-check")}</span>
      <div class="dn">DAY ${i+1}</div>
      <div class="dt">${esc(d)}</div>
    </button>`).join("");
  $("#startTrialBtn").textContent = done ? "Mark today done" : "Start this challenge";
}
function toggleDay(i){
  const h = H(S.active);
  if(!S.challenges[h.id]) S.challenges[h.id] = [false,false,false,false,false,false,false];
  const days = S.challenges[h.id];
  days[i] = !days[i];
  const done = days.filter(Boolean).length;
  if(done===7 && !S.completed.includes(h.id)){
    S.completed.push(h.id);
    S.streak += 1;
    save(); renderChallenge(); renderPassport();
    return openCompletion(h);
  }
  save(); renderChallenge(); renderPassport();
}
function openCompletion(h){
  const alts = ranked(HOBBIES.filter(x=>x.id!==h.id && !S.completed.includes(x.id))).slice(0,2);
  $("#smallContent").innerHTML = `
    <div class="res-hero">
      <div class="lab">Trial complete</div>
      <h2>Seven days of ${esc(h.name.toLowerCase())}</h2>
      <p class="sub">Now the only question that matters. There is no wrong answer — a clean drop is worth as much to us as a keeper.</p>
    </div>
    <div class="sheet-body" style="gap:18px">
      <div style="display:grid;gap:10px">
        <button class="btn btn--primary btn--wide" data-verdict="hooked" data-h="${h.id}">I'm hooked — show me local studios</button>
        <button class="btn btn--wide" data-verdict="drop" data-h="${h.id}">Not for me — try something else</button>
      </div>
      <div class="blk">
        <h4>Queued up next</h4>
        <div class="matches">${alts.map(({h:x,m})=>`
          <button class="match-row" data-hobby="${x.id}">
            <span class="mini-thumb" style="${grad(x.g)}">${ico(x.icon)}</span>
            <span><span class="nm">${esc(x.name)}</span><span class="mt">${x.tags.slice(0,2).join(" · ")}</span></span>
            <span class="pct"><b>${m}%</b><span>match</span></span>
          </button>`).join("")}</div>
      </div>
    </div>`;
  openOverlay("#smallOverlay");
}

/* ==================================================================
   PASSPORT
================================================================== */
function renderPassport(){
  $("#ppName").textContent = USER ? USER.name : "Guest explorer";
  $("#ppSub").textContent = S.hasProfile
    ? `${S.archetype[0]} — ${S.archetype[1]}`
    : "No hobby profile yet. Take the quiz to build one.";
  renderAvatars();
  $("#ppExplored").textContent = S.explored.length;
  $("#ppChallenges").textContent = S.completed.length;
  $("#ppStreak").textContent = S.streak;
  $("#badges").innerHTML = BADGES.map(b=>{
    const got = b.test(S);
    const pct = Math.min(100, Math.round(b.prog(S)*100));
    return `<div class="badge ${got?"got":""}">
      <div class="badge-medal">${ico(b.icon)}</div>
      <div class="badge-name">${b.n}</div>
      <div class="badge-req">${got?"Unlocked":b.req+" · "+pct+"%"}</div>
    </div>`;
  }).join("");
}

/* ==================================================================
   BOXES / EXPERIENCES / PEOPLE / PLANS
================================================================== */
function renderBoxes(){
  $("#boxGrid").innerHTML = BOXES.map(b=>`
    <article class="pcard">
      <div class="pcard-art" style="${grad(b.g)}">${ico(b.icon)}</div>
      <div class="pcard-b">
        <div class="top"><div class="nm">${esc(b.name)}</div><div class="price">${esc(b.price)}</div></div>
        <div class="incl">${b.incl.map(i=>`<div>${esc(i)}</div>`).join("")}</div>
        <div class="pcard-foot"><span>${b.diff} · ${b.setup} setup</span></div>
        <button class="btn btn--sm btn--wide" data-box="${b.id}">Add to my box</button>
      </div>
    </article>`).join("");
}
function renderExperiences(){
  $("#expGrid").innerHTML = EXPERIENCES.map(e=>{
    const booked = S.booked.includes(e.id);
    return `<article class="pcard">
      <div class="pcard-art" style="${grad(e.g)}">${ico(e.icon)}</div>
      <div class="pcard-b">
        <div class="top"><div class="nm">${esc(e.name)}</div><div class="price">${esc(e.price)}</div></div>
        <div class="pcard-foot" style="padding:0"><span class="stars">★ ${e.rating}</span><span>${e.km} km away</span></div>
        <div class="incl"><div>${esc(e.host)}</div><div>${esc(e.date)}</div></div>
        <button class="btn btn--sm btn--wide ${booked?"":"btn--primary"}" data-book="${e.id}" ${booked?"disabled":""}>${booked?"Booked":"Book experience"}</button>
      </div>
    </article>`;
  }).join("");
}
function renderPeople(){
  const me = USER && !USER.guest ? USER.name.split(" ")[0].toLowerCase() : "";
  $("#people").innerHTML = FRIENDS.filter(f=>f.n.toLowerCase()!==me).map(f=>{
    const h = H(f.h);
    return `<article class="person">
      <div class="person-top">
        <div class="avatar">${f.n.slice(0,2).toUpperCase()}</div>
        <div><div class="nm">${esc(f.n)}</div><div class="sub">${esc(h.name)} · Level ${f.lvl}</div></div>
      </div>
      <div class="lvl"><span class="streak">${ico("i-flame")} ${f.streak}-day streak</span><span>${S.sent.includes(f.n)?"Challenged":""}</span></div>
      <button class="btn btn--sm btn--wide" data-friend="${f.n}">${S.sent.includes(f.n)?"Challenge sent":"Challenge "+f.n}</button>
    </article>`;
  }).join("");
  $("#feed").innerHTML = FEED.filter(f=>f[0].toLowerCase()!==me).map(f=>`<div class="feed-line"><span class="feed-dot"></span><span><b>${f[0]}</b> ${f[1]} <b>${f[2]}</b></span></div>`).join("");
}
function renderPlans(){
  $("#plans").innerHTML = PLANS.map(p=>{
    const on = S.plan===p.id;
    return `<article class="plan ${p.hot?"hot":""}">
      ${p.hot?'<span class="plan-tag">Most popular</span>':""}
      <div><h3>${p.n}</h3><p class="plan-d">${p.d}</p></div>
      <div class="amt">${p.amt}<span>${p.per==="forever"?" forever":p.per}</span></div>
      <ul>${p.f.map(f=>`<li>${ico("i-check")}<span>${esc(f)}</span></li>`).join("")}</ul>
      <button class="btn ${p.hot&&!on?"btn--primary":""} btn--wide" data-plan="${p.id}" ${on?"disabled":""}>${on?"Current plan":p.cta}</button>
    </article>`;
  }).join("");
}

/* ==================================================================
   SLIDERS
================================================================== */
const leanText = (a,v) => v<45 ? "Leans "+a.l.toLowerCase() : v>55 ? "Leans "+a.r.toLowerCase() : "Balanced";
function paintSlider(r, v){
  // red fill runs from the centre (balanced) out to the thumb
  r.style.setProperty("--a", Math.min(v,50)+"%");
  r.style.setProperty("--b", Math.max(v,50)+"%");
}
function renderSliders(){
  $("#sliders").innerHTML = AXES_META.map(a=>{
    const v = S.axes[a.k];
    return `<div class="slider-row">
      <span class="sl-lab l ${v<=50?"on":""}" id="lab-l-${a.k}">${a.l}</span>
      <div class="sl-track">
        <input type="range" min="0" max="100" value="${v}" data-axis="${a.k}"
               style="--a:${Math.min(v,50)}%;--b:${Math.max(v,50)}%"
               aria-label="${a.l} to ${a.r}" aria-valuetext="${leanText(a,v)}">
      </div>
      <span class="sl-lab r ${v>=50?"on":""}" id="lab-r-${a.k}">${a.r}</span>
    </div>`;
  }).join("");
  renderLive();
}
function renderLive(){
  const top = ranked().slice(0,3);
  $("#liveList").innerHTML = top.map(({h,m})=>`
    <button class="live-item" data-hobby="${h.id}">
      <span class="mini-thumb" style="${grad(h.g)}">${ico(h.icon)}</span>
      <span><span class="live-name">${esc(h.name)}</span><span class="live-meta">${h.tags.slice(0,2).join(" · ")}</span></span>
      <span class="live-pct"><b>${m}%</b><span>match</span></span>
    </button>`).join("");
  $("#algoHint").textContent = S.hasProfile
    ? `Tuned by your quiz answers — ${S.archetype[0]}.`
    : "Six preference axes. Drag any of them.";
}

/* ==================================================================
   QUIZ
================================================================== */
let qi = 0, answers = [];
function openQuiz(){
  qi = 0; answers = [];
  renderQuiz();
  openOverlay("#quizOverlay");
}
function renderQuiz(){
  const q = QUESTIONS[qi];
  $("#quizContent").innerHTML = `
    <div class="quiz-top">
      <div class="qhead"><span>Hobby discovery</span><span><b>${qi+1}</b> / ${QUESTIONS.length}</span></div>
      <div class="qbar"><i style="width:${(qi)/QUESTIONS.length*100}%"></i></div>
    </div>
    <div class="quiz-body">
      <div class="quiz-q">${esc(q.q)}</div>
      <div class="quiz-hint">${esc(q.hint)}</div>
      <div class="opts">${q.o.map((o,i)=>`
        <button class="opt ${answers[qi]===i?"sel":""}" data-opt="${i}">
          <span class="box">${ico("i-check")}</span><span>${esc(o.t)}</span>
        </button>`).join("")}</div>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-qnav="-1" ${qi===0?"disabled":""}>Back</button>
      <button class="btn btn--primary" data-qnav="1" ${answers[qi]===undefined?"disabled":""}>${qi===QUESTIONS.length-1?"See my profile":"Next"}</button>
    </div>`;
  requestAnimationFrame(()=>{ const b=$("#quizContent .qbar i"); if(b) b.style.width = ((qi+ (answers[qi]!==undefined?1:0))/QUESTIONS.length*100)+"%"; });
  $("#quizSheet").scrollTop = 0;
}
function pickOption(i){
  answers[qi] = i;
  $$("#quizContent .opt").forEach((el,k)=>el.classList.toggle("sel",k===i));
  const nxt = $('#quizContent [data-qnav="1"]'); if(nxt) nxt.disabled = false;
  const bar = $("#quizContent .qbar i"); if(bar) bar.style.width = ((qi+1)/QUESTIONS.length*100)+"%";
  setTimeout(()=>{ if(answers[qi]!==undefined) qNav(1); }, reduced?0:240);
}
function qNav(dir){
  if(dir===1 && answers[qi]===undefined) return;
  if(dir===1 && qi===QUESTIONS.length-1) return finishQuiz();
  qi = Math.max(0, Math.min(QUESTIONS.length-1, qi+dir));
  renderQuiz();
}
function finishQuiz(){
  const a = {ca:50,so:50,pi:50,cr:50,ss:50,nm:50};
  answers.forEach((choice,i)=>{
    const d = QUESTIONS[i].o[choice].d || {};
    for(const k in d) a[k] += d[k];
  });
  for(const k in a) a[k] = Math.max(2, Math.min(98, Math.round(a[k])));
  S.axes = a;
  S.hasProfile = true;
  S.archetype = archetypeOf(a);
  save();
  renderAll();
  renderResults();
}
function renderResults(){
  const top = ranked().slice(0,3);
  const t = traitsOf(S.axes);
  $("#quizContent").innerHTML = `
    <div class="res-hero">
      <div class="lab">Your hobby profile</div>
      <h2>${esc(S.archetype[0])}</h2>
      <p class="sub">${esc(S.archetype[1])}</p>
      <div class="traits">${t.map(([k,v])=>`
        <div class="trait">
          <div class="tl"><span>${k}</span><b>${v}%</b></div>
          <div class="tbar"><i data-w="${v}"></i></div>
        </div>`).join("")}</div>
    </div>
    <div class="sheet-body">
      <div class="blk">
        <h4>Your top matches</h4>
        <div class="matches">${top.map(({h,m},i)=>`
          <button class="match-row" data-hobby="${h.id}">
            <span class="rank">${i+1}</span>
            <span class="mini-thumb" style="${grad(h.g)}">${ico(h.icon)}</span>
            <span><span class="nm">${esc(h.name)}</span><span class="mt">${h.tags.slice(0,3).join(" · ")}</span></span>
            <span class="pct"><b>${m}%</b><span>match</span></span>
          </button>`).join("")}</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn--primary" data-start="${top[0].h.id}">Start the ${esc(top[0].h.name.toLowerCase())} trial</button>
        <button class="btn" data-close data-goto="#discover">Browse the library</button>
      </div>
    </div>`;
  requestAnimationFrame(()=>$$("#quizContent .tbar i").forEach(el=>el.style.width = el.dataset.w+"%"));
  $("#quizSheet").scrollTop = 0;
  toast(`Profile saved — ${S.archetype[0]}.`);
}

/* ==================================================================
   FLYWHEEL
================================================================== */
let flyStep = 0, flyTimer = null;
function buildFly(){
  const R = 72, C = 100, n = FLY.length;
  const pt = i => { const ang = (-90 + i*360/n) * Math.PI/180; return [C + R*Math.cos(ang), C + R*Math.sin(ang)]; };
  const nodes = FLY.map((f,i)=>{
    const [x,y] = pt(i);
    const lx = C + (R+16)*Math.cos((-90+i*360/n)*Math.PI/180);
    const ly = C + (R+16)*Math.sin((-90+i*360/n)*Math.PI/180);
    const dx = lx - C;
    const anchor = dx > 12 ? "start" : dx < -12 ? "end" : "middle";
    const dy = (ly - C) > 30 ? 9 : (ly - C) < -30 ? -4 : 3;
    return `<g class="fly-node" data-fly="${i}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7"/>
      <text x="${lx.toFixed(1)}" y="${(ly+dy).toFixed(1)}" text-anchor="${anchor}">${f.s}</text></g>`;
  }).join("");
  $("#flyStage").innerHTML = `<svg viewBox="-14 -14 228 228" role="img" aria-label="The HobbyFlix flywheel">
      <circle class="fly-ring" cx="100" cy="100" r="72"/>
      <path class="fly-arc" id="flyArc" d=""/>
      ${nodes}
      <text class="fly-core" x="100" y="94" style="font-size:9px;fill:var(--ash-dim);letter-spacing:.08em">FLYWHEEL</text>
      <text class="fly-core" id="flyCore" x="100" y="112" style="font-size:13px;font-weight:800"></text>
    </svg>`;
  $("#flySteps").innerHTML = FLY.map((f,i)=>`
    <button class="fly-step" data-fly="${i}"><i></i><span><span class="t">${f.t}</span><span class="d">${f.d}</span></span></button>`).join("");
  setFly(0);
  if(!reduced) flyTimer = setInterval(()=>setFly((flyStep+1)%FLY.length), 2300);
}
function setFly(i){
  flyStep = i;
  const n = FLY.length, R = 72, C = 100;
  const a1 = (-90 + i*360/n)*Math.PI/180, a2 = (-90 + (i+1)*360/n)*Math.PI/180;
  const x1 = C+R*Math.cos(a1), y1 = C+R*Math.sin(a1), x2 = C+R*Math.cos(a2), y2 = C+R*Math.sin(a2);
  const arc = $("#flyArc"); if(arc) arc.setAttribute("d", `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`);
  $$("#flyStage .fly-node").forEach((el,k)=>el.classList.toggle("on", k===i));
  $$("#flySteps .fly-step").forEach((el,k)=>el.classList.toggle("on", k===i));
  const core = $("#flyCore"); if(core) core.textContent = FLY[i].s;
}

/* ==================================================================
   IDEA SWITCHER
================================================================== */
let ideaOn = 1, ideaTimer = null;
function setIdea(i){
  ideaOn = i;
  $("#ideaA").classList.toggle("on", i===0);
  $("#ideaB").classList.toggle("on", i===1);
  $$("[data-idea]").forEach(b=>b.classList.toggle("on", +b.dataset.idea===i));
}
function startIdea(){ if(!reduced) ideaTimer = setInterval(()=>setIdea(ideaOn===1?0:1), 4200); }

/* ==================================================================
   EVENTS
================================================================== */
document.addEventListener("click", e=>{
  const t = e.target.closest("[data-hobby],[data-close],[data-open-quiz],[data-scroll],[data-rail],[data-book],[data-box],[data-plan],[data-day],[data-idea],[data-open-profile],[data-fly],[data-filter],[data-opt],[data-qnav],[data-start],[data-friend],[data-verdict]");
  if(!t) return;

  if(t.dataset.hobby!==undefined){ closeOverlays(); setTimeout(()=>openHobby(t.dataset.hobby), 60); return; }
  if(t.dataset.start!==undefined){ startChallenge(t.dataset.start); return; }
  if(t.hasAttribute("data-close")){
    const goto = t.dataset.goto; closeOverlays();
    if(goto) document.querySelector(goto).scrollIntoView({behavior: reduced?"auto":"smooth"});
    return;
  }
  if(t.hasAttribute("data-open-quiz")){ closeMenu(); openQuiz(); return; }
  if(t.hasAttribute("data-open-profile")){
    closeMenu();
    if(S.hasProfile){ renderQuiz(); openOverlay("#quizOverlay"); renderResults(); }
    else openQuiz();
    return;
  }
  if(t.dataset.scroll){ closeMenu(); document.querySelector(t.dataset.scroll).scrollIntoView({behavior: reduced?"auto":"smooth"}); return; }
  if(t.dataset.rail){
    const rail = document.getElementById(t.dataset.rail);
    rail.scrollBy({left: (+t.dataset.dir) * Math.min(rail.clientWidth*0.85, 640), behavior: reduced?"auto":"smooth"});
    return;
  }
  if(t.dataset.book!==undefined){
    const ex = EXPERIENCES.find(x=>x.id===t.dataset.book);
    if(!S.booked.includes(ex.id)){ S.booked.push(ex.id); save(); renderExperiences(); }
    if(t.closest(".overlay")){ t.textContent = "Booked"; t.disabled = true; }
    toast(`Booked — ${ex.name}, ${ex.date}. ${ex.host} will confirm by email.`);
    return;
  }
  if(t.dataset.box!==undefined){
    const b = BOXES.find(x=>x.id===t.dataset.box);
    toast(`${b.name} added. It ships as your next catalyst kit on the Starter Pack or Explorer Pass.`);
    return;
  }
  if(t.dataset.plan!==undefined){
    S.plan = t.dataset.plan; save(); renderPlans();
    const p = PLANS.find(x=>x.id===S.plan);
    toast(p.id==="free" ? "You're on the Free plan. Nothing to pay, nothing to cancel." : `You're on ${p.n} — ${p.amt}/month.`);
    return;
  }
  if(t.dataset.day!==undefined){ toggleDay(+t.dataset.day); return; }
  if(t.dataset.idea!==undefined){ clearInterval(ideaTimer); setIdea(+t.dataset.idea); return; }
  if(t.dataset.fly!==undefined){ clearInterval(flyTimer); setFly(+t.dataset.fly); return; }
  if(t.dataset.filter!==undefined){ activeFilter = t.dataset.filter; renderFilters(); renderRails(); return; }
  if(t.dataset.opt!==undefined){ pickOption(+t.dataset.opt); return; }
  if(t.dataset.qnav!==undefined){ qNav(+t.dataset.qnav); return; }
  if(t.dataset.friend!==undefined){
    const f = FRIENDS.find(x=>x.n===t.dataset.friend);
    if(!S.sent.includes(f.n)){ S.sent.push(f.n); save(); renderPeople(); }
    toast(`Challenge sent to ${f.n} — 7 days of ${H(S.active).name.toLowerCase()}, starting Monday.`);
    return;
  }
  if(t.dataset.verdict!==undefined){
    closeOverlays();
    if(t.dataset.verdict==="hooked"){
      toast("Nice. Local studios for this one are unlocked below.");
      document.getElementById("experiences").scrollIntoView({behavior: reduced?"auto":"smooth"});
    }else{
      toast("Logged as a clean drop. That's data, not failure.");
      document.getElementById("discover").scrollIntoView({behavior: reduced?"auto":"smooth"});
    }
    return;
  }
});

let railDebounce = null;
document.addEventListener("input", e=>{
  const r = e.target.closest("input[type=range][data-axis]");
  if(r){
    const k = r.dataset.axis;
    const v = +r.value;
    S.axes[k] = v;
    paintSlider(r, v);
    r.setAttribute("aria-valuetext", leanText(AXES_META.find(a=>a.k===k), v));
    $("#lab-l-"+k).classList.toggle("on", v<=50);
    $("#lab-r-"+k).classList.toggle("on", v>=50);
    save();
    renderLive(); renderPhone();
    clearTimeout(railDebounce);
    railDebounce = setTimeout(()=>{ renderHeroRail(); renderRails(); }, 220);
    return;
  }
  if(e.target.id==="searchInput"){ query = e.target.value; renderRails(); }
});

/* nav */
const burger = $("#burger"), menu = $("#mobileMenu");
function closeMenu(){ menu.classList.remove("is-open"); burger.setAttribute("aria-expanded","false"); document.body.classList.remove("is-locked"); }
burger.addEventListener("click", ()=>{
  const open = menu.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("is-locked", open);
});
menu.addEventListener("click", e=>{ if(e.target.tagName==="A") closeMenu(); });
window.addEventListener("scroll", ()=>{ $("#nav").classList.toggle("is-stuck", window.scrollY>12); }, {passive:true});

$("#startTrialBtn").addEventListener("click", ()=>{
  const h = H(S.active);
  const days = S.challenges[h.id] || [false,false,false,false,false,false,false];
  const next = days.indexOf(false);
  if(next === -1){ toast("All seven days are done. Pick your next hobby."); return; }
  toggleDay(next);
  if(next>0) toast(`Day ${next+1} logged — ${h.days[next]}`);
  else toast(`Trial started — ${h.name}, day 1 of 7.`);
});
$("#challengeFriendBtn").addEventListener("click", ()=>{
  document.getElementById("community").scrollIntoView({behavior: reduced?"auto":"smooth"});
  toast("Pick someone from your cohort to challenge.");
});
$("#shareBtn").addEventListener("click", ()=>{
  toast(`Passport copied: ${S.explored.length} explored, ${S.completed.length} completed, ${S.streak}-day streak.`);
});
$("#resetBtn").addEventListener("click", ()=>{
  S = seedFor(USER);
  if(S.hasProfile && !S.archetype) S.archetype = archetypeOf(S.axes);
  save(); renderAll(); toast("Demo data reset for this account.");
});

/* ==================================================================
   ACCOUNT MENU
================================================================== */
const acctBtn = $("#navAvatar"), acctMenu = $("#acctMenu");
function closeAcct(){ if(!acctMenu) return; acctMenu.hidden = true; acctBtn.setAttribute("aria-expanded","false"); }
acctBtn.addEventListener("click", e=>{
  e.stopPropagation();
  const open = acctMenu.hidden;
  acctMenu.hidden = !open;
  acctBtn.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", e=>{
  if(!e.target.closest(".acct-menu") || e.target.closest(".acct-menu button")) closeAcct();
  const a = e.target.closest("[data-acct]");
  if(!a) return;
  closeAcct(); closeMenu();
  if(a.dataset.acct === "signout") window.HF && HF.signOut();
  if(a.dataset.acct === "intro")   window.HF && HF.replayIntro();
});

function renderAvatars(){
  const ini = USER ? initialsOf(USER.name) : "G";
  const bg  = USER && USER.color ? `linear-gradient(140deg, ${USER.color[0]}, ${USER.color[1]})` : "";
  ["#navAvatar","#ppAvatar","#acctAvatar"].forEach(sel=>{
    const el = $(sel); if(!el) return;
    el.textContent = ini;
    el.style.background = bg;
  });
  $("#acctName").textContent = USER ? USER.name : "Guest explorer";
  $("#acctMail").textContent = USER && USER.email ? USER.email : "Not signed in — progress stays on this device";
  $("#phoneFor").textContent = `Tonight's pick for ${firstName()}`;
  $("#heroRailTitle").textContent = `Top picks for ${firstName()}`;
}

/* ==================================================================
   BOOT — called by main.js once someone signs in (or continues as guest)
================================================================== */
function renderAll(){
  renderPhone(); renderHeroRail(); renderFilters(); renderRails();
  renderChallenge(); renderPassport(); renderBoxes(); renderExperiences();
  renderPeople(); renderPlans(); renderSliders();
}
function boot(user){
  USER = user;
  S = load();
  if(S.hasProfile && !S.archetype) S.archetype = archetypeOf(S.axes);
  activeFilter = "All"; query = "";
  const si = $("#searchInput"); if(si) si.value = "";
  closeOverlays(); closeAcct();
  renderAll();
  clearInterval(flyTimer); clearInterval(ideaTimer);
  buildFly(); setIdea(1); startIdea();
}
window.HobbyFlixApp = { boot };
