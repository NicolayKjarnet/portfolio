# Video Cinema Modal — Design

## Summary
FLIP-animated cinema modal for inline video playback on visual project cards. Click play on a card thumbnail, it zooms from its position into a fullscreen dark modal, video plays with native controls. Close reverses the animation.

## Data Model
- Add `videoSrc` property to visual project items in `renderVisualProjects.js`
- `youtubeId` kept for YouTube link icon
- Only Hammok gets `videoSrc` initially; other projects remain YouTube-embed

## FLIP Animation Flow
1. User clicks play overlay on card
2. Capture thumbnail rect with `getBoundingClientRect()`
3. Show modal backdrop (fade to dark)
4. Place `<video>` in modal at thumbnail's exact position/size via `position: fixed`
5. Animate to centered fullscreen size (`max-width: 90vw, max-height: 85vh`) with GSAP
6. `video.play()`
7. On close: pause video, animate back to original rect, fade out backdrop

## Modal Content
- Dark backdrop `rgba(0,0,0,0.92)`
- `<video>` with native controls, centered
- Close button (x) top right
- Subtle YouTube icon link
- Closes via: x button, backdrop click, Escape key

## Files
- **New:** `scripts/videoModal.js` — FLIP modal logic, exported `setupVideoModal()`
- **Edit:** `scripts/renderVisualProjects.js` — add `videoSrc`, render `<video>` poster when available
- **Edit:** `scripts/index.js` — import and call `setupVideoModal()`
- **Edit:** `css/index.css` — `.video-modal` styles

## CSS Classes
- `.video-modal` — fixed overlay, backdrop
- `.video-modal--open` — visible state
- `.video-modal__video` — the video element
- `.video-modal__close` — close button
- `.video-modal__yt-link` — YouTube icon link

## Scope
- Hammok only for now
- Cards without `videoSrc` work as before
- Mobile: FLIP works, but iOS may force native fullscreen for video
