import { useCallback, useEffect, useState } from 'react'
import { api } from '@root/api'
import { StoryType, StoryUpdateType } from '@root/types'

export const useApiStory = (
  storyId: string
): {
  story: Partial<StoryType>
  updateStory: (data: Partial<StoryUpdateType>) => void
  getStory: () => void
  isLoading: boolean
  isSaving: boolean
} => {
  const [story, setStory] = useState<Partial<StoryType>>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(true)

  const getStory = useCallback(async () => {
    setIsLoading(true)
    try {
      setStory(await api.getStory(storyId))
    } finally {
      setIsLoading(false)
    }
  }, [storyId])

  const updateStory = useCallback(
    async (data: Partial<StoryUpdateType>) => {
      setIsSaving(true)
      try {
        setStory(await api.updateStory(storyId, data))
      } finally {
        setIsSaving(false)
      }
    },
    [storyId]
  )

  useEffect(() => {
    getStory()
  }, [])

  return { story, updateStory, getStory, isLoading, isSaving }
}
