# Video Cinema Modal Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** FLIP-animated cinema modal for inline video playback on visual project cards.

**Architecture:** New `videoModal.js` creates a fixed overlay with a `<video>` element. On play click, it captures the thumbnail rect, positions the video there, then animates to centered fullscreen with GSAP. Close reverses. Cards with `videoSrc` show a poster + play overlay instead of embedding YouTube.

**Tech Stack:** GSAP (already loaded), vanilla JS, CSS transitions

---

### Task 1: Add videoSrc to Hammok and update card rendering

**Files:**
- Modify: `scripts/renderVisualProjects.js:18-30` (Hammok data)
- Modify: `scripts/renderVisualProjects.js:93-113` (render function)

**Step 1: Add videoSrc to Hammok project data**

In `scripts/renderVisualProjects.js`, update the Hammok entry to include `videoSrc`:

```js
{
    title: 'Hammok - One Minute',
    description: {
      en: 'Music video for Hammok. Filmed on an afternoon in Oslo with no real plan. Fun project where I got to experiment with visuals and editing.',
      no: 'Musikkvideo for Hammok. Filmet på en ettermiddag i Oslo uten noen skikkelig plan. Et morsomt prosjekt hvor jeg fikk eksperimentere med kameravinkler og redigering.',
    },
    role: { en: 'Director, Camera, Editor', no: 'Regissor, kamera, redigering' },
    year: 2024,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Skateboarding'],
    youtubeId: 'SfcEUHwksBU',
    videoSrc: '/videos/hammok-one-minute.mp4',
    type: 'video',
  },
```

**Step 2: Update render logic for inline video cards**

When `videoSrc` exists, render a poster image (from YouTube thumbnail) with a play overlay and a `data-video-src` attribute for the modal to pick up. The YouTube link stays as an icon.

In the `renderVisualItem` function, change the first branch of the `media` ternary:

```js
const media =
    type === 'video' && videoSrc
      ? `<div class="visual-card__video visual-card__video--cinema" data-video-src="${videoSrc}"${youtubeId ? ` data-youtube-id="${youtubeId}"` : ''}>
            <img class="visual-card__poster" src="${youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : ''}" alt="${title}" loading="lazy" />
            <button class="visual-card__play-overlay" aria-label="${t('visual.playVideo')}"><i class="fas fa-play"></i></button>
            ${ytLink}
          </div>`
      : type === 'video' && youtubeId
        // ... rest unchanged
```

**Step 3: Commit**

```bash
git add scripts/renderVisualProjects.js
git commit -m "feat: add videoSrc to Hammok, render cinema-ready poster card"
```

---

### Task 2: Create video modal JS module

**Files:**
- Create: `scripts/videoModal.js`

**Step 1: Create `scripts/videoModal.js`**

