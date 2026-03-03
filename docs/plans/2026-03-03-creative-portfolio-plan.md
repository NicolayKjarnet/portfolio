# Creative Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the portfolio from a developer-only portfolio to a creative portfolio with three categories: Web, Visuelt (visual), and Musikk (music) — each with distinct card types.

**Architecture:** Data-driven project arrays (already refactored) with separate render functions per category. Filter system reused with updated values. New card types for music (mini-player with Spotify preview) and visual (image lightbox + YouTube embed). Profile cutout added to header.

**Tech Stack:** Vanilla JS, CSS, HTML. Spotify 30s preview URLs via `<audio>`. YouTube `<iframe>` embeds. No frameworks or libraries added.

---

### Task 1: Update filter system (HTML + JS)

**Files:**
- Modify: `index.html:64-102` (filter HTML)
- Modify: `scripts/filterProjects.js` (filter logic)

**Step 1: Replace filter HTML**

Replace the filter-box content in `index.html` with new categories:

```html
<div class="filter-box" aria-labelledby="filter-heading">
  <h2 id="filter-heading" class="visually-hidden">Filter projects</h2>

  <label class="visually-hidden" for="project-filter">Filter projects</label>

  <select id="project-filter" class="filter-dropdown">
    <option value="web">Web</option>
    <option value="visual">Visuelt</option>
    <option value="music">Musikk</option>
  </select>

  <ul class="filter-list">
    <li>
      <button class="filter-item active" data-filter="web" aria-pressed="true">Web</button>
    </li>
    <li>
      <button class="filter-item" data-filter="visual" aria-pressed="false">Visuelt</button>
    </li>
    <li>
      <button class="filter-item" data-filter="music" aria-pressed="false">Musikk</button>
    </li>
  </ul>
</div>
```

**Step 2: Update filterProjects.js**

The filter now works as show/hide by category (no "all" option). Replace the `filterProjects` function logic:
- When filter is `web`: show `.project-section__article--web`, hide all others
- When filter is `visual`: show `.project-section__article--visual`, hide all others
- When filter is `music`: show `.project-section__article--music`, hide all others

Change the `filterValue === 'all'` branch to never match (no "all" category). The default on load should call `filterProjects('web')`.

Also: on mobile, reset scroll position to start when switching category (call `projectSection.scrollTo({ left: 0 })` after DOM update).

**Step 3: Commit**

```
feat: update filter system to Web/Visuelt/Musikk categories
```

---

### Task 2: Add header profile cutout

**Files:**
- Modify: `index.html:20-22` (header title section)
- Modify: `css/index.css` (header styles)

**Step 1: Add cutout image to header HTML**

Inside `.header__title-section`, add the profile image:

```html
<div class="header__title-section">
  <img
    class="header__cutout"
    src="/images/profile-pic-no-bg.webp"
    alt=""
    width="120"
    height="120"
    loading="eager"
  />
  <h1 class="header__title">NICOLAY KJÆRNET</h1>
  <p class="header__paragraph">Developer & Content Producer</p>
</div>
```

`alt=""` because it's decorative (name is already in the heading).

**Step 2: Add CSS for cutout**

Add to base styles (after `.header__paragraph`):

```css
.header__cutout {
  width: 7rem;
  height: auto;
  border-radius: 50%;
  margin-bottom: 1rem;
  opacity: 0.9;
}
```

Subtilt, rundt, litt transparent — som en signatur.

On mobile (≤580px), optionally reduce size:

```css
.header__cutout {
  width: 5rem;
}
```

**Step 3: Commit**

```
feat: add profile cutout to header
```

---

### Task 3: Create music card render function

**Files:**
- Create: `scripts/renderMusicProjects.js`
- Modify: `scripts/index.js` (import and render)

**Step 1: Create renderMusicProjects.js**

New file with music project data and render function:

