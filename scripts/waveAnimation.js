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
  wave: { amplitude: 12, frequency: 2.5, baseY: 45, anchor: 'top' },
  curve: { amplitude: 10, frequency: 1.5, baseY: 30, anchor: 'bottom' },
  'wave-2': { amplitude: 14, frequency: 2, baseY: 35, anchor: 'bottom' },
  'wave-3': { amplitude: 12, frequency: 2.5, baseY: 45, anchor: 'top' },
};

const WIDTH = 1200;
const HEIGHT = 120;

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
    // Fill from wave line up to y=0
    return `M0,0 ${waveLine} L${WIDTH},0 Z`;
  }
  // Fill from wave line down to y=120
  return `M0,${HEIGHT} ${waveLine} L${WIDTH},${HEIGHT} Z`;
}

export function setupWaveAnimation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const entries = Object.entries(WAVE_CONFIG)
    .map(([className, config]) => {
      const path = document.querySelector(`.${className} svg path`);
      if (!path) return null;
      return { path, config, offset: Math.random() * Math.PI * 2 };
    })
    .filter(Boolean);

  if (entries.length === 0) return;

  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;

    for (const { path, config, offset } of entries) {
      const phase = elapsed * SPEED + offset;
      path.setAttribute('d', generatePath(phase, config));
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
