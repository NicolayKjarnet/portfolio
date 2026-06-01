export function setupToc() {
  const toc = document.getElementById('toc');
  if (!toc) return;

  const links = toc.querySelectorAll('.toc__link[data-section]');
  const sectionMap = new Map();

  links.forEach((link) => {
    const el = document.querySelector(`.${link.dataset.section}`);
    if (el) sectionMap.set(link, el);
  });

  // Show TOC after scrolling past the hero
  const hero = document.querySelector('.section-hero');

  const updateVisibility = () => {
    if (!hero) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    toc.classList.toggle('toc--visible', heroBottom < window.innerHeight * 0.3);
  };

  // Highlight the section currently in view
  const updateActive = () => {
    let current = null;
    const scrollY = window.scrollY + window.innerHeight * 0.35;

    sectionMap.forEach((section, link) => {
      if (section.offsetTop <= scrollY) {
        current = link;
      }
    });

    links.forEach((link) => link.classList.remove('toc__link--active'));
    if (current) current.classList.add('toc__link--active');
  };

  const onScroll = () => {
    updateVisibility();
    updateActive();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
