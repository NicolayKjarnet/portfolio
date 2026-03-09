import { t } from './i18n.js';
import { stopMusicPlayer } from './musicPlayer.js';

export function setupVideoModal() {
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal__backdrop"></div>
    <div class="video-modal__wrap">
      <video class="video-modal__video" controls playsinline preload="metadata"></video>
    </div>
    <button class="video-modal__close" aria-label="${t('lightbox.close')}">&times;</button>
    <button class="video-modal__prev" aria-label="Previous">&#8249;</button>
    <button class="video-modal__next" aria-label="Next">&#8250;</button>
    <a class="video-modal__yt-link" target="_blank" aria-label="${t('visual.watchOnYoutube')}"><i class="fab fa-youtube"></i></a>
  `;
  document.body.appendChild(modal);

  const backdrop = modal.querySelector('.video-modal__backdrop');
  const wrap = modal.querySelector('.video-modal__wrap');
  const video = modal.querySelector('.video-modal__video');
  const closeBtn = modal.querySelector('.video-modal__close');
  const prevBtn = modal.querySelector('.video-modal__prev');
  const nextBtn = modal.querySelector('.video-modal__next');
  const ytLink = modal.querySelector('.video-modal__yt-link');

  let sourceRect = null;
  let isOpen = false;
  let isAnimating = false;
  let cinemaCards = [];
  let currentIndex = -1;

  function getCinemaCards() {
    return [...document.querySelectorAll('.visual-card__video--cinema')];
  }

  function updateArrows() {
    prevBtn.style.display = currentIndex > 0 ? '' : 'none';
    nextBtn.style.display = currentIndex < cinemaCards.length - 1 ? '' : 'none';
  }

  let videoAspect = 16 / 9; // default until metadata loads
  const isMobile = window.innerWidth < 769;

  function positionArrowsMobile() {
    if (!isMobile) return;
    const target = computeTarget();
    const arrowTop = target.y + target.h + 12; // 12px below video
    prevBtn.style.top = `${arrowTop}px`;
    nextBtn.style.top = `${arrowTop}px`;
  }

  function computeTarget() {
    const maxW = Math.min(window.innerWidth * 0.92, 1400);
    const maxH = window.innerHeight * 0.88;
    let w = maxW;
    let h = w / videoAspect;
    if (h > maxH) {
      h = maxH;
      w = h * videoAspect;
    }
    return {
      w, h,
      x: (window.innerWidth - w) / 2,
      y: (window.innerHeight - h) / 2,
    };
  }

  video.addEventListener('loadedmetadata', () => {
    if (video.videoWidth && video.videoHeight) {
      videoAspect = video.videoWidth / video.videoHeight;
      if (!modal.classList.contains('video-modal--open')) return;
      const target = computeTarget();
      gsap.to(wrap, {
        left: target.x,
        top: target.y,
        width: target.w,
        height: target.h,
        borderRadius: '1rem',
        duration: 0.4,
        ease: 'power2.inOut',
      });
      positionArrowsMobile();
    }
  });

  function loadCard(cardEl) {
    const videoSrc = cardEl.dataset.videoSrc;
    const youtubeId = cardEl.dataset.youtubeId;

    videoAspect = 16 / 9; // reset until metadata arrives
    video.src = videoSrc;
    video.currentTime = 0;

    if (youtubeId) {
      ytLink.href = `https://www.youtube.com/watch?v=${youtubeId}`;
      ytLink.style.display = '';
    } else {
      ytLink.style.display = 'none';
    }

    // Update sourceRect for close animation
    const posterEl = cardEl.querySelector('.visual-card__poster');
    if (posterEl) sourceRect = posterEl.getBoundingClientRect();

    updateArrows();
  }

  function switchTo(index, direction) {
    if (isAnimating || index < 0 || index >= cinemaCards.length) return;
    isAnimating = true;
    currentIndex = index;

    video.pause();

    const target = computeTarget();
    const slideX = direction === 'next' ? 60 : -60;

    // Slide out current
    gsap.to(wrap, {
      x: -slideX,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        loadCard(cinemaCards[currentIndex]);

        // Position for slide in
        gsap.set(wrap, { x: slideX, opacity: 0 });
        gsap.to(wrap, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            isAnimating = false;
            video.play().catch(() => {});
          },
        });
      },
    });
  }

  function open(cardEl) {
    if (isOpen || isAnimating) return;
    isAnimating = true;
    stopMusicPlayer();

    cinemaCards = getCinemaCards();
    currentIndex = cinemaCards.indexOf(cardEl);

    const posterEl = cardEl.querySelector('.visual-card__poster');
    sourceRect = posterEl.getBoundingClientRect();
    const target = computeTarget();

    modal.classList.add('video-modal--open');
    document.body.style.overflow = 'hidden';

    loadCard(cardEl);
    positionArrowsMobile();

    // Position wrap at source
    gsap.set(wrap, {
      left: sourceRect.left,
      top: sourceRect.top,
      width: sourceRect.width,
      height: sourceRect.height,
      borderRadius: '0.5rem',
      x: 0,
      opacity: 1,
    });

    // Fade backdrop
    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });

    // FLIP to center
    gsap.to(wrap, {
      left: target.x,
      top: target.y,
      width: target.w,
      height: target.h,
      borderRadius: '1rem',
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
    gsap.fromTo(prevBtn, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3 });
    gsap.fromTo(nextBtn, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3 });
    gsap.fromTo(ytLink, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3 });
  }

  function close() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;
    isOpen = false;

    video.pause();

    gsap.to(closeBtn, { opacity: 0, duration: 0.2 });
    gsap.to(prevBtn, { opacity: 0, duration: 0.2 });
    gsap.to(nextBtn, { opacity: 0, duration: 0.2 });
    gsap.to(ytLink, { opacity: 0, duration: 0.2 });
    gsap.to(backdrop, { opacity: 0, duration: 0.4, ease: 'power2.in' });

    if (sourceRect) {
      gsap.to(wrap, {
        left: sourceRect.left,
        top: sourceRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
        borderRadius: '0.5rem',
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: cleanup,
      });
    } else {
      gsap.to(wrap, { opacity: 0, scale: 0.9, duration: 0.3, onComplete: cleanup });
    }

    function cleanup() {
      modal.classList.remove('video-modal--open');
      document.body.style.overflow = '';
      video.src = '';
      gsap.set(wrap, { clearProps: 'all' });
      isAnimating = false;
      sourceRect = null;
      currentIndex = -1;
    }
  }

  // Nav
  prevBtn.addEventListener('click', () => switchTo(currentIndex - 1, 'prev'));
  nextBtn.addEventListener('click', () => switchTo(currentIndex + 1, 'next'));

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
    if (!isOpen) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') switchTo(currentIndex - 1, 'prev');
    if (e.key === 'ArrowRight') switchTo(currentIndex + 1, 'next');
  });
}
