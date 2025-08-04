import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'

// Initialize Prisma Client
const prisma = new PrismaClient()

// Read data from artist.json
const jsonData = JSON.parse(readFileSync('artist.json', 'utf8'))

async function seedDatabase() {
  try {
    for (const artist of jsonData) {
      await prisma.artist.upsert({
        where: { nameSlug: artist.nameSlug },
        update: {},
        create: {
          name: artist.name,
          nameSlug: artist.nameSlug,
          website: artist.website,
          youtube: artist.youtube,
          youtubeMusic: artist.youtubeMusic,
          spotify: artist.spotify,
          appleMusic: artist.appleMusic,
          status: artist.status,
          createdAt: new Date(artist.createdAt),
          updatedAt: new Date(artist.updatedAt),
        },
      })
    }
  } catch (err) {
    console.error('Error seeding database:', err)
  } finally {
    await prisma.$disconnect()
  }
}

seedDatabase()
