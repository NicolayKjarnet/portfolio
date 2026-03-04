import { createEyes } from './footerGif.js';
import { getTranslations } from './i18n.js';

const isTouch = matchMedia('(pointer: coarse)').matches;
const GIF_SIZE = isTouch ? 60 : 80;
const MIN_INTERVAL = isTouch ? 5000 : 3000;
const MAX_INTERVAL = isTouch ? 10000 : 7000;
const PEEK_HOLD_MIN = 2000;
const PEEK_HOLD_MAX = 4000;
const FLEE_DISTANCE = 150;
const CHATBOT_CHANCE = 0.08;
const CHATBOT_MIN_PEEKS = 4;
const CHATBOT_HOLD = 7000;

/**
 * Generate a random peek position from any screen edge.
 * Sometimes only peeks halfway in for variety.
 */
function randomPosition() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const s = GIF_SIZE;
  const overshoot = s + 10;

  // Only peek from left or right sides
  const edge = Math.random() < 0.5 ? 'right' : 'left';

  const margin = s + 20;
  const randRotation = (Math.random() - 0.5) * 20;

  // ~40% chance to only peek halfway in
  const partial = Math.random() < 0.4;
  const peekDepth = partial ? s * 0.4 : s + 5;

  const ry = margin + Math.random() * (vh - margin * 2);

  if (edge === 'right') {
    return {
      x: vw - peekDepth, y: ry,
      fromX: vw + overshoot, fromY: ry,
      rotation: randRotation,
    };
  } else {
    return {
      x: -s + peekDepth, y: ry,
      fromX: -overshoot, fromY: ry,
      rotation: randRotation,
    };
  }
}

function chatbotPosition() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return {
    x: vw - GIF_SIZE - 24,
    y: vh - GIF_SIZE - 24,
    fromX: vw + GIF_SIZE,
    fromY: vh - GIF_SIZE - 24,
    rotation: 0,
  };
}

