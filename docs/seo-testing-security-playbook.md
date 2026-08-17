# SEO, Testing & Security Playbook

> Reusable patterns extracted from Fathom. Project-agnostic — adapt to any stack.

---

## 1. Static SEO Pages for SPAs

### Problem
Single-page apps are invisible to search engines. Google renders JS but deprioritizes it. AI search bots (ChatGPT, Claude, Perplexity) often can't execute JS at all.

### Solution
Generate static HTML landing pages at build time for every indexable entity. The SPA handles interactivity; static pages handle discoverability.

### Architecture

```
/                        → SPA entry (index.html with noscript fallback)
/about/                  → Static HTML (English)
/{lang}/about/           → Static HTML (localized)
/quiz/{entity-id}/       → Static HTML (English)
/{lang}/quiz/{entity-id}/ → Static HTML (localized)
```

### Implementation pattern

```
scripts/generate-{type}-pages.js   # Node.js script
  --check mode                     # CI: exit 1 if generated files are stale
  normal mode                      # Regenerate all pages + update sitemap
```

Each generator script:
1. Reads source data (JSON content files, pack metadata)
2. Generates complete HTML pages (title, meta, structured data, content, internal links)
3. Updates `sitemap.xml` with any missing URLs
4. Supports `--check` flag for CI (compares generated vs existing, fails if stale)

### Key rules
- Pages must work without JS (pure HTML + CSS)
- Include enough real content for indexing (e.g. 5 sample questions) but not so much that the full product is given away
- Match the app's visual design (same colors, fonts, layout)
- Every page links back to the SPA with a CTA

---

## 2. Multi-language SEO (i18n)

### URL structure
```
/quiz/{id}/              → English (default)
/{lang}/quiz/{id}/       → Localized
```

English has no prefix. All other languages get a 2-letter prefix.

### hreflang tags (every page must have ALL of these)
```html
<link rel="alternate" hreflang="en" href="https://example.com/quiz/foo/">
<link rel="alternate" hreflang="de" href="https://example.com/de/quiz/foo/">
<link rel="alternate" hreflang="nb" href="https://example.com/no/quiz/foo/">
<!-- ... all languages ... -->
<link rel="alternate" hreflang="x-default" href="https://example.com/quiz/foo/">
```

Rules:
- **Reciprocal**: if page A links to page B, page B must link back to page A
- **x-default** points to English version
- **Self-referencing**: every page includes its own hreflang
- Use proper BCP-47 codes (`nb` for Norwegian Bokmal, not `no`)
- `<html lang="xx">` must match the page's own language

### Canonical URLs
```html
<link rel="canonical" href="https://example.com/de/quiz/foo/">
```
- Each language version canonicalizes to **itself** (not to English)
- Must match `og:url`

### Structured data: `inLanguage`
```json
"inLanguage": "de"
```
- Set to **the page's own language**, never an array of all languages
- This is a common mistake — audit tools won't catch it but it confuses search engines

---

## 3. Structured Data (Schema.org)

### Per page type

| Page type | Schema | Key fields |
|-----------|--------|------------|
| About/app page | `WebApplication` | name, description, featureList, screenshots, inLanguage |
| Content page | `Quiz` (or appropriate type) | name, description, educationalLevel, inLanguage, isAccessibleForFree |
| Index/listing page | `ItemList` | numberOfItems, itemListElement (position, url, name) |
| Main entry | `WebApplication` | inLanguage set to page language |

