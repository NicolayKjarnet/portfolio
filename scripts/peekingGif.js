import { createEyes } from './footerGif.js';
import { getTranslations } from './i18n.js';

const isTouch = matchMedia('(pointer: coarse)').matches;
const GIF_SIZE = isTouch ? 60 : 80;
const MIN_INTERVAL = isTouch ? 10000 : 5000;
const MAX_INTERVAL = isTouch ? 15000 : 8000;
const PEEK_HOLD_MIN = 2000;
const PEEK_HOLD_MAX = 4000;
const FLEE_DISTANCE = 150;
let lastEdge = Math.random() < 0.5 ? 'right' : 'left';
const CHATBOT_PEEK_NUMBER = 1 + Math.floor(Math.random() * 3);
const CHATBOT_RETRY_INTERVAL = 2 + Math.floor(Math.random() * 2);
const CHATBOT_HOLD = 18000;

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

  const chatbotBg = document.createElement('div');
  chatbotBg.className = 'peek-gif__chatbot-bg';

  face.appendChild(img);
  wrapper.appendChild(face);
  wrapper.appendChild(bubble);
  document.body.appendChild(chatbotBg);
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
  let hasShownChatbot = false;

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
    bubble.classList.remove('peek-gif__bubble--visible', 'peek-gif__bubble--chatbot', 'peek-gif__bubble--reveal');
    wrapper.classList.remove('peek-gif--chatbot');
    chatbotBg.classList.remove('peek-gif__chatbot-bg--visible');
  }

  function showChatbotLure() {
    const lures = getTranslations().peek?.chatbotLure ?? [];
    if (!lures.length) return;
    const text = lures[Math.floor(Math.random() * lures.length)];
    bubble.textContent = text;
    bubble.style.left = '50%';
    bubble.style.transform = `translateX(-50%)${flipSuffix()}`;
    bubble.style.bottom = '105%';
    bubble.style.top = '';
    bubble.classList.add('peek-gif__bubble--chatbot', 'peek-gif__bubble--visible');
    wrapper.classList.add('peek-gif--chatbot');
    chatbotBg.classList.add('peek-gif__chatbot-bg--visible');
    clampBubble();
  }

  // -- Chatbot reveal window --
  const chatWindow = document.createElement('div');
  chatWindow.className = 'chatbot-reveal';
  const peekT = getTranslations().peek ?? {};
  chatWindow.innerHTML = `
    <div class="chatbot-reveal__header">
      <span class="chatbot-reveal__title">${peekT.chatbotTitle ?? 'Chat'}</span>
      <button class="chatbot-reveal__close" aria-label="Close">&times;</button>
    </div>
    <div class="chatbot-reveal__body">
      <div class="chatbot-reveal__row chatbot-reveal__msg chatbot-reveal__typing-row">
        <img class="chatbot-reveal__avatar" src="/images/footer-gif.gif" alt="" />
        <div class="chatbot-reveal__typing">
          <span class="chatbot-reveal__dot"></span>
          <span class="chatbot-reveal__dot"></span>
          <span class="chatbot-reveal__dot"></span>
        </div>
      </div>
      <div class="chatbot-reveal__row chatbot-reveal__msg chatbot-reveal__text-row">
        <img class="chatbot-reveal__avatar" src="/images/footer-gif.gif" alt="" />
        <p class="chatbot-reveal__text"></p>
      </div>
      <div class="chatbot-reveal__row chatbot-reveal__msg chatbot-reveal__gif-row">
        <img class="chatbot-reveal__avatar" src="/images/footer-gif.gif" alt="" />
        <img class="chatbot-reveal__gif" src="/images/rickroll.gif" alt="Rick Roll" />
      </div>
    </div>
  `;
  document.body.appendChild(chatWindow);

  let hasClickedChatbot = false;
  let monologueTimer = null;
  let monologueTimeouts = [];
  let isDead = false;
  let currentRoute = null;
  let closeTriggersEnd = false;
  const ROUTE_KEYS = ['kind', 'cruel', 'indifferent'];
  const chatBody = chatWindow.querySelector('.chatbot-reveal__body');

  function addBotMessage(text) {
    const row = document.createElement('div');
    row.className = 'chatbot-reveal__row chatbot-reveal__msg--visible';
    row.innerHTML = `
      <img class="chatbot-reveal__avatar" src="/images/footer-gif.gif" alt="" />
      <p class="chatbot-reveal__text">${text}</p>
    `;
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
    return row;
  }

  function addTypingThenMessage(text, delay) {
    return new Promise((resolve) => {
      // Remove any existing typing indicators first
      chatBody.querySelectorAll('.chatbot-reveal__typing-indicator').forEach(el => el.remove());

      const dots = document.createElement('div');
      dots.className = 'chatbot-reveal__row chatbot-reveal__msg--visible chatbot-reveal__typing-indicator';
      dots.innerHTML = `
        <img class="chatbot-reveal__avatar" src="/images/footer-gif.gif" alt="" />
        <div class="chatbot-reveal__typing">
          <span class="chatbot-reveal__dot"></span>
          <span class="chatbot-reveal__dot"></span>
          <span class="chatbot-reveal__dot"></span>
        </div>
      `;
      chatBody.appendChild(dots);
      chatBody.scrollTop = chatBody.scrollHeight;

      monologueTimer = setTimeout(() => {
        dots.remove();
        addBotMessage(text);
        resolve();
      }, delay ?? (600 + Math.random() * 600));
    });
  }

  function showChoices(options, callback) {
    const container = document.createElement('div');
    container.className = 'chatbot-reveal__choices';
    options.forEach((label, i) => {
      const btn = document.createElement('button');
      btn.className = 'chatbot-reveal__choice';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        container.querySelectorAll('.chatbot-reveal__choice').forEach(b => {
          if (b !== btn) b.remove();
        });
        btn.classList.add('chatbot-reveal__choice--selected');
        btn.disabled = true;
        chatBody.appendChild(btn);
        container.remove();
        chatBody.scrollTop = chatBody.scrollHeight;
        callback(i);
      });
      container.appendChild(btn);
    });
    chatBody.appendChild(container);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function playRoute(routeData) {
    if (isDead) return;

    if (routeData.response) {
      for (const line of routeData.response) {
        await addTypingThenMessage(line, 800 + line.length * 20);
        await new Promise(r => setTimeout(r, 1200));
      }
    }

    if (routeData.messages) {
      for (const line of routeData.messages) {
        await addTypingThenMessage(line, 800 + line.length * 20);
        await new Promise(r => setTimeout(r, 1200));
      }
    }

    if (isDead) return;

    const nextQ = routeData.q2 || routeData.q3;
    if (nextQ) {
      await new Promise(r => setTimeout(r, 800));
      showChoices(nextQ.options, (choiceIdx) => {
        const nextData = routeData.endings?.[choiceIdx];
        if (nextData) {
          setTimeout(() => playRoute(nextData), 600);
        }
      });
      return;
    }

    if (routeData.closeTriggersEnd) {
      // Wait for user to actually close the window
      closeTriggersEnd = true;
      return;
    }

    await new Promise(r => setTimeout(r, 1500));
    selfDestruct();
  }

  function selfDestruct() {
    isDead = true;

    const allMsgs = chatBody.querySelectorAll('.chatbot-reveal__row, .chatbot-reveal__choice--selected, .chatbot-reveal__choices');
    allMsgs.forEach((msg, i) => {
      setTimeout(() => {
        msg.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        msg.style.opacity = '0';
        msg.style.transform = 'scale(0.8)';
        setTimeout(() => msg.remove(), 200);
      }, i * 80);
    });

    const totalTime = allMsgs.length * 80 + 600;
    setTimeout(() => {
      const offline = document.createElement('p');
      offline.className = 'chatbot-reveal__offline';
      offline.textContent = getTranslations().peek?.chatbotOffline ?? 'Chatbot has left the chat.';
      chatBody.appendChild(offline);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, totalTime);
  }

  chatWindow.querySelector('.chatbot-reveal__close').addEventListener('click', () => {
    if (closeTriggersEnd) {
      // Player chose "close the window" — the chatbot asked for this
      closeTriggersEnd = false;
      selfDestruct();
      return;
    }
    chatWindow.classList.remove('chatbot-reveal--visible');
    chatbotBg.classList.remove('peek-gif__chatbot-bg--visible');
    clearTimeout(monologueTimer);
    monologueTimeouts.forEach(tid => clearTimeout(tid));
    monologueTimeouts = [];
    isPeeking = false;
    isChatbotMode = false;
    hasClickedChatbot = true;
    schedulePeek();
  });

  function revealChatbotPrank() {
    if (!isChatbotMode || hasRevealedPrank) return;
    hasRevealedPrank = true;

    if (currentTl) currentTl.kill();

    hideMessage();
    gsap.to(wrapper, { opacity: 0, duration: 0.2 });

    const peekT = getTranslations().peek ?? {};
    const reveal = peekT.chatbotReveal ?? 'Gotcha!';
    const typingRow = chatWindow.querySelector('.chatbot-reveal__typing-row');
    const textRow = chatWindow.querySelector('.chatbot-reveal__text-row');
    const gifRow = chatWindow.querySelector('.chatbot-reveal__gif-row');

    typingRow.classList.remove('chatbot-reveal__msg--visible');
    textRow.classList.remove('chatbot-reveal__msg--visible');
    gifRow.classList.remove('chatbot-reveal__msg--visible');
    textRow.querySelector('.chatbot-reveal__text').textContent = reveal;

    chatWindow.classList.add('chatbot-reveal--visible');

    setTimeout(() => {
      typingRow.classList.add('chatbot-reveal__msg--visible');
    }, 200);

    setTimeout(() => {
      typingRow.classList.remove('chatbot-reveal__msg--visible');
      textRow.classList.add('chatbot-reveal__msg--visible');
    }, 1500);

    setTimeout(() => {
      gifRow.classList.add('chatbot-reveal__msg--visible');
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 2200);

    // Monologue → choices
    const monologue = peekT.chatbotMonologue ?? [];
    let delay = 3800;
    monologueTimeouts = [];
    monologue.forEach((line, i) => {
      delay += 2000 + line.length * 35;
      const tid = setTimeout(() => {
        if (!isDead) {
          addTypingThenMessage(line, 900 + line.length * 20);
        }
      }, delay);
      monologueTimeouts.push(tid);
    });

    // After monologue, show first choices
    delay += 2500;
    setTimeout(() => {
      if (isDead) return;
      const choices = peekT.chatbotChoices ?? {};
      const q1 = choices.q1;
      if (!q1) { selfDestruct(); return; }

      showChoices(q1.options, (choiceIdx) => {
        currentRoute = ROUTE_KEYS[choiceIdx] ?? ROUTE_KEYS[0];
        const routeData = choices.routes?.[currentRoute];
        if (routeData) {
          setTimeout(() => playRoute(routeData), 600);
        } else {
          selfDestruct();
        }
      });
    }, delay);
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

    // Rare chatbot prank — only once, and only after enough normal peeks
    isChatbotMode = !hasClickedChatbot && (
      peekCount === CHATBOT_PEEK_NUMBER ||
      (!hasShownChatbot && peekCount > CHATBOT_PEEK_NUMBER && (peekCount - CHATBOT_PEEK_NUMBER) % CHATBOT_RETRY_INTERVAL === 0)
    );
    if (isChatbotMode) hasShownChatbot = true;
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
      duration: isChatbotMode ? 0.5 : 0.6,
      ease: 'power2.out',
      onStart: () => {
        if (isTouch) eyes.startIdle();
      },
      onComplete: () => {
        if (isChatbotMode) showChatbotLure();
      },
    });

    // Delay before showing speech bubble — longer for early peeks
    if (!isChatbotMode) {
      const msgDelay = peekCount <= 2 ? 2 : 0.6;
      tl.to({}, { duration: msgDelay, onComplete: showMessage });
    }

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
          // Show "click to chat" text on hover
          const hoverText = getTranslations().peek?.chatbotHover ?? 'Click to chat! 👆';
          if (bubble.textContent !== hoverText) {
            bubble.textContent = hoverText;
            clampBubble();
          }
        }
      } else {
        if (dist < FLEE_DISTANCE * 3) {
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
