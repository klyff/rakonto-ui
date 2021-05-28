import { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import SockeJS from 'sockjs-client'

export const useStoryStatus = () => {
  const [fileStatus, setFileStatus] = useState<number>(0)
  const [client] = useState<Client>(new Client())

  const getToken = () => {
    const tokenItem = localStorage.getItem('token')
    return tokenItem ? JSON.parse(tokenItem) : null
  }

  client.configure({
    webSocketFactory: () => new SockeJS(`/api/ws?jwt=${getToken()}`),
    onConnect: () => {
      client.subscribe('/queue/media-progress', (message: { body: string }) => {
        console.log(JSON.parse(message.body))
        setFileStatus(JSON.parse(message.body))
      })
    }
  })

  useEffect(() => {
    client.activate()
    return () => {
      client.deactivate()
    }
  }, [])

  return { fileStatus }
}
