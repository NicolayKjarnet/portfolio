# Ocean Wave Transition with Sailboat — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the header-gradient wave between hero and projects with a dark ocean wave + bobbing sailboat.

**Architecture:** Reuse existing `wave-top` container and `waveAnimation.js` sine-wave system. Change CSS colors from header gradient to ocean gradient. Add an SVG sailboat element inside `wave-top` and sync its position/rotation to the wave function in the existing animation loop.

**Tech Stack:** Vanilla CSS, vanilla JS (ES modules), inline SVG

---

### Task 1: Change wave-top colors to ocean theme

**Files:**
- Modify: `css/index.css:2130-2154` (desktop wave-top styles)
- Modify: `css/index.css:3096-3108` (mobile wave-top styles)

**Step 1: Change desktop wave-top from header gradient to ocean gradient**

In `css/index.css`, replace the `.wave-top .shape-fill` fill and the `.section-projects > .wave-top` background:

```css
/* Line 2130 — change wave fill to ocean color */
.wave-top .shape-fill {
  fill: oklch(25% 0.06 240);
}

/* Line 2134 — replace header gradient with ocean-to-dark gradient */
.section-projects > .wave-top {
  background: linear-gradient(
    to bottom,
    oklch(30% 0.08 245) 0%,
    var(--clr-dark) 100%
  );
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='white' d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'/%3E%3C/svg%3E");
  -webkit-mask-size: calc(123% + 1.3px) 100%;
  -webkit-mask-repeat: no-repeat;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='white' d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'/%3E%3C/svg%3E");
  mask-size: calc(123% + 1.3px) 100%;
  mask-repeat: no-repeat;
  z-index: 5;
  pointer-events: none;
}
```

Key changes: removed `background-attachment: fixed`, changed gradient from header colors to ocean-to-dark vertical gradient.

**Step 2: Change mobile wave-top to ocean color**

In `css/index.css`, update the mobile overrides (inside the `@media (max-width: 768px)` block):

```css
/* Line 3096 — mobile: use ocean gradient instead of none */
.section-projects > .wave-top {
  background: linear-gradient(to bottom, oklch(30% 0.08 245) 0%, var(--clr-dark) 100%);
  -webkit-mask-image: none;
  mask-image: none;
}

/* Line 3106 — mobile: ocean fill instead of gradient-color-1 */
.section-projects > .wave-top .shape-fill {
  fill: oklch(25% 0.06 240);
}
```

**Step 3: Verify visually**

Open `index.html` in browser. The wave between hero and projects should now show dark ocean blue fading to the dark project background. The wave line itself should be deep ocean colored.

**Step 4: Commit**

```bash
git add css/index.css
git commit -m "feat: change wave-top to dark ocean color theme"
```

---

### Task 2: Add SVG sailboat to HTML

**Files:**
- Modify: `index.html:104-116` (inside `.wave-top` div)

**Step 1: Add the sailboat SVG element inside `.wave-top`**

In `index.html`, add the boat SVG just before the existing wave SVG inside the `.wave-top` div:

```html
<div class="wave-top">
  <!-- Sailboat -->
  <svg class="wave-boat" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Mast -->
    <line x1="30" y1="10" x2="30" y2="65" stroke="oklch(80% 0.02 80)" stroke-width="2"/>
    <!-- Sail -->
    <path d="M30,12 L30,55 L50,50 Z" fill="oklch(95% 0.01 80)" opacity="0.9"/>
    <!-- Small rear sail -->
    <path d="M30,20 L30,45 L18,42 Z" fill="oklch(90% 0.02 80)" opacity="0.8"/>
    <!-- Hull -->
    <path d="M12,65 Q15,78 30,78 Q45,78 48,65 Z" fill="oklch(40% 0.05 30)" stroke="oklch(50% 0.04 30)" stroke-width="1"/>
  </svg>
  <svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
  >
    <path
      d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
      class="shape-fill"
    ></path>
  </svg>
</div>
```

**Step 2: Add boat CSS**

In `css/index.css`, add boat styles after the `.section-projects > .wave-top svg` rule (around line 2154):

```css
/* Sailboat on wave */
.wave-boat {
  position: absolute;
  width: 40px;
  height: 54px;
  left: 75%;
  bottom: 45%;
  z-index: 10;
  transform-origin: center bottom;
  filter: drop-shadow(0 2px 4px oklch(0% 0 0 / 0.3));
  pointer-events: none;
}
```

The `bottom: 45%` is a rough starting position — Task 3 will override this via JS to sync with the wave.

**Step 3: Add mobile boat sizing**

In the mobile media query section of `css/index.css`:

```css
.wave-boat {
  width: 24px;
  height: 32px;
  bottom: 40%;
}
```

**Step 4: Verify visually**

Open in browser. Boat should appear on the wave area. Position won't be perfect yet (that's Task 3).

**Step 5: Commit**

```bash
git add index.html css/index.css
git commit -m "feat: add SVG sailboat to wave-top section"
```

---

### Task 3: Animate boat to bob on wave

**Files:**
- Modify: `scripts/waveAnimation.js`

**Step 1: Add boat animation sync to waveAnimation.js**

Update the `setupWaveAnimation` function to find the boat element and sync it in the animation loop. The key insight: we can calculate the wave Y-value at the boat's x-position using the same sine function used to generate the wave path.

