# Ocean Wave Transition with Sailboat

## Summary

Replace the existing header-gradient wave between hero and projects sections with a dark ocean-colored wave that fades into the projects background. Add a minimal SVG sailboat that bobs on the animated wave.

## Visual Design

### Ocean gradient
- Replace header gradient mask on `.section-projects > .wave-top` with dark marine gradient
- Top: `oklch(30% 0.08 245)` (dark marine blue)
- Bottom: fades to `var(--clr-dark)` (existing project background)
- Wave fill color: `oklch(25% 0.06 240)` (deep ocean)

### Sailboat
- Minimal SVG sailboat (~40px wide), white/light grey
- Positioned ~75% from left within `.wave-top`
- Synced to wave function: vertical position samples wave at boat's x-coordinate
- Slight rotation (+/- 5deg) based on wave slope for natural motion
- Respects `prefers-reduced-motion` (shown static)

## Technical Approach

### Files to modify
- `css/index.css` — wave-top background, shape-fill color, boat positioning
- `scripts/waveAnimation.js` — sync boat position/rotation with wave
- `index.html` — add boat SVG element inside `.wave-top`

### Mobile
- Ocean gradient always visible (CSS only, no perf cost)
- Boat visible on mobile, stationary (wave animation already disabled < 769px)
- Can hide boat on mobile via media query if it doesn't look good

### Animation sync
- `waveAnimation.js` already calculates wave Y at any x-position
- Extract boat's x-position as a ratio, sample wave function, set `transform: translateY() rotate()`
- Rotation derived from wave slope (difference between adjacent points)
