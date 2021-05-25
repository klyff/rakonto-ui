import { useState } from 'react'
import { api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { fileIdState } from './state'

export interface Item {
  key: number
  value: string
}

export const useSendFile = () => {
  const [progress, setProgress] = useState<number>(0)
  const setResult = useSetRecoilState(fileIdState)

  const sendFile = async (file: File) => {
    const { id } = await api.postVideoFile(file, event => {
      setProgress(Math.round((event.loaded * 100) / event.total))
    })
    setResult(id)
  }

  return { sendFile, progress }
}
