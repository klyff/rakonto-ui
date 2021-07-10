import { api } from '@root/api'
import { TimelineFormType } from '@root/types'

interface iUsePeopleApi {
  addOccurrence: (data: TimelineFormType) => void
  removeOccurrence: (timelineId: string) => void
}

export const useTimelineApi = (): iUsePeopleApi => {
  const addOccurrence = async (data: TimelineFormType) => {
    await api.createTimeline(data)
  }

  const removeOccurrence = async (timelineId: string) => {
    await api.deleteTimeline(timelineId)
  }

  return {
    addOccurrence,
    removeOccurrence
  }
}
