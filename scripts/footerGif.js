import { getTranslations } from './i18n.js';

/**
 * Create googly eyes overlay positioned on a face container.
 */
function createEyes(wrapper, opts = {}) {
  const leftTop = opts.leftTop ?? opts.top ?? '37%';
  const rightTop = opts.rightTop ?? opts.top ?? '32%';
  const leftX = opts.leftX ?? '26%';
  const rightX = opts.rightX ?? '51%';
  const leftSize = opts.leftSize ?? opts.size ?? '18%';
  const rightSize = opts.rightSize ?? opts.size ?? '18%';
  const invert = opts.invert ?? false;

  const el = document.createElement('div');
  el.className = `gif-eyes${invert ? ' gif-eyes--invert' : ''}`;

  el.innerHTML = `
    <div class="gif-eye gif-eye--left" style="top:${leftTop};left:${leftX};width:${leftSize}">
      <div class="gif-eye__pupil"></div>
    </div>
    <div class="gif-eye gif-eye--right" style="top:${rightTop};left:${rightX};width:${rightSize}">
      <div class="gif-eye__pupil"></div>
    </div>
  `;

  wrapper.appendChild(el);
  const pupils = el.querySelectorAll('.gif-eye__pupil');

  let idleTimer = null;

  function lookAt(angle, intensity) {
    pupils.forEach((pupil) => {
      const eye = pupil.parentElement;
      const maxOff = eye.getBoundingClientRect().width * 0.28;
      const off = maxOff * intensity;
      pupil.style.transition = 'transform 0.4s ease';
      pupil.style.transform = `translate(${Math.cos(angle) * off}px, ${Math.sin(angle) * off}px)`;
    });
  }

  function startIdle() {
    if (idleTimer) return;
    const step = () => {
      // Random direction and intensity, occasionally center
      if (Math.random() < 0.25) {
        pupils.forEach((p) => {
          p.style.transition = 'transform 0.5s ease';
          p.style.transform = '';
        });
      } else {
        const angle = Math.random() * Math.PI * 2;
        const intensity = 0.3 + Math.random() * 0.7;
        lookAt(angle, intensity);
      }
      // Occasional blink
      if (Math.random() < 0.2) {
        setTimeout(() => {
          el.classList.add('gif-eyes--blink');
          setTimeout(() => el.classList.remove('gif-eyes--blink'), 300);
        }, 200);
      }
      idleTimer = setTimeout(step, 1500 + Math.random() * 2500);
    };
    idleTimer = setTimeout(step, 1000);
  }

  function stopIdle() {
    clearTimeout(idleTimer);
    idleTimer = null;
  }

  // Start idle on touch devices
  const isTouch = matchMedia('(pointer: coarse)').matches;
  if (isTouch) startIdle();

  return {
    el,
    track(mx, my) {
      stopIdle();
      pupils.forEach((pupil) => {
        const eye = pupil.parentElement;
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const angle = Math.atan2(dy, dx);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxOff = rect.width * 0.28;
        const t = Math.min(dist / 100, 1);
        pupil.style.transition = '';
        pupil.style.transform = `translate(${Math.cos(angle) * maxOff * t}px, ${Math.sin(angle) * maxOff * t}px)`;
      });
    },
    blink() {
      el.classList.add('gif-eyes--blink');
      setTimeout(() => el.classList.remove('gif-eyes--blink'), 300);
    },
    reset() {
      pupils.forEach((p) => {
        p.style.transition = '';
        p.style.transform = '';
      });
      if (isTouch) startIdle();
    },
  };
}

// ============================================
// MINIGAME
// ============================================
const GAME_DURATION = 10_000;
const HIT_ANIMATIONS = [
  'shake', 'shake-hard', 'spin', 'bounce', 'wobble', 'flip', 'jello',
];

let game = null;
// All GIF containers registered for visibility tracking
const gifContainers = [];

function t(key) {
  const tr = getTranslations();
  return key.split('.').reduce((o, k) => o?.[k], tr) ?? key;
}

function pickRandom(arr, lastIdx) {
  if (!arr.length) return { text: '', index: -1 };
  let i;
  do { i = Math.floor(Math.random() * arr.length); } while (i === lastIdx && arr.length > 1);
  return { text: arr[i], index: i };
}

function initGame() {
  if (game) return;

  game = {
    active: false,
    paused: false,
    score: 0,
    startTime: 0,
    elapsedBeforePause: 0,
    highScore: parseInt(localStorage.getItem('gifGameHighScore') || '0', 10),
    cooldown: false,
    rafId: null,
    hud: null,
    results: null,
    backdrop: null,
    lastCommentIdx: -1,
  };

  // Observe GIF visibility — pause/resume game on scroll
  const observer = new IntersectionObserver((entries) => {
    if (!game?.active) return;
    const anyVisible = entries.some((e) => e.isIntersecting);
    // Also check all registered containers
    const allHidden = gifContainers.every((c) => {
      const rect = c.getBoundingClientRect();
      return rect.bottom < 0 || rect.top > window.innerHeight;
    });

    if (allHidden && !game.paused) {
      pauseGame();
      document.body.classList.remove('gif-game-playing');
    } else if (!allHidden && game.paused) {
      resumeGame();
      document.body.classList.add('gif-game-playing');
    }
  }, { threshold: 0 });

  gifContainers.forEach((c) => observer.observe(c));

  // Backdrop — dims the page with spotlight on the GIF
  const backdrop = document.createElement('div');
  backdrop.className = 'gif-game-backdrop';
  document.body.appendChild(backdrop);
  game.backdrop = backdrop;
  game.activeGifEl = null;

  // HUD
  const hud = document.createElement('div');
  hud.className = 'gif-game';
  hud.innerHTML = `
    <div class="gif-game__hud">
      <div class="gif-game__timer-section">
        <span class="gif-game__timer-num">10</span><span class="gif-game__timer-s">${t('game.seconds')}</span>
      </div>
      <div class="gif-game__progress"><div class="gif-game__progress-fill"></div></div>
      <div class="gif-game__score-section">
        <span class="gif-game__score-num">0</span>
        <span class="gif-game__score-label">${t('game.hits')}</span>
      </div>
    </div>
  `;
  document.body.appendChild(hud);
  game.hud = hud;

  // Results overlay
  const results = document.createElement('div');
  results.className = 'gif-game-results';
  results.innerHTML = `
    <div class="gif-game-results__card">
      <p class="gif-game-results__title"></p>
      <p class="gif-game-results__score"></p>
      <p class="gif-game-results__record"></p>
      <p class="gif-game-results__best"></p>
      <div class="gif-game-results__actions">
        <button class="gif-game-results__btn gif-game-results__btn--play">${t('game.playAgain')}</button>
        <button class="gif-game-results__btn gif-game-results__btn--close">${t('game.close')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(results);
  game.results = results;

  results.querySelector('.gif-game-results__btn--play').addEventListener('click', () => {
    results.classList.remove('gif-game-results--visible');
    startGame(game.activeGifEl);
  });
  results.querySelector('.gif-game-results__btn--close').addEventListener('click', () => closeResults());
  results.addEventListener('click', (e) => { if (e.target === results) closeResults(); });
}

function isFooterGif() {
  return game?.activeGifEl?.closest('.footer__img-container') != null;
}

function updateSpotlight() {
  if (!game?.backdrop || !game.activeGifEl) return;
  // No backdrop in footer — dark bg makes it too dark
  if (isFooterGif()) {
    game.backdrop.classList.remove('gif-game-backdrop--active');
    return;
  }
  const rect = game.activeGifEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const r = Math.max(rect.width, rect.height) * 2.4;
  game.backdrop.style.setProperty('--spot-x', `${cx}px`);
  game.backdrop.style.setProperty('--spot-y', `${cy}px`);
  game.backdrop.style.setProperty('--spot-r', `${r}px`);
}

function pauseGame() {
  if (!game?.active || game.paused) return;
  game.paused = true;
  game.elapsedBeforePause += Date.now() - game.startTime;
  cancelAnimationFrame(game.rafId);
  game.hud.classList.add('gif-game--paused');
  game.backdrop.classList.remove('gif-game-backdrop--active');
}

function resumeGame() {
  if (!game?.active || !game.paused) return;
  game.paused = false;
  game.startTime = Date.now();
  game.hud.classList.remove('gif-game--paused');
  game.backdrop.classList.add('gif-game-backdrop--active');
  game.rafId = requestAnimationFrame(gameLoop);
}

function closeResults() {
  game.results.classList.remove('gif-game-results--visible');
  game.backdrop.classList.remove('gif-game-backdrop--active');
  document.body.classList.remove('gif-game-playing');
  game.cooldown = true;
  setTimeout(() => { game.cooldown = false; }, 2000);
}

function startGame(imgEl) {
  initGame();
  game.active = true;
  game.paused = false;
  game.activeGifEl = imgEl || null;
  game.score = 0;
  game.startTime = Date.now();
  game.elapsedBeforePause = 0;
  game.lastCommentIdx = -1;

  // Update HUD text (language may have changed)
  game.hud.querySelector('.gif-game__timer-s').textContent = t('game.seconds');
  game.hud.querySelector('.gif-game__score-label').textContent = t('game.hits');
  game.hud.querySelector('.gif-game__score-num').textContent = '0';
  game.hud.querySelector('.gif-game__timer-num').textContent = '10';
  game.hud.querySelector('.gif-game__progress-fill').style.width = '100%';
  game.hud.querySelector('.gif-game__progress-fill').style.background = '';

  // Update result button text
  game.results.querySelector('.gif-game-results__btn--play').textContent = t('game.playAgain');
  game.results.querySelector('.gif-game-results__btn--close').textContent = t('game.close');

  game.hud.classList.add('gif-game--active');
  game.backdrop.classList.add('gif-game-backdrop--active');
  document.body.classList.add('gif-game-playing');
  updateSpotlight();

  // "GO!" flash
  const flash = document.createElement('div');
  flash.className = 'gif-game__go';
  flash.textContent = t('game.go');
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 700);

  game.rafId = requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (!game?.active || game.paused) return;

  const elapsed = game.elapsedBeforePause + (Date.now() - game.startTime);
  const remaining = Math.max(0, GAME_DURATION - elapsed);
  const pct = remaining / GAME_DURATION;

  const fill = game.hud.querySelector('.gif-game__progress-fill');
  game.hud.querySelector('.gif-game__timer-num').textContent = Math.ceil(remaining / 1000);
  fill.style.width = `${pct * 100}%`;

  if (pct <= 0.2) fill.style.background = '#e05555';
  else if (pct <= 0.5) fill.style.background = '#e8a838';
  else fill.style.background = '';

  updateSpotlight();

  if (remaining <= 0) { endGame(); return; }
  game.rafId = requestAnimationFrame(gameLoop);
}

function endGame() {
  game.active = false;
  cancelAnimationFrame(game.rafId);
  game.hud.classList.remove('gif-game--active');
  document.body.classList.remove('gif-game-playing');

  const isRecord = game.score > game.highScore;
  if (isRecord) {
    game.highScore = game.score;
    localStorage.setItem('gifGameHighScore', game.highScore.toString());
  }

  let title;
  if (game.score >= 10) title = t('game.reaction10');
  else if (game.score >= 7) title = t('game.reaction7');
  else if (game.score >= 3) title = t('game.reaction3');
  else title = t('game.reaction0');

  game.results.querySelector('.gif-game-results__title').textContent = title;
  game.results.querySelector('.gif-game-results__score').textContent = `${game.score} ${t('game.hits')}`;
  game.results.querySelector('.gif-game-results__record').textContent = isRecord ? t('game.newRecord') : '';
  game.results.querySelector('.gif-game-results__best').textContent = `${t('game.best')}: ${game.highScore}`;
  game.results.classList.add('gif-game-results--visible');
}

/**
 * Called on every GIF hit during the game.
 * Shows +1 over the GIF, game comment, and random animation.
 * Returns true to suppress normal hit messages.
 */
function onGifHit(img) {
  if (!game?.active || game?.paused) return false;
  game.score++;
  game.hud.querySelector('.gif-game__score-num').textContent = game.score;

  // "+1" popup over the GIF head
  if (img) {
    const popup = document.createElement('span');
    popup.className = 'gif-game__hit-pop';
    popup.textContent = '+1';
    const rect = img.getBoundingClientRect();
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top}px`;
    document.body.appendChild(popup);
    popup.addEventListener('animationend', () => popup.remove());
  }

  // Game-specific comment under the GIF head (like caption)
  const comments = t('game.hitComments');
  if (Array.isArray(comments) && comments.length) {
    const { text, index } = pickRandom(comments, game.lastCommentIdx);
    game.lastCommentIdx = index;
    if (img) {
      const comment = document.createElement('span');
      comment.className = 'gif-game__comment';
      comment.textContent = text;
      const rect = img.getBoundingClientRect();
      comment.style.left = `${rect.left + rect.width / 2}px`;
      comment.style.top = `${rect.bottom + 4}px`;
      document.body.appendChild(comment);
      comment.addEventListener('animationend', () => comment.remove());
    }
  }

  // Random hit animation (replace default shake)
  if (img) {
    const anim = HIT_ANIMATIONS[Math.floor(Math.random() * HIT_ANIMATIONS.length)];
    img.classList.remove('flee-gif--hit');
    // Force reflow to restart animation
    void img.offsetWidth;
    img.dataset.hitAnim = anim;
    img.classList.add('flee-gif--hit');
  }

  return true;
}

