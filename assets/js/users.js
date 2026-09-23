/* HobbyFlix — placeholder accounts.
   ------------------------------------------------------------------
   This is DEMO data for a front-end prototype. There is no server:
   passwords live in plain text here and in the visitor's browser.
   Replace auth.js with a real provider (Supabase, Firebase, Clerk,
   NextAuth…) before storing anything that matters.

   Each account's `seed` is its starting progress. Anything a user
   does afterwards is saved per account in localStorage under
   "hobbyflix.state.<id>".
   ------------------------------------------------------------------ */

const DEMO_USERS = [
  {
    id: "u_rahul",
    name: "Rahul Sharma",
    email: "rahul@hobbyflix.co",
    password: "explore123",
    color: ["#FF2D4E", "#8E0A24"],
    plan: "digital",
    tagline: "Photography · 12-day streak",
    seed: {
      axes: { ca: 22, so: 36, pi: 44, cr: 62, ss: 68, nm: 40 },
      hasProfile: true,
      active: "photography",
      streak: 12,
      explored: ["photography", "pottery", "chess", "guitar", "djing", "running", "journaling"],
      completed: ["origami", "chess", "journaling"],
      challenges: { photography: [true, true, true, true, false, false, false] }
    }
  },
  {
    id: "u_aarav",
    name: "Aarav Mehta",
    email: "aarav@hobbyflix.co",
    password: "checkmate",
    color: ["#3D7BFF", "#172A6E"],
    plan: "explorer",
    tagline: "Chess · 27-day streak",
    seed: {
      axes: { ca: 90, so: 40, pi: 86, cr: 10, ss: 30, nm: 72 },
      hasProfile: true,
      active: "boxing",
      streak: 27,
      explored: ["chess", "coding", "lockpicking", "origami", "boxing", "running", "journaling", "guitar", "djing", "cooking", "photography"],
      completed: ["chess", "coding", "origami", "lockpicking", "running"],
      challenges: {
        chess: [true, true, true, true, true, true, true],
        boxing: [true, true, false, false, false, false, false]
      }
    }
  },
  {
    id: "u_maya",
    name: "Maya Iyer",
    email: "maya@hobbyflix.co",
    password: "clay123",
    color: ["#FFA23D", "#8A3E08"],
    plan: "free",
    tagline: "Pottery · one day to go",
    seed: {
      axes: { ca: 14, so: 40, pi: 28, cr: 82, ss: 48, nm: 60 },
      hasProfile: true,
      active: "pottery",
      streak: 8,
      explored: ["pottery", "painting", "bonsai", "terrarium"],
      completed: ["painting"],
      challenges: { pottery: [true, true, true, true, true, true, false] }
    }
  },
  {
    id: "u_archit",
    name: "Archit",
    email: "archit@hobbyflix.co",
    password: "archit123",
    color: ["#2EC99A", "#0B5A44"],
    plan: "starter",
    tagline: "DJing · 9-day streak",
    seed: {
      axes: { ca: 34, so: 74, pi: 46, cr: 54, ss: 60, nm: 58 },
      hasProfile: true,
      active: "djing",
      streak: 9,
      explored: ["djing", "guitar", "dance", "photography", "mixology", "cooking"],
      completed: ["guitar", "mixology"],
      challenges: { djing: [true, true, true, false, false, false, false] }
    }
  },
  {
    id: "u_avaneesh",
    name: "Avaneesh",
    email: "avaneesh@hobbyflix.co",
    password: "avaneesh123",
    color: ["#3DB8FF", "#0E4A6E"],
    plan: "starter",
    tagline: "Coding · 15-day streak",
    seed: {
      axes: { ca: 88, so: 34, pi: 90, cr: 50, ss: 30, nm: 80 },
      hasProfile: true,
      active: "coding",
      streak: 15,
      explored: ["coding", "chess", "lockpicking", "origami", "journaling", "photography", "running", "birdwatching"],
      completed: ["chess", "origami", "journaling", "lockpicking"],
      challenges: { coding: [true, true, true, true, true, false, false] }
    }
  },
  {
    id: "u_yash",
    name: "Yash",
    email: "yash@hobbyflix.co",
    password: "yash123",
    color: ["#FF4FA8", "#86124F"],
    plan: "free",
    tagline: "Skateboarding · 5-day streak",
    seed: {
      axes: { ca: 44, so: 60, pi: 10, cr: 36, ss: 76, nm: 50 },
      hasProfile: true,
      active: "skateboarding",
      streak: 5,
      explored: ["skateboarding", "boxing", "running", "hiking", "dance"],
      completed: ["running"],
      challenges: { skateboarding: [true, true, false, false, false, false, false] }
    }
  },
  {
    id: "u_demo",
    name: "New Explorer",
    email: "demo@hobbyflix.co",
    password: "demo1234",
    color: ["#8B5CFF", "#35198A"],
    plan: null,
    tagline: "Fresh account · no profile",
    personal: false,   // a placeholder name, so the site says "you" instead of "New"
    seed: {
      axes: { ca: 50, so: 50, pi: 50, cr: 50, ss: 50, nm: 50 },
      hasProfile: false,
      archetype: null,
      active: "photography",
      streak: 0,
      explored: [],
      completed: [],
      challenges: {}
    }
  }
];

/* Browsing without an account. Uses the default showcase progress. */
const GUEST_USER = {
  id: "guest",
  name: "Guest explorer",
  email: "",
  color: ["#4A505E", "#1C1F27"],
  guest: true
};

/* Colours handed to accounts created through the sign-up form. */
const SIGNUP_COLORS = [
  ["#FF2D4E", "#8E0A24"], ["#3D7BFF", "#172A6E"], ["#FFA23D", "#8A3E08"],
  ["#8B5CFF", "#35198A"], ["#2EC99A", "#0B5A44"], ["#FF4FA8", "#86124F"]
];
