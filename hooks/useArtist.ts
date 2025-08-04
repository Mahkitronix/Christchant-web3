import { ApiService } from '@/utils/services/api.service'

export function useArtist() {
  const addArtist = async (payload: any) => {
    return await ApiService.post('/artists', payload)
  }

  const updateArtist = async (id: string | number, payload: any) => {
    return await ApiService.put(`/artists/${id}`, payload)
  }

  const deleteArtist = async (id: string | number) => {
    return await ApiService.delete(`/artists/${id}`)
  }

  return {
    addArtist,
    updateArtist,
    deleteArtist,
  }
}
