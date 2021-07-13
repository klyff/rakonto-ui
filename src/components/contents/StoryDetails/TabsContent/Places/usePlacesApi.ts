import { api } from '@root/api'
import { PlaceFormType } from '@root/types'

interface iUsePeopleApi {
  addPlace: (data: PlaceFormType) => void
  removePlace: (placeId: string) => void
}

export const usePlacesApi = (): iUsePeopleApi => {
  const addPlace = async (data: PlaceFormType) => {
    await api.createPlace(data)
  }

  const removePlace = async (placeId: string) => {
    await api.deletePlace(placeId)
  }

  return {
    addPlace,
    removePlace
  }
}
