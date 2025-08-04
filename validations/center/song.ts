import { SONG_STATUS } from '@/utils/constants/Song'
import { textSchema } from '../index'
import { z } from 'zod'

const statuses = [
  SONG_STATUS.DRAFT,
  SONG_STATUS.PUBLISHED,
  SONG_STATUS.REJECTED,
  SONG_STATUS.PENDING,
] as const

const statusEnum = z.enum(statuses)

export const songSchema = z.object({
  id: z.string().optional(),
  title: textSchema.describe('Song Title'),
  lwc: z.string().optional().nullable(),
  lwcIntro: z.string().optional().nullable(),
  chords: z.string().optional().nullable(),
  status: statusEnum.optional(),
  artistId: z.string(),
  createdBy: z.string(),
})

export type SongFormData = z.infer<typeof songSchema>

export type CreateSongData = Omit<SongFormData, 'id'>
