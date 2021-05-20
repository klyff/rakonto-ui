import * as React from 'react'
import { api } from '@root/api'

export interface Item {
  key: number
  value: string
}

export const useLoadStories = () => {
  const [loading, setLoading] = React.useState(false)
  const [items, setItems] = React.useState<Item[]>([])
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(true)
  const [error, setError] = React.useState<Error>()

  async function loadMore() {
    setLoading(true)
    try {
      const data = await api.searchStories()
      setItems(current => [...current, ...data])
      setHasNextPage(true)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, items, hasNextPage, error, loadMore }
}