```js
/**
 * @typedef {Object} MusicItem
 * @property {string} title
 * @property {string} artist
 * @property {string} description
 * @property {string} imgSrc - Album cover
 * @property {string} [previewUrl] - Spotify 30s preview MP3 URL
 * @property {string} externalUrl - Spotify/SoundCloud link
 * @property {string} platform - 'spotify' | 'soundcloud'
 * @property {boolean} [hidden]
 */

/** @type {MusicItem[]} */
const musicProjects = [
  // Add music items here. Set hidden: true to hide.
  // Example:
  // {
  //   title: 'Song Name',
  //   artist: 'trueandtrue',
  //   description: 'Short description of the track or project.',
  //   imgSrc: '/images/music/album-cover.webp',
  //   previewUrl: 'https://p.scdn.co/mp3-preview/...',
  //   externalUrl: 'https://open.spotify.com/track/...',
  //   platform: 'spotify',
  // },
];

const renderMusicItem = ({ title, artist, description, imgSrc, previewUrl, externalUrl, platform }) => {
  const platformIcon = platform === 'spotify' ? 'fab fa-spotify' : 'fab fa-soundcloud';

  return `
    <article class="project-section__article project-section__article--music">
      <div class="music-card" data-preview-url="${previewUrl || ''}" data-external-url="${externalUrl}">
        <div class="music-card__cover">
          <img class="music-card__img" src="${imgSrc}" alt="Cover art for ${title}" width="500" height="500" />
          ${previewUrl ? '<button class="music-card__play" aria-label="Play preview"><i class="fas fa-play"></i></button>' : ''}
        </div>
        <div class="music-card__info">
          <h2 class="music-card__title">${title}</h2>
          <p class="music-card__artist">${artist}</p>
          <p class="music-card__description">${description}</p>
          <a href="${externalUrl}" target="_blank" class="music-card__link" onclick="event.stopPropagation();">
            <i class="${platformIcon}"></i> Listen on ${platform === 'spotify' ? 'Spotify' : 'SoundCloud'}
          </a>
        </div>
      </div>
    </article>
  `;
};

export const renderMusicProjects = () => {
  return musicProjects
    .filter((p) => !p.hidden)
    .map((p) => renderMusicItem(p))
    .join('');
};
```

**Step 2: Add music card CSS**

Add to `css/index.css` (before the media queries section):

```css
/* Music Cards */
.music-card {
  display: flex;
  flex-direction: column;
}

.music-card__cover {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.music-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.music-card__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  border: none;
  color: var(--clr-white);
  font-size: 2.5rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.music-card__play:hover,
.music-card:hover .music-card__play {
  opacity: 1;
}

.music-card__play.playing {
  opacity: 1;
}

.music-card__play.playing i::before {
  content: '\f04c'; /* fa-pause */
}

.music-card__info {
  padding: 1rem;
}

.music-card__title {
  color: var(--clr-white);
  font-size: 1.1rem;
  margin: 0 0 0.25rem;
}

.music-card__artist {
  color: var(--clr-white-2);
  opacity: 0.7;
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
}

.music-card__description {
  color: var(--clr-white-2);
  font-size: 0.9rem;
  margin: 0 0 0.75rem;
  line-height: 1.5;
}

.music-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--clr-orange);
  font-size: 0.9rem;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.music-card__link:hover {
  opacity: 0.8;
}
```

**Step 3: Add music player JS**

Create `scripts/musicPlayer.js`:

```js
/** Simple audio manager — only one track plays at a time. */
let currentAudio = null;
let currentButton = null;

export function setupMusicPlayer() {
  document.querySelector('.project-section')?.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.music-card__play');
    if (!playBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const card = playBtn.closest('.music-card');
    const previewUrl = card?.dataset.previewUrl;
    if (!previewUrl) return;

    // If clicking the same button, toggle
    if (currentButton === playBtn && currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
        playBtn.classList.add('playing');
      } else {
        currentAudio.pause();
        playBtn.classList.remove('playing');
      }
      return;
    }

    // Stop any currently playing
    if (currentAudio) {
      currentAudio.pause();
      currentButton?.classList.remove('playing');
    }

    currentAudio = new Audio(previewUrl);
    currentButton = playBtn;
    playBtn.classList.add('playing');
    currentAudio.play();

    currentAudio.addEventListener('ended', () => {
      playBtn.classList.remove('playing');
      currentAudio = null;
      currentButton = null;
    });
  });
}
```

