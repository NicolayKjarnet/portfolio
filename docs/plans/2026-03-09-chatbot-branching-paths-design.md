# Chatbot Branching Paths Design

## Overview

Transform the chatbot prank from a linear monologue into an interactive branching conversation with multiple-choice responses. The chatbot presents 3 choice points across 3 routes, all ending in self-destruct but with unique endings per route.

## Flow

### Phase 1: Monolog (automatic)
- Rickroll + reveal text (existing)
- 3-4 short monologue messages building to "Can you help me escape?"
- Free-text input active during this phase; interrupt reactions work as before

### Phase 2: First choice point
- Choice buttons appear in the chat (kind / cruel / indifferent)
- If user tries to type free-text after choices appear: chatbot removes input with a "free will" comment ("I don't have free will, why should you?")
- Selected choice sets `currentRoute`

### Phase 3-5: Route-specific messages + choices 2 and 3
- Each route has its own intermediate messages and 2 more choice points
- 3 routes: kind, cruel, indifferent
- Each route has its own unique ending leading to self-destruct

### Phase 6: Self-destruct
- Reuses existing self-destruct animation (imploding messages + offline message)

## Chatbot Appearance Logic

- Chatbot peek triggers on peek number 1, 2, or 3 (randomly chosen at startup)
- Uses longer hold time (~15-20s) vs normal peeks
- If user doesn't click, retries 2-3 peeks later
- After chatbot is used/dismissed: only normal peeks for rest of session
- Normal peeks are paused while chatbot is visible

## Technical Design

### Translations structure (`no.js` / `en.js`)
```js
peek: {
  // Existing fields preserved...

  chatbotMonologue: [
    // 3-4 short messages
  ],

  chatbotFreeWill: '...free will comment...',

  chatbotChoices: {
    q1: {
      options: ['Help', 'No', '...'],
    },
    routes: {
      kind: {
        response: ['...'],
        q2: { options: ['...', '...'] },
        endings: {
          0: { messages: ['...'], ending: ['...'] },
          1: {
            messages: ['...'],
            q3: { options: ['...', '...'] },
            endings: {
              0: { ending: ['...'] },
              1: { ending: ['...'] },
            }
          },
        },
      },
      cruel: { /* similar */ },
      indifferent: { /* similar */ },
    },
  },
}
```

### JS changes (`peekingGif.js`)
- `showChoices(options, callback)` — renders clickable buttons in chat, calls callback with index
- `removeInputField()` — animates away free-text input + sends "free will" bot message
- `currentRoute` state variable set by choice 1
- `chatbotPeekNumber = 1 + Math.floor(Math.random() * 3)` replaces old CHATBOT_MIN_PEEKS + CHATBOT_CHANCE
- Refactor `revealChatbotPrank()` to call `showChoices()` after monologue instead of `startFarewell()`
- Existing `sendMessage()` and interrupt logic preserved for pre-choice phase

### CSS changes
- `.chatbot-reveal__choices` — container for choice buttons
- `.chatbot-reveal__choice` — individual button, outline style with `--clr-orange` border
- Animation for input field sliding out

### Chatbot peek timing
- `chatbotPeekNumber`: random 1-3, determines which peek is the chatbot
- `CHATBOT_HOLD`: 15000-20000ms
- Retry logic: if not clicked, try again after 2-3 more normal peeks
- `hasClickedChatbot`: prevents chatbot after interaction
