<div align="center">

# TopSpeech · Daily Lesson

**A working PWA prototype of a daily speech-therapy lesson.**
Warm, clinical, and considered — built for users working through real speech vulnerabilities.

![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-1.77-CC6699?logo=sass&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-installable-5A8472?logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-1B2540)

[**Live demo**](https://topspeech-lesson.somushrestha448.workers.dev/) · [**Source**](https://github.com/shalshcode08/topspeech-lesson)

</div>

---

## Overview

TopSpeech Health is building a Duolingo-style daily lesson flow for speech therapy, starting with rhotacism (the "R" sound). This prototype delivers the core daily loop: a user opens the app, completes 4–6 exercise cards, earns progress, and is motivated to return tomorrow — but does so with the warmth and clinical credibility of a health product, not a language game.

It is fully responsive, installable as a PWA, runs offline after first load, and was built end-to-end from a single take-home brief.

---

## Quick start

> Requires **Node 18+** and **pnpm**.

```bash
pnpm install
pnpm dev          # http://127.0.0.1:5173
```

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Vite dev server with HMR |
| `pnpm build` | type-check (`tsc --noEmit`) then bundle to `dist/` |
| `pnpm preview` | serve the production build locally |
| `pnpm typecheck` | TypeScript only |

Deploy by uploading `dist/` to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages). There is no backend.

---

## Project structure

```
topspeech-lesson/
├─ index.html               · Vite entry
├─ package.json
├─ tsconfig.json            · strict mode
├─ vite.config.ts
│
├─ public/                  · served as-is at site root
│  ├─ manifest.webmanifest
│  ├─ sw.js
│  └─ icons/icon.svg
│
└─ src/
   ├─ main.tsx              · React boot + SW registration
   ├─ App.tsx               · layout, routing, topbar
   ├─ types.ts              · Card / Step / LessonState
   ├─ data/cards.ts         · lesson content
   ├─ hooks/useLesson.ts    · single source of truth for state + navigation
   │
   ├─ screens/
   │  ├─ Start.tsx
   │  ├─ Checkin.tsx        · innovation pt. 1 — voice mood check-in
   │  ├─ Listen.tsx         · listen & repeat
   │  ├─ Select.tsx         · word selection
   │  ├─ Mirror.tsx         · tongue-placement mirror mode
   │  ├─ Build.tsx          · sentence build
   │  └─ Complete.tsx       · reward screen
   │
   ├─ ui/
   │  ├─ Bloom.tsx          · innovation pt. 2 — Confidence Bloom feedback
   │  ├─ Button.tsx
   │  ├─ Chip.tsx
   │  ├─ Icons.tsx
   │  └─ ProgressBar.tsx
   │
   └─ styles/
      ├─ main.scss          · entry — imports the rest
      ├─ _tokens.scss       · palette, type, shadows, radii
      ├─ _base.scss         · resets and primitives
      ├─ _layout.scss       · app shell, topbar, ambient layer
      ├─ _components.scss   · every visual component class
      └─ _keyframes.scss    · motion library
```

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| UI | **React 18 + TypeScript** | natural lifecycle + strict typing, no event-handler-on-stale-DOM bugs |
| Build | **Vite 5** | fast HMR, ESM-native, zero config for SCSS |
| Styles | **SCSS** | tokens as Sass variables *and* CSS custom properties so inline SVG can read the same palette |
| Animation | **CSS keyframes** | 12 keyframes hand-authored; no animation library |
| Offline | **Service worker + manifest** | installable PWA, offline after first load |
| Package manager | **pnpm** | strict, fast, content-addressed |

---

## Design system

A green/sage palette — warm, clinical, grounded. Replaces the gamier coral palette typical of language-learning apps so the product reads as healthcare.

| Token | Hex | Role |
| --- | --- | --- |
| `$primary` | `#5A8472` | primary actions, voice waveform, active rings |
| `$primary-deep` | `#3F6B5C` | hover / press / gradient stop |
| `$primary-soft` | `#D6E8D2` | mint tint for blooms and halos |
| `$sage` | `#6B9080` | confirmation, success states |
| `$amber` | `#E5A35E` | streak / XP — the only warm accent |
| `$ink` | `#1B2540` | primary text |
| `$cream` | `#F4F8F2` | page background |

**Type** — Inter for UI, **Fraunces** (italic 600) for the words being practiced — so the words read like something you say, not something you tap.

**Motion** lives in `_keyframes.scss` (12 keyframes + matching utility classes): `fadeSlideIn`, `fadeSlideOut`, `gentlePulse`, `breathe`, `waveBar`, `ringExpand`, `bloomIn`, `shimmer`, `confettiDrop`, `sweepGlow`, `tongueLift`, `xpCount`.

---

## Task 01 · Duolingo audit

After ~30 minutes inside a Duolingo lesson:

