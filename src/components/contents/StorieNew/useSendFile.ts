import { useState } from 'react'
import { api } from '@root/api'

export interface Item {
  key: number
  value: string
}

export const useSendFile = () => {
  const [progress, setProgress] = useState<number>(0)
  const [resultId, setResultId] = useState<string>('')

  const sendFile = async (file: File) => {
    const { id } = await api.postVideoFile(file, event => {
      setProgress(Math.round((event.loaded * 100) / event.total))
    })
    setResultId(id)
  }

  return { sendFile, resultId, progress }
}
