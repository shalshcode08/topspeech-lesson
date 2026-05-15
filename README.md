# TopSpeech · Daily Lesson

A working PWA prototype of the daily lesson experience for **TopSpeech Health** — a Duolingo-style daily flow for speech therapy, starting with the rhotacism program (the "R" sound).

> **Live deploy:** _add your Vercel / Netlify / GitHub Pages URL here_
> **Repo:** _add your repo URL here_

---

## Run it

Requires Node 18+ and pnpm.

```bash
pnpm install
pnpm dev          # http://127.0.0.1:5173
```

To produce a static build (type-checked first):

```bash
pnpm build        # tsc --noEmit && vite build → dist/
pnpm preview      # serve dist/ locally
```

Deploy the contents of `dist/` to any static host. There is no backend.

To install as a PWA, use Chrome's "Install app" prompt or Safari's "Add to Home Screen". The service worker caches assets on first load so the lesson works offline.

---

## Project layout

```
topspeech-lesson/
├── index.html                 Vite entry
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/                    served as-is at site root
│   ├── manifest.webmanifest
│   ├── sw.js
│   └── icons/icon.svg
└── src/
    ├── main.tsx               React boot + SW registration
    ├── App.tsx                top-level layout, routing, topbar
    ├── types.ts               Card / Step / LessonState types
    ├── data/cards.ts          lesson content
    ├── hooks/useLesson.ts     single source of truth for state + navigation
    ├── screens/
    │   ├── Start.tsx
    │   ├── Checkin.tsx        innovation, part 1 — voice mood check-in
    │   ├── Listen.tsx         exercise: listen & repeat
    │   ├── Select.tsx         exercise: word selection
    │   ├── Mirror.tsx         exercise: tongue-placement mirror mode
    │   ├── Build.tsx          exercise: sentence build
    │   └── Complete.tsx       reward screen
    ├── ui/
    │   ├── Bloom.tsx          innovation, part 2 — Confidence Bloom feedback
    │   ├── Button.tsx
    │   ├── Chip.tsx
    │   ├── Icons.tsx          inline SVG glyphs
    │   └── ProgressBar.tsx
    └── styles/
        ├── main.scss          entry — imports the rest
        ├── _tokens.scss       palette, type, shadows, radii (SCSS + CSS vars)
        ├── _base.scss         resets and primitives
        ├── _layout.scss       app shell, topbar, ambient layer
        ├── _components.scss   every visual component class
        └── _keyframes.scss    motion library
```

## Stack

- **React 18 + TypeScript** — components, strict typing, no runtime framework code beyond React
- **Vite 5** — dev server, build, native ESM, HMR
- **SCSS** — design tokens as Sass variables, exposed to runtime as CSS custom properties for use inside inline SVG (`var(--color-primary)`)
- **No UI library, no animation library** — every component, every transition is hand-built

## Design system

A green/sage palette — warm, clinical, grounded. The original prototype used coral; this version replaces it with a forest-sage primary so the product reads as healthcare rather than gaming.

| token | hex | role |
|---|---|---|
| `$primary` | `#5A8472` | primary actions, voice waveform, active rings |
| `$primary-deep` | `#3F6B5C` | hover / press / gradient stop |
| `$primary-soft` | `#D6E8D2` | mint tint for blooms and halos |
| `$sage` | `#6B9080` | confirmation, success states |
| `$amber` | `#E5A35E` | streak / XP — the only warm accent |
| `$ink` | `#1B2540` | primary text |
| `$cream` | `#F4F8F2` | page background |

Type: **Inter** for UI, **Fraunces** (italic 600) for the words being practiced — so the words read like something you say, not something you tap.

Motion lives in `_keyframes.scss` (12 keyframes + matching utility classes). No animation library — just CSS.

---

## Task 01 — Duolingo audit

After ~30 minutes inside a Duolingo lesson:

**What I kept**

- **Segmented top progress bar** — chunks the lesson so the user always knows "I'm 3 of 5 in." Warmer colors, slimmer segments — same idea.
- **One primary action per card** — no clutter. Single CTA at the bottom, maybe one ghost link.
- **A reward moment at the end** — streaks, XP, a celebratory animation. Kept the structure, toned the celebration way down (subtle confetti + shimmer instead of fanfare).

**What I deliberately changed for a speech-therapy context**