**Step 4: Commit**

```
feat: add music card type with mini-player
```

---

### Task 4: Create visual card render function + lightbox

**Files:**
- Create: `scripts/renderVisualProjects.js`
- Create: `scripts/lightbox.js`
- Modify: `css/index.css`

**Step 1: Create renderVisualProjects.js**

```js
/**
 * @typedef {Object} VisualItem
 * @property {string} title
 * @property {string} description
 * @property {string} [imgSrc] - For image/graphic items
 * @property {string} [youtubeId] - For video items (YouTube video ID)
 * @property {string} type - 'image' | 'video'
 * @property {boolean} [hidden]
 */

/** @type {VisualItem[]} */
const visualProjects = [
  // Add visual items here. Set hidden: true to hide.
  // Example image:
  // {
  //   title: 'Album Cover Design',
  //   description: 'Cover art for ...',
  //   imgSrc: '/images/visual/cover-art.webp',
  //   type: 'image',
  // },
  // Example video:
  // {
  //   title: 'Music Video',
  //   description: 'Directed and edited for ...',
  //   youtubeId: 'dQw4w9WgXcQ',
  //   type: 'video',
  // },
];

const renderVisualItem = ({ title, description, imgSrc, youtubeId, type }) => {
  const media =
    type === 'video'
      ? `<div class="visual-card__video">
          <iframe
            src="https://www.youtube.com/embed/${youtubeId}"
            title="${title}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>`
      : `<div class="visual-card__image" data-lightbox-src="${imgSrc}">
          <img src="${imgSrc}" alt="${title}" width="500" height="500" loading="lazy" />
          <div class="visual-card__expand"><i class="fas fa-expand"></i></div>
        </div>`;

  return `
    <article class="project-section__article project-section__article--visual">
      ${media}
      <div class="visual-card__info">
        <h2 class="visual-card__title">${title}</h2>
        <p class="visual-card__description">${description}</p>
      </div>
    </article>
  `;
};

export const renderVisualProjects = () => {
  return visualProjects
    .filter((p) => !p.hidden)
    .map((p) => renderVisualItem(p))
    .join('');
};
```

**Step 2: Create lightbox.js**

```js
export function setupLightbox() {
  // Create lightbox DOM
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <img class="lightbox__img" src="" alt="" />
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector('.lightbox__img');

  // Open on image click
  document.querySelector('.project-section')?.addEventListener('click', (e) => {
    const imageContainer = e.target.closest('[data-lightbox-src]');
    if (!imageContainer) return;

    img.src = imageContainer.dataset.lightboxSrc;
    img.alt = imageContainer.closest('.project-section__article')?.querySelector('.visual-card__title')?.textContent || '';
    overlay.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
  });

  // Close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('.lightbox__close')) {
      overlay.classList.remove('lightbox--open');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('lightbox--open')) {
      overlay.classList.remove('lightbox--open');
      document.body.style.overflow = '';
    }
  });
}
```

**Step 3: Add CSS for visual cards + lightbox**

```css
/* Visual Cards */
.visual-card__image {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
}

.visual-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.visual-card__image:hover img {
  transform: scale(1.05);
}

