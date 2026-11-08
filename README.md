# Reflex Lab

**A space-themed reaction-time game, built as a UX research instrument.**

Wait for the cue, react as fast as you can, and discover a planet with every good reaction. Behind the game is a small study: how do the *type of cue* and the *timing of feedback* affect reaction speed and how fair the game feels?

Built by Bryan Burrows as a UX research portfolio piece.

---

## Contents

- [Play it](#play-it)
- [How to play](#how-to-play)
- [Features](#features)
- [The research](#the-research)
- [How timing works](#how-timing-works)
- [Data and privacy](#data-and-privacy)
- [Accessibility](#accessibility)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Customising](#customising)
- [Credits](#credits)

---

## Play it

Reflex Lab is a single HTML file with no build step.

1. Download or clone this repository.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox or Safari).

An internet connection is needed so the page can load Three.js and the fonts from their CDNs.

To host it online for free, turn on **GitHub Pages**: open the repository's **Settings › Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub gives you a public link a minute or two later.

---

## How to play

1. Choose **I agree, start** to take part in the study, or **Play without recording** for practice.
2. Read the short instructions, then **click anywhere in the game** or press **Space** to begin.
3. Wait while the gem floats. When the cue appears, react with **Space**, **Enter**, a **click** or a **tap**.
4. React too early and it counts as a false start; that attempt is repeated.
5. Every valid reaction turns the shape into a planet, with a fact card about it.
6. After 5 valid attempts, rate how fair the round felt, then see your results.

### Score bands

| Band | Reaction time |
|---|---|
| 🤩 Amazing | under 200 ms |
| 😄 Very good | 200–249 ms |
| 🙂 Average | 250–299 ms |
| 🐢 Below average | 300 ms or more |

Typical adult simple reaction time is about 200–250 ms.

---

## Features

**The game**
- Glossy 3D gem built with Three.js, floating in a star field with moving sparkle highlights
- Three cue types:
  - **Colour:** the rose gem turns electric blue
  - **Shape:** the gem becomes a cube
  - **Sound:** a short tone plays and nothing visual changes
- A sparkly chime after every valid reaction
- **13 worlds to discover**, shown in random order with no repeats until all have appeared:
  - All 8 planets of the solar system, with craters, cloud bands, Jupiter's Great Red Spot, Saturn's rings and sideways Uranus
  - 5 well-known exoplanets: Proxima Centauri b, TRAPPIST-1e, HD 189733 b, Kepler-16b and 51 Pegasi b
- Fact cards with each world's distance, a nickname and a fun fact

**The page**
- A painted Milky Way background that sweeps across the page. It's drawn once and never animated, so it costs nothing while you play.
- Frosted-glass side panels, with the game stage kept solid so nothing competes with the cue
- Gradient title in the Unbounded typeface
- "Your results" panel with last, best, median and average times, a reaction-time scale, score bands and a recent-attempts list
- Timing diagnostics panel showing renderer, frame rate, cue drift and audio latency

**For researchers**
- Facilitator console at `index.html#facilitator` for moderated sessions, hypothesis checks with effect sizes, and CSV export
- 2D fallback view if WebGL isn't available, so the study still runs

---

## The research

**Research question:** How do cue type and feedback timing affect reaction speed and perceived fairness?

| | Hypothesis |
|---|---|
| **H1** | A sound cue produces faster reactions than a colour cue. |
| **H2** | A random delay reduces false starts but is rated less fair than a fixed delay. |
| **H3** | Showing each attempt's time immediately raises the replay rate more than showing results only at the end. |

### Study design

| Factor | Conditions |
|---|---|
| Cue type | Colour, shape, sound |
| Delay before the cue | Fixed (2 s) or random (1.5–4 s) |
| Feedback timing | After each attempt, or at the end of the round |

- **Unmoderated sessions:** each player is assigned a cue, delay and feedback condition at random.
- **Moderated sessions:** in the facilitator console you choose the delay, the feedback timing, and one of six cue orders for counterbalancing. The participant then plays one round with each cue.
- Each round has 5 valid attempts, followed by a 1–7 fairness rating.
- **Measures:** reaction time, false starts, fairness rating, whether the player chose to play again, and timing-quality checks (cue drift, frame time, audio latency).

### Keeping the comparison fair

- In the colour and shape conditions, the cue is the only thing that changes. The text on screen, the stage border and the animation speed stay the same at cue onset.
- The float, sparkle lights, stars and Milky Way background behave the same in every state, so they can't hint at the cue.
- The chime, planet and score band appear only *after* a valid reaction.
- With end-of-round feedback, times and score bands stay hidden until the round ends.

---

## How timing works

- **Visual cues** are drawn inside a `requestAnimationFrame` callback and timestamped with `performance.now()` right after the frame is rendered, not when a timer fires.
- **Sound cues** are scheduled on the Web Audio clock. The audio time is converted to page time, and output latency is recorded.
- **Input** uses `pointerdown` and `keydown`, timed from the event's own timestamp. Holding a key down doesn't count as a new reaction.
- Responses faster than **100 ms** count as anticipations (guesses), not reactions.
- No response within **3 seconds** voids the attempt.
- If the tab is hidden during an attempt, that attempt is voided, because browsers throttle hidden tabs.
- Shaders are compiled before play starts, so the cue frame never stalls.

---

## Data and privacy

- **No names, emails or other personal details are collected,** and nothing is stored in the browser.
- Participants give consent before anything is recorded, and **Play without recording** is always available.
- **This standalone `index.html` does not save data to a server.** Results stay on the page, and CSV can be copied from the facilitator console.
- The study version hosted as a Claude artifact saves pseudonymous results to the artifact's database. Each participant can only see their own data, and only the owner can read everyone's.

---

## Accessibility

- Fully playable with the keyboard: **Space** or **Enter** to play, **Esc** to stop an attempt
- Screen-reader announcements for each result, score band and planet fact
- Respects the **reduce motion** setting: spinning, floating, shimmering and sweeping effects stay still
- Visible focus outlines, and colour pairs chosen to stay distinguishable for common colour-vision differences

---

## Tech stack

- HTML, CSS and vanilla JavaScript in a single file, with no framework or build tools
- [Three.js r128](https://threejs.org/) for the 3D stage
- Web Audio API for the sound cue and chime
- Canvas 2D for the planet textures and the Milky Way background
- Fonts: [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) and [Unbounded](https://fonts.google.com/specimen/Unbounded) from Google Fonts

---

## Project structure

```
reflex-lab/
├── index.html    The whole game: markup, styles and scripts
├── favicon.svg   Browser tab icon
└── README.md     This file
```

---

## Customising

Most settings live in the `CONFIG` object near the top of the main script in `index.html`:

| Setting | Default | What it controls |
|---|---|---|
| `attemptsPerRun` | `5` | Valid attempts per round |
| `fixedDelayMs` | `2000` | Delay before the cue in the fixed condition |
| `randomDelayMinMs` / `randomDelayMaxMs` | `1500` / `4000` | Range for the random delay |
| `anticipationMs` | `100` | Faster than this counts as a guess |
| `responseTimeoutMs` | `3000` | Time allowed to respond before the attempt is voided |

- **Planets:** edit the `PLANETS` list to add worlds or change facts.
- **Score bands:** edit `RT_BANDS` to change the bands.
- **Version:** change `appVersion` whenever you alter anything that affects the study, so results from different versions can be told apart.

---

## Credits

- Design, research and direction: **Bryan Burrows**
- Built with help from Claude (Anthropic)
- Planet facts are drawn from widely published NASA and ESA figures. The exoplanet looks are artist's impressions, since none of them has been photographed up close.
