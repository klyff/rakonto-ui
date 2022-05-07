import { useEffect, useState } from 'react'
import { format } from 'bytes'
import { UserQuotaType } from '../../../lib/types'
import api from '../../../lib/api'

const calcPercentUsage = (used: string, available: string) => {
  const usage = parseInt(used)
  const total = parseInt(available)
  return (100 * usage) / total
}

const useStorage = (): {
  storage: UserQuotaType | null
  isLoading: boolean
  refetch: () => void
} => {
  const [storage, setStorage] = useState<UserQuotaType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetch = async () => {
    setIsLoading(true)
    const value = await api.getStorageQuota()
    setStorage({
      used: format(parseInt(value.used), { unitSeparator: ' ' }),
      free: format(parseInt(value.free), { unitSeparator: ' ' }),
      available: format(parseInt(value.available), { unitSeparator: ' ' }),
      percentual: calcPercentUsage(value.used, value.available)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [])

  return { storage, isLoading, refetch: fetch }
}

export default useStorage
