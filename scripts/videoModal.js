import { t } from './i18n.js';

export function setupVideoModal() {
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal__backdrop"></div>
    <video class="video-modal__video" controls playsinline preload="metadata"></video>
    <button class="video-modal__close" aria-label="${t('lightbox.close')}">&times;</button>
    <a class="video-modal__yt-link" target="_blank" aria-label="${t('visual.watchOnYoutube')}"><i class="fab fa-youtube"></i></a>
  `;
  document.body.appendChild(modal);

  const backdrop = modal.querySelector('.video-modal__backdrop');
  const video = modal.querySelector('.video-modal__video');
  const closeBtn = modal.querySelector('.video-modal__close');
  const ytLink = modal.querySelector('.video-modal__yt-link');

  let sourceRect = null;
  let isOpen = false;
  let isAnimating = false;

  function computeTarget() {
    const maxW = Math.min(window.innerWidth * 0.9, 1200);
    const maxH = window.innerHeight * 0.85;
    let w = maxW;
    let h = w * (9 / 16);
    if (h > maxH) {
      h = maxH;
      w = h * (16 / 9);
    }
    return {
      w, h,
      x: (window.innerWidth - w) / 2,
      y: (window.innerHeight - h) / 2,
    };
  }

  function open(cardEl) {
    if (isOpen || isAnimating) return;
    isAnimating = true;

    const videoSrc = cardEl.dataset.videoSrc;
    const youtubeId = cardEl.dataset.youtubeId;
    const posterEl = cardEl.querySelector('.visual-card__poster');

    video.src = videoSrc;
    video.currentTime = 0;

    if (youtubeId) {
      ytLink.href = `https://www.youtube.com/watch?v=${youtubeId}`;
      ytLink.style.display = '';
    } else {
      ytLink.style.display = 'none';
    }

    // FLIP: capture source
    sourceRect = posterEl.getBoundingClientRect();
    const target = computeTarget();

    modal.classList.add('video-modal--open');
    document.body.style.overflow = 'hidden';

    // Position at source
    gsap.set(video, {
      left: sourceRect.left,
      top: sourceRect.top,
      width: sourceRect.width,
      height: sourceRect.height,
      borderRadius: '0.5rem',
    });

    // Fade backdrop
    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });

    // FLIP to center
    gsap.to(video, {
      left: target.x,
      top: target.y,
      width: target.w,
      height: target.h,
      borderRadius: '0.75rem',
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        isAnimating = false;
        isOpen = true;
        video.play().catch(() => {});
      },
    });

    // Fade in UI
    gsap.fromTo(closeBtn, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3 });
    gsap.fromTo(ytLink, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3 });
  }

  function close() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;
    isOpen = false;

    video.pause();

    gsap.to(closeBtn, { opacity: 0, duration: 0.2 });
    gsap.to(ytLink, { opacity: 0, duration: 0.2 });
    gsap.to(backdrop, { opacity: 0, duration: 0.4, ease: 'power2.in' });

    if (sourceRect) {
      gsap.to(video, {
        left: sourceRect.left,
        top: sourceRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
        borderRadius: '0.5rem',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: cleanup,
      });
    } else {
      gsap.to(video, { opacity: 0, scale: 0.9, duration: 0.3, onComplete: cleanup });
    }

    function cleanup() {
      modal.classList.remove('video-modal--open');
      document.body.style.overflow = '';
      video.src = '';
      gsap.set(video, { clearProps: 'all' });
      isAnimating = false;
      sourceRect = null;
    }
  }

  // Delegated click on cinema cards
  document.querySelector('.project-section')?.addEventListener('click', (e) => {
    const trigger = e.target.closest('.visual-card__video--cinema .visual-card__play-overlay')
      || e.target.closest('.visual-card__video--cinema .visual-card__poster');
    if (!trigger) return;

    e.preventDefault();
    e.stopPropagation();
    const card = e.target.closest('.visual-card__video--cinema');
    if (card) open(card);
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close();
  });
}
