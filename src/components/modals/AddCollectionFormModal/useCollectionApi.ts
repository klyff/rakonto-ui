import { api } from '@root/api'
import { CollectionFormType, CollectionType } from '@root/types'

interface iUseCollectionApi {
  createCollection: (data: CollectionFormType) => Promise<CollectionType>
}

export const useCollectionApi = (): iUseCollectionApi => {
  const createCollection = async (data: CollectionFormType): Promise<CollectionType> => {
    const collection = await api.createCollection(data)
    return collection
  }

  return {
    createCollection
  }
}
