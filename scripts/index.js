import { initI18n, onLangChange } from './i18n.js';
import { saveScrollPosition, restoreScrollPosition } from './scrollPosition.js';
import { setupSmoothScrolling, setupScrollArrow } from './smoothScrolling.js';
import { setupProjectFiltering } from './filterProjects.js';
import { renderProjects } from './renderProjects.js';
import { renderMusicProjects } from './renderMusicProjects.js';
import { renderVisualProjects, setupVisualPlayers } from './renderVisualProjects.js';
import { setupMusicPlayer } from './musicPlayer.js';
import { setupLightbox } from './lightbox.js';
import { setupWaveAnimation } from './waveAnimation.js';
import { setupFooterGif, setupHeaderGif } from './footerGif.js';
import { setupPeekingGif } from './peekingGif.js';
import { addTimelineToPage, updateTimelineText } from './timelineData.js';

function renderAllProjects() {
  const projectSection = document.querySelector('.project-section');
  projectSection.innerHTML = renderProjects() + renderVisualProjects() + renderMusicProjects();
  setupVisualPlayers();
}

document.addEventListener('DOMContentLoaded', function () {
  // Initialize i18n first (detects language, updates static DOM)
  initI18n();

  // Render all project types
  renderAllProjects();

  // Build timeline
  addTimelineToPage();

  // Restore vertical scroll position on page load
  restoreScrollPosition();

  // Attach saveScrollPosition function to all project links
  document.querySelectorAll('.project-link').forEach(function (link) {
    link.addEventListener('click', saveScrollPosition);
  });

  // Initialize smooth scrolling
  setupSmoothScrolling();

  // Initialize scroll arrow
  setupScrollArrow();

  setupProjectFiltering();

  // Ensure project section starts at first item on page load
  const projectSection = document.querySelector('.project-section');
  if (projectSection) {
    projectSection.style.scrollSnapType = 'none';
    projectSection.scrollLeft = 0;
    requestAnimationFrame(() => { projectSection.style.scrollSnapType = ''; });
  }

  setupMusicPlayer();
  setupLightbox();

  // Initialize wave animations
  setupWaveAnimation();

  // GIFs flee from cursor
  setupFooterGif();
  setupHeaderGif();
  setupPeekingGif();


  // Re-render JS content on language change
  onLangChange(() => {
    const currentFilter = document.querySelector('.filter-item.active')?.dataset.filter || 'web';
    renderAllProjects();
    updateTimelineText();

    // Re-attach project link handlers
    document.querySelectorAll('.project-link').forEach(function (link) {
      link.addEventListener('click', saveScrollPosition);
    });

    // Re-apply current filter
    document.querySelector(`.filter-item[data-filter="${currentFilter}"]`)?.click();
  });
});
