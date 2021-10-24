import { Dispatch, SetStateAction, useState } from 'react'
import { Pageable } from '../../../lib/types'
import { stringify } from 'qs'

export interface Item {
  key: number
  value: string
}

export const usePageableRequest = <T>({
  size,
  request
}: {
  size: number
  request: (page: number, size: number, q?: string) => Promise<Pageable<T>>
}): {
  loading: boolean
  items: T[]
  hasNextPage: boolean
  error: Error | undefined
  loadMore: (q?: string) => void
  reload: (q?: string) => void
  setItems: Dispatch<SetStateAction<T[]>>
} => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<T[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [error, setError] = useState<Error | undefined>()
  const [page, setPage] = useState<number>(0)

  async function reload(q?: string) {
    setLoading(true)
    try {
      const query = stringify({ page: 0, size, q }, { addQueryPrefix: true })
      const { content, last } = await request(0, size, q)
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

  async function loadMore(q?: string) {
    setLoading(true)
    try {
      const query = stringify({ page, size, q }, { addQueryPrefix: true })
      const { content, last } = await request(page, size, q)
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
