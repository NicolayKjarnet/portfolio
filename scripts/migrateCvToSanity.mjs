/**
 * One-time migration: push cvData.js entries into Sanity as cvItem documents.
 *
 * Usage: node scripts/migrateCvToSanity.mjs
 */

import { cvData } from './cvData.js'
import { config } from 'dotenv'
config()

const PROJECT_ID = process.env.SANITY_PROJECT_ID
const DATASET = process.env.SANITY_DATASET
const TOKEN = process.env.SANITY_TOKEN
const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

const mutations = []
let counter = 0

for (const yearBlock of cvData) {
  for (const monthBlock of yearBlock.entries) {
    monthBlock.items.forEach((item, idx) => {
      counter++
      const slug = (item.title || '')
        .toLowerCase()
        .replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'aa')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 60)

      const monthSlug = monthBlock.month.toLowerCase()
        .replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'aa')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

      const id = `cv-${yearBlock.year}-${monthSlug}-${slug}`

      const doc = {
        _id: id,
        _type: 'cvItem',
        year: yearBlock.year,
        month: monthBlock.month,
        sortOrder: idx,
        title: item.title,
        category: item.category || 'other',
        isMilestone: (item.tags || []).includes('milestone'),
      }

      if (item.client) doc.client = item.client
      if (item.tags) doc.tags = item.tags.filter((t) => t !== 'milestone')
      if (item.roles) doc.roles = item.roles
      if (item.links) {
        doc.links = item.links.map((l) => ({
          _type: 'object',
          _key: Math.random().toString(36).slice(2, 10),
          label: l.label,
          url: l.url,
        }))
      }
      if (item.video) {
        doc.videoSrc = item.video.src
        if (item.video.chapters) {
          doc.videoChapters = item.video.chapters.map((c) => ({
            _type: 'object',
            _key: Math.random().toString(36).slice(2, 10),
            time: c.time,
            label: c.label,
          }))
        }
      }

      mutations.push({ createOrReplace: doc })
    })
  }
}

console.log(`Migrating ${mutations.length} CV items to Sanity...`)

// Sanity accepts max ~100 mutations at a time, batch them
const BATCH_SIZE = 50
for (let i = 0; i < mutations.length; i += BATCH_SIZE) {
  const batch = mutations.slice(i, i + BATCH_SIZE)
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations: batch }),
  })

  const result = await response.json()
  if (!response.ok) {
    console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, result)
    process.exit(1)
  }
  console.log(`  Batch ${i / BATCH_SIZE + 1}: ${batch.length} items OK`)
}

console.log(`Done! ${mutations.length} CV items created/updated.`)
