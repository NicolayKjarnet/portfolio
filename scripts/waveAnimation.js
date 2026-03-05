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

/** Boat CSS left: 75%. On desktop, wave SVG/mask is 123% wide,
 *  so 0.75 / 1.23 ≈ 0.61. On mobile, wave is 100% wide → 0.75. */
const BOAT_X_RATIO_DESKTOP = 0.61;
const BOAT_X_RATIO_MOBILE = 0.75;

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

  const isDesktop = window.innerWidth >= 769;
  const boatXRatio = isDesktop ? BOAT_X_RATIO_DESKTOP : BOAT_X_RATIO_MOBILE;
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

      if (isMasked && container && isDesktop) {
        const maskValue = buildMaskURI(d);
        container.style.webkitMaskImage = maskValue;
        container.style.maskImage = maskValue;
      }

      // Sync boat position to wave — boat is in .section-projects, wave-top is sibling
      if (boat && isMasked && container) {
        const waveY = getWaveY(boatXRatio, phase, config);
        const slope = getWaveSlope(boatXRatio, phase, config);
        const rotation = Math.atan(slope) * (180 / Math.PI) * 0.6;
        // waveY is in SVG units (0–120). Convert to px using container height.
        const containerH = container.offsetHeight;
        const topPx = (waveY / HEIGHT) * containerH;
        boat.style.top = `${topPx}px`;
        boat.style.transform = `translateY(-90%) rotate(${rotation.toFixed(1)}deg)`;
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
