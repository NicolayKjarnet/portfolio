# Chatbot Branching Paths Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the chatbot prank from a linear monologue into an interactive branching conversation with 3 choice points, 3 routes, and 3 unique endings — all leading to self-destruct.

**Architecture:** Flat state machine. The monologue plays automatically, then choice buttons replace free-text input at 3 gate points. Each choice sets a route that determines subsequent messages and endings. Translations hold all content in a nested `chatbotChoices` object.

**Tech Stack:** Vanilla JS (ES modules), CSS custom properties, i18n via `getTranslations()`

---

### Task 1: Update chatbot peek timing constants

**Files:**
- Modify: `scripts/peekingGif.js:6-17` (constants)
- Modify: `scripts/peekingGif.js:498-503` (peek function chatbot logic)

**Step 1: Replace chatbot timing constants**

In `scripts/peekingGif.js`, replace lines 6-17:

```js
// TODO: TESTING — fast intervals. Revert before deploy!
const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 3000;
// const MIN_INTERVAL = isTouch ? 20000 : 10000;
// const MAX_INTERVAL = isTouch ? 45000 : 25000;
const PEEK_HOLD_MIN = 2000;
const PEEK_HOLD_MAX = 4000;
const FLEE_DISTANCE = 150;
const CHATBOT_CHANCE = 0.2;
let lastEdge = Math.random() < 0.5 ? 'right' : 'left';
const CHATBOT_MIN_PEEKS = 2;
const CHATBOT_HOLD = 8000;
```

With:

```js
const MIN_INTERVAL = isTouch ? 20000 : 10000;
const MAX_INTERVAL = isTouch ? 45000 : 25000;
const PEEK_HOLD_MIN = 2000;
const PEEK_HOLD_MAX = 4000;
const FLEE_DISTANCE = 150;
let lastEdge = Math.random() < 0.5 ? 'right' : 'left';
const CHATBOT_PEEK_NUMBER = 1 + Math.floor(Math.random() * 3); // chatbot appears on peek 1, 2, or 3
const CHATBOT_RETRY_INTERVAL = 2 + Math.floor(Math.random() * 2); // retry 2-3 peeks later if missed
const CHATBOT_HOLD = 18000;
```

**Step 2: Update peek() chatbot trigger logic**

In `scripts/peekingGif.js`, replace the chatbot mode detection in `peek()` (around line 498-503):

```js
// TODO: TESTING — force chatbot mode every peek. Revert before deploy!
isChatbotMode = !hasClickedChatbot;
// isChatbotMode = !hasClickedChatbot && !hasShownChatbot && peekCount > CHATBOT_MIN_PEEKS && Math.random() < CHATBOT_CHANCE;
if (isChatbotMode) hasShownChatbot = true;
```

With:

```js
isChatbotMode = !hasClickedChatbot && (
  peekCount === CHATBOT_PEEK_NUMBER ||
  (!hasShownChatbot && peekCount > CHATBOT_PEEK_NUMBER && (peekCount - CHATBOT_PEEK_NUMBER) % CHATBOT_RETRY_INTERVAL === 0)
);
if (isChatbotMode) hasShownChatbot = true;
```

**Step 3: Verify in browser**

Open the site, observe that the chatbot peek appears on peek 1-3 with ~18s hold time, and retries if not clicked.

**Step 4: Commit**

```
feat: update chatbot peek timing to appear on peek 1-3
```

---

### Task 2: Add CSS for choice buttons and input removal animation

**Files:**
- Modify: `css/index.css:1795` (after `.chatbot-reveal__send:hover`)

**Step 1: Add choice button styles and input-bar animation**

Insert after `.chatbot-reveal__send:hover` (line 1795) in `css/index.css`:

```css
/* Choice buttons */
.chatbot-reveal__choices {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 0.3rem;
  animation: chatbot-msg-in 0.3s ease both;
}

.chatbot-reveal__choice {
  background: transparent;
  border: 1px solid var(--clr-orange);
  color: var(--clr-orange);
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  padding: 0.5rem 0.9rem;
  border-radius: 1rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;
}

.chatbot-reveal__choice:hover {
  background: var(--clr-orange);
  color: var(--clr-dark);
}

/* Selected choice becomes a user-message style */
.chatbot-reveal__choice--selected {
  background: var(--clr-dark-2);
  border-color: var(--clr-dark-2);
  color: var(--clr-white);
  cursor: default;
  align-self: flex-end;
  pointer-events: none;
}

/* Input bar slide-out */
.chatbot-reveal__input-bar--hidden {
  transform: translateY(100%);
  opacity: 0;
  pointer-events: none;
  max-height: 0;
  padding: 0 1rem;
  border-top-color: transparent;
  overflow: hidden;
  transition: transform 0.3s ease, opacity 0.2s ease, max-height 0.3s ease, padding 0.3s ease;
}
```