Replace the entire `scripts/waveAnimation.js` with:

```js
/**
 * Animate SVG wave paths with a sine-wave function.
 *
 * Adjust these constants to control the animation:
 *  - SPEED:      How fast the wave rolls (lower = slower)
 *  - AMPLITUDE:  Wave height in SVG units (viewBox is 0–120)
 *  - FREQUENCY:  Number of full wave cycles across the width
 *  - SEGMENTS:   Path resolution (more = smoother, heavier)
 */

const SPEED = 0.22;
const SEGMENTS = 150;

const WAVE_CONFIG = {
  'wave-top': { amplitude: 12, frequency: 2.5, baseY: 45, anchor: 'top' },
};

const WIDTH = 1200;
const HEIGHT = 120;

/** Boat horizontal position as fraction of wave width (0–1) */
const BOAT_X_RATIO = 0.75;

function generatePath(phase, { amplitude, frequency, baseY, anchor }) {
  const points = [];

  for (let i = 0; i <= SEGMENTS; i++) {
    const x = (i / SEGMENTS) * WIDTH;
    const y =
      baseY + Math.sin((i / SEGMENTS) * Math.PI * 2 * frequency + phase) * amplitude;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  const waveLine = points.map((p) => `L${p}`).join(' ');

  if (anchor === 'top') {
    return `M0,0 ${waveLine} L${WIDTH},0 Z`;
  }
  return `M0,${HEIGHT} ${waveLine} L${WIDTH},${HEIGHT} Z`;
}

/** Get wave Y at a given x-ratio (0–1) for a given phase and config. */
function getWaveY(xRatio, phase, { amplitude, frequency, baseY }) {
  return baseY + Math.sin(xRatio * Math.PI * 2 * frequency + phase) * amplitude;
}

/** Get wave slope (derivative) at a given x-ratio — used for boat tilt. */
function getWaveSlope(xRatio, phase, { amplitude, frequency }) {
  const dx = 0.005;
  const y1 = Math.sin((xRatio - dx) * Math.PI * 2 * frequency + phase) * amplitude;
  const y2 = Math.sin((xRatio + dx) * Math.PI * 2 * frequency + phase) * amplitude;
  return (y2 - y1) / (2 * dx * WIDTH);
}

/**
 * Build a data-URI SVG mask from a path `d` string.
 */
function buildMaskURI(d) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${WIDTH} ${HEIGHT}' preserveAspectRatio='none'><path fill='white' d='${d}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function setupWaveAnimation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  if (window.innerWidth < 769) return;

  const maskedWaveContainer = document.querySelector('.section-projects > .wave-top');
  const boat = document.querySelector('.wave-boat');

  const entries = Object.entries(WAVE_CONFIG)
    .map(([className, config]) => {
      const path = document.querySelector(`.${className} svg path`);
      if (!path) return null;
      const container = path.closest(`.${className}`);
      const isMasked = container === maskedWaveContainer;
      return { path, config, offset: Math.random() * Math.PI * 2, container, isMasked };
    })
    .filter(Boolean);

  if (entries.length === 0) return;

  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;

    for (const { path, config, offset, container, isMasked } of entries) {
      const phase = elapsed * SPEED + offset;
      const d = generatePath(phase, config);
      path.setAttribute('d', d);

      if (isMasked && container) {
        const maskValue = buildMaskURI(d);
        container.style.webkitMaskImage = maskValue;
        container.style.maskImage = maskValue;
      }

      // Sync boat position to wave
      if (boat && isMasked) {
        const waveY = getWaveY(BOAT_X_RATIO, phase, config);
        const slope = getWaveSlope(BOAT_X_RATIO, phase, config);
        const rotation = Math.atan(slope) * (180 / Math.PI) * 0.6;
        // waveY is in SVG units (0–120). Convert to percentage of container height.
        const yPercent = (waveY / HEIGHT) * 100;
        boat.style.bottom = `${100 - yPercent}%`;
        boat.style.transform = `translateY(50%) rotate(${rotation.toFixed(1)}deg)`;
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
```

**Step 2: Verify visually**

Open in browser. The boat should bob up and down following the wave's shape at 75% from the left. It should tilt slightly as the wave rises and falls.

**Step 3: Tweak if needed**

- If boat sits too high/low, adjust the `bottom` calculation
- If tilt is too aggressive, reduce the `0.6` multiplier on the rotation
- If boat x-position feels wrong, change `BOAT_X_RATIO`

**Step 4: Commit**

```bash
git add scripts/waveAnimation.js
git commit -m "feat: animate sailboat bobbing on ocean wave"
```

---

### Task 4: Final polish and visual tuning

**Files:**
- Potentially: `css/index.css`, `scripts/waveAnimation.js`

**Step 1: Test across browsers**

Check Chrome, Firefox, Safari. The mask-image technique should work in all modern browsers.

**Step 2: Test mobile**

Check on mobile viewport (< 768px). Boat should be visible and stationary. Ocean gradient should show. If it doesn't look good, add `display: none` for `.wave-boat` in the mobile media query.

**Step 3: Test reduced motion**

Enable `prefers-reduced-motion: reduce` in dev tools. Wave and boat should be static.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: ocean wave transition with bobbing sailboat"
```