- **No red-X / green-check binary on spoken cards.** Duolingo's punishing "wrong" state is fine for a language game and brutal for someone working through a real speech vulnerability. Replaced with the **Confidence Bloom** (below).
- **Tone of voice is warm, not gamified.** Headlines use a serif (Fraunces) and phrasing like "Your voice showed up today" instead of "You're on fire 🔥". Streaks exist but don't shout.
- **A pre-lesson voice check-in.** Speech ability varies day to day with sleep, mood, tension. Asking "How does your voice feel today?" before the lesson sets a self-compassionate frame *and* adapts pacing.
- **No life/heart system.** Therapy is iterative, not punitive. There is no fail state.
- **A clinical voice-insight note on the complete screen.** Not just "+20 XP" — a sentence of therapist-style feedback ("Your R is most consistent at the start of short words. Tomorrow we'll bridge into mid-word Rs."). This is what makes it feel like a health product instead of a game.

---

## Task 02 — The prototype

A ~4-minute lesson with **5 exercise cards across 3 distinct types**:

1. **Start screen** — Day, "Initial R sound", streak / XP / words stats, animated voice waveform.
2. **Voice check-in** — pick how your voice feels today (innovation, part 1).
3. **Card 1 · Listen & Repeat — "Red"** — play target audio, record, get a Confidence Bloom.
4. **Card 2 · Word selection** — tap the word starting with the R sound.
5. **Card 3 · Mirror mode** — animated side-profile of mouth with target tongue position; optionally enable camera mirror; record and get a Bloom.
6. **Card 4 · Listen & Repeat — "Rabbit"** — same mechanic, longer word.
7. **Card 5 · Sentence build** — tap chips in order to form "The red robin runs through the rain."
8. **Complete screen** — XP earned, streak incremented, words practiced, voice insight, tomorrow's reminder.

### Mechanics checklist

- Segmented progress bar with smooth easing between segments (each segment fills 0→100% as the card is engaged, then the next segment begins).
- Animated transitions between cards (`fadeSlideIn` on every screen mount, plus per-element entry animations on bloom, chips, and pills).
- Correct / incorrect feedback states — Confidence Bloom for spoken cards; soft sage outline on a correct selection; soft amber wobble on incorrect. Never red.
- Lesson-complete screen with streak + XP shimmer + confetti.
- Fully responsive — fixed phone-width column (max 460px) on desktop, full-bleed on mobile, safe-area insets respected.
- Installable PWA (manifest + service worker, works offline after first load).

---

## Task 03 — The innovation

One connected innovation in two parts:

### 1. Pre-lesson Voice Check-in

Before the first card the user picks one of four states: *Clear & ready · A little tired · Tense · Strong & warm.*

- **Sets emotional tone.** Tells the user, before they've spoken a word, that today's lesson is a conversation, not a test.
- **Adapts pacing.** "Tired" shortens the lesson; "Strong" adds a challenge word; "Tense" prepends extra warm-up. In the prototype the mood biases the Confidence Bloom baseline so the user can see the system actually responded to them.

### 2. Confidence Bloom

Duolingo's spoken-answer feedback is binary: ✅ or ❌. For someone working on rhotacism — a sound many adults associate with childhood embarrassment — binary feedback is the wrong shape entirely.

The **Confidence Bloom** replaces it. After every recording, a soft circular meter fills with a percentage and a clinical-but-warm band label:

- *Building* — the voice is finding its shape
- *Forming* — the R is coming through
- *Clear* — keep the tongue light
- *Crisp* — well shaped

No attempt is "wrong." Each repeat earns a slightly higher reading, framed as *attempt 2 · we're listening for shape, not perfection.* The band names map to real articulation milestones a therapist would name — not arbitrary game scores.

**Why these together:** the Check-in opens the lesson with permission to be imperfect; the Bloom keeps that permission alive through every spoken interaction. For a speech-therapy product, removing the shame loop isn't a nice-to-have — it's the reason the product can be used daily without becoming exhausting.

---

## Notes on engineering choices

- **React state machine over manual DOM mounting.** An earlier iteration used vanilla JS with hand-rolled mount/swap transitions. React's lifecycle makes the same transitions cleaner *and* eliminates a whole class of "event handler attached to stale DOM" bugs.
- **SCSS tokens exposed as CSS custom properties.** Lets inline SVG (`fill="var(--color-primary)"`) stay in sync with the SCSS palette without duplication or build coupling.
- **No animation library.** Keyframes are short (8 of the 12 are under 400ms). Framer Motion would have been a 30 KB dependency for behavior the platform handles natively.
- **Strict TypeScript.** `noUnusedLocals`, `noUnusedParameters`, `strict` — the typecheck runs as part of `pnpm build`.

## Time

Approximate split: ~30 min Duolingo audit + planning, ~3.5 hr building, ~30 min polish + README.
