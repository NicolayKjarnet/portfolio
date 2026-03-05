# Spy/Agent Character Concept

## Idea
Expand the peeking GIF feature into a full "spy/agent" theme — me as a secret agent lurking around the portfolio, appearing in different disguises and positions across the pages.

## Variations
- **Newspaper spy**: Character reading a newspaper with googly eyes peeking over the top (classic "I'm watching you" trope)
- **Peeking from edges**: Current implementation — GIF peeks from screen corners and edges
- **Behind elements**: Character hiding behind project cards, timeline items, etc.
- **Trenchcoat & hat**: Full spy outfit variations

## Assets Needed
- Custom illustration/drawing of newspaper spy (in portfolio art style)
- Possibly SVG version for crisp scaling
- Multiple poses/variants for variety

## Technical Notes
- Googly eyes system already exists (`createEyes()` in footerGif.js) — can be reused on any asset
- GSAP animation infrastructure in place
- Peeking system (`peekingGif.js`) can be extended to support multiple asset types
- Could randomize which spy variant appears each peek

## Inspiration
- Classic newspaper spy illustration (eyes peeking over paper)
- "Where's Waldo" — hidden character scattered around the site
- Shy cat peeking around corners