### Template
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "Switzerland — Fathom",
  "description": "...",
  "educationalLevel": "Medium",
  "about": { "@type": "Thing", "name": "Geography" },
  "provider": {
    "@type": "WebApplication",
    "name": "AppName",
    "url": "https://example.com"
  },
  "inLanguage": "de",
  "isAccessibleForFree": true
}
</script>
```

---

## 4. Sitemap

### Format
Single flat `sitemap.xml` in `public/`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemapschemas.org/sitemap/0.9">
  <url>
    <loc>https://example.com/quiz/foo/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### Rules
- Every generated page must be in the sitemap
- Every sitemap URL must have a corresponding generated page (bidirectional)
- Generator scripts auto-append missing entries
- Submit to both Google Search Console AND Bing Webmaster Tools
- `<lastmod>` is optional (Google mostly ignores it)
- Stay under 50,000 URLs / 50MB

---

## 5. Internal Linking

### Crawl path (every page reachable from homepage)
```
index.html (noscript block) → /quiz/ + /about/
/quiz/ (index)              → all entity pages
entity page                 → quiz index + related entities
about page                  → quiz index
footer (all pages)          → home, privacy, terms
```

### Related entity links
- Group entities by category/region/tag
- Show 4-6 related links on each page
- Use correct locale URLs (`/{lang}/quiz/{id}/`)
- Never link to self
- Deterministic selection (sorted, evenly spaced) for stable output

---

## 6. Open Graph / Twitter Cards

Every page needs:
```html
<meta property="og:type" content="website">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="...">
<meta property="og:image" content="https://example.com/og-image.png">
<meta property="og:url" content="https://example.com/quiz/foo/">
<meta name="twitter:card" content="summary_large_image">
```

Rule: `og:url` must equal `<link rel="canonical">`.

---

## 7. CI Test Suite for SEO

### Why
New content PRs can silently break SEO if pages aren't regenerated, structured data is wrong, or sitemap falls out of sync. A test suite catches this before merge.

### Test categories

```
SEO: entity pages
  - pages exist for all N languages
  - every page has <title>
  - every page has meta description
  - every page has self-referencing canonical
  - every page has reciprocal hreflang for all languages + x-default
  - x-default points to English version
  - correct <html lang>
  - structured data inLanguage matches page language
  - structured data has correct @type
  - every page has OG tags
  - og:url matches canonical
  - localized pages have translated titles (not all English)
  - no duplicate titles within same locale
  - hreflang is reciprocal (bidirectional check)
  - related links exist, are localized, don't self-link

SEO: index pages
  - exist for all languages
  - consistent counts across languages
  - structured data (ItemList) with correct numberOfItems

SEO: about pages
  - exist for all languages
  - structured data inLanguage per page
  - reciprocal hreflang

SEO: sitemap
  - exists with expected URL count
  - contains all entity pages for all languages
  - every generated page has a sitemap entry
  - every sitemap URL has a corresponding generated page
```

### Auto-updating stats
A script (`update-content-stats.js`) with `--check` mode that:
- Counts content (questions, quizzes, packs, languages)
- Updates numbers in README, about page, index.html, SEO docs
- CI fails if any file has stale numbers

### CI pipeline
```yaml
- run: node scripts/generate-quiz-pages.js --check
- run: node scripts/generate-about-pages.js --check
- run: node scripts/update-content-stats.js --check
- run: npx vitest run src/__tests__/seoPages.test.js
```

---

## 8. Content Protection / Obfuscation

### Problem
Quiz content in JS bundles is trivially extractable via grep/curl.

### Solution: build-time obfuscation
- Vite plugin intercepts `*.quiz.json?raw` imports at build time
- Replaces plaintext with `decodeContent("base64payload")`
- Codec: XOR on UTF-8 bytes + base64 (deterrent, not encryption)
- Dev/test sees plaintext; prod sees encoded payload
- Same code path (`JSON.parse(await loader())`) — codec is transparent

### CI safety net
Post-build script (`verify-obfuscation.mjs`):
1. Extracts distinctive plaintext markers (long strings with spaces) from all content files
2. Scans every file in `dist/` for those markers
3. Fails if any plaintext content leaked into the build
4. Exempts intentional content (SEO pages with sample questions, about pages)
5. Also verifies GeoJSON files are encoded

### What to exempt
- `dist/about/` — marketing pages with feature descriptions
- `dist/quiz/` and `dist/{lang}/quiz/` — SEO landing pages with sample questions
- UI locale strings — filter out markers that coincide with i18n translations

---

## 9. AI Discoverability

### robots.txt
```
User-agent: Googlebot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

