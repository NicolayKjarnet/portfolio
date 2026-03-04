import { getTranslations } from './i18n.js';

/**
 * Generic "flee from cursor" behaviour for an element.
 * Uses requestAnimationFrame for smooth, throttled updates.
 */
function makeFlee(el, img, opts = {}) {
  const MAX_PUSH = opts.maxPush ?? 80;
  const INFLUENCE = opts.influence ?? 250;
  const EASE = opts.ease ?? 0.15;
  const getMessages = typeof opts.messages === 'function' ? opts.messages : () => (opts.messages ?? []);
  const getHitMessages = typeof opts.hitMessages === 'function' ? opts.hitMessages : () => (opts.hitMessages ?? []);
  const caption = opts.captionEl ?? null;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let running = false;
  let lastMsgIdx = -1;
  let lastHitIdx = -1;
  let msgTimer = null;
  let isClose = false;
  let hitCooldown = false;
  let mouseX = 0;
  let mouseY = 0;
  let needsUpdate = false;

  function pick(arr, lastIdx) {
    if (!arr.length) return { text: '', index: -1 };
    let i;
    do { i = Math.floor(Math.random() * arr.length); } while (i === lastIdx && arr.length > 1);
    return { text: arr[i], index: i };
  }

  function showCaption(text) {
    if (!caption) return;
    clearTimeout(msgTimer);
    caption.textContent = text;
    caption.classList.add('footer__caption--visible');
    msgTimer = setTimeout(() => caption.classList.remove('footer__caption--visible'), 1500);
  }

  function triggerHit() {
    if (hitCooldown || !img) return;
    hitCooldown = true;
    img.classList.add('flee-gif--hit');
    if (getHitMessages().length) {
      const { text, index } = pick(getHitMessages(), lastHitIdx);
      lastHitIdx = index;
      showCaption(text);
    }
    setTimeout(() => { img.classList.remove('flee-gif--hit'); hitCooldown = false; }, 500);
  }

  function tick() {
    // Process pending mouse position
    if (needsUpdate) {
      needsUpdate = false;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - mouseX;
      const dy = cy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Hit detection on the image
      if (img) {
        const ir = img.getBoundingClientRect();
        if (mouseX >= ir.left && mouseX <= ir.right && mouseY >= ir.top && mouseY <= ir.bottom) {
          triggerHit();
        }
      }

      if (dist < INFLUENCE) {
        const strength = 1 - dist / INFLUENCE;
        const angle = Math.atan2(dy, dx);
        targetX = Math.cos(angle) * MAX_PUSH * strength;
        targetY = Math.sin(angle) * MAX_PUSH * strength;
        if (!isClose && dist < INFLUENCE * 0.5) {
          isClose = true;
          if (!hitCooldown && getMessages().length) {
            const { text, index } = pick(getMessages(), lastMsgIdx);
            lastMsgIdx = index;
            showCaption(text);
          }
        }
      } else {
        targetX = 0;
        targetY = 0;
        if (isClose) isClose = false;
      }
    }

    // Lerp toward target
    currentX += (targetX - currentX) * EASE;
    currentY += (targetY - currentY) * EASE;

    // Snap when close enough
    if (Math.abs(currentX - targetX) < 0.3 && Math.abs(currentY - targetY) < 0.3) {
      currentX = targetX;
      currentY = targetY;
    }

    el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    // Keep running while moving or while there's a pending update
    if (currentX !== 0 || currentY !== 0 || targetX !== 0 || targetY !== 0 || needsUpdate) {
      requestAnimationFrame(tick);
    } else {
      running = false;
    }
  }

  function ensureRunning() {
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    needsUpdate = true;
    ensureRunning();
  });

  document.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    isClose = false;
    ensureRunning();
  });
}

export function setupFooterGif() {
  const container = document.querySelector('.footer__img-container');
  if (!container) return;
  makeFlee(container, container.querySelector('.footer__img'), {
    maxPush: 80,
    influence: 250,
    ease: 0.15,
    messages: () => getTranslations().footer.approachMessages,
    hitMessages: () => getTranslations().footer.hitMessages,
    captionEl: container.querySelector('.footer__caption'),
  });
}

export function setupHeaderGif() {
  const wrap = document.querySelector('.header__cutout-wrap');
  if (!wrap) return;
  makeFlee(wrap, wrap.querySelector('.header__cutout'), {
    maxPush: 40,
    influence: 180,
    ease: 0.1,
    messages: () => getTranslations().footer.approachMessages,
    hitMessages: () => getTranslations().footer.hitMessages,
    captionEl: wrap.querySelector('.header__cutout-caption'),
  });
}
