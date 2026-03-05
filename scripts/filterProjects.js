import { renderProjects } from './renderProjects.js';
import { renderVisualProjects, setupVisualPlayers } from './renderVisualProjects.js';
import { renderMusicProjects } from './renderMusicProjects.js';

const renderers = {
  web: () => renderProjects(),
  visual: () => { const html = renderVisualProjects(); return html; },
  music: () => renderMusicProjects(),
};

export const setupProjectFiltering = () => {
  const filterItems = document.querySelectorAll('.filter-item');
  const filterDropdown = document.querySelector('.filter-dropdown');
  const projectSection = document.querySelector('.project-section');
  const darkSection = projectSection?.closest('.dark');

  // Bracket symbols per filter category
  const bracketSymbols = {
    web:    ['{', '}'],
    visual: ['◆', '◆'],
    music:  ['♪', '♪'],
  };

  const titleSection = document.querySelector('.projects__title-section');
  const bracket1 = titleSection?.querySelector('.title-element-1');
  const bracket2 = titleSection?.querySelector('.title-element-3');

  const filterProjects = (filterValue) => {
    if (!projectSection) return;

    // Re-render only the matching category's cards
    const render = renderers[filterValue];
    if (render) {
      projectSection.innerHTML = render();
      if (filterValue === 'visual') setupVisualPlayers();
    }

    // Shift section vibe based on active filter
    if (darkSection) {
      darkSection.classList.remove('dark--music', 'dark--visual');
      if (filterValue === 'music') darkSection.classList.add('dark--music');
      if (filterValue === 'visual') darkSection.classList.add('dark--visual');
    }

    // Update bracket symbols
    const symbols = bracketSymbols[filterValue] || bracketSymbols.web;
    if (bracket1) bracket1.textContent = symbols[0];
    if (bracket2) bracket2.textContent = symbols[1];

    // Animate visible cards with a stagger reveal
    const visible = projectSection.querySelectorAll('.project-section__article');
    if (typeof gsap !== 'undefined') {
      gsap.from(visible, {
        opacity: 0, y: 20, duration: 0.4, stagger: 0.06, ease: "power2.out",
        clearProps: "opacity,y"
      });
    }
  };

  const setActiveFilter = (filterValue) => {
    filterItems.forEach((btn) => {
      const isActive = btn.dataset.filter === filterValue;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    if (filterDropdown) {
      filterDropdown.value = filterValue;
    }

    filterProjects(filterValue);
  };

  filterItems.forEach((btn) => {
    btn.addEventListener('click', () => setActiveFilter(btn.dataset.filter));
  });

  if (filterDropdown) {
    filterDropdown.addEventListener('change', () => setActiveFilter(filterDropdown.value));
  }

  setActiveFilter('web');
};