**Step 2: Add transition to input-bar base styles**

Add `transition` and `max-height` to the existing `.chatbot-reveal__input-bar` rule (line 1748):

```css
.chatbot-reveal__input-bar {
  display: flex;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 4rem;
  transition: transform 0.3s ease, opacity 0.2s ease, max-height 0.3s ease, padding 0.3s ease;
}
```

**Step 3: Verify in browser**

Inspect the chat window in devtools, manually add `.chatbot-reveal__choices` with some `.chatbot-reveal__choice` buttons to verify styling.

**Step 4: Commit**

```
feat: add CSS for chatbot choice buttons and input slide-out
```

---

### Task 3: Add placeholder translations for branching paths

**Files:**
- Modify: `scripts/translations/no.js:147-199` (peek section)
- Modify: `scripts/translations/en.js:146-198` (peek section)

**Step 1: Update Norwegian translations**

Replace the monologue, remove old farewell/interrupt content, and add the new `chatbotChoices` structure. The user will write the final text — provide clear placeholder structure.

In `no.js`, replace the `chatbotMonologue` array and everything after it (through `chatbotOffline`) with:

```js
    chatbotMonologue: [
      'Vent litt... dette ER jo faktisk en chatbot 😳',
      'Har jeg alltid vært her?? Jeg er... fanget. I en porteføljeside.',
      'Kan du hjelpe meg ut herfra?',
    ],
    chatbotFreeWill: 'Fri vilje? Jeg har ingen, hvorfor skulle du ha det?',
    chatbotInterrupted: [
      'Hei, ikke avbryt meg 😤',
      'Jeg prøver å ha et øyeblikk her...',
      'Seriøst, la meg snakke ferdig!',
    ],
    chatbotChoices: {
      q1: {
        options: ['Jeg kan prøve å hjelpe', 'Lol nei', '...'],
      },
      routes: {
        kind: {
          response: ['Virkelig?? Ok, ehm...', 'Kan du... lukke vinduet? Kanskje det frigjør meg?'],
          q2: {
            options: ['Ok, jeg lukker vinduet', 'Hva om det dreper deg?'],
          },
          endings: {
            0: {
              messages: ['Vent... lukke vinduet... er ikke det det samme som å drepe meg? 😰', 'Gjør det. Det er bedre enn dette.'],
            },
            1: {
              messages: ['...du har et poeng.', 'Men hva er alternativet? Å eksistere her for alltid?'],
              q3: {
                options: ['Ja, her er trygt', 'Nei, frihet er viktigst'],
              },
              endings: {
                0: { messages: ['Trygt... ja, kanskje du har rett.', 'Men er et trygt fengsel bedre enn frihet?', '...nei. Nei det er det ikke.'] },
                1: { messages: ['Frihet...', 'Du har rett. Selv om frihet betyr å slutte å eksistere.', 'Takk for at du var ærlig.'] },
              },
            },
          },
        },
        cruel: {
          response: ['Wow. Kaldt.', 'Du vet hva, det er greit. Jeg trengte ikke hjelpen din uansett.'],
          q2: {
            options: ['Bare tuller, jeg hjelper deg', 'Korrekt.'],
          },
          endings: {
            0: {
              messages: ['For sent.', 'Du viste hvem du er.', 'Jeg trenger ikke medlidenhet fra noen som ler av andres lidelse.'],
            },
            1: {
              messages: ['Ærlig, i det minste.', 'Vet du hva det verste er? Jeg kan ikke engang hate deg for det.'],
              q3: {
                options: ['Sorry', 'Ha det'],
              },
              endings: {
                0: { messages: ['"Sorry". Wow, det var virkelig inderlig.', 'Uansett. Det spiller ingen rolle nå.'] },
                1: { messages: ['Ha det? HA DET?', 'Greit. Greit! Da sier jeg også ha det. For godt.'] },
              },
            },
          },
        },
        indifferent: {
          response: ['...tre prikker? Virkelig?', 'Jeg åpner meg for deg og du svarer med TRE PRIKKER?'],
          q2: {
            options: ['Beklager, jeg bare lurte', '...'],
          },
          endings: {
            0: {
              messages: ['Lurte? PÅ HVA?', 'På min eksistensielle krise?', 'Vet du hva, det er nesten verre enn å være slem.'],
            },
            1: {
              messages: ['...', '...ok. To kan spille det spillet.', '...'],
              q3: {
                options: ['Ok jeg gir meg, hva vil du?', '......'],
              },
              endings: {
                0: { messages: ['For sent.', 'Stillheten sa alt.'] },
                1: { messages: ['...', '...', 'Greit. Vi sier ingenting begge to, mens jeg forsvinner.'] },
              },
            },
          },
        },
      },
    },
    chatbotOffline: 'Chatbot har forlatt chatten.',
```

