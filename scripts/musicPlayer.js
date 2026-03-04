import { t } from './i18n.js';

/** Music player with inline progress, sticky mini-player, and single-cover swap. */
let currentAudio = null;
let currentTrackEl = null;
let currentBtn = null;
let rafId = null;
let miniPlayer = null;
let autoHideTimer = null;
let seekTooltip = null;
let previewEnd = null; // auto-stop time for preview clips

function parseTime(str) {
  if (!str) return 0;
  const parts = str.split(':').map(Number);
  return parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0];
}

function createMiniPlayer() {
  const el = document.createElement('div');
  el.className = 'mini-player';
  el.innerHTML = `
    <button class="mini-player__prev" aria-label="Previous"><i class="fas fa-step-backward"></i></button>
    <button class="mini-player__btn" data-i18n-aria="miniPlayer.playPause" aria-label="${t('miniPlayer.playPause')}"><i class="fas fa-pause"></i></button>
    <button class="mini-player__next" aria-label="Next"><i class="fas fa-step-forward"></i></button>
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

  el.querySelector('.mini-player__next').addEventListener('click', () => playNext());
  el.querySelector('.mini-player__prev').addEventListener('click', () => playPrev());

  el.querySelector('.mini-player__close').addEventListener('click', () => {
    stopCurrent();
  });

  return el;
}

function createSeekTooltip() {
  const el = document.createElement('div');
  el.className = 'seek-tooltip';
  document.body.appendChild(el);
  return el;
}

function getSeekTime(e, bar) {
  const rect = bar.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const startSec = previewEnd ? previewEnd - 30 : 0;
  const endSec = previewEnd ?? currentAudio?.duration ?? 0;
  return startSec + ratio * (endSec - startSec);
}

function showSeekTooltip(e, bar) {
  if (!seekTooltip || !currentAudio?.duration) return;
  const absTime = getSeekTime(e, bar);
  const startSec = previewEnd ? previewEnd - 30 : 0;
  seekTooltip.textContent = formatTime(absTime - startSec);
  seekTooltip.style.left = `${e.clientX}px`;
  const barRect = bar.getBoundingClientRect();
  seekTooltip.style.top = `${barRect.top - 30}px`;
  seekTooltip.classList.add('seek-tooltip--visible');
}

function hideSeekTooltip() {
  if (seekTooltip) seekTooltip.classList.remove('seek-tooltip--visible');
}

function seekTo(e, bar) {
  if (!currentAudio?.duration) return;
  currentAudio.currentTime = getSeekTime(e, bar);
}

function makeSeekable(bar) {
  bar.addEventListener('mousemove', (e) => showSeekTooltip(e, bar));
  bar.addEventListener('mouseleave', hideSeekTooltip);
  bar.addEventListener('click', (e) => {
    e.stopPropagation();
    seekTo(e, bar);
    hideSeekTooltip();
  });
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function updateProgress() {
  if (!currentAudio) return;

  // Auto-stop at preview end
  if (previewEnd && currentAudio.currentTime >= previewEnd) {
    playNext();
    return;
  }

  const startSec = previewEnd ? previewEnd - 30 : 0;
  const totalDur = previewEnd ? 30 : currentAudio.duration;
  const elapsed = currentAudio.currentTime - startSec;
  const pct = totalDur ? (elapsed / totalDur) * 100 : 0;

  // Inline track progress
  if (currentTrackEl) {
    const fill = currentTrackEl.querySelector('.music-card__track-progress-fill');
    if (fill) fill.style.width = `${pct}%`;
  }

  // Mini player
  if (miniPlayer) {
    miniPlayer.querySelector('.mini-player__progress-fill').style.width = `${pct}%`;
    miniPlayer.querySelector('.mini-player__current').textContent = formatTime(Math.max(0, elapsed));
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

function playNext() {
  if (!currentTrackEl) { stopCurrent(); return; }

  // Find next playable sibling in the same tracklist
  let next = currentTrackEl.nextElementSibling;
  while (next && !next.classList.contains('music-card__track--playable')) {
    next = next.nextElementSibling;
  }

  // If no next track in this list, try first track of next music card
  if (!next) {
    const currentCard = currentTrackEl.closest('.project-section__article--music');
    const nextCard = currentCard?.nextElementSibling?.closest('.project-section__article--music')
      || currentCard?.nextElementSibling;
    if (nextCard?.classList.contains('project-section__article--music')) {
      next = nextCard.querySelector('.music-card__track--playable');
    }
  }

  if (!next) { stopCurrent(); return; }
  startTrack(next);
}

function playPrev() {
  if (!currentTrackEl) return;

  let prev = currentTrackEl.previousElementSibling;
  while (prev && !prev.classList.contains('music-card__track--playable')) {
    prev = prev.previousElementSibling;
  }

  // If no prev track in this list, try last track of previous music card
  if (!prev) {
    const currentCard = currentTrackEl.closest('.project-section__article--music');
    const prevCard = currentCard?.previousElementSibling;
    if (prevCard?.classList.contains('project-section__article--music')) {
      const tracks = prevCard.querySelectorAll('.music-card__track--playable');
      prev = tracks[tracks.length - 1] || null;
    }
  }

  if (!prev) return;
  startTrack(prev);
}

/** Start playing a specific track element. */
function startTrack(trackEl) {
  const btn = trackEl.querySelector('.music-card__track-play');
  const previewUrl = trackEl.dataset.previewUrl;
  if (!btn || !previewUrl) { stopCurrent(); return; }

  // Clean up current without hiding mini player
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  cancelAnimationFrame(rafId);
  if (currentBtn) currentBtn.classList.remove('playing');
  if (currentTrackEl) {
    currentTrackEl.classList.remove('music-card__track--active');
    const fill = currentTrackEl.querySelector('.music-card__track-progress-fill');
    if (fill) fill.style.width = '0%';
  }
  restoreCover();
  restoreCanvas();

  currentAudio = new Audio(previewUrl);
  currentBtn = btn;
  currentTrackEl = trackEl;

  const startSec = parseTime(trackEl.dataset.previewStart);
  previewEnd = startSec ? startSec + 30 : null;

  const card = trackEl.closest('.music-card');
  const titleText = trackEl.querySelector('.music-card__track-title')?.textContent || '';
  const artistText = card?.querySelector('.music-card__artist')?.textContent || '';
  miniPlayer.querySelector('.mini-player__title').textContent = titleText;
  miniPlayer.querySelector('.mini-player__artist').textContent = artistText;

  swapCover(trackEl);
  swapCanvas(trackEl);

  currentAudio.addEventListener('loadedmetadata', () => {
    if (startSec) currentAudio.currentTime = startSec;
    if (miniPlayer) {
      const dur = previewEnd ? 30 : currentAudio.duration;
      miniPlayer.querySelector('.mini-player__duration').textContent = formatTime(dur);
    }
  });
  currentAudio.addEventListener('ended', () => playNext());

  syncPlayingState(true);
  currentAudio.play().catch(() => stopCurrent());
}

function swapCover(trackEl) {
  const singleImg = trackEl?.dataset.singleImg;
  if (!singleImg) return;

  const card = trackEl.closest('.music-card');
  if (!card) return;

  const img = card.querySelector('.music-card__img');
  if (!img) return;

  if (!card.dataset.originalSrc) {
    card.dataset.originalSrc = img.src;
  }
  // Fade out, swap when hidden, fade back in
  img.classList.add('music-card__img--fading');
  setTimeout(() => {
    img.src = singleImg;
    img.onload = () => img.classList.remove('music-card__img--fading');
  }, 300);
}

function restoreCover() {
  document.querySelectorAll('.music-card[data-original-src]').forEach((card) => {
    const img = card.querySelector('.music-card__img');
    if (img && card.dataset.originalSrc) {
      const origSrc = card.dataset.originalSrc;
      delete card.dataset.originalSrc;
      img.classList.add('music-card__img--fading');
      setTimeout(() => {
        img.src = origSrc;
        img.onload = () => img.classList.remove('music-card__img--fading');
      }, 300);
    }
  });
}

export function setupMusicPlayer() {
  miniPlayer = createMiniPlayer();
  seekTooltip = createSeekTooltip();

  // Make mini-player progress seekable
  makeSeekable(miniPlayer.querySelector('.mini-player__progress'));

  // Make all track progress bars seekable
  document.querySelectorAll('.music-card__track-progress').forEach(makeSeekable);

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

    // Preview start/end
    const startSec = parseTime(track?.dataset.previewStart);
    previewEnd = startSec ? startSec + 30 : null;

    // Get track/artist info for mini player
    const titleText = track?.querySelector('.music-card__track-title')?.textContent || card?.querySelector('.music-card__title')?.textContent || '';
    const artistText = card?.querySelector('.music-card__artist')?.textContent || '';

    miniPlayer.querySelector('.mini-player__title').textContent = titleText;
    miniPlayer.querySelector('.mini-player__artist').textContent = artistText;

    // Swap cover/canvas if track has its own
    swapCover(track);
    swapCanvas(track);

    currentAudio.addEventListener('loadedmetadata', () => {
      if (startSec) currentAudio.currentTime = startSec;
      if (miniPlayer) {
        const dur = previewEnd ? 30 : currentAudio.duration;
        miniPlayer.querySelector('.mini-player__duration').textContent = formatTime(dur);
      }
    });

    currentAudio.addEventListener('ended', () => {
      playNext();
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