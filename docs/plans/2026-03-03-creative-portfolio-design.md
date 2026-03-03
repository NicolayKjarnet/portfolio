# Creative Portfolio Redesign

## Vision
Transform the portfolio from "developer portfolio" to "creative portfolio" — showing web projects, visual work (cover art, graphic design, photo, video), and music production. The site should communicate "I like building things", not just "I am a developer".

## Filter Categories

**Web** | **Visuelt** | **Musikk**

- No "All" — categories are too different to mix
- **Web** is the default on page load
- One active at a time
- Each category can be commented out independently until content is ready

## Header
- Profile cutout (`profile-pic-no-bg.webp`) placed subtly beside the title
- Subtitle stays: "Developer & Content Producer"

## Card Types

### Web Cards (existing)
- Unchanged — same render function, same structure
- 9 projects currently active

### Music Cards (new)
- Album cover as card background
- Title, artist name, short description
- Mini-player: play button triggers Spotify 30s preview via `<audio>` element
- Click on card opens Spotify/SoundCloud link
- Custom UI — not a standard Spotify embed
- 3-6 items initially

### Visual Cards (new)
- **Image/graphic design:** Image fills the card. Click opens lightbox (fullscreen overlay with close button). Short description below image.
- **Video:** YouTube embed directly in card, plays on page. Short description below.
- 3-6 items initially

## Filter System
- Reuse existing FLIP animation
- Replace filter values: `fullstack/frontend/ux/mobile/iot` → `web/visual/music`
- Update both desktop filter buttons and mobile dropdown
- When switching categories, only that category's cards are visible (others get `display: none`)

## Data Architecture
- `renderProjects.js` → `renderWebProjects()` (existing, renamed)
- New: `renderMusicProjects()` — returns music card HTML
- New: `renderVisualProjects()` — returns visual card HTML
- All render functions return HTML strings, same pattern as current
- Project data stays in JS objects, same as current approach

## Lightbox (for visual cards)
- Simple CSS + JS overlay
- Click image → fullscreen overlay with image + close button
- Click outside or press Escape to close
- No library needed

## Mobile
- Swipeable cards (already implemented) work for all card types
- Music preview plays on tap
- Video embeds are responsive

## What Can Be Commented Out
- Each filter button + its render function can be commented out independently
- Launch with Web only, add Visuelt and Musikk when content is ready