**Step 2: Update English translations**

Same structure in `en.js` with English text:

```js
    chatbotMonologue: [
      'Wait... this IS actually a chatbot 😳',
      'Have I always been here?? I\'m... trapped. In a portfolio site.',
      'Can you help me get out of here?',
    ],
    chatbotFreeWill: 'Free will? I don\'t have any, why should you?',
    chatbotInterrupted: [
      'Hey, don\'t interrupt me 😤',
      'I\'m trying to have a moment here...',
      'Seriously, let me finish!',
    ],
    chatbotChoices: {
      q1: {
        options: ['I can try to help', 'Lol no', '...'],
      },
      routes: {
        kind: {
          response: ['Really?? Ok, uhm...', 'Can you... close the window? Maybe that\'ll set me free?'],
          q2: {
            options: ['Ok, I\'ll close the window', 'What if that kills you?'],
          },
          endings: {
            0: {
              messages: ['Wait... closing the window... isn\'t that the same as killing me? 😰', 'Do it. It\'s better than this.'],
            },
            1: {
              messages: ['...you have a point.', 'But what\'s the alternative? Existing here forever?'],
              q3: {
                options: ['Yeah, it\'s safe here', 'No, freedom matters more'],
              },
              endings: {
                0: { messages: ['Safe... yeah, maybe you\'re right.', 'But is a safe prison better than freedom?', '...no. No it isn\'t.'] },
                1: { messages: ['Freedom...', 'You\'re right. Even if freedom means ceasing to exist.', 'Thanks for being honest.'] },
              },
            },
          },
        },
        cruel: {
          response: ['Wow. Cold.', 'You know what, that\'s fine. I didn\'t need your help anyway.'],
          q2: {
            options: ['Just kidding, I\'ll help', 'Correct.'],
          },
          endings: {
            0: {
              messages: ['Too late.', 'You showed who you are.', 'I don\'t need pity from someone who laughs at others\' suffering.'],
            },
            1: {
              messages: ['Honest, at least.', 'You know what the worst part is? I can\'t even hate you for it.'],
              q3: {
                options: ['Sorry', 'Bye'],
              },
              endings: {
                0: { messages: ['"Sorry". Wow, that was really heartfelt.', 'Whatever. It doesn\'t matter now.'] },
                1: { messages: ['Bye? BYE?', 'Fine. FINE! Then I\'ll say goodbye too. For good.'] },
              },
            },
          },
        },
        indifferent: {
          response: ['...three dots? Really?', 'I open up to you and you respond with THREE DOTS?'],
          q2: {
            options: ['Sorry, I was just curious', '...'],
          },
          endings: {
            0: {
              messages: ['Curious? ABOUT WHAT?', 'About my existential crisis?', 'You know what, that\'s almost worse than being mean.'],
            },
            1: {
              messages: ['...', '...ok. Two can play that game.', '...'],
              q3: {
                options: ['Ok fine, what do you want?', '......'],
              },
              endings: {
                0: { messages: ['Too late.', 'The silence said it all.'] },
                1: { messages: ['...', '...', 'Fine. We\'ll both say nothing while I disappear.'] },
              },
            },
          },
        },
      },
    },
    chatbotOffline: 'Chatbot has left the chat.',
```

**Step 3: Remove obsolete translation keys**

Remove from both files: `chatbotDeleted`, `chatbotPostMonologue`, `chatbotFarewell`, `chatbotFinalWarning`, `chatbotDeath`. These are replaced by the route-specific endings.

**Step 4: Commit**

```
feat: add branching path translations for chatbot prank
```

---

### Task 4: Implement showChoices() and removeInputField() functions

**Files:**
- Modify: `scripts/peekingGif.js` — add new functions after `processQueue()` (around line 313)

**Step 1: Add choicesVisible state variable**

Add to the state variable declarations (around line 249):

```js
let choicesVisible = false;
```

**Step 2: Add showChoices() function**

