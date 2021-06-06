import { useState } from 'react'
import { Pageable } from '@root/types'

export interface Item {
  key: number
  value: string
}

export const usePageableRequest = <T>({
  size,
  request
}: {
  size: number
  request: (page: number, size: number) => Promise<Pageable<T>>
}): {
  loading: boolean
  items: T[]
  hasNextPage: boolean
  error: Error | undefined
  loadMore: () => void
} => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<T[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [error, setError] = useState<Error | undefined>()
  const [page, setPage] = useState<number>(0)

  async function loadMore() {
    setLoading(true)
    try {
      const { content, last } = await request(page, size)
      setPage(page + 1)
      setItems(current => [...current, ...content])
      setHasNextPage(!last)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, items, hasNextPage, error, loadMore }
}
