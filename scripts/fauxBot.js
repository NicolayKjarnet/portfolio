import { createEyes } from './footerGif.js';
import { getTranslations } from './i18n.js';

const isTouch = matchMedia('(pointer: coarse)').matches;
const GIF_SIZE = isTouch ? 60 : 80;
const FLEE_DISTANCE = 150;
const FIRST_HOLD = 5000;
const RETRY_HOLD = 18000;
const RETRY_DELAY_MIN = 15000;
const RETRY_DELAY_MAX = 25000;

function botPosition() {
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

export function setupFauxBot() {
  // -- Lure GIF (bottom-right corner) --
  const wrapper = document.createElement('div');
  wrapper.className = 'faux-bot';

  const face = document.createElement('div');
  face.className = 'gif-face';

  const img = document.createElement('img');
  img.className = 'faux-bot__img';
  img.src = '/images/footer-gif.gif';
  img.alt = '';
  img.draggable = false;
  img.style.width = GIF_SIZE + 'px';
  img.style.height = GIF_SIZE + 'px';

  const bubble = document.createElement('div');
  bubble.className = 'faux-bot__bubble';

  const lureBg = document.createElement('div');
  lureBg.className = 'faux-bot__bg';

  face.appendChild(img);
  wrapper.appendChild(face);
  wrapper.appendChild(bubble);
  document.body.appendChild(lureBg);
  document.body.appendChild(wrapper);

  const eyes = createEyes(face, {
    size: '18%',
    top: '35%',
    leftX: '26%',
    rightX: '51%',
  });

  let isLureVisible = false;
  let currentTl = null;
  let hasClicked = false;
  let isFirstAttempt = true;
  let retryTimer = null;

  // -- Chat window --
  const botT = getTranslations().bot ?? {};
  const chatWindow = document.createElement('div');
  chatWindow.className = 'chatbot-reveal';
  chatWindow.innerHTML = `
    <div class="chatbot-reveal__header">
      <span class="chatbot-reveal__title">${botT.title ?? 'Chat'}</span>
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

  let monologueTimer = null;
  let monologueTimeouts = [];
  let pendingTypingResolve = null;
  let isDead = false;
  let currentRoute = null;
  let closeTriggersEnd = false;
  let closeLocked = false;
  const ROUTE_KEYS = ['kind', 'code', 'cruel', 'indifferent'];
  const chatBody = chatWindow.querySelector('.chatbot-reveal__body');

  // -- Bubble helpers --
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

  function showLure() {
    const lures = getTranslations().bot?.lure ?? [];
    if (!lures.length) return;
    const text = lures[Math.floor(Math.random() * lures.length)];
    bubble.textContent = text;
    bubble.style.left = '50%';
    bubble.style.transform = 'translateX(-50%)';
    bubble.style.bottom = '105%';
    bubble.style.top = '';
    bubble.classList.add('faux-bot__bubble--lure', 'faux-bot__bubble--visible');
    wrapper.classList.add('faux-bot--active');
    lureBg.classList.add('faux-bot__bg--visible');
    clampBubble();
  }

  function hideBubble() {
    bubble.classList.remove('faux-bot__bubble--visible', 'faux-bot__bubble--lure');
    wrapper.classList.remove('faux-bot--active');
    lureBg.classList.remove('faux-bot__bg--visible');
  }

  // -- Chat window helpers --
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

      pendingTypingResolve = resolve;
      monologueTimer = setTimeout(() => {
        pendingTypingResolve = null;
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

    if (routeData.closeTriggersEnd) {
      closeLocked = true;
      closeBtn.classList.add('chatbot-reveal__close--locked');
    }

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
      closeLocked = false;
      closeBtn.classList.remove('chatbot-reveal__close--locked');
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
      offline.textContent = getTranslations().bot?.offline ?? 'chatbot is offline.';
      chatBody.appendChild(offline);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, totalTime);
  }

  function finishBot() {
    document.body.removeAttribute('data-faux-bot');
    document.body.setAttribute('data-faux-bot-done', '');
  }

  const closeBtn = chatWindow.querySelector('.chatbot-reveal__close');
  closeBtn.addEventListener('click', () => {
    if (closeLocked) return;
    if (closeTriggersEnd) {
      closeTriggersEnd = false;
      selfDestruct();
      return;
    }
    chatWindow.classList.remove('chatbot-reveal--visible');
    document.body.style.overflow = '';
    lureBg.classList.remove('faux-bot__bg--visible');
    clearTimeout(monologueTimer);
    monologueTimeouts.forEach(tid => clearTimeout(tid));
    monologueTimeouts = [];
    isLureVisible = false;
    hasClicked = true;
    finishBot();
  });

  // -- Reveal sequence (opens chat window) --
  function openChatWindow() {
    if (currentTl) currentTl.kill();
    hideBubble();
    gsap.to(wrapper, { opacity: 0, duration: 0.2 });

    const botT = getTranslations().bot ?? {};
    const reveals = botT.reveal ?? ['Gotcha!'];
    const reveal = Array.isArray(reveals) ? reveals[Math.floor(Math.random() * reveals.length)] : reveals;
    const monologues = botT.monologue ?? [];
    const monologue = (monologues.length && Array.isArray(monologues[0]))
      ? monologues[Math.floor(Math.random() * monologues.length)]
      : monologues;

    const typingRow = chatWindow.querySelector('.chatbot-reveal__typing-row');
    const textRow = chatWindow.querySelector('.chatbot-reveal__text-row');
    const gifRow = chatWindow.querySelector('.chatbot-reveal__gif-row');

    typingRow.classList.remove('chatbot-reveal__msg--visible');
    textRow.classList.remove('chatbot-reveal__msg--visible');
    gifRow.classList.remove('chatbot-reveal__msg--visible');
    textRow.querySelector('.chatbot-reveal__text').textContent = reveal;

    chatWindow.classList.add('chatbot-reveal--visible');
    document.body.style.overflow = 'hidden';

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
    let delay = 3300;
    monologueTimeouts = [];
    monologue.forEach((line) => {
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
      const choices = botT.choices ?? {};
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

  // -- Lure GIF slide-in/out --
  function isGameActive() {
    return document.body.classList.contains('gif-game-playing');
  }

  function showLureGif() {
    if (hasClicked || isGameActive() || document.visibilityState !== 'visible') {
      if (!hasClicked) scheduleRetry();
      return;
    }

    // Skip if footer/header GIF containers are visible
    const gifEls = document.querySelectorAll('.footer__img-container, .header__cutout-wrap');
    const anyGifVisible = [...gifEls].some((el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });
    if (anyGifVisible) {
      scheduleRetry();
      return;
    }

    isLureVisible = true;
    document.body.setAttribute('data-faux-bot', '');
    hideBubble();

    const pos = botPosition();
    const hold = (isFirstAttempt ? FIRST_HOLD : RETRY_HOLD) / 1000;

    const tl = gsap.timeline({
      onComplete: () => {
        isLureVisible = false;
        hideBubble();
        if (!hasClicked) scheduleRetry();
      },
    });
    currentTl = tl;

    tl.set(wrapper, {
      x: pos.fromX,
      y: pos.fromY,
      rotation: 0,
      scaleX: 1,
      opacity: 1,
    });

    tl.to(wrapper, {
      x: pos.x,
      y: pos.y,
      rotation: pos.rotation,
      duration: 0.5,
      ease: 'power2.out',
      onStart: () => {
        if (isTouch) eyes.startIdle();
      },
      onComplete: () => showLure(),
    });

    // For first attempt, show retreat message before leaving
    if (isFirstAttempt) {
      tl.to({}, { duration: hold });
      tl.to({}, {
        duration: 0.1,
        onComplete: () => {
          const retreat = getTranslations().bot?.retreat ?? 'Ok, I\'ll try again later...';
          bubble.textContent = retreat;
          clampBubble();
        },
      });
      tl.to({}, { duration: 2 });
    } else {
      tl.to({}, { duration: hold });
    }

    tl.to(wrapper, {
      x: pos.fromX,
      y: pos.fromY,
      rotation: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onStart: () => {
        eyes.stopIdle();
        hideBubble();
      },
    });

    isFirstAttempt = false;
  }

  function scheduleRetry() {
    if (hasClicked) return;
    clearTimeout(retryTimer);
    const delay = RETRY_DELAY_MIN + Math.random() * (RETRY_DELAY_MAX - RETRY_DELAY_MIN);
    retryTimer = setTimeout(showLureGif, delay);
  }

  // -- Click: open chat window --
  wrapper.addEventListener('click', () => {
    if (!isLureVisible || hasClicked) return;
    hasClicked = true;
    clearTimeout(retryTimer);
    openChatWindow();
  });

  // -- Mouse: track eyes + show hover text --
  if (!isTouch) {
    document.addEventListener('mousemove', (e) => {
      if (!isLureVisible) return;

      eyes.track(e.clientX, e.clientY);

      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);

      if (dist < FLEE_DISTANCE) {
        const hoverText = getTranslations().bot?.hover ?? 'Click to chat! 👆';
        if (bubble.textContent !== hoverText) {
          bubble.textContent = hoverText;
          clampBubble();
        }
      }
    });
  }

  // -- Pause when tab is hidden --
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      clearTimeout(retryTimer);
      clearTimeout(monologueTimer);
      if (pendingTypingResolve && chatWindow.classList.contains('chatbot-reveal--visible')) {
        chatBody.querySelectorAll('.chatbot-reveal__typing-indicator').forEach(el => el.remove());
        pendingTypingResolve();
        pendingTypingResolve = null;
      }
      if (isLureVisible && currentTl) {
        currentTl.kill();
        isLureVisible = false;
        eyes.stopIdle();
        hideBubble();
        gsap.set(wrapper, { opacity: 0 });
      }
    } else if (!hasClicked && !isLureVisible) {
      scheduleRetry();
    }
  });

  // -- Trigger: show lure when header scrolls fully out of view --
  const header = document.querySelector('.header');
  if (header) {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !hasClicked) {
          showLureGif();
          obs.disconnect();
        }
      },
      { threshold: 0 },
    );
    obs.observe(header);
  }

  // -- Shift chatbot above mini-player when it's visible --
  const miniPlayer = document.querySelector('.mini-player');
  if (miniPlayer) {
    const playerObs = new MutationObserver(() => {
      chatWindow.classList.toggle(
        'chatbot-reveal--above-player',
        miniPlayer.classList.contains('mini-player--visible'),
      );
    });
    playerObs.observe(miniPlayer, { attributes: true, attributeFilter: ['class'] });
  }
}
