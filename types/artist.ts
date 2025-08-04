import { ArtistStatus } from '@prisma/client'

export interface CreateArtistData {
  name: string
  nameSlug: string
  website?: string | null
  youtube?: string | null
  youtubeMusic?: string | null
  spotify?: string | null
  appleMusic?: string | null
  image?: string | null
  status?: ArtistStatus | undefined
}

export interface Artist extends CreateArtistData {
  id: bigint
  createdAt: Date | null
  updatedAt: Date | null
}
