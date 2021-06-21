import { useState } from 'react'
import { api } from '@root/api'
import { PersonType } from '@root/types'

interface iUsePeopleApi {
  getPersonList: (name: string) => void
  clearPersonList: () => void
  addPerson: (storyId: string, personId: string) => void
  removePerson: (storyId: string, personId: string) => void
  personList: PersonType[]
  loadingPeopleList: boolean
}

export const usePeopleApi = (): iUsePeopleApi => {
  const [personList, setPersonList] = useState<PersonType[]>([])
  const [loadingPeopleList, setLoadingPeopleList] = useState<boolean>(false)

  const addPerson = async (storyId: string, personId: string) => {
    await api.addPersonToStory(storyId, personId)
  }

  const removePerson = async (storyId: string, personId: string) => {
    await api.removePersonFromStory(storyId, personId)
  }

  const clearPersonList = () => {
    setPersonList([])
  }

  const getPersonList = async (name: string) => {
    setLoadingPeopleList(true)
    try {
      if (!name) {
        setPersonList([])
        return
      }
      const result = await api.getPersons(0, 1000, name)
      setPersonList(result.content)
    } finally {
      setLoadingPeopleList(false)
    }
  }

  return {
    getPersonList,
    personList,
    loadingPeopleList,
    removePerson,
    addPerson,
    clearPersonList
  }
}
