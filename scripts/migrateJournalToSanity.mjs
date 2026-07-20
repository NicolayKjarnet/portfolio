/**
 * One-time migration: push journalData.js entries into Sanity as journalMonth documents.
 *
 * Usage: node scripts/migrateJournalToSanity.mjs
 */

import { journalData } from './journalData.js'
import { config } from 'dotenv'
config()

const PROJECT_ID = process.env.SANITY_PROJECT_ID
const DATASET = process.env.SANITY_DATASET
const TOKEN = process.env.SANITY_TOKEN
const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

const mutations = []

for (const yearBlock of journalData) {
  for (const month of yearBlock.months) {
    const id = `journal-${yearBlock.year}-${month.name.toLowerCase()}`

    const doc = {
      _id: id,
      _type: 'journalMonth',
      year: yearBlock.year,
      month: month.name,
      content: month.content || '',
    }

    if (month.highlights && month.highlights.length > 0) {
      doc.highlights = month.highlights
    }

    if (month.setbacks && month.setbacks.length > 0) {
      doc.setbacks = month.setbacks
    }

    mutations.push({ createOrReplace: doc })
  }
}

console.log(`Migrating ${mutations.length} journal months to Sanity...`)

const response = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({ mutations }),
})

const result = await response.json()

if (response.ok) {
  console.log(`Done! ${mutations.length} documents created/updated.`)
} else {
  console.error('Migration failed:', result)
  process.exit(1)
}
