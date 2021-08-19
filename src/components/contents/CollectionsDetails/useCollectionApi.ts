import { api } from '@root/api'
import { CollectionFormType, CollectionType } from '@root/types'
import { useEffect, useState } from 'react'

interface iUseCollectionApi {
  getCollection: () => Promise<void>
  updateCollection: (data: CollectionFormType) => Promise<void>
  isLoading: boolean
  collection?: CollectionType
}

export const useCollectionApi = (id: string): iUseCollectionApi => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [collection, setCollection] = useState<CollectionType | undefined>(undefined)

  const getCollection = async (): Promise<void> => {
    setIsLoading(true)
    const collection = await api.getCollection(id)
    setCollection(collection)
    setIsLoading(false)
  }

  const updateCollection = async (data: CollectionFormType): Promise<void> => {
    const collection = await api.updateCollection(id, data)
    setCollection(collection)
  }

  useEffect(() => {
    getCollection()
  }, [])

  return {
    getCollection,
    collection,
    isLoading,
    updateCollection
  }
}