Sitemap: https://example.com/sitemap.xml
```

- **Allow** search/discovery bots (Googlebot, ClaudeBot, GPTBot, ChatGPT-User, PerplexityBot, Bingbot)
- **Block** pure training crawlers (CCBot, Google-Extended, Bytespider, cohere-ai)

### Cloudflare settings (if using Cloudflare)

| Setting | Recommended | Why |
|---------|-------------|-----|
| Bot Fight Mode | OFF | Blocks ALL bots including AI search |
| AI Labyrinth | OFF | Can confuse legitimate crawlers |
| Managed robots.txt | OFF | Overrides your custom robots.txt |
| Block AI bots | OFF (Do not block) | We want AI search discovery |
| AI Bot Policies: Search | Allow | AI search bots |
| AI Bot Policies: Agent | Allow | AI agents browsing |
| AI Bot Policies: Training | Allow (with WAF override) | WAF blocks specific training crawlers |
| Browser Integrity Check | ON or OFF | Does NOT affect bot blocking |

### Verification checklist
```bash
# Test that AI bots get 200 (not 403)
curl -s -o /dev/null -w "%{http_code}" -A "ClaudeBot/1.0" https://example.com/quiz/
curl -s -o /dev/null -w "%{http_code}" -A "GPTBot/1.0" https://example.com/quiz/
curl -s -o /dev/null -w "%{http_code}" -A "ChatGPT-User" https://example.com/quiz/
```

### Known limitation
Cloudflare's TLS fingerprinting on the free plan may block some AI interactive search tools (e.g. Claude web search) even when all settings are permissive. The crawlers (ClaudeBot, GPTBot) work fine — it's only the interactive browsing that gets blocked. Not configurable on free plan.

---

## 10. Search Engine Console Setup

### Google Search Console
1. Verify domain ownership (DNS TXT record or HTML file)
2. Submit sitemap URL
3. Monitor: indexed pages, impressions, clicks, avg position
4. Track indexing growth: 2 → 20 → 100 → 500 → all

### Bing Webmaster Tools
1. Import from Google Search Console (fastest setup)
2. Submit sitemap
3. **Critical for ChatGPT** — ChatGPT uses Bing for web search
4. Re-submit sitemap when URL count changes significantly

### Google AI Overview
- Picks up structured data and about page content
- `WebApplication` schema on about pages helps AI understand the product
- Detailed feature descriptions are directly cited

---

## 11. Service Worker Considerations

If using a service worker (PWA), prevent it from intercepting static SEO pages:

```js
navigateFallbackDenylist: [
  /^\/about/,
  /^\/quiz\//,
  /^\/[a-z]{2}\/(about|quiz)/,
  /^\/legal\//,
  /\.xml$/,    // sitemap
  /\.txt$/,    // robots.txt
]
```

Without this, the SW returns the SPA shell for SEO page URLs, defeating the purpose.

---

## 12. Monitoring & Strategy

### Baseline snapshot (take when launching SEO)
Record: sitemap URL count, indexed pages, impressions, clicks, avg position, AI Overview status.

### Milestones
- Indexed: 0 → 2 → 20 → 100 → 500 → all
- Start with long-tail queries ("switzerland geography quiz")
- Don't expect competitive head terms early

### Post-launch split
- **0% more technical SEO** — if the CI tests pass, the structure is solid
- **70% product / users / distribution** — the product itself drives SEO
- **20% authority** — 10-20 genuine external mentions (niche directories, Reddit, newsletters)
- **10% monitoring** — weekly GSC/Bing check

### External audit
Have ChatGPT (with browsing) audit your SEO pages. It can:
- Crawl specific URLs and verify HTML content
- Check hreflang/canonical/structured data
- Rate each category
- Suggest improvements

Prompt template:
> "Crawl [URL] and audit the SEO. Check: title, meta description, canonical, hreflang (all languages + x-default + reciprocal), structured data (@type, inLanguage), OG tags, internal linking. Rate each area."

---

## 13. Checklist for New Projects

### Initial setup
- [ ] Static page generator script with `--check` mode
- [ ] SEO test suite (Vitest/Jest) covering all generated pages
- [ ] Sitemap generation integrated into page generator
- [ ] robots.txt with AI bot access policy
- [ ] Stats updater script with `--check` mode
- [ ] CI pipeline running all `--check` scripts + tests

### Per-language setup
- [ ] hreflang tags on all pages (reciprocal + x-default)
- [ ] `<html lang>` correct per page
- [ ] Self-referencing canonicals per language
- [ ] Structured data `inLanguage` per page (not array)
- [ ] Localized URLs (`/{lang}/...`)

### Content protection (if applicable)
- [ ] Build-time obfuscation plugin
- [ ] Post-build verification script
- [ ] Exemptions for intentional plaintext (SEO pages)

### Launch
- [ ] Google Search Console: verify + submit sitemap
- [ ] Bing Webmaster Tools: import from GSC + submit sitemap
- [ ] Cloudflare: Bot Fight Mode OFF, AI Labyrinth OFF, Managed robots.txt OFF
- [ ] Verify AI bot access with curl
- [ ] Take baseline snapshot
- [ ] ChatGPT audit of sample pages

### Ongoing
- [ ] CI prevents stale pages on every PR
- [ ] Weekly GSC/Bing monitoring
- [ ] Re-submit sitemap when URL count changes significantly
