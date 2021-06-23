import { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import SockeJS from 'sockjs-client'
import { useSetRecoilState } from 'recoil'
import { mediaStatusState } from '@root/states/mediaStatusState'

export const useMediaStatus = (): void => {
  const [client] = useState<Client>(new Client())
  const setMediaStatusState = useSetRecoilState(mediaStatusState)

  const getToken = () => {
    const tokenItem = localStorage.getItem('token')
    return tokenItem ? JSON.parse(tokenItem) : null
  }

  client.configure({
    webSocketFactory: () => new SockeJS(`/api/ws?jwt=${getToken()}`),
    onConnect: () => {
      client.subscribe('/user/queue/media-progress', (message: { body: string }) => {
        const { total, current, id, payload, finished } = JSON.parse(message.body)
        const progress = Math.round((current / total) * 100)
        setMediaStatusState(value => {
          return {
            ...value,
            [id]: {
              progress,
              payload,
              finished
            }
          }
        })
      })
    }
  })

  useEffect(() => {
    client.activate()
    return () => {
      client.deactivate()
    }
  }, [])
}