### What I kept
- **Segmented top progress bar** — chunks the lesson so the user always knows their position. Warmer colors, slimmer segments.
- **One primary action per card** — no clutter. Single CTA at the bottom, at most one ghost link.
- **A reward moment at the end** — streaks, XP, a celebratory animation. Same structure, *much* quieter celebration.

### What I deliberately changed
- **No red-X / green-check binary on spoken cards.** Duolingo's punishing "wrong" state is fine for a language game and brutal for someone working through a real speech vulnerability. Replaced with the **Confidence Bloom**.
- **Tone of voice is warm, not gamified.** Headlines use a serif (Fraunces). Copy reads "Your voice showed up today" instead of "You're on fire 🔥". Streaks exist but don't shout.
- **A pre-lesson voice check-in.** Speech ability varies day to day. Asking "How does your voice feel today?" sets a self-compassionate frame *and* adapts pacing.
- **No life / heart system.** Therapy is iterative, not punitive. There is no fail state.
- **A clinical voice-insight note on the complete screen.** Not just "+20 XP" — a sentence of therapist-style feedback. This is what makes it feel like a health product instead of a game.

---

## Task 02 · The prototype

A ~4-minute lesson with **5 exercise cards across 3 distinct types**:

| # | Screen | Purpose |
| -: | --- | --- |
| 1 | Start | streak / XP / words stats, animated voice waveform |
| 2 | Voice check-in | innovation pt. 1 — sets mood, biases pacing |
| 3 | Listen & Repeat · "Red" | play target, record, Confidence Bloom |
| 4 | Word selection | tap the word starting with the R sound |
| 5 | Mirror mode | animated tongue-placement diagram + optional camera mirror |
| 6 | Listen & Repeat · "Rabbit" | same mechanic, longer word |
| 7 | Sentence build | tap chips in order to form a sentence |
| 8 | Complete | XP, streak, words practiced, voice insight, reminder |

### Mechanics checklist
- Segmented progress bar with smooth easing between segments
- Animated entry transitions on every screen mount (`fadeSlideIn`, 360 ms, cubic-bezier)
- Correct / incorrect feedback states — Confidence Bloom for spoken cards; soft sage outline on a correct selection; soft amber wobble on incorrect. **Never red.**
- Lesson-complete screen with streak + XP shimmer + confetti
- Fully responsive — fixed phone-width column (max 460 px) on desktop, full-bleed on mobile, safe-area insets respected
- Installable PWA — manifest + service worker, works offline after first load

---

## Task 03 · The innovation

One connected innovation in two parts:

### 1 · Pre-lesson Voice Check-in
Before the first card the user picks one of four states: *Clear & ready · A little tired · Tense · Strong & warm.*

- **Sets emotional tone.** Tells the user, before they've spoken a word, that today's lesson is a conversation, not a test.
- **Adapts pacing.** "Tired" shortens the lesson; "Strong" adds a challenge word; "Tense" prepends extra warm-up. In the prototype the mood biases the Confidence Bloom baseline so the user can see the system actually responded to them.

### 2 · Confidence Bloom
Duolingo's spoken-answer feedback is binary: ✅ or ❌. For someone working on rhotacism — a sound many adults associate with childhood embarrassment — binary feedback is the wrong shape entirely.

The **Confidence Bloom** replaces it. After every recording, a soft circular meter fills with a percentage and a clinical-but-warm band label:

| Band | Meaning |
| --- | --- |
| Building | the voice is finding its shape |
| Forming | the R is coming through |
| Clear | keep the tongue light |
| Crisp | well shaped |

No attempt is "wrong." Each repeat earns a slightly higher reading, framed as *"attempt 2 · we're listening for shape, not perfection."* The band names map to real articulation milestones a therapist would name — not arbitrary game scores.

**Why these two together:** the Check-in opens the lesson with permission to be imperfect; the Bloom keeps that permission alive through every spoken interaction. For a speech-therapy product, removing the shame loop isn't a nice-to-have — it's the reason the product can be used daily without becoming exhausting.

---

## Engineering notes

- **React state machine over manual DOM mounting.** An earlier iteration used vanilla JS with hand-rolled mount/swap transitions. React's lifecycle makes the same transitions cleaner *and* eliminates a whole class of "event handler attached to stale DOM" bugs.
- **SCSS tokens exposed as CSS custom properties.** Lets inline SVG (`fill="var(--color-primary)"`) stay in sync with the SCSS palette without duplication or build coupling.
- **No animation library.** Most keyframes finish in under 400 ms. Framer Motion would have been a 30 KB dependency for behavior the platform already handles natively.
- **Strict TypeScript.** `strict`, `noUnusedLocals`, `noUnusedParameters` — `tsc --noEmit` is part of `pnpm build`.
- **Service worker only registers in production.** In dev it auto-unregisters and clears caches so HMR is never blocked by stale assets.

---

## Author's note

Approximate split: ~30 min Duolingo audit + planning, ~3.5 hr building, ~30 min polish + README.

Built for the TopSpeech Health engineer take-home.
