export const setupProjectFiltering = () => {
  const filterItems = document.querySelectorAll('.filter-item');
  const filterDropdown = document.querySelector('.filter-dropdown');

  const projectSection = document.querySelector('.project-section');
  const originalOrder = projectSection
    ? Array.from(projectSection.querySelectorAll('.project-section__article'))
    : [];

  const runWithFlipAnimation = (updateDOM) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      updateDOM();
      return;
    }

    const allArticles = Array.from(document.querySelectorAll('.project-section__article'));
    const firstRects = new Map(
      allArticles.map((article) => [article, article.getBoundingClientRect()])
    );

    allArticles.forEach((article) => {
      article.getAnimations().forEach((animation) => animation.cancel());
    });

    updateDOM();

    requestAnimationFrame(() => {
      allArticles.forEach((article) => {
        const first = firstRects.get(article);
        if (!first) return;

        const last = article.getBoundingClientRect();
        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;
        if (deltaX === 0 && deltaY === 0) return;

        article.animate(
          [
            { transform: `translate3d(${deltaX}px, ${deltaY}px, 0)` },
            { transform: 'translate3d(0px, 0px, 0)' },
          ],
          {
            duration: 380,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }
        );
      });
    });
  };

  const filterProjects = (filterValue) => {
    if (!projectSection) return;

    const currentArticles = Array.from(
      projectSection.querySelectorAll('.project-section__article')
    );
    const currentSet = new Set(currentArticles);

    // Base ordering is always the original order (deterministic).
    const orderedBase = originalOrder.filter((el) => currentSet.has(el));
    const baseSet = new Set(orderedBase);
    currentArticles.forEach((el) => {
      if (!baseSet.has(el)) orderedBase.push(el);
    });

    const matches = [];
    const nonMatches = [];

    orderedBase.forEach((article) => {
      const isMatch = article.classList.contains(`project-section__article--${filterValue}`);

      if (isMatch) {
        article.classList.remove('project-section__article--dimmed');
        matches.push(article);
      } else {
        article.classList.add('project-section__article--dimmed');
        nonMatches.push(article);
      }
    });

    [...matches, ...nonMatches].forEach((article) => projectSection.appendChild(article));
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
    btn.addEventListener('click', () => {
      const filterValue = btn.dataset.filter;

      runWithFlipAnimation(() => {
        setActiveFilter(filterValue);
      });
    });
  });

  if (filterDropdown) {
    filterDropdown.addEventListener('change', () => {
      const filterValue = filterDropdown.value;

      runWithFlipAnimation(() => {
        setActiveFilter(filterValue);
      });
    });
  }

  setActiveFilter('web');
};
