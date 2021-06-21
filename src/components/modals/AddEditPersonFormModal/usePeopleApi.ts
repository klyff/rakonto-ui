import { api } from '@root/api'
import { PersonFormType } from '@root/types'

interface iUsePeopleApi {
  createPerson: (data: PersonFormType) => void
  updatePerson: (id: string, data: PersonFormType) => void
}

export const usePeopleApi = (): iUsePeopleApi => {
  const createPerson = async (data: PersonFormType) => {
    await api.createPerson(data)
  }

  const updatePerson = async (id: string, data: PersonFormType) => {
    await api.updatePerson(id, data)
  }

  return {
    updatePerson,
    createPerson
  }
}
