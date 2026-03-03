import { saveScrollPosition, restoreScrollPosition } from './scrollPosition.js';
import { setupSmoothScrolling, setupScrollArrow } from './smoothScrolling.js';
import { setupProjectFiltering } from './filterProjects.js';
import { renderProjects } from './renderProjects.js';
import { renderMusicProjects } from './renderMusicProjects.js';
import { renderVisualProjects } from './renderVisualProjects.js';
import { setupMusicPlayer } from './musicPlayer.js';
import { setupLightbox } from './lightbox.js';
import { setupWaveAnimation } from './waveAnimation.js';

document.addEventListener('DOMContentLoaded', function () {
  // Render all project types into the same container
  const projectSection = document.querySelector('.project-section');
  projectSection.innerHTML = renderProjects() + renderVisualProjects() + renderMusicProjects();

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

  // Initialize project filtering (applies 'web' filter by default)
  setupProjectFiltering();

  // Initialize music player
  setupMusicPlayer();

  // Initialize lightbox
  setupLightbox();

  // Initialize wave animations
  setupWaveAnimation();
});
