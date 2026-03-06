import { initI18n, onLangChange } from './i18n.js';
import { saveScrollPosition, restoreScrollPosition } from './scrollPosition.js';
import { setupSmoothScrolling, setupScrollArrow } from './smoothScrolling.js';
import { setupProjectFiltering } from './filterProjects.js';
import { setupMusicPlayer } from './musicPlayer.js';
import { setupLightbox } from './lightbox.js';
import { setupVideoModal } from './videoModal.js';
import { setupWaveAnimation } from './waveAnimation.js';
import { setupFooterGif, setupHeaderGif } from './footerGif.js';
import { setupPeekingGif } from './peekingGif.js';
import { addTimelineToPage, updateTimelineText } from './timelineData.js';

document.addEventListener('DOMContentLoaded', function () {
  // Initialize i18n first (detects language, updates static DOM)
  initI18n();

  // Build timeline
  addTimelineToPage();

  // Restore vertical scroll position on page load
  restoreScrollPosition();

  // Initialize smooth scrolling
  setupSmoothScrolling();

  // Initialize scroll arrow
  setupScrollArrow();

  // Filter setup renders the initial project set (web by default)
  setupProjectFiltering();

  // Attach saveScrollPosition to project links (delegated)
  document.querySelector('.project-section')?.addEventListener('click', (e) => {
    const link = e.target.closest('.project-link');
    if (link) saveScrollPosition();
  });

  setupMusicPlayer();
  setupLightbox();
  setupVideoModal();

  // Initialize wave animations
  setupWaveAnimation();

  // GIFs flee from cursor
  setupFooterGif();
  setupHeaderGif();
  setupPeekingGif();

  // Re-render JS content on language change
  onLangChange(() => {
    const currentFilter = document.querySelector('.filter-item.active')?.dataset.filter || 'web';
    updateTimelineText();

    // Re-apply current filter (re-renders project cards)
    document.querySelector(`.filter-item[data-filter="${currentFilter}"]`)?.click();
  });
});
