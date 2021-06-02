import { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import SockeJS from 'sockjs-client'

export const useStoryStatus = (videoId?: string) => {
  const [storyProgress, setStoryProgress] = useState<number>(0)
  const [client] = useState<Client>(new Client())

  const getToken = () => {
    const tokenItem = localStorage.getItem('token')
    return tokenItem ? JSON.parse(tokenItem) : null
  }

  client.configure({
    webSocketFactory: () => new SockeJS(`/api/ws?jwt=${getToken()}`),
    onConnect: () => {
      client.subscribe('/user/queue/media-progress', (message: { body: string }) => {
        if (!videoId) return
        const { total, current, id } = JSON.parse(message.body)
        if (videoId !== id) return
        const progress = Math.round((current / total) * 100)
        setStoryProgress(progress)
      })
    }
  })

  useEffect(() => {
    client.activate()
    return () => {
      client.deactivate()
    }
  }, [])

  return { storyProgress }
}
