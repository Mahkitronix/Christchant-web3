import { ApiService } from '@/utils/services/api.service'

export function useSong() {
  const addSong = async (payload: any) => {
    return await ApiService.post('/songs', payload)
  }

  const updateSong = async (id: string | number, payload: any) => {
    return await ApiService.put(`/songs/${id}`, payload)
  }

  const deleteSong = async (id: string | number) => {
    return await ApiService.delete(`/songs/${id}`)
  }

  return {
    addSong,
    updateSong,
    deleteSong,
  }
}
