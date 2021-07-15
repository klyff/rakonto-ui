import { api } from '@root/api'
import { PersonFormType, PersonType } from '@root/types'

interface iUsePeopleApi {
  createPerson: (data: PersonFormType) => Promise<PersonType>
  updatePerson: (id: string, data: PersonFormType) => Promise<PersonType>
}

export const usePeopleApi = (): iUsePeopleApi => {
  const createPerson = async (data: PersonFormType) => {
    const person = await api.createPerson(data)
    return person
  }

  const updatePerson = async (id: string, data: PersonFormType) => {
    return api.updatePerson(id, data)
  }

  return {
    updatePerson,
    createPerson
  }
}
