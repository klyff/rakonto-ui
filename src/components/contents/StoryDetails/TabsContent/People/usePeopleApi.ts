import { useState } from 'react'
import { api } from '@root/api'
import { PersonFormType } from '@root/types'

interface iUsePeopleApi {
  createPerson: (data: PersonFormType) => void
  updatePerson: (data: PersonFormType) => void
}

export const usePeopleApi = (): iUsePeopleApi => {
  const createPerson = async (data: PersonFormType) => {
    await api.createPerson(data)
  }

  const updatePerson = async (data: PersonFormType) => {
    await api.updatePerson(data)
  }

  return { updatePerson, createPerson }
}
