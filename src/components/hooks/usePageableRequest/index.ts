import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Pageable } from '../../../lib/types'

export interface Item {
  key: number
  value: string
}

export const usePageableRequest = <T>({
  size,
  q,
  request
}: {
  size: number
  q: string
  request: (page: number, size: number, q?: string) => Promise<Pageable<T>>
}): {
  loading: boolean
  items: T[]
  hasNextPage: boolean
  error: Error | undefined
  loadMore: () => void
  reload: () => void
  setItems: Dispatch<SetStateAction<T[]>>
} => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<T[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [error, setError] = useState<Error | undefined>()
  const [page, setPage] = useState<number>(0)

  async function reload() {
    setLoading(true)
    try {
      const { content, last } = await request(0, size, q as string)
      setPage(0)
      setItems(content)
      setHasNextPage(!last)
    } catch (err) {
      // @ts-ignore
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  async function loadMore() {
    setLoading(true)
    try {
      const { content, last } = await request(page, size, q as string)
      setPage(page + 1)
      setItems(current => [...current, ...content])
      setHasNextPage(!last)
    } catch (err) {
      // @ts-ignore
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, items, hasNextPage, error, loadMore, reload, setItems }
}
