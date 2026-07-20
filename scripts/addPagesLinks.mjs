/**
 * Add links from Pages document to CV items in Sanity.
 * Extracted from "Journal og CV-info.pages".
 *
 * Usage: node scripts/addPagesLinks.mjs
 */

import { config } from 'dotenv'
config()

const PROJECT_ID = process.env.SANITY_PROJECT_ID
const DATASET = process.env.SANITY_DATASET
const TOKEN = process.env.SANITY_TOKEN

const mapping = {
  // ── Cavai Creative — confirmed matches ──

  'cv-2024-oktober-coca-cola-x-tv2-showreel': [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/cavaiadvertising_we-create-ads-for-people-not-usersand-it-activity-7249747201214607361-JcSu' },
    { label: 'Preview', url: 'https://my.cavai.com/creatives/50618-50771-52187-70832/banner/6a8ef80f8285b955db5cc0d3e4afba6d' },
  ],

  'cv-2024-november-pizzabakeren-x-the-voice-showreel': [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/cavaiadvertising_thevoice-thevoice-digital-activity-7270050827510165504-BTnZ' },
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51251-51798-52418-72679/banner/e60f82bb3b6db5811c03cbef9fd4685d' },
  ],

  'cv-2024-november-fang-frukten': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/50179-51836-52468-73291/expandable/f12a899c48a6a2c7e7524e7639578a8d' },
    { label: 'Preview 2', url: 'https://my.cavai.com/creatives/50179-51836-52468-73257/expandable/db6d8236a00fed88dcf07a888d5958f1' },
  ],

  'cv-2024-desember-bmw-skiskytterspillet-og-bmw-quiz': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51310-51809-52431-73642/banner/47eb82350a8cf1e6701eb8c1a564cf77' },
    { label: 'Preview 2', url: 'https://my.cavai.com/creatives/51310-51809-52475-73409/banner/ac85f020f1e7dec14d53267d98ae7dcd' },
  ],

  'cv-2024-desember-showreel-2024': [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/cavaiadvertising_cavai-showreel-2024-activity-7282330908928466946-nP8H' },
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51251-51861-52501-74165/banner/01b46775dfc632763d97da0ecfaa1115' },
  ],

  'cv-2024-desember-elvia-spenning-eller-tenning': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51251-51861-52618-74644/banner/c04f8136c8b75b466026bb3ab75d386d' },
  ],

  'cv-2024-desember-elvia-hva-skjer-na': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51251-51861-52634-74779/banner/e62ce97c7c55f36ca013c1ea470e8a45' },
  ],

  'cv-2024-desember-mi-8-mission-access': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51468-52067-52740-75730/banner/079bd817b7e8101c06a6bfc42d2d24eb' },
    { label: 'Preview 2', url: 'https://my.cavai.com/creatives/51468-52067-52740-75728/banner/190d81cc14608efda1b17df5b4f090b2' },
  ],

  'cv-2024-oktober-ministerie-van-buitenlandse-zaken': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/50346-50848-52595-74351/expandable/888d1555144bc66698c44cc20cf956cb' },
    { label: 'Preview 2', url: 'https://my.cavai.com/creatives/50030-51964-52625-74684/expandable/64b91bab3aad7064e8ff5fd7a7a619f6' },
  ],

  // ── Januar 2025 ──
  'cv-2025-januar-specsavers-proposal': [
    { label: 'Slides', url: 'https://docs.google.com/presentation/d/1AlwxiVWQhRGtRZOZVQGReiESVgk-yHcT_0Kg9Xxpfnw/edit#slide=id.g31fada11620_0_11' },
  ],

  'cv-2025-januar-coca-cola-proposal': [
    { label: 'Slides', url: 'https://docs.google.com/presentation/d/1dNhe-mZN1oFszhTddzd5W-n2z0t1kAmYYEK1ssO8Olk/edit#slide=id.g31fc9e9da52_0_1986' },
  ],

  // ── Februar 2025 ──
  'cv-2025-februar-geoguessr-hints-geoguessr-w-o-hints': [
    { label: 'GeoGuessr hints', url: 'https://my.cavai.com/creatives/51477-52081-52759-75516/banner/602e533c01ffde4b11394bf8c5c0d0e1' },
  ],

  'cv-2025-februar-lingot-game': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51251-52049-52722-75284/build#dialogue' },
  ],

  'cv-2025-februar-bridget-jones': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51207-51952-52704-75237/build#design' },
  ],

  'cv-2025-februar-wicked': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/50812-51394-52900-76818/banner/7aa13224381682c7658f698c174b69db' },
  ],

  'cv-2025-februar-kondomeriet-wheel-of-fortune': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51549-52184-52945-77020/build#design' },
  ],

  // ── Mars 2025 ──
  'cv-2025-mars-snt': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51251-52222-52935-76912/banner/6f148dda83e626c8eb8dea41bab5c9a2' },
  ],

  'cv-2025-mars-slot-machine': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/50165-52194-52906-76648/banner/faa731e5993d298bf235c37eb4479609' },
  ],

  'cv-2025-mars-specsavers-custom-slider': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51477-52217-52949-77133/build#design' },
  ],

  'cv-2025-mars-cola-x-the-voice': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51251-52247-52974-77208/build#design' },
  ],

  'cv-2025-mars-color-line': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/50878-52257-52935-77435/expandable/08bef408e650cac18f26cb856311c7ba' },
  ],

  // ── April 2025 ──
  'cv-2025-april-book-of-mormon': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51624-52212-52926-78496/banner/eca4cb30391f924b32b9351dc109e4fc' },
  ],

  'cv-2025-april-thunderbolt': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51637-52335-53199-78534/banner/f5901dc96861691859c921238d038f6f' },
  ],

  // ── Mai 2025 ──
  'cv-2025-mai-mission-impossible-8': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/50947-52668-53649-83388/banner/0ec6e2586061fa9e279ffa81939e51e9' },
  ],

  // ── Juli 2025 (combined item) ──
  'cv-2025-juli-discovery-api-bmw-lead-gen-isuzu-lead-gen-national-lotterije': [
    { label: 'BMW Lead Gen', url: 'https://my.cavai.com/creatives/50695-50885-51091-80565/banner/67d2b6f41ea2628b380eff42c185fb0e' },
    { label: 'National Lotterije', url: 'https://my.cavai.com/creatives/51348-52531-53479-81660/banner/6e7f1729c820b025cd9e62421664be06' },
    { label: 'Wimbledon', url: 'https://my.cavai.com/creatives/51706-52465-53392-80578/banner/b9ca0b0ac52d7952a6fef13d12dcf067' },
    { label: 'Live Feed', url: 'https://my.cavai.com/creatives/51735-52511-53469-81543/banner/e6b871b14a7592753f7d3d14015a60f6' },
    { label: 'Marktplaats', url: 'https://my.cavai.com/creatives/51733-52507-53442-81199/banner/7824972961ab0ff613d14d25ab44cb80' },
    { label: 'Khuliso', url: 'https://my.cavai.com/creatives/51722-52493-53428-81159/banner/124079090a06cba393d2ab2816f24cc9' },
    { label: 'P&O Cruises Preview', url: 'https://campaign.site/pocruises-expandable-mpu-preview' },
    { label: 'P&O Cruises Prize Draw', url: 'https://campaign.site/pocruises-augustprizedraw' },
    { label: 'Gumgum Desktop', url: 'https://my.cavai.com/creatives/51766-52563-53513-81854/build#design' },
    { label: 'FinancialLease', url: 'https://my.cavai.com/creatives/51507-52123-52810-75567/banner/08d325b585a8e611ea706e8a87c0fef1' },
    { label: 'License Banners', url: 'https://my.cavai.com/creatives/51542-52171-52871-76385/banner/7f5a5f3f4cb42560acce337bfb478a7b' },
    { label: 'Demo', url: 'https://c.ggops.com/adbuilder/demos/83287/1754035818252_ad.html' },
  ],

  // ── Oktober 2025 ──
  'cv-2025-oktober-specsavers-responsive-slider': [
    { label: 'Preview', url: 'https://my.cavai.com/creatives/51549-52656-53631-83746/banner/e0fd50d10780104fa018ba605a356948' },
  ],

  // ── NRK article ──
  // Note: this _id may need adjustment — check if ezzari item exists with this slug
  // From Pages doc: "9. mai - Ezzari - Nabolaget nevnt i artikkel (NRK Kultur)"
  // This might be in the journal, not CV. Skipping for now.
}

