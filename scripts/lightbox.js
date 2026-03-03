export function setupLightbox() {
  // Create lightbox DOM
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <img class="lightbox__img" src="" alt="" />
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector('.lightbox__img');

  // Open on image click
  document.querySelector('.project-section')?.addEventListener('click', (e) => {
    const imageContainer = e.target.closest('[data-lightbox-src]');
    if (!imageContainer) return;

    img.src = imageContainer.dataset.lightboxSrc;
    img.alt = imageContainer.closest('.project-section__article')?.querySelector('.visual-card__title')?.textContent || '';
    overlay.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
  });

  // Close on click outside image or on close button
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('.lightbox__close')) {
      overlay.classList.remove('lightbox--open');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('lightbox--open')) {
      overlay.classList.remove('lightbox--open');
      document.body.style.overflow = '';
    }
  });
}
