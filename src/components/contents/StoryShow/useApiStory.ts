import { useCallback, useEffect, useState } from 'react'
import { api } from '@root/api'
import { StoryType } from '@root/types'

export const useApiStory = (
  storyId: string
): {
  story: Partial<StoryType>
  isLoading: boolean
  getStory: () => void
} => {
  const [story, setStory] = useState<Partial<StoryType>>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getStory = useCallback(async () => {
    setIsLoading(true)
    try {
      setStory(await api.getStory(storyId))
    } finally {
      setIsLoading(false)
    }
  }, [storyId])

  useEffect(() => {
    getStory()
  }, [])

  return { story, isLoading, getStory }
}
