/* HobbyFlix — entry point.
   Flow:  intro (first visit per tab)  →  sign-in (unless a session exists)  →  site
   Add #intro to the URL to force the intro, e.g. https://your-site.vercel.app/#intro
*/

(() => {
  const app = document.getElementById("app");
  let entered = false;

  function enter(user, { transition = false } = {}) {
    if (entered) return;
    entered = true;

    const show = () => {
      Auth.hide();
      app.hidden = false;
      window.scrollTo(0, 0);
      HobbyFlixApp.boot(user);
    };
    const greet = () => toast(user.guest
      ? "Browsing as a guest. Your progress stays on this device."
      : user.personal === false
        ? "Welcome to HobbyFlix. Take the quiz to build your profile."
        : `Welcome back, ${user.name.split(" ")[0]}.`);

    if (transition) {
      // The click that signed them in unlocks audio, so this one gets sound.
      Intro.play({ mode: "short", sound: true, onReveal: show, onDone: greet });
    } else {
      show();
      setTimeout(greet, 300);
    }
  }

  function showSignIn() {
    entered = false;
    Auth.show(user => enter(user, { transition: true }));
  }

  function signOut() {
    Auth.signOut();
    closeOverlays();
    app.hidden = true;
    window.scrollTo(0, 0);
    showSignIn();
  }

  function replayIntro() {
    Intro.play({ mode: "full", sound: true });
  }

  window.HF = { signOut, replayIntro };

  /* ---------- start ---------- */
  Intro.init();
  Auth.init();

  const user = Auth.current();
  let seen = false;
  try { seen = sessionStorage.getItem("hf.introSeen") === "1"; } catch (e) {}
  const force = location.hash === "#intro";
  if (force) history.replaceState(null, "", location.pathname + location.search);

  let routed = false;
  const route = () => {
    if (routed) return;
    routed = true;
    user ? enter(user) : showSignIn();
  };

  if (!seen || force) Intro.play({ mode: "full", onReveal: route, onDone: route });
  else route();
})();
