import { createEyes } from './footerGif.js';
import { getTranslations } from './i18n.js';

const isTouch = matchMedia('(pointer: coarse)').matches;
const GIF_SIZE = isTouch ? 60 : 80;
const MIN_INTERVAL = isTouch ? 18000 : 10000;
const MAX_INTERVAL = isTouch ? 30000 : 18000;
const PEEK_HOLD_MIN = 2000;
const PEEK_HOLD_MAX = 4000;
const FLEE_DISTANCE = 150;
let lastEdge = Math.random() < 0.5 ? 'right' : 'left';

/**
 * Generate a random peek position from any screen edge.
 * Sometimes only peeks halfway in for variety.
 */
function randomPosition() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const s = GIF_SIZE;
  const overshoot = s + 10;

  // Alternate sides each peek
  lastEdge = lastEdge === 'right' ? 'left' : 'right';
  const edge = lastEdge;

  const margin = s + 20;
  const randRotation = (Math.random() - 0.5) * 20;

  // On mobile: always partial peek so GIF stays at screen edge
  const partial = isTouch ? true : Math.random() < 0.4;
  const peekDepth = partial ? s * 0.7 : s + 5;

  const ry = margin + Math.random() * (vh - margin * 2);

  if (edge === 'right') {
    return {
      x: vw - peekDepth, y: ry,
      fromX: vw + overshoot, fromY: ry,
      rotation: randRotation,
      flipX: false,
    };
  } else {
    return {
      x: -s + peekDepth, y: ry,
      fromX: -overshoot, fromY: ry,
      rotation: randRotation,
      flipX: true,
    };
  }
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
  let peekCount = 0;

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

  function isFauxBotVisible() {
    return document.body.hasAttribute('data-faux-bot');
  }

  function isFauxBotDone() {
    return document.body.hasAttribute('data-faux-bot-done');
  }

  function randomInterval() {
    return MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
  }

  function randomHold() {
    return PEEK_HOLD_MIN + Math.random() * (PEEK_HOLD_MAX - PEEK_HOLD_MIN);
  }

  function flipSuffix() {
    return wrapper.classList.contains('peek-gif--flipped') ? ' scaleX(-1)' : '';
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
        // When flipped, invert the shift direction
        const dir = wrapper.classList.contains('peek-gif--flipped') ? -1 : 1;
        bubble.style.transform = `translateX(calc(-50% + ${shiftX * dir}px))${flipSuffix()}`;
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
    bubble.style.transform = `translateX(-50%)${flipSuffix()}`;
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
    bubble.classList.remove('peek-gif__bubble--visible');
  }

  function flee() {
    if (!isPeeking) return;
    if (currentTl) currentTl.kill();
    isPeeking = false;
    document.body.removeAttribute('data-peeking');
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
    // No peeking until the faux-bot has had its moment
    if (!isFauxBotDone() || isGameActive() || gifVisible || isFauxBotVisible() || document.visibilityState !== 'visible') {
      schedulePeek();
      return;
    }

    peekCount++;

    const pos = randomPosition();
    isPeeking = true;
    hasShownMessage = false;
    document.body.setAttribute('data-peeking', '');
    hideMessage();

    const tl = gsap.timeline({
      onComplete: () => {
        isPeeking = false;
        document.body.removeAttribute('data-peeking');
        eyes.stopIdle();
        hideMessage();
        schedulePeek();
      },
    });
    currentTl = tl;

    wrapper.classList.toggle('peek-gif--flipped', !!pos.flipX);

    tl.set(wrapper, {
      x: pos.fromX,
      y: pos.fromY,
      rotation: 0,
      scaleX: pos.flipX ? -1 : 1,
      opacity: 1,
    });

    tl.to(wrapper, {
      x: pos.x,
      y: pos.y,
      rotation: pos.rotation,
      duration: 0.6,
      ease: 'power2.out',
      onStart: () => {
        if (isTouch) eyes.startIdle();
      },
    });

    // Delay before showing speech bubble — longer for early peeks
    const msgDelay = peekCount <= 2 ? 2 : 0.6;
    tl.to({}, { duration: msgDelay, onComplete: showMessage });

    const hold = randomHold() / 1000;
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

      if (dist < FLEE_DISTANCE * 3) {
        showMessage();
      }
      if (dist < FLEE_DISTANCE) {
        flee();
      }
    });
  }

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      clearTimeout(peekTimer);
      if (isPeeking && currentTl) {
        currentTl.kill();
        isPeeking = false;
        document.body.removeAttribute('data-peeking');
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
