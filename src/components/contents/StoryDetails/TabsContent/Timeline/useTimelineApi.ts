import { api } from '@root/api'
import { TimelineFormType } from '@root/types'

interface iUsePeopleApi {
  addOccurency: (data: TimelineFormType) => void
  removeOccurency: (timelineId: string) => void
}

export const useTimelineApi = (): iUsePeopleApi => {
  const addOccurency = async (data: TimelineFormType) => {
    await api.createTimeline(data)
  }

  const removeOccurency = async (timelineId: string) => {
    await api.deleteTimeline(timelineId)
  }

  return {
    addOccurency,
    removeOccurency
  }
}
