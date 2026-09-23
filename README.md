# HobbyFlix

**Don't choose your next hobby. Discover it.**

Netflix recommends what you should *watch* next. HobbyFlix recommends what you should *try* next — a matching engine that learns your instincts, a seven-day trial for every hobby, and a path from the app to a real studio near you.

This is a working front-end prototype: every screen is interactive, and progress is saved per account in the browser.

---

## What's inside

- **Intro** — an animated "H" monogram that draws itself, dives in, and bursts into light, with a synthesized sound sting. Skippable, and it respects reduced-motion settings.
- **Sign in** — email and password, sign up, "remember me", continue as guest, and one-tap demo accounts. Placeholder data only (see below).
- **Hobby quiz** — seven questions that produce a named profile, trait scores, and your top three matches.
- **Live matching** — six preference sliders that re-rank 50 hobbies as you drag.
- **7-day trials** — tick off days; finishing day 7 asks whether you're hooked or dropping it.
- **Discovery library** — Netflix-style rows, search, and filters.
- **Hobby passport** — explored count, completed trials, streak, and unlockable badges.
- **Pricing** — Free, Digital (₹199/mo), Starter Pack (₹499/mo) and Explorer Pass (₹999/mo).
- **HobbyBox, experiences, community, flywheel** — all clickable.

## Demo accounts

| Account | Email | Password | Starting state |
|---|---|---|---|
| Rahul | `rahul@hobbyflix.co` | `explore123` | Photography trial on day 4, 12-day streak |
| Aarav | `aarav@hobbyflix.co` | `checkmate` | Competitor profile, 27-day streak, badges unlocked |
| Maya | `maya@hobbyflix.co` | `clay123` | Pottery trial on day 6 — tick day 7 to see the finish screen |
| Archit | `archit@hobbyflix.co` | `archit123` | DJing trial on day 3, social-creator profile |
| Avaneesh | `avaneesh@hobbyflix.co` | `avaneesh123` | Coding trial on day 5, systems-thinker profile |
| Yash | `yash@hobbyflix.co` | `yash123` | Skateboarding trial on day 2, restless-mover profile |
| New Explorer | `demo@hobbyflix.co` | `demo1234` | Empty account, no profile yet |

You can also tap any demo account on the sign-in screen, continue as a guest, or create a new account.

> **Presenting live?** Sign in as **Maya** and tick day 7 in the challenge section to show a trial finishing. Sign in as **New Explorer** to show the quiz building a profile from nothing. The **Reset demo data** button on the passport restores the current account's starting state.

---

## Run it locally

It's a static site — no build step and no dependencies. Serve the folder with any static server:

```bash
# Option A (Node)
npx serve .

# Option B (Python)
python3 -m http.server 8000
```

Then open the address it prints (for Python, `http://localhost:8000`).

Opening `index.html` directly from your file system also works in most browsers.

## Put it on GitHub

```bash
cd hobbyflix
git init
git add .
git commit -m "HobbyFlix prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/hobbyflix.git
git push -u origin main
```

Create the empty `hobbyflix` repository on github.com first (without a README), then run the commands above.

## Deploy on Vercel

**From the dashboard**

1. Go to [vercel.com/new](https://vercel.com/new) and import your `hobbyflix` repository.
2. Set **Framework Preset** to **Other**.
3. Leave **Build Command** and **Output Directory** empty. The root folder is the site.
4. Click **Deploy**.

Every push to `main` redeploys automatically.

**From the command line**

```bash
npm i -g vercel
cd hobbyflix
vercel          # preview deployment
vercel --prod   # production deployment
```

**GitHub Pages also works:** repository **Settings → Pages → Deploy from a branch → `main` / root**. All paths are relative, so it runs from a sub-path.

---

## Project structure

```
hobbyflix/
├── index.html            Markup for the intro, sign-in and site
├── favicon.svg
├── vercel.json           Clean URLs, caching and security headers
├── assets/
│   ├── css/
│   │   ├── styles.css    Site design system and sections
│   │   └── gate.css      Intro, sign-in and account menu
│   └── js/
│       ├── data.js       Hobbies, quiz, boxes, experiences, pricing — edit content here
│       ├── users.js      Placeholder demo accounts
│       ├── intro.js      Intro animation and synthesized sound
│       ├── auth.js       Sign-in, sign-up and session handling
│       ├── app.js        Site behaviour and the matching engine
│       └── main.js       Entry point: intro → sign-in → site
└── README.md
```

Scripts load in the order above (`data → users → intro → auth → app → main`); keep that order if you add files.

## Customising

- **Add a hobby:** add an object to `HOBBIES` in `data.js`. The six `axes` values (0–100) decide who it matches: `ca` creative→analytical, `so` solo→social, `pi` physical→intellectual, `cr` competitive→relaxed, `ss` structured→spontaneous, `nm` novelty→mastery.
- **Change the quiz:** edit `QUESTIONS` in `data.js`. Each answer nudges those same axes.
- **Change pricing:** edit `PLANS` in `data.js`.
- **Add a demo account:** add an entry to `DEMO_USERS` in `users.js`; its `seed` is its starting progress.
- **Replay the intro:** use **Replay intro** in the account menu, or add `#intro` to the URL. It otherwise plays once per browser tab.

## Notes

- **Sign-in is placeholder only.** There is no server: demo passwords are in `users.js`, and accounts created through the form are saved in the visitor's own browser (`localStorage`). Don't use real passwords. For a real product, replace `auth.js` with a provider such as Supabase Auth, Firebase Auth or Clerk.
- **Sound** plays after a click, because browsers block audio until the visitor interacts. The first intro is silent; **Play with sound**, signing in, and **Replay intro** all have audio.
- **Fonts** (Archivo and Inter Tight) load from Google Fonts, with system fallbacks when offline.
