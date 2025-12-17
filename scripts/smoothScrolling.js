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
  const header = document.querySelector('.red');

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

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > header.offsetHeight * 0) {
        scrollArrow.classList.add('hide');
      } else {
        scrollArrow.classList.remove('hide');
      }
    },
    { passive: true }
  );
};
