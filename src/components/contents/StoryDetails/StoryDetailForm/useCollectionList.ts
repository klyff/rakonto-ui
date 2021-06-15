import { useCallback, useEffect, useState } from 'react'
import { api } from '@root/api'
import { DropdownItemProps } from 'semantic-ui-react'

export const useCollectionList = (): {
  collectionList: DropdownItemProps[]
  isLoading: boolean
} => {
  const [collectionList, setCollectionList] = useState<DropdownItemProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetch = useCallback(async () => {
    setIsLoading(true)
    try {
      const { content } = await api.getCollections(0, 1000)
      setCollectionList(
        content.map((item: Partial<{ id: string; title: string }>): DropdownItemProps => {
          return { key: item.id, value: item.id, text: item.title }
        })
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetch()
  }, [])

  return { collectionList, isLoading }
}