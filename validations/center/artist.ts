import { ARTIST_STATUS } from '@/utils/constants/Artist'
import { textSchema } from '../index'
import { z } from 'zod'

const artistStatuses = [
  ARTIST_STATUS.DRAFT,
  ARTIST_STATUS.PUBLISHED,
  ARTIST_STATUS.REJECTED,
  ARTIST_STATUS.PENDING,
] as const

const artistEnum = z.enum(artistStatuses)

export const artistSchema = z.object({
  id: z.string().optional(),
  name: textSchema.describe('Artist Name'),
  website: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  youtubeMusic: z.string().optional().nullable(),
  spotify: z.string().optional().nullable(),
  appleMusic: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: artistEnum.optional(),
})

export type ArtistFormData = z.infer<typeof artistSchema>

export type CreateArtistData = Omit<ArtistFormData, 'id'>