.visual-card__expand {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: var(--clr-white);
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.visual-card__image:hover .visual-card__expand {
  opacity: 1;
}

.visual-card__video {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.visual-card__video iframe {
  width: 100%;
  height: 100%;
}

.visual-card__info {
  padding: 1rem;
}

.visual-card__title {
  color: var(--clr-white);
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.visual-card__description {
  color: var(--clr-white-2);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.lightbox--open {
  opacity: 1;
  pointer-events: auto;
}

.lightbox__img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 0.5rem;
}

.lightbox__close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--clr-white);
  font-size: 2.5rem;
  cursor: pointer;
  z-index: 1001;
  transition: opacity 0.3s ease;
}

.lightbox__close:hover {
  opacity: 0.7;
}
```

**Step 4: Commit**

```
feat: add visual card type with lightbox and YouTube embed
```

---

### Task 5: Wire everything together in index.js

**Files:**
- Modify: `scripts/index.js`
- Modify: `scripts/filterProjects.js`
- Modify: `scripts/renderProjects.js` (update classes)

**Step 1: Update web project classes**

In `renderProjects.js`, all existing web project articles need the class `project-section__article--web` in addition to their existing category classes. Add `project-section__article--web` to the `classes` string on every visible project.

**Step 2: Update index.js to render all categories**

```js
import { renderProjects } from './renderProjects.js';
import { renderMusicProjects } from './renderMusicProjects.js';
import { renderVisualProjects } from './renderVisualProjects.js';
import { setupProjectFiltering } from './filterProjects.js';
import { setupMusicPlayer } from './musicPlayer.js';
import { setupLightbox } from './lightbox.js';
import { saveScrollPosition, restoreScrollPosition } from './scrollPosition.js';
import { setupSmoothScrolling, setupScrollArrow } from './smoothScrolling.js';
import { setupWaveAnimation } from './waveAnimation.js';

document.addEventListener('DOMContentLoaded', function () {
  // Render all project types into the same container
  const projectSection = document.querySelector('.project-section');
  projectSection.innerHTML = renderProjects() + renderVisualProjects() + renderMusicProjects();

  restoreScrollPosition();

  document.querySelectorAll('.project-link').forEach(function (link) {
    link.addEventListener('click', saveScrollPosition);
  });

  setupSmoothScrolling();
  setupScrollArrow();
  setupProjectFiltering();
  setupMusicPlayer();
  setupLightbox();
  setupWaveAnimation();
});
```

**Step 3: Update filterProjects.js for new categories**

Key changes:
- Default filter on load: `'web'` instead of `'all'`
- Remove the `filterValue === 'all'` branch
- All filtering uses the class-matching logic (`project-section__article--${filterValue}`)
- After filtering, call `projectSection.scrollTo({ left: 0, behavior: 'instant' })` to reset mobile scroll
- Stop any playing music when switching away from Musikk category

**Step 4: Commit**

```
feat: wire up all card types and category filtering
```

---

### Task 6: Populate with placeholder content and verify

**Step 1: Add 1-2 placeholder items to musicProjects and visualProjects**

Use real album art URLs or placeholder images so the layout can be verified visually. Mark items as `hidden: false` so they render.

**Step 2: Test all scenarios**
- Desktop: click Web → shows web projects only. Click Visuelt → shows visual cards. Click Musikk → shows music cards.
- Mobile (≤768px): cards swipe horizontally in each category. Category switch resets to first card.
- Lightbox opens/closes on image click and Escape key.
- Music play button plays preview, stops when switching tracks.
- Desktop filter list and mobile dropdown both work.

**Step 3: Commit**

```
feat: add placeholder content for visual and music categories
```

---

### Task 7: Clean up unused filter CSS and old category references

**Files:**
- Modify: `css/index.css` (remove IoT-specific filter styling if any)
- Modify: `index.html` (verify no old filter values remain)

**Step 1: Remove old filter category references**

Remove any CSS that references the old categories (fullstack, frontend, ux, mobile, iot) if they're no longer used in the filter system. The classes on web project articles can stay (they don't hurt), but the filter buttons/options should only reference web/visual/music.

**Step 2: Commit**

```
chore: clean up old filter category references
```
