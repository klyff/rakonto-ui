import { useCallback, useEffect, useState } from 'react'
import { api } from '@root/api'
import { StoryType } from '@root/types'
import { useHistory } from 'react-router-dom'

export const useApiStory = (
  storyId: string
): {
  story: Partial<StoryType>
  isLoading: boolean
  getStory: () => void
} => {
  const [story, setStory] = useState<Partial<StoryType>>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const history = useHistory()

  const getStory = useCallback(async () => {
    setIsLoading(true)
    try {
      setStory(await api.getStory(storyId))
    } catch (error) {
      if (error.response.status === 403) {
        return history.replace('/a/403')
      }

      if (error.response.status === 404) {
        return history.replace('/a/404')
      }

      if (error.response.status === 400) {
        return history.replace('/a/404')
      }

      throw error
    } finally {
      setIsLoading(false)
    }
  }, [storyId])

  useEffect(() => {
    getStory()
  }, [storyId])

  return { story, isLoading, getStory }
}