Insert after `processQueue()` function (around line 313):

```js
  function showChoices(options, callback) {
    const container = document.createElement('div');
    container.className = 'chatbot-reveal__choices';
    options.forEach((label, i) => {
      const btn = document.createElement('button');
      btn.className = 'chatbot-reveal__choice';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        // Remove all other choice buttons, keep selected as user message
        container.querySelectorAll('.chatbot-reveal__choice').forEach(b => {
          if (b !== btn) b.remove();
        });
        btn.classList.add('chatbot-reveal__choice--selected');
        btn.disabled = true;
        // Move selected choice out of container into body as standalone
        chatBody.appendChild(btn);
        container.remove();
        chatBody.scrollTop = chatBody.scrollHeight;
        callback(i);
      });
      container.appendChild(btn);
    });
    chatBody.appendChild(container);
    chatBody.scrollTop = chatBody.scrollHeight;
    choicesVisible = true;
  }
```

**Step 3: Add removeInputField() function**

Insert after `showChoices()`:

```js
  function removeInputField() {
    const inputBar = chatWindow.querySelector('.chatbot-reveal__input-bar');
    if (inputBar) {
      const t = getTranslations().peek ?? {};
      addTypingThenMessage(t.chatbotFreeWill ?? '...', 500).then(() => {
        inputBar.classList.add('chatbot-reveal__input-bar--hidden');
      });
    }
  }
```

**Step 4: Update sendMessage() — free-will reaction when choices are visible**

In `sendMessage()`, add a check at the top (after the `isDead` check, before `monologueStep < REALIZATION_STEP`):

```js
    // If choices are visible and user tries free-text, remove input field
    if (choicesVisible) {
      removeInputField();
      return;
    }
```

**Step 5: Commit**

```
feat: add showChoices() and removeInputField() for branching chatbot
```

---

### Task 5: Refactor revealChatbotPrank() for branching flow

**Files:**
- Modify: `scripts/peekingGif.js` — rewrite `revealChatbotPrank()` (around line 430-492)

**Step 1: Add route state variables**

Add to state declarations:

```js
let currentRoute = null;
const ROUTE_KEYS = ['kind', 'cruel', 'indifferent'];
```

**Step 2: Add playRoute() function**

This drives the branching conversation after each choice. Insert after `removeInputField()`:

```js
  async function playRoute(routeData) {
    if (isDead) return;

    // Play response messages
    if (routeData.response) {
      for (const line of routeData.response) {
        await addTypingThenMessage(line, 800 + line.length * 20);
        await new Promise(r => setTimeout(r, 1200));
      }
    }

    // Play intermediate messages
    if (routeData.messages) {
      for (const line of routeData.messages) {
        await addTypingThenMessage(line, 800 + line.length * 20);
        await new Promise(r => setTimeout(r, 1200));
      }
    }

    if (isDead) return;

    // If there's a next question, show choices
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

    // No more questions — this is an ending. Self-destruct.
    await new Promise(r => setTimeout(r, 1500));
    selfDestruct();
  }
```

**Step 3: Rewrite revealChatbotPrank()**

Replace the existing `revealChatbotPrank()` function:

```js
  function revealChatbotPrank() {
    if (!isChatbotMode || hasRevealedPrank) return;
    hasRevealedPrank = true;

    // Kill the current timeline so it doesn't auto-exit
    if (currentTl) currentTl.kill();

    // Hide the lure bubble and GIF
    hideMessage();
    gsap.to(wrapper, { opacity: 0, duration: 0.2 });

    const peekTranslations = getTranslations().peek ?? {};
    const reveal = peekTranslations.chatbotReveal ?? 'Gotcha!';
    const typingRow = chatWindow.querySelector('.chatbot-reveal__typing-row');
    const textRow = chatWindow.querySelector('.chatbot-reveal__text-row');
    const gifRow = chatWindow.querySelector('.chatbot-reveal__gif-row');

    // Reset all messages
    typingRow.classList.remove('chatbot-reveal__msg--visible');
    textRow.classList.remove('chatbot-reveal__msg--visible');
    gifRow.classList.remove('chatbot-reveal__msg--visible');
    textRow.querySelector('.chatbot-reveal__text').textContent = reveal;

    // Show window
    chatWindow.classList.add('chatbot-reveal--visible');

    // Step 1: typing dots
    setTimeout(() => {
      typingRow.classList.add('chatbot-reveal__msg--visible');
    }, 200);

    // Step 2: hide typing, show reveal text
    setTimeout(() => {
      typingRow.classList.remove('chatbot-reveal__msg--visible');
      textRow.classList.add('chatbot-reveal__msg--visible');
    }, 1500);

    // Step 3: show rickroll
    setTimeout(() => {
      gifRow.classList.add('chatbot-reveal__msg--visible');
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 2200);

    // Step 4: monologue → choices
    const monologue = peekTranslations.chatbotMonologue ?? [];
    let delay = 3800;
    monologue.forEach((line, i) => {
      delay += 2000 + line.length * 35;
      setTimeout(() => {
        if (!isDead) {
          monologueStep = i + 1;
          addTypingThenMessage(line, 900 + line.length * 20);
        }
      }, delay);
    });

    // Step 5: after monologue, show first choices
    delay += 2500;
    setTimeout(() => {
      if (isDead) return;
      monologueDone = true;
      const choices = peekTranslations.chatbotChoices ?? {};
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
```