/** Click/tap starts the game if not already active. */
function onGifClick(imgEl) {
  if (game?.active || game?.cooldown) return;
  startGame(imgEl);
}

// ============================================
// HAMMER STRIKE (global — works whenever hammer cursor is visible)
// ============================================

function showHammerStrike(x, y) {
  document.body.classList.add('gif-cursor-striking');
  const strike = document.createElement('div');
  strike.className = 'gif-hammer-strike';
  strike.style.left = `${x}px`;
  strike.style.top = `${y}px`;
  document.body.appendChild(strike);
  strike.addEventListener('animationend', () => {
    strike.remove();
    document.body.classList.remove('gif-cursor-striking');
  });
}

// Show hammer strike on any click while hammer cursor is active
document.addEventListener('click', (e) => {
  if (document.body.classList.contains('gif-cursor-near') ||
      document.body.classList.contains('gif-game-playing')) {
    showHammerStrike(e.clientX, e.clientY);
  }
});

// ============================================
// FLEE BEHAVIOUR
// ============================================

function makeFlee(el, img, opts = {}) {
  const MAX_PUSH = opts.maxPush ?? 80;
  const INFLUENCE = opts.influence ?? 250;
  const EASE = opts.ease ?? 0.15;
  const getMessages = typeof opts.messages === 'function' ? opts.messages : () => (opts.messages ?? []);
  const getHitMessages = typeof opts.hitMessages === 'function' ? opts.hitMessages : () => (opts.hitMessages ?? []);
  const getReturnMessages = typeof opts.returnMessages === 'function' ? opts.returnMessages : () => (opts.returnMessages ?? []);
  const getLingerMessages = typeof opts.lingerMessages === 'function' ? opts.lingerMessages : () => (opts.lingerMessages ?? []);
  const caption = opts.captionEl ?? null;
  const eyes = opts.eyes ?? null;
  const onHit = opts.onHit ?? null;
  const onClickStart = opts.onClickStart ?? null;
  const isGameActive = opts.isGameActive ?? (() => false);

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let running = false;
  let lastMsgIdx = -1;
  let lastHitIdx = -1;
  let lastReturnIdx = -1;
  let lastLingerIdx = -1;
  let msgTimer = null;
  let isClose = false;
  let hitCooldown = false;
  let approachTimer = null;
  let approachCount = 0; // how many times they've come close in this session
  let hasLeftOnce = false; // track if they've left and come back
  let mouseX = 0;
  let mouseY = 0;
  let needsUpdate = false;
  let idleChatTimer = null;
  const isTouch = matchMedia('(pointer: coarse)').matches;

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

  function startIdleChat() {
    if (idleChatTimer || !isTouch) return;
    const loop = () => {
      if (isGameActive() || isClose) { idleChatTimer = null; return; }
      if (getLingerMessages().length) {
        const { text, index } = pick(getLingerMessages(), lastLingerIdx);
        lastLingerIdx = index;
        showCaption(text);
      }
      idleChatTimer = setTimeout(loop, 4000 + Math.random() * 3000);
    };
    idleChatTimer = setTimeout(loop, 3500);
  }

  function stopIdleChat() {
    clearTimeout(idleChatTimer);
    idleChatTimer = null;
  }

  function pushAwayFromMouse(multiplier) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - mouseX;
    const dy = cy - mouseY;
    const angle = Math.atan2(dy, dx);
    const strength = MAX_PUSH * (multiplier ?? 1.5);
    targetX = Math.cos(angle) * strength;
    targetY = Math.sin(angle) * strength;
  }

  function triggerHit() {
    if (hitCooldown || !img) return;
    hitCooldown = true;

    if (eyes) eyes.blink();

    const handled = onHit ? onHit(img) : false;

    if (handled) {
      // Game mode: push away from mouse so it's harder to spam
      pushAwayFromMouse();
    }

    if (!handled) {
      img.classList.add('flee-gif--hit');
      if (getHitMessages().length) {
        const { text, index } = pick(getHitMessages(), lastHitIdx);
        lastHitIdx = index;
        showCaption(text);
      }
    }

    const cooldownMs = isGameActive() ? 350 : 500;
    setTimeout(() => {
      img.classList.remove('flee-gif--hit');
      delete img.dataset.hitAnim;
      hitCooldown = false;
    }, cooldownMs);
  }

  function tick() {
    if (needsUpdate) {
      needsUpdate = false;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - mouseX;
      const dy = cy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Desktop hover-hit detection (non-game only) — shrunk zone so approach msgs show first
      if (img && !isGameActive()) {
        const ir = img.getBoundingClientRect();
        const shrink = 0.15; // 15% inset on each side
        const inX = ir.width * shrink;
        const inY = ir.height * shrink;
        if (mouseX >= ir.left + inX && mouseX <= ir.right - inX &&
            mouseY >= ir.top + inY && mouseY <= ir.bottom - inY) {
          triggerHit();
          pushAwayFromMouse(3);
        }
      }

      if (dist < INFLUENCE) {
        const strength = 1 - dist / INFLUENCE;
        const angle = Math.atan2(dy, dx);
        targetX = Math.cos(angle) * MAX_PUSH * strength;
        targetY = Math.sin(angle) * MAX_PUSH * strength;
        if (!isClose && dist < INFLUENCE * 0.7) {
          isClose = true;
          approachCount++;
          if (!hitCooldown && !isGameActive()) {
            // First approach after returning → use return messages
            if (hasLeftOnce && getReturnMessages().length) {
              const { text, index } = pick(getReturnMessages(), lastReturnIdx);
              lastReturnIdx = index;
              showCaption(text);
            } else if (getMessages().length) {
              const { text, index } = pick(getMessages(), lastMsgIdx);
              lastMsgIdx = index;
              showCaption(text);
            }
          }
          // Keep showing new messages while staying close
          clearInterval(approachTimer);
          let lingerCount = 0;
          approachTimer = setInterval(() => {
            if (!isClose || isGameActive()) { clearInterval(approachTimer); return; }
            lingerCount++;
            if (!hitCooldown) {
              // After a few messages, switch to linger messages
              if (lingerCount >= 3 && getLingerMessages().length) {
                const { text, index } = pick(getLingerMessages(), lastLingerIdx);
                lastLingerIdx = index;
                showCaption(text);
              } else if (getMessages().length) {
                const { text, index } = pick(getMessages(), lastMsgIdx);
                lastMsgIdx = index;
                showCaption(text);
              }
            }
          }, 2500);
        }
      } else {
        targetX = 0;
        targetY = 0;
        if (isClose) {
          isClose = false;
          hasLeftOnce = true;
          clearInterval(approachTimer);
        }
      }
    }

    if (eyes) eyes.track(mouseX, mouseY);

    currentX += (targetX - currentX) * EASE;
    currentY += (targetY - currentY) * EASE;

    if (Math.abs(currentX - targetX) < 0.3 && Math.abs(currentY - targetY) < 0.3) {
      currentX = targetX;
      currentY = targetY;
    }

    el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

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

  // Track cursor proximity for hammer cursor (shows 50px before influence)
  const CURSOR_RANGE = INFLUENCE + 50;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    needsUpdate = true;
    ensureRunning();

    // Show hammer cursor when near any GIF
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const d = Math.sqrt((cx - mouseX) ** 2 + (cy - mouseY) ** 2);
    if (d < CURSOR_RANGE) {
      document.body.classList.add('gif-cursor-near');
    } else {
      document.body.classList.remove('gif-cursor-near');
    }
  });

  document.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    isClose = false;
    if (eyes) eyes.reset();
    ensureRunning();
  });

  // Click/tap: hit + game start
  if (img) {
    img.addEventListener('click', () => {
      if (onClickStart) onClickStart(img);
      triggerHit();
    });
  }

  el.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    needsUpdate = true;
    ensureRunning();
    // Reset idle chat timer on touch
    stopIdleChat();
    startIdleChat();
  }, { passive: true });

  // Start idle chat when GIF is visible on touch devices
  if (isTouch) {
    const idleObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isGameActive()) {
        startIdleChat();
      } else {
        stopIdleChat();
      }
    }, { threshold: 0.3 });
    idleObs.observe(el);
  }
}

