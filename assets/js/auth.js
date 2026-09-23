/* HobbyFlix — placeholder authentication.
   ------------------------------------------------------------------
   Client-side only. Checks credentials against DEMO_USERS (users.js)
   plus any accounts created through the sign-up form, which are kept
   in localStorage under "hobbyflix.users".

   Auth.show(onSignedIn)  – display the sign-in screen
   Auth.hide()            – remove it
   Auth.current()         – the account for the saved session, or null
   Auth.signOut()         – forget the session
   ------------------------------------------------------------------ */

const Auth = (() => {
  const USERS_KEY = "hobbyflix.users";
  const SESSION_KEY = "hobbyflix.session";
  const $ = id => document.getElementById(id);
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  let mode = "signin";      // "signin" | "signup"
  let onSignedIn = null;
  let busy = false;

  /* ---------- storage ---------- */
  function localUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch (e) { return []; }
  }
  function saveLocalUsers(list) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); } catch (e) {}
  }
  const allUsers = () => DEMO_USERS.concat(localUsers());
  const byEmail = e => allUsers().find(u => u.email.toLowerCase() === e.trim().toLowerCase());
  const byId = id => id === GUEST_USER.id ? GUEST_USER : allUsers().find(u => u.id === id);

  // Never hand the password to the rest of the app.
  function publicUser(u) {
    const copy = Object.assign({}, u);
    delete copy.password;
    return copy;
  }

  function current() {
    let id = null;
    try { id = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY); } catch (e) {}
    const u = id ? byId(id) : null;
    return u ? publicUser(u) : null;
  }
  function setSession(u, remember) {
    try {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, u.id);
    } catch (e) {}
  }
  function signOut() {
    try { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  /* ---------- UI ---------- */
  function initials(n) { const w = n.trim().split(/\s+/); return (w.length > 1 ? w[0][0] + w[1][0] : w[0].slice(0, 2)).toUpperCase(); }

  function renderWall() {
    const wall = $("authWall");
    if (wall.dataset.built) return;
    const rows = 6, per = 9;
    let html = "";
    for (let r = 0; r < rows; r++) {
      const picks = [];
      for (let i = 0; i < per; i++) picks.push(HOBBIES[(r * 5 + i * 3) % HOBBIES.length]);
      const tiles = picks.concat(picks).map(h => `
        <div class="wall-tile" style="background:linear-gradient(145deg, ${h.g[0]}, ${h.g[1]})">
          <svg><use href="#${h.icon}"/></svg><span>${h.name}</span>
        </div>`).join("");
      html += `<div class="wall-row ${r % 2 ? "rev" : ""}" style="animation-duration:${70 + r * 9}s">${tiles}</div>`;
    }
    wall.innerHTML = html;
    wall.dataset.built = "1";
  }

  function renderQuick() {
    $("quickRow").innerHTML = DEMO_USERS.map(u => `
      <button type="button" class="quick-acct" data-quick="${u.id}">
        <span class="avatar" style="background:linear-gradient(140deg, ${u.color[0]}, ${u.color[1]})">${initials(u.name)}</span>
        <span class="qa-name">${u.name.split(" ")[0]}</span>
        <span class="qa-tag">${u.tagline}</span>
      </button>`).join("");
  }

  function setMode(m) {
    mode = m;
    const up = m === "signup";
    $("authTitle").textContent = up ? "Create your account" : "Sign in";
    $("authSub").textContent = up
      ? "Takes ten seconds. Your passport, streak and trials start saving immediately."
      : "Pick up where you left off — your passport, streak and trials are waiting.";
    $("nameField").hidden = !up;
    $("authSubmit").textContent = up ? "Create account" : "Sign in";
    $("authPass").setAttribute("autocomplete", up ? "new-password" : "current-password");
    $("authPass").placeholder = up ? "At least 6 characters" : "Your password";
    $("forgotBtn").hidden = up;
    $("authSwitch").innerHTML = up
      ? 'Already exploring? <button type="button" class="link" id="switchBtn">Sign in</button>'
      : 'New to HobbyFlix? <button type="button" class="link" id="switchBtn">Create an account</button>';
    $("switchBtn").addEventListener("click", () => { setMode(up ? "signin" : "signup"); clearMsg(); });
    clearMsg();
  }

  function msg(text, kind = "error") {
    const el = $("authMsg");
    el.textContent = text;
    el.className = "auth-msg " + (kind === "info" ? "is-info" : "is-error");
    el.hidden = false;
  }
  function clearMsg() { $("authMsg").hidden = true; ["authEmail", "authPass", "authName"].forEach(id => $(id).classList.remove("bad")); }
  function bad(id) { $(id).classList.add("bad"); $(id).focus(); }

  function loading(on, label) {
    busy = on;
    const b = $("authSubmit");
    b.disabled = on;
    b.innerHTML = on ? `<span class="spin"></span>${label || "Signing in…"}` : (mode === "signup" ? "Create account" : "Sign in");
  }

  function succeed(u, remember) {
    setSession(u, remember);
    loading(true, u.personal === false ? "Welcome" : `Welcome, ${u.name.split(" ")[0]}`);
    const cb = onSignedIn;
    setTimeout(() => { loading(false); cb && cb(publicUser(u)); }, 250);
  }

  function submit(e) {
    e.preventDefault();
    if (busy) return;
    clearMsg();
    const name = $("authName").value.trim();
    const email = $("authEmail").value.trim();
    const pass = $("authPass").value;
    const remember = $("authRemember").checked;

    if (mode === "signup" && name.length < 2) { msg("Enter your name so your cohort knows who you are."); return bad("authName"); }
    if (!email) { msg("Enter your email address."); return bad("authEmail"); }
    if (!EMAIL_RE.test(email)) { msg("That doesn't look like an email address. Check for typos."); return bad("authEmail"); }
    if (!pass) { msg("Enter your password."); return bad("authPass"); }

    loading(true, mode === "signup" ? "Creating account…" : "Signing in…");

    // Simulated network round-trip so the flow feels real.
    setTimeout(() => {
      if (mode === "signup") {
        if (pass.length < 6) { loading(false); msg("Use at least 6 characters for your password."); return bad("authPass"); }
        if (byEmail(email)) { loading(false); msg("An account already uses that email. Sign in instead."); return bad("authEmail"); }
        const list = localUsers();
        const u = {
          id: "u_" + Date.now().toString(36),
          name, email, password: pass,
          color: SIGNUP_COLORS[list.length % SIGNUP_COLORS.length],
          plan: null,
          tagline: "New account",
          seed: { axes: { ca: 50, so: 50, pi: 50, cr: 50, ss: 50, nm: 50 }, hasProfile: false, archetype: null,
                  active: "photography", streak: 0, explored: [], completed: [], challenges: {} }
        };
        list.push(u); saveLocalUsers(list);
        return succeed(u, remember);
      }

      const u = byEmail(email);
      if (!u) { loading(false); msg("No account uses that email. Tap a demo account below, or create one."); return bad("authEmail"); }
      if (u.password !== pass) { loading(false); msg("Incorrect password. Tap a demo account below to sign in without one."); return bad("authPass"); }
      succeed(u, remember);
    }, 650);
  }

  function quick(id) {
    if (busy) return;
    const u = DEMO_USERS.find(x => x.id === id);
    if (!u) return;
    if (mode !== "signin") setMode("signin");
    $("authEmail").value = u.email;
    $("authPass").value = u.password;
    $("authForm").requestSubmit ? $("authForm").requestSubmit() : submit(new Event("submit"));
  }

  function init() {
    $("authForm").addEventListener("submit", submit);
    $("pwToggle").addEventListener("click", () => {
      const p = $("authPass"), show = p.type === "password";
      p.type = show ? "text" : "password";
      $("pwToggle").setAttribute("aria-label", show ? "Hide password" : "Show password");
      $("pwToggle").innerHTML = `<svg><use href="#${show ? "i-eye-off" : "i-eye"}"/></svg>`;
    });
    $("forgotBtn").addEventListener("click", () =>
      msg("Password resets aren't connected in this demo. Tap any demo account below to sign in instantly.", "info"));
    $("guestBtn").addEventListener("click", () => {
      if (busy) return;
      setSession(GUEST_USER, false);
      onSignedIn && onSignedIn(publicUser(GUEST_USER));
    });
    $("quickRow").addEventListener("click", e => {
      const b = e.target.closest("[data-quick]");
      if (b) quick(b.dataset.quick);
    });
  }

  function show(cb) {
    onSignedIn = cb;
    renderWall();
    renderQuick();
    $("authForm").reset();
    $("authRemember").checked = true;
    setMode("signin");
    loading(false);
    $("auth").hidden = false;
    $("auth").scrollTop = 0;
    if (window.matchMedia("(min-width: 700px)").matches) setTimeout(() => $("authEmail").focus(), 50);
  }
  function hide() { $("auth").hidden = true; }

  return { init, show, hide, current, signOut };
})();
