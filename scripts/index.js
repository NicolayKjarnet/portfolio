import { saveScrollPosition, restoreScrollPosition } from './scrollPosition.js';
import { setupSmoothScrolling, setupScrollArrow } from './smoothScrolling.js';
import { setupProjectFiltering } from './filterProjects.js';
import { renderProjects } from './renderProjects.js';

document.addEventListener('DOMContentLoaded', function () {
  // Render projects first
  const projectSection = document.querySelector('.project-section');
  projectSection.innerHTML = renderProjects();

  // Restore scroll position on page load
  restoreScrollPosition();

  // Attach saveScrollPosition function to all project links
  document.querySelectorAll('.project-link').forEach(function (link) {
    link.addEventListener('click', saveScrollPosition);
  });

  // Initialize smooth scrolling
  setupSmoothScrolling();

  // Initialize scroll arrow
  setupScrollArrow();

  // Initialize project filtering
  setupProjectFiltering();
});
