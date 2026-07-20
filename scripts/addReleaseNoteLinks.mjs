/**
 * Add release note links to CV items in Sanity.
 * Maps CV items to their corresponding monthly release note pages.
 *
 * Usage: node scripts/addReleaseNoteLinks.mjs
 */

import { config } from 'dotenv'
config()

const PROJECT_ID = process.env.SANITY_PROJECT_ID
const DATASET = process.env.SANITY_DATASET
const TOKEN = process.env.SANITY_TOKEN
const BASE = 'https://cavai-release-notes.pages.dev'

// Map: CV item _id → release note URL
const mapping = {
  // ── May 2026 ──
  'cv-2026-mai-block-grouping-multi-select-drag-drop-konfigurasjon': `${BASE}/2026-05/`,
  'cv-2026-mai-fullscreen-v2-format': `${BASE}/2026-05/`,
  'cv-2026-mai-text-shadow-per-side-borders-button-states': `${BASE}/2026-05/`,
  'cv-2026-mai-builder-ruler-system-grid-overlay': `${BASE}/2026-05/`,
  'cv-2026-mai-release-notes-nettside-og-cli-verktoey': `${BASE}/2026-05/`,
  'cv-2026-mai-library-script-video-sammenligning-custom-css-class-inputs': `${BASE}/2026-05/`,
  'cv-2026-mai-1080x1920-format-preset': `${BASE}/2026-05/`,
  'cv-2026-mai-flow-venter-paa-operator-animasjoner-foer-den-avanserer': `${BASE}/2026-05/`,
  'cv-2026-mai-builder-theming-system-scrub-inputs-og-visuell-polish': `${BASE}/2026-05/`,
  'cv-2026-mai-handle-video-autoplay-rejection-gracefully': `${BASE}/2026-05/`,
  'cv-2026-mai-viewability-tracking-fix-for-expandable-creatives': `${BASE}/2026-05/`,
  'cv-2026-mai-misc-fixes-preview-build-progress-enterprise-admin-image-u': `${BASE}/2026-05/`,

  // ── April 2026 ──
  'cv-2026-april-changevideo-changeimage-redesign-med-before-after-preview-og': `${BASE}/2026-04/`,
  'cv-2026-april-dev-tools-overhaul-datatracker-analytics-monitor-json-viewer': `${BASE}/2026-04/`,
  'cv-2026-april-library-script-video-params-requires-filtrering-responsive-v': `${BASE}/2026-04/`,
  'cv-2026-april-preview-ux-lightweight-mobile-preview-zoom-persistering-bedr': `${BASE}/2026-04/`,
  'cv-2026-april-save-publish-preview-knapp-ux-cross-browser-scrollbar-fix': `${BASE}/2026-04/`,
  'cv-2026-april-fix-firstclick-metrikk-interacted-sluttet-a-fyre': `${BASE}/2026-04/`,
  'cv-2026-april-only-css-html-mal-med-0x0-size-og-pointer-events-none': `${BASE}/2026-04/`,
  'cv-2026-april-fix-expandable-header-dekket-hele-kreativet-og-blokkerte-int': `${BASE}/2026-04/`,
  'cv-2026-april-fix-sliderblock-crash-ved-showhide-unmount-av-skjult-blokk': `${BASE}/2026-04/`,

  // ── March 2026 ──
  'cv-2026-mars-block-animation-system-20-presets-visuell-bezier-editor-copy': `${BASE}/2026-03/`,
  'cv-2026-mars-library-script-operator-i-flow-editor': `${BASE}/2026-03/`,
  'cv-2026-mars-builder-template-polish-nye-knapp-html-maler-kode-editor-bor': `${BASE}/2026-03/`,
  'cv-2026-mars-upload-toast-ux-progress-bar-og-rotererende-statusmeldinger': `${BASE}/2026-03/`,
  'cv-2026-mars-template-system-ux-forbedring': `${BASE}/2026-03/`,
  'cv-2026-mars-cavai-mcp-server-ai-assistent-med-viewability-data': `${BASE}/2026-03/`,
  'cv-2026-mars-unified-state-system-for-hover-active-stiler': `${BASE}/2026-03/`,
  'cv-2026-mars-bugfixes-vast-vpaid-tags-localstorage-form-scroll-link-block': `${BASE}/2026-03/`,
}

// First fetch existing docs to preserve their links
const query = `*[_type == "cvItem" && _id in [${Object.keys(mapping).map((id) => `"${id}"`).join(',')}]] { _id, links }`
const queryUrl = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(query)}`
const queryRes = await fetch(queryUrl, { headers: { Authorization: `Bearer ${TOKEN}` } })
const { result: docs } = await queryRes.json()

const mutations = []

for (const doc of docs) {
  const releaseUrl = mapping[doc._id]
  if (!releaseUrl) continue

  const existingLinks = doc.links || []

  // Check if release note link already exists
  if (existingLinks.some((l) => l.url === releaseUrl)) continue

  const newLink = {
    _type: 'object',
    _key: Math.random().toString(36).slice(2, 10),
    label: 'Release notes',
    url: releaseUrl,
  }

  mutations.push({
    patch: {
      id: doc._id,
      set: { links: [...existingLinks, newLink] },
    },
  })
}

if (mutations.length === 0) {
  console.log('No updates needed — all links already present.')
  process.exit(0)
}

console.log(`Adding release note links to ${mutations.length} CV items...`)

const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`
const res = await fetch(mutateUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
  body: JSON.stringify({ mutations }),
})

const result = await res.json()
if (res.ok) {
  console.log(`Done! ${mutations.length} items updated.`)
} else {
  console.error('Failed:', result)
  process.exit(1)
}
