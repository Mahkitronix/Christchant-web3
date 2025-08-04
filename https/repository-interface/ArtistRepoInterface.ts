import { Artist, CreateArtistData } from '@/types/artist'

export interface ArtistRepoInterface {
  createArtist(data: CreateArtistData): Promise<Artist>
  findArtistByName(name: string): Promise<Artist | null>
  findArtistById(id: string | number | undefined): Promise<Artist | null>
  updateArtist(
    id: string | number | undefined,
    data: CreateArtistData
  ): Promise<Artist | null>
  deleteArtist(id: string | number | undefined): Promise<void>
}