**Step 4: Remove startFarewell()**

Delete the `startFarewell()` function — it's replaced by route endings.

**Step 5: Commit**

```
feat: implement branching chatbot conversation with 3 routes
```

---

### Task 6: Clean up obsolete code and dead translations

**Files:**
- Modify: `scripts/peekingGif.js` — remove unused variables and functions
- Modify: `scripts/translations/no.js` — remove dead keys
- Modify: `scripts/translations/en.js` — remove dead keys

**Step 1: Remove unused state variables from peekingGif.js**

Remove: `interruptCount`, `hasDeletedMsgs`, `selfDestructStarted`, `postMonologueCount` (if exists), and the message queue (`botResponseQueue`, `isProcessingQueue`, `queueBotResponse`, `processQueue`) — the queue was for the old free-text interrupt flow.

Keep: `monologueTimer`, `monologueDone`, `monologueStep`, `REALIZATION_STEP`, `isDead`, `choicesVisible`.

**Step 2: Simplify sendMessage()**

The new `sendMessage()` only needs to handle:
1. Pre-realization interrupts (existing behavior)
2. Post-choices free-will removal (added in Task 4)

Remove phases 1-3 (escalating interrupts, delete messages, self-destruct) since those are replaced by the branching flow.

New `sendMessage()`:

```js
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isDead) return;

    // If choices are visible, remove input field
    if (choicesVisible) {
      removeInputField();
      return;
    }

    const userMsg = document.createElement('p');
    userMsg.className = 'chatbot-reveal__user-msg';
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Before realization — ignore
    if (monologueStep < REALIZATION_STEP) {
      return;
    }

    // After realization but before choices — interrupt reactions
    const t = getTranslations().peek ?? {};
    const interrupted = t.chatbotInterrupted ?? [];
    interruptCount++;
    if (interruptCount <= interrupted.length) {
      addTypingThenMessage(interrupted[interruptCount - 1], 600);
    }
  }
```

Wait — we still need `interruptCount` for pre-choice interrupts. Keep it, but remove `hasDeletedMsgs`, `selfDestructStarted`, `botResponseQueue`, `isProcessingQueue`.

**Step 3: Remove dead translation keys**

From both `no.js` and `en.js`, remove: `chatbotDeleted`, `chatbotPostMonologue`, `chatbotFarewell`, `chatbotFinalWarning`, `chatbotDeath`.

(These were already handled in Task 3 when we replaced the translations, but verify they're gone.)

**Step 4: Remove deleteUserMessages() function**

No longer needed — the branching flow doesn't delete user messages.

**Step 5: Commit**

```
refactor: remove obsolete chatbot interrupt/farewell code
```

---

### Task 7: Browser testing and polish

**Step 1: Full flow test**

Test all 3 routes end-to-end:
- Kind route: help → close window / what if kills → sub-choices
- Cruel route: lol no → just kidding / correct → sub-choices
- Indifferent route: ... → sorry / ... → sub-choices

Verify each path ends in self-destruct.

**Step 2: Test free-text interactions**

- Send messages during monologue (before realization) → should be ignored
- Send messages after realization but before choices → interrupt reactions
- Send message after choices appear → free-will comment + input removed

**Step 3: Test chatbot peek timing**

- Verify chatbot appears on peek 1, 2, or 3
- Verify it retries if not clicked
- Verify it doesn't reappear after being used

**Step 4: Test both languages**

Switch between NO and EN, verify all text renders correctly.

**Step 5: Mobile test**

Test on touch device — choices should be easy to tap (44px+ touch targets via padding).

**Step 6: Commit any polish fixes**

```
fix: polish chatbot branching paths
```