export function setupPeekingGif() {
  const wrapper = document.createElement('div');
  wrapper.className = 'peek-gif';

  const face = document.createElement('div');
  face.className = 'gif-face';

  const img = document.createElement('img');
  img.className = 'peek-gif__img';
  img.src = '/images/footer-gif.gif';
  img.alt = '';
  img.draggable = false;
  img.style.width = GIF_SIZE + 'px';
  img.style.height = GIF_SIZE + 'px';

  const bubble = document.createElement('div');
  bubble.className = 'peek-gif__bubble';

  face.appendChild(img);
  wrapper.appendChild(face);
  wrapper.appendChild(bubble);
  document.body.appendChild(wrapper);

  const eyes = createEyes(face, {
    size: '18%',
    top: '35%',
    leftX: '26%',
    rightX: '51%',
  });

  let peekTimer = null;
  let isPeeking = false;
  let currentTl = null;
  let mouseX = 0;
  let mouseY = 0;
  let gifVisible = false;
  let lastMsgIdx = -1;
  let hasShownMessage = false;
  let isChatbotMode = false;
  let hasRevealedPrank = false;
  let peekCount = 0;
  let revealTimer = null;

  // Watch footer/header GIF containers — don't peek when they're visible
  const gifEls = document.querySelectorAll('.footer__img-container, .header__cutout-wrap');
  if (gifEls.length) {
    const obs = new IntersectionObserver((entries) => {
      gifVisible = entries.some((e) => e.isIntersecting);
    }, { threshold: 0 });
    gifEls.forEach((el) => obs.observe(el));
  }

  function isGameActive() {
    return document.body.classList.contains('gif-game-playing');
  }

  function randomInterval() {
    return MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
  }

  function randomHold() {
    return PEEK_HOLD_MIN + Math.random() * (PEEK_HOLD_MAX - PEEK_HOLD_MIN);
  }

  function clampBubble() {
    requestAnimationFrame(() => {
      const r = bubble.getBoundingClientRect();
      let shiftX = 0;
      if (r.left < 4) {
        shiftX = 4 - r.left;
      } else if (r.right > window.innerWidth - 4) {
        shiftX = (window.innerWidth - 4) - r.right;
      }
      if (shiftX !== 0) {
        bubble.style.transform = `translateX(calc(-50% + ${shiftX}px))`;
      }
      if (r.top < 4) {
        bubble.style.bottom = '';
        bubble.style.top = '105%';
      }
    });
  }

  function showBubble(text) {
    bubble.textContent = text;
    bubble.style.left = '50%';
    bubble.style.transform = 'translateX(-50%)';
    bubble.style.bottom = '105%';
    bubble.style.top = '';
    bubble.classList.add('peek-gif__bubble--visible');
    clampBubble();
  }

  function showMessage() {
    if (hasShownMessage) return;
    hasShownMessage = true;
    const msgs = getTranslations().peek?.messages ?? [];
    if (!msgs.length) return;
    let idx;
    do { idx = Math.floor(Math.random() * msgs.length); } while (idx === lastMsgIdx && msgs.length > 1);
    lastMsgIdx = idx;
    showBubble(msgs[idx]);
  }

  function hideMessage() {
    bubble.classList.remove('peek-gif__bubble--visible', 'peek-gif__bubble--chatbot', 'peek-gif__bubble--reveal');
    wrapper.classList.remove('peek-gif--chatbot');
  }

  function showChatbotLure() {
    const lures = getTranslations().peek?.chatbotLure ?? [];
    if (!lures.length) return;
    const text = lures[Math.floor(Math.random() * lures.length)];
    bubble.textContent = text;
    bubble.style.left = '50%';
    bubble.style.transform = 'translateX(-50%)';
    bubble.style.bottom = '105%';
    bubble.style.top = '';
    bubble.classList.add('peek-gif__bubble--chatbot', 'peek-gif__bubble--visible');
    wrapper.classList.add('peek-gif--chatbot');
    clampBubble();
  }

  function revealChatbotPrank() {
    if (!isChatbotMode || hasRevealedPrank) return;
    hasRevealedPrank = true;

    // Kill the current timeline so it doesn't auto-exit
    if (currentTl) currentTl.kill();

    const reveal = getTranslations().peek?.chatbotReveal ?? 'Gotcha!';
    bubble.classList.remove('peek-gif__bubble--chatbot');
    bubble.classList.add('peek-gif__bubble--reveal');
    bubble.textContent = reveal;
    clampBubble();

    // Let user read, then flee
    clearTimeout(revealTimer);
    revealTimer = setTimeout(() => {
      isPeeking = true; // re-enable so flee() works
      flee();
    }, 2500);
  }

  function flee() {
    if (!isPeeking) return;
    if (currentTl) currentTl.kill();
    isPeeking = false;
    isChatbotMode = false;
    eyes.stopIdle();
    hideMessage();

    gsap.to(wrapper, {
      x: gsap.getProperty(wrapper, 'x') + (gsap.getProperty(wrapper, 'x') > window.innerWidth / 2 ? 120 : -120),
      y: gsap.getProperty(wrapper, 'y') + (gsap.getProperty(wrapper, 'y') > window.innerHeight / 2 ? 120 : -120),
      opacity: 0,
      duration: 0.25,
      ease: 'power3.in',
      onComplete: () => schedulePeek(),
    });
  }

  function peek() {
    if (isGameActive() || gifVisible || document.visibilityState !== 'visible') {
      schedulePeek();
      return;
    }

    peekCount++;

    // Rare chatbot prank — only after enough normal peeks
    isChatbotMode = peekCount > CHATBOT_MIN_PEEKS && Math.random() < CHATBOT_CHANCE;
    hasRevealedPrank = false;

    const pos = isChatbotMode ? chatbotPosition() : randomPosition();
    isPeeking = true;
    hasShownMessage = false;
    hideMessage();

    const tl = gsap.timeline({
      onComplete: () => {
        isPeeking = false;
        isChatbotMode = false;
        eyes.stopIdle();
        hideMessage();
        schedulePeek();
      },
    });
    currentTl = tl;

    tl.set(wrapper, {
      x: pos.fromX,
      y: pos.fromY,
      rotation: 0,
      opacity: 1,
    });

    tl.to(wrapper, {
      x: pos.x,
      y: pos.y,
      rotation: pos.rotation,
      duration: isChatbotMode ? 0.5 : 0.6,
      ease: 'power2.out',
      onStart: () => {
        if (isTouch) eyes.startIdle();
      },
      onComplete: () => {
        if (isChatbotMode) showChatbotLure();
      },
    });

    const hold = isChatbotMode ? CHATBOT_HOLD / 1000 : randomHold() / 1000;
    tl.to({}, { duration: hold });

    tl.to(wrapper, {
      x: pos.fromX,
      y: pos.fromY,
      rotation: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onStart: () => { eyes.stopIdle(); hideMessage(); },
    });
  }

  function schedulePeek() {
    clearTimeout(peekTimer);
    peekTimer = setTimeout(peek, randomInterval());
  }

  // Click: reveal chatbot prank (works on both touch and mouse)
  wrapper.addEventListener('click', () => {
    if (isChatbotMode && isPeeking) {
      revealChatbotPrank();
    }
  });

  // Mouse: track eyes + flee if too close
  if (!isTouch) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isPeeking) return;

      // Track eyes toward mouse
      eyes.track(mouseX, mouseY);

      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((mouseX - cx) ** 2 + (mouseY - cy) ** 2);

      if (isChatbotMode) {
        if (dist < FLEE_DISTANCE) {
          revealChatbotPrank();
        }
      } else {
        if (dist < FLEE_DISTANCE * 2) {
          showMessage();
        }
        if (dist < FLEE_DISTANCE) {
          flee();
        }
      }
    });
  }

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      clearTimeout(peekTimer);
      clearTimeout(revealTimer);
      if (isPeeking && currentTl) {
        currentTl.kill();
        isPeeking = false;
        isChatbotMode = false;
        eyes.stopIdle();
        hideMessage();
        gsap.set(wrapper, { opacity: 0 });
      }
    } else {
      if (!isPeeking) schedulePeek();
    }
  });

  schedulePeek();
}
