import { useState } from 'react'
import { api } from '@root/api'

export interface Item {
  key: number
  value: string
}

export const useLoadStories = (): {
  loading: boolean
  items: Item[]
  hasNextPage: boolean
  error: Error | undefined
  loadMore: () => void
} => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<Item[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [error, setError] = useState<Error | undefined>()

  async function loadMore() {
    setLoading(true)
    try {
      const data = await api.searchStories()
      setItems(current => [...current, ...(data as Item[])])
      setHasNextPage(true)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, items, hasNextPage, error, loadMore }
}