// ── Run ──────────────────────────────────────────────────

const ids = Object.keys(mapping)
const query = `*[_type == "cvItem" && _id in [${ids.map((id) => `"${id}"`).join(',')}]] { _id, links }`
const queryUrl = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(query)}`
const queryRes = await fetch(queryUrl, { headers: { Authorization: `Bearer ${TOKEN}` } })
const { result: docs } = await queryRes.json()

console.log(`Found ${docs.length} of ${ids.length} items in Sanity`)

const notFound = ids.filter((id) => !docs.some((d) => d._id === id))
if (notFound.length) {
  console.log(`\nNot found in Sanity (check IDs):`)
  notFound.forEach((id) => console.log(`  - ${id}`))
}

const mutations = []
let skipped = 0

for (const doc of docs) {
  const newLinks = mapping[doc._id]
  if (!newLinks) continue

  const existingLinks = doc.links || []
  const toAdd = newLinks.filter(
    (nl) => !existingLinks.some((el) => el.url === nl.url)
  )

  if (toAdd.length === 0) {
    skipped++
    continue
  }

  const merged = [
    ...existingLinks,
    ...toAdd.map((l) => ({
      _type: 'object',
      _key: Math.random().toString(36).slice(2, 10),
      label: l.label,
      url: l.url,
    })),
  ]

  mutations.push({
    patch: { id: doc._id, set: { links: merged } },
  })
}

if (mutations.length === 0) {
  console.log(`\nNo updates needed (${skipped} already had links).`)
  process.exit(0)
}

console.log(`\nAdding links to ${mutations.length} CV items (${skipped} already had links)...`)

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
