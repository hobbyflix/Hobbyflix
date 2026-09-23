/* HobbyFlix — cinematic intro.
   ------------------------------------------------------------------
   Intro.play({ mode, sound, onReveal, onDone })
     mode      "full"  – monogram draws itself, wordmark, zoom, light burst (~4.4s)
               "short" – monogram already built, straight to zoom + burst (~1.8s)
     sound     true to play the synthesized two-hit sting. Browsers only allow
               audio after a click/tap, so the first-load intro is silent and
               the "Play with sound" button replays it with audio.
     onReveal  fires when the overlay starts fading (render what's underneath)
     onDone    fires when the overlay is fully gone
   Built on the Web Animations API — no libraries.
   ------------------------------------------------------------------ */

const Sound = (() => {
  let ctx = null, master = null;

  function ensure() {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    if (!ctx) ctx = new C();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function bus() {
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(comp).connect(ctx.destination);
  }

  // A pitched-down sine "boom" — the body of each hit.
  function boom(at, f0, f1, dur, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(f0, at);
    o.frequency.exponentialRampToValueAtTime(f1, at + dur * 0.8);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(vol, at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(master);
    o.start(at); o.stop(at + dur + 0.05);
  }

  // A short filtered noise burst — the attack/transient of each hit.
  function thud(at, vol) {
    const len = Math.floor(ctx.sampleRate * 0.18);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = buf;
    f.type = "lowpass";
    f.frequency.setValueAtTime(1100, at);
    f.frequency.exponentialRampToValueAtTime(180, at + 0.16);
    g.gain.value = vol;
    src.connect(f).connect(g).connect(master);
    src.start(at);
  }

  // A soft swelling chord under the second hit.
  function shimmer(at, dur) {
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(260, at);
    f.frequency.exponentialRampToValueAtTime(2600, at + dur * 0.45);
    f.frequency.exponentialRampToValueAtTime(400, at + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.07, at + 0.5);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    f.connect(g).connect(master);
    [110, 164.81, 220, 261.63, 329.63].forEach((hz, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "triangle" : "sawtooth";
      o.frequency.value = hz;
      o.detune.value = (i - 2) * 6;
      o.connect(f);
      o.start(at); o.stop(at + dur + 0.1);
    });
  }

  function sting(hit1, hit2) {
    if (!ensure()) return;
    bus();
    const t = ctx.currentTime + 0.03;
    boom(t + hit1, 96, 50, 0.75, 0.7);  thud(t + hit1, 0.32);
    boom(t + hit2, 74, 36, 2.1, 0.95);  thud(t + hit2, 0.42);
    shimmer(t + hit2, 2.8);
  }

  function stop() {
    if (ctx && master) master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.04);
  }

  return { sting, stop, ensure };
})();


const Intro = (() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = id => document.getElementById(id);

  // Mostly brand red, with a few hobby colours flashing through.
  const PALETTE = ["#FF2D4E", "#FF2D4E", "#FF5C74", "#C3122F", "#FF2D4E", "#FF7A45",
                   "#FFB23D", "#FF4FA8", "#9B6BFF", "#3DB8FF", "#2EE6A8", "#E0143A"];

  // Timeline in milliseconds.
  const T = {
    full:  { L: 250, R: 520, X: 860, grow: 520, glow: 1000, word: 1150, sheen: 1750,
             zoom: 2450, zoomDur: 1150, stripes: 2850, monoOut: 3050, reveal: 3900, end: 4450,
             hit1: 0.78, hit2: 1.28 },
    short: { L: 0, R: 60, X: 140, grow: 240, glow: 60, word: -1, sheen: -1,
             zoom: 380, zoomDur: 900, stripes: 640, monoOut: 820, reveal: 1350, end: 1800,
             hit1: 0.06, hit2: 0.36 }
  };

  let anims = [], timers = [], playing = false, cbReveal = null, cbDone = null, revealed = false;

  const ease = {
    out:   "cubic-bezier(.22,.8,.28,1)",
    draw:  "cubic-bezier(.7,0,.2,1)",
    zoom:  "cubic-bezier(.62,0,.88,.36)"
  };

  function A(node, keyframes, opts) {
    const a = node.animate(keyframes, Object.assign({ fill: "both", easing: ease.out }, opts));
    anims.push(a);
    return a;
  }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function reset() {
    anims.forEach(a => a.cancel()); anims = [];
    timers.forEach(clearTimeout); timers = [];
    $("introStripes").innerHTML = "";
    $("intro").style.opacity = "";
  }

  function buildWord() {
    const w = $("introWord");
    if (w.dataset.built) return;
    w.textContent = "";
    "HOBBYFLIX".split("").forEach((ch, i) => {
      const s = document.createElement("span");
      s.textContent = ch;
      if (i >= 5) s.className = "r";
      w.appendChild(s);
    });
    w.dataset.built = "1";
  }

  function burst(start, count) {
    const box = $("introStripes");
    const vw = Math.max(window.innerWidth, 1);
    for (let i = 0; i < count; i++) {
      const s = document.createElement("i");
      s.className = "stripe";
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const w = 2 + Math.random() * Math.random() * 16;
      s.style.width = w + "px";
      s.style.background = `linear-gradient(180deg, transparent, ${color} 18%, ${color} 82%, transparent)`;
      s.style.boxShadow = `0 0 ${8 + w * 1.5}px ${color}`;
      box.appendChild(s);

      const x1 = Math.random() * vw;
      const x0 = vw / 2 + (x1 - vw / 2) * 0.06;
      const drift = (x1 - vw / 2) * 0.12;
      const dur = 900 + Math.random() * 500;
      A(s, [
        { transform: `translateX(${x0}px) scaleY(0.02)`, opacity: 0 },
        { transform: `translateX(${(x0 + x1) / 2}px) scaleY(0.7)`, opacity: 1, offset: 0.3 },
        { transform: `translateX(${x1}px) scaleY(1)`, opacity: 0.95, offset: 0.7 },
        { transform: `translateX(${x1 + drift}px) scaleY(1.04)`, opacity: 0 }
      ], { delay: start + Math.random() * 380, duration: dur, easing: ease.out });
    }
  }

  function finish() {
    if (!playing) return;
    playing = false;
    try { sessionStorage.setItem("hf.introSeen", "1"); } catch (e) {}
    if (!revealed) { revealed = true; cbReveal && cbReveal(); }
    $("intro").hidden = true;
    reset();
    document.body.classList.remove("is-locked");
    const done = cbDone; cbReveal = cbDone = null;
    done && done();
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    cbReveal && cbReveal();
  }

  function play(opts = {}) {
    const mode = opts.mode === "short" ? "short" : "full";
    const t = T[mode];
    reset();
    cbReveal = opts.onReveal || null;
    cbDone = opts.onDone || null;
    revealed = false;
    playing = true;

    const intro = $("intro");
    intro.hidden = false;
    intro.classList.toggle("is-short", mode === "short");
    document.body.classList.add("is-locked");
    buildWord();

    if (reduced) {
      // Respect reduced motion: a still monogram, then a gentle fade.
      A(intro, [{ opacity: 1 }, { opacity: 0 }], { delay: 700, duration: 500 });
      later(reveal, 700);
      later(finish, 1250);
      return;
    }

    if (opts.sound) Sound.sting(t.hit1, t.hit2);

    const mono = $("mono"), glow = $("introGlow"), word = $("introWord");

    // 1. Draw the monogram
    A($("monoL"), [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { delay: t.L, duration: t.grow, easing: ease.draw });
    A($("monoR"), [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { delay: t.R, duration: t.grow, easing: ease.draw });
    A($("monoX"), [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { delay: t.X, duration: t.grow * 0.8, easing: ease.draw });

    // 2. Glow blooms behind it
    A(glow, [{ opacity: 0, transform: "translate(-50%,-50%) scale(.6)" },
             { opacity: 1, transform: "translate(-50%,-50%) scale(1)" }], { delay: t.glow, duration: 900 });

    // 3. Wordmark (full mode only)
    const letters = Array.from(word.children);
    if (t.word >= 0) {
      letters.forEach((l, i) => A(l, [
        { opacity: 0, transform: "translateY(16px)", filter: "blur(8px)" },
        { opacity: 1, transform: "none", filter: "blur(0)" }
      ], { delay: t.word + i * 45, duration: 620 }));
      A(mono, [{ transform: "scale(1)" }, { transform: "scale(1.045)" }, { transform: "scale(1)" }],
        { delay: t.X + 380, duration: 520, fill: "none" });
    } else {
      letters.forEach(l => A(l, [{ opacity: 0 }, { opacity: 0 }], { duration: 1 }));
    }

    // 4. Light sweeps across the ribbons
    if (t.sheen >= 0) {
      A($("monoSheen"), [{ backgroundPosition: "100% 0", opacity: 0 },
                         { opacity: 1, offset: 0.25 },
                         { opacity: 1, offset: 0.75 },
                         { backgroundPosition: "0% 0", opacity: 0 }], { delay: t.sheen, duration: 850, easing: "ease-in-out" });
      A(word, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(10px)" }], { delay: t.zoom - 60, duration: 360, fill: "forwards" });
    }

    // 5. Dive into the H
    A(mono, [{ transform: "scale(1)", filter: "blur(0)" },
             { transform: "scale(34)", filter: "blur(2px)" }], { delay: t.zoom, duration: t.zoomDur, easing: ease.zoom, fill: "forwards" });
    A(mono, [{ opacity: 1 }, { opacity: 0 }], { delay: t.monoOut, duration: 420, fill: "forwards" });
    A(glow, [{ opacity: 1 }, { opacity: 0 }], { delay: t.zoom, duration: 500, fill: "forwards" });

    // 6. Burst into streaks of light
    burst(t.stripes, mode === "full" ? 72 : 54);

    // 7. Hand over to the page underneath
    A(intro, [{ opacity: 1 }, { opacity: 0 }], { delay: t.reveal, duration: t.end - t.reveal, easing: "ease-in", fill: "forwards" });
    later(reveal, t.reveal);
    later(finish, t.end);
  }

  function skip() {
    if (!playing) return;
    Sound.stop();
    anims.forEach(a => a.pause());
    timers.forEach(clearTimeout); timers = [];
    reveal();
    const a = $("intro").animate([{ opacity: getComputedStyle($("intro")).opacity }, { opacity: 0 }], { duration: 260, fill: "forwards" });
    anims.push(a);
    a.onfinish = finish;
  }

  function init() {
    $("introSkip").addEventListener("click", skip);
    $("introSound").addEventListener("click", () => {
      Sound.ensure();
      const r = cbReveal, d = cbDone;
      play({ mode: "full", sound: true, onReveal: r, onDone: d });
    });
    document.addEventListener("keydown", e => {
      if (playing && e.key === "Escape") { e.preventDefault(); skip(); }
    });
  }

  return { play, skip, init, get playing() { return playing; } };
})();
