import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '@root/api'

export const useGetStory = () => {
  const { id } = useParams<{ id: string }>()
  const [file, setFile] = useState<unknown | null>(null)

  useEffect(() => {
    const get = async () => {
      const result = api.getStory(id)
      setFile(result)
    }
    get()
  }, [])

  return { file }
}
