export const setupSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const element = document.getElementById(href.substring(1));
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    });
  });
};

export const setupScrollArrow = () => {
  const scrollArrow = document.querySelector('#scroll-arrow');
  const header = document.querySelector('.section-hero');

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    const headerOffset = 0;
    const elementPosition = projectsSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  scrollArrow.addEventListener('click', () => {
    scrollToProjects();
    scrollArrow.classList.add('hide');
  });

  scrollArrow.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToProjects();
      scrollArrow.classList.add('hide');
    }
  });

  // Show arrow only when at the very top
  const updateArrow = () => {
    if (window.scrollY === 0) {
      scrollArrow.classList.add('show');
      scrollArrow.classList.remove('hide');
    } else {
      scrollArrow.classList.remove('show');
      scrollArrow.classList.add('hide');
    }
  };

  // Initial check after DOM is ready
  updateArrow();

  window.addEventListener('scroll', updateArrow, { passive: true });
};
