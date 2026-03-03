export const setupProjectFiltering = () => {
  const filterItems = document.querySelectorAll('.filter-item');
  const filterDropdown = document.querySelector('.filter-dropdown');
  const projectSection = document.querySelector('.project-section');

  const filterProjects = (filterValue) => {
    if (!projectSection) return;

    projectSection.querySelectorAll('.project-section__article').forEach((article) => {
      const isMatch = article.classList.contains(`project-section__article--${filterValue}`);
      article.classList.toggle('project-section__article--dimmed', !isMatch);
    });

    projectSection.scrollTo({ left: 0, behavior: 'instant' });
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
