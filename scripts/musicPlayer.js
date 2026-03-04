import { t } from './i18n.js';

/** Music player with inline progress, sticky mini-player, and single-cover swap. */
let currentAudio = null;
let currentTrackEl = null;
let currentBtn = null;
let rafId = null;
let miniPlayer = null;
let autoHideTimer = null;

function createMiniPlayer() {
  const el = document.createElement('div');
  el.className = 'mini-player';
  el.innerHTML = `
    <button class="mini-player__btn" data-i18n-aria="miniPlayer.playPause" aria-label="${t('miniPlayer.playPause')}"><i class="fas fa-pause"></i></button>
    <div class="mini-player__info">
      <span class="mini-player__title"></span>
      <span class="mini-player__artist"></span>
    </div>
    <div class="mini-player__time">
      <span class="mini-player__current">0:00</span>
      <span class="mini-player__sep">/</span>
      <span class="mini-player__duration">0:00</span>
    </div>
    <div class="mini-player__progress"><div class="mini-player__progress-fill"></div></div>
    <button class="mini-player__close" data-i18n-aria="miniPlayer.closePlayer" aria-label="${t('miniPlayer.closePlayer')}"><i class="fas fa-times"></i></button>
  `;
  document.body.appendChild(el);

  el.querySelector('.mini-player__btn').addEventListener('click', () => {
    if (!currentAudio) return;
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
  });

  el.querySelector('.mini-player__close').addEventListener('click', () => {
    stopCurrent();
  });

  return el;
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function updateProgress() {
  if (!currentAudio) return;

  const pct = currentAudio.duration ? (currentAudio.currentTime / currentAudio.duration) * 100 : 0;

  // Inline track progress
  if (currentTrackEl) {
    const fill = currentTrackEl.querySelector('.music-card__track-progress-fill');
    if (fill) fill.style.width = `${pct}%`;
  }

  // Mini player
  if (miniPlayer) {
    miniPlayer.querySelector('.mini-player__progress-fill').style.width = `${pct}%`;
    miniPlayer.querySelector('.mini-player__current').textContent = formatTime(currentAudio.currentTime);
  }

  rafId = requestAnimationFrame(updateProgress);
}

function syncPlayingState(playing) {
  // Button icon
  if (currentBtn) {
    currentBtn.classList.toggle('playing', playing);
  }

  // Track row highlight
  if (currentTrackEl) {
    currentTrackEl.classList.toggle('music-card__track--active', playing);
  }

  // Mini player
  if (miniPlayer) {
    miniPlayer.classList.toggle('mini-player--visible', true);
    miniPlayer.querySelector('.mini-player__btn i').className = playing ? 'fas fa-pause' : 'fas fa-play';
  }

  // Progress animation
  if (playing) {
    rafId = requestAnimationFrame(updateProgress);
    clearTimeout(autoHideTimer);
  } else {
    cancelAnimationFrame(rafId);
    // Auto-hide mini player 5s after pausing
    clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(() => {
      if (currentAudio?.paused) stopCurrent();
    }, 5000);
  }

  syncCanvasWithPlayback(playing);
}

function stopCurrent() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  cancelAnimationFrame(rafId);
  clearTimeout(autoHideTimer);

  if (currentBtn) currentBtn.classList.remove('playing');
  if (currentTrackEl) {
    currentTrackEl.classList.remove('music-card__track--active');
    const fill = currentTrackEl.querySelector('.music-card__track-progress-fill');
    if (fill) fill.style.width = '0%';
  }

  // Restore original cover and canvas if we swapped them
  restoreCover();
  restoreCanvas();

  if (miniPlayer) {
    miniPlayer.classList.remove('mini-player--visible');
    miniPlayer.querySelector('.mini-player__progress-fill').style.width = '0%';
  }

  currentBtn = null;
  currentTrackEl = null;
}

function swapCover(trackEl) {
  const singleImg = trackEl?.dataset.singleImg;
  if (!singleImg) return;

  const card = trackEl.closest('.music-card');
  if (!card) return;

  const img = card.querySelector('.music-card__img');
  if (!img) return;

  // Store original if not already stored
  if (!card.dataset.originalSrc) {
    card.dataset.originalSrc = img.src;
  }
  img.src = singleImg;
}

function restoreCover() {
  // Find any card with a swapped cover
  document.querySelectorAll('.music-card[data-original-src]').forEach((card) => {
    const img = card.querySelector('.music-card__img');
    if (img && card.dataset.originalSrc) {
      img.src = card.dataset.originalSrc;
      delete card.dataset.originalSrc;
    }
  });
}

export function setupMusicPlayer() {
  miniPlayer = createMiniPlayer();

  document.querySelector('.project-section')?.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.music-card__play');
    const trackRow = e.target.closest('.music-card__track--playable');

    if (e.target.closest('.music-card__link')) return;
    if (!playBtn && !trackRow) return;

    e.preventDefault();
    e.stopPropagation();

    const btn = playBtn || trackRow?.querySelector('.music-card__track-play');
    if (!btn) return;

    const track = btn.closest('.music-card__track');
    const card = btn.closest('.music-card');
    const previewUrl = track?.dataset.previewUrl || card?.dataset.previewUrl;
    if (!previewUrl) return;

    // Toggle same track
    if (currentBtn === btn && currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
        syncPlayingState(true);
      } else {
        currentAudio.pause();
        syncPlayingState(false);
      }
      return;
    }

    // Stop previous
    stopCurrent();

    // Start new
    currentAudio = new Audio(previewUrl);
    currentBtn = btn;
    currentTrackEl = track;

    // Get track/artist info for mini player
    const titleText = track?.querySelector('.music-card__track-title')?.textContent || card?.querySelector('.music-card__title')?.textContent || '';
    const artistText = card?.querySelector('.music-card__artist')?.textContent || '';

    miniPlayer.querySelector('.mini-player__title').textContent = titleText;
    miniPlayer.querySelector('.mini-player__artist').textContent = artistText;

    // Swap cover/canvas if track has its own
    swapCover(track);
    swapCanvas(track);

    currentAudio.addEventListener('loadedmetadata', () => {
      if (miniPlayer) {
        miniPlayer.querySelector('.mini-player__duration').textContent = formatTime(currentAudio.duration);
      }
    });

    currentAudio.addEventListener('ended', () => {
      stopCurrent();
    });

    syncPlayingState(true);
    currentAudio.play().catch(() => stopCurrent());
  });
}

function swapCanvas(trackEl) {
  const canvasVideo = trackEl?.dataset.canvasVideo;
  if (!canvasVideo) return;

  const card = trackEl.closest('.music-card');
  if (!card) return;

  const video = card.querySelector('.music-card__canvas');
  if (!video) return;

  video.src = canvasVideo;
  video.classList.add('music-card__canvas--active');
  video.play().catch(() => {});
}

function restoreCanvas() {
  document.querySelectorAll('.music-card__canvas--active').forEach((video) => {
    video.pause();
    video.currentTime = 0;
    video.removeAttribute('src');
    video.classList.remove('music-card__canvas--active');
  });
}

function syncCanvasWithPlayback(playing) {
  if (!currentTrackEl) return;

  const card = currentTrackEl.closest('.music-card');
  if (!card) return;

  const video = card.querySelector('.music-card__canvas--active');
  if (!video) return;

  if (playing) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
}