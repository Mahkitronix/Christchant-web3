import { ArtistRepoInterface } from '@/https/repository-interface/ArtistRepoInterface'
import { Artist, CreateArtistData } from '@/types/artist'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class ArtistRepo implements ArtistRepoInterface {
  async createArtist(data: CreateArtistData): Promise<Artist> {
    return await prisma.artist.create({
      data,
    })
  }

  async findArtistByName(name: string): Promise<Artist | null> {
    const artist = await prisma.artist.findFirst({ where: { name } })
    if (artist) {
      return {
        ...artist,
      }
    }
    return null
  }

  async findArtistById(
    id: string | number | undefined
  ): Promise<Artist | null> {
    if (!id) {
      return null
    }
    const artist = await prisma.artist.findUnique({ where: { id: Number(id) } })
    if (artist) {
      return {
        ...artist,
      }
    }
    return null
  }

  async updateArtist(
    id: string | number | undefined,
    data: CreateArtistData
  ): Promise<Artist | null> {
    if (!id) {
      return null
    }
    const artist = await prisma.artist.update({
      where: { id: Number(id) },
      data: {
        ...data,
      },
    })
    if (artist) {
      return {
        ...artist,
      }
    }
    return null
  }

  async deleteArtist(id: string | number | undefined): Promise<void> {
    if (!id) {
      return
    }
    await prisma.artist.delete({ where: { id: Number(id) } })
  }
}

export default ArtistRepo