// ============================================
// SETUP
// ============================================

export function setupFooterGif() {
  const container = document.querySelector('.footer__img-container');
  if (!container) return;

  const img = container.querySelector('.footer__img');
  if (!img) return;

  gifContainers.push(container);

  const faceWrap = document.createElement('div');
  faceWrap.className = 'gif-face';
  img.parentNode.insertBefore(faceWrap, img);
  faceWrap.appendChild(img);

  const eyes = createEyes(faceWrap, { invert: true });

  makeFlee(container, img, {
    maxPush: 80,
    influence: 250,
    ease: 0.15,
    messages: () => getTranslations().footer.approachMessages,
    hitMessages: () => getTranslations().footer.hitMessages,
    returnMessages: () => getTranslations().footer.returnMessages,
    lingerMessages: () => getTranslations().footer.lingerMessages,
    captionEl: container.querySelector('.footer__caption'),
    eyes,
    onHit: onGifHit,
    onClickStart: onGifClick,
    isGameActive: () => game?.active ?? false,
  });
}

export function setupHeaderGif() {
  const wrap = document.querySelector('.header__cutout-wrap');
  if (!wrap) return;

  gifContainers.push(wrap);

  const eyes = createEyes(wrap, {
    size: '14%',
    leftTop: '38%',
    rightTop: '34%',
    leftX: '30%',
    rightX: '52%',
  });

  makeFlee(wrap, wrap.querySelector('.header__cutout'), {
    maxPush: 40,
    influence: 180,
    ease: 0.1,
    messages: () => getTranslations().footer.approachMessages,
    hitMessages: () => getTranslations().footer.hitMessages,
    returnMessages: () => getTranslations().footer.returnMessages,
    lingerMessages: () => getTranslations().footer.lingerMessages,
    captionEl: wrap.querySelector('.header__cutout-caption'),
    eyes,
    onHit: onGifHit,
    onClickStart: onGifClick,
    isGameActive: () => game?.active ?? false,
  });
}