```js
import { t } from './i18n.js';

export function setupVideoModal() {
  // Create modal DOM
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal__backdrop"></div>
    <video class="video-modal__video" controls playsinline preload="metadata"></video>
    <button class="video-modal__close" aria-label="${t('lightbox.close')}">&times;</button>
    <a class="video-modal__yt-link" target="_blank" aria-label="${t('visual.watchOnYoutube')}"><i class="fab fa-youtube"></i></a>
  `;
  document.body.appendChild(modal);

  const backdrop = modal.querySelector('.video-modal__backdrop');
  const video = modal.querySelector('.video-modal__video');
  const closeBtn = modal.querySelector('.video-modal__close');
  const ytLink = modal.querySelector('.video-modal__yt-link');

  let sourceRect = null;
  let isOpen = false;
  let isAnimating = false;

  function open(cardEl) {
    if (isOpen || isAnimating) return;
    isAnimating = true;

    const videoSrc = cardEl.dataset.videoSrc;
    const youtubeId = cardEl.dataset.youtubeId;
    const posterEl = cardEl.querySelector('.visual-card__poster');

    // Set sources
    video.src = videoSrc;
    video.currentTime = 0;

    // YouTube link
    if (youtubeId) {
      ytLink.href = `https://www.youtube.com/watch?v=${youtubeId}`;
      ytLink.style.display = '';
    } else {
      ytLink.style.display = 'none';
    }

    // FLIP: capture source position
    sourceRect = posterEl.getBoundingClientRect();

    // Show modal, position video at source
    modal.classList.add('video-modal--open');
    document.body.style.overflow = 'hidden';

    // Set video to source rect initially
    gsap.set(video, {
      position: 'fixed',
      left: sourceRect.left,
      top: sourceRect.top,
      width: sourceRect.width,
      height: sourceRect.height,
      borderRadius: '0.5rem',
      zIndex: 1001,
    });

    // Fade in backdrop
    gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out' });

    // Animate video to center
    const targetWidth = Math.min(window.innerWidth * 0.9, 1200);
    const targetHeight = targetWidth * (9 / 16);
    const clampedHeight = Math.min(targetHeight, window.innerHeight * 0.85);
    const clampedWidth = clampedHeight * (16 / 9);
    const finalW = Math.min(targetWidth, clampedWidth);
    const finalH = finalW * (9 / 16);

    gsap.to(video, {
      left: (window.innerWidth - finalW) / 2,
      top: (window.innerHeight - finalH) / 2,
      width: finalW,
      height: finalH,
      borderRadius: '0.75rem',
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        isAnimating = false;
        isOpen = true;
        video.play().catch(() => {});
      },
    });

    // Fade in close + yt link
    gsap.fromTo(closeBtn, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3 });
    gsap.fromTo(ytLink, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3 });
  }

  function close() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;
    isOpen = false;

    video.pause();

    // Fade out UI
    gsap.to(closeBtn, { opacity: 0, duration: 0.2 });
    gsap.to(ytLink, { opacity: 0, duration: 0.2 });
    gsap.to(backdrop, { opacity: 0, duration: 0.4, ease: 'power2.in' });

    // FLIP back to source rect
    if (sourceRect) {
      gsap.to(video, {
        left: sourceRect.left,
        top: sourceRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
        borderRadius: '0.5rem',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: cleanup,
      });
    } else {
      gsap.to(video, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: cleanup,
      });
    }

    function cleanup() {
      modal.classList.remove('video-modal--open');
      document.body.style.overflow = '';
      video.src = '';
      gsap.set(video, { clearProps: 'all' });
      isAnimating = false;
      sourceRect = null;
    }
  }

  // Event: click on cinema cards (delegated)
  document.querySelector('.project-section')?.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.visual-card__video--cinema .visual-card__play-overlay');
    const poster = e.target.closest('.visual-card__video--cinema .visual-card__poster');
    if (!playBtn && !poster) return;

    e.preventDefault();
    e.stopPropagation();
    const card = e.target.closest('.visual-card__video--cinema');
    if (card) open(card);
  });

  // Close events
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close();
  });
}
```

**Step 2: Commit**

```bash
git add scripts/videoModal.js
git commit -m "feat: video cinema modal with FLIP animation"
```

---

### Task 3: Add CSS for video modal

**Files:**
- Modify: `css/index.css` (add after lightbox styles, around line 2975)

**Step 1: Add video modal styles**

Insert after the `.lightbox__close:hover` rule (line 2974):

```css
/* ---- Video Cinema Modal ---- */
.video-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
  display: none;
}

.video-modal--open {
  display: block;
  pointer-events: auto;
}

.video-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  opacity: 0;
}

.video-modal__video {
  position: fixed;
  border-radius: 0.75rem;
  z-index: 1001;
  background: black;
}

.video-modal__close {
  position: fixed;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--clr-white);
  font-size: 2.5rem;
  cursor: pointer;
  z-index: 1002;
  opacity: 0;
  transition: color 0.2s ease;
}

.video-modal__close:hover {
  color: rgba(255, 255, 255, 0.7);
}

.video-modal__yt-link {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  color: var(--clr-white);
  font-size: 1.6rem;
  z-index: 1002;
  opacity: 0;
  transition: color 0.2s ease;
}

.video-modal__yt-link:hover {
  color: #ff0000;
}
```

**Step 2: Commit**

```bash
git add css/index.css
git commit -m "style: video cinema modal CSS"
```

---

### Task 4: Wire up in index.js

**Files:**
- Modify: `scripts/index.js:6` (add import)
- Modify: `scripts/index.js:38` (add setup call)

**Step 1: Add import**

After the lightbox import (line 6), add:

```js
import { setupVideoModal } from './videoModal.js';
```

**Step 2: Add setup call**

After `setupLightbox();` (line 38), add:

```js
setupVideoModal();
```

**Step 3: Commit**

```bash
git add scripts/index.js
git commit -m "feat: wire up video cinema modal"
```

---

### Task 5: Manual test and polish

**Steps:**
1. Open the portfolio in browser
2. Navigate to Visual filter
3. Click play on Hammok card — verify:
   - Thumbnail FLIP-animates to centered video
   - Video plays with native controls
   - Dark backdrop visible
   - Close button and YouTube link visible
4. Close via X, backdrop click, and Escape — verify FLIP reverses
5. Test on mobile viewport (devtools) — verify it works reasonably
6. Check that other visual cards still work as YouTube embeds
7. Fix any issues found

**Final commit:**

```bash
git add -A
git commit -m "feat: video cinema modal complete"
```
