import { useEffect, useState } from 'react'
import { api } from '@root/api'
import { StoryType } from '@root/types'

export const useGetStory = (storyId: string) => {
  const [story, setStory] = useState<StoryType | undefined>(undefined)

  useEffect(() => {
    const get = async () => {
      const result = await api.getStory(storyId)
      setStory(result)
    }
    get()
  }, [])

  return { ...story }
}
