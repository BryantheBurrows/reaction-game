# Reflex Lab

A browser reaction-time game built as a UX research instrument.

**Research question:** How do the type of cue and the timing of feedback affect reaction speed and perceived fairness?

- Three cue types: colour, shape and sound
- Fixed (2 s) or random (1.5–4 s) delay before the cue
- Feedback after each attempt or at the end of a 5-attempt round
- False-start detection, a 1–7 fairness rating after each round
- Three.js stimulus stage with a 2D fallback; timing measured from the frame (or audio sample) that delivered the cue
- Facilitator console at `#facilitator` for moderated sessions, hypothesis checks with effect sizes, and CSV export

Open `index.html` in a browser to play. Study data is saved only in the published Claude artifact version; this standalone copy keeps results on the page.
