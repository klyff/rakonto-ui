import { useCallback, useEffect, useState } from 'react'
import { api } from '@root/api'
import { StoryType } from '@root/types'

export const useGetStory = (storyId: string) => {
  const [story, setStory] = useState<StoryType | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await api.getStory(storyId)
      setStory(result)
    } finally {
      setIsLoading(false)
    }
  }, [storyId])

  useEffect(() => {
    refresh()
  }, [])

  return { ...story, refresh, isLoading }
}
