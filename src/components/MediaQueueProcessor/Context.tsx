import React, { useState, createContext, useEffect } from 'react'
import { iMediaQueueProcessor } from './index'
import { Client } from '@stomp/stompjs'
import SockeJS from 'sockjs-client'
import Cookies from 'js-cookie'

// @ts-ignore
export const MediaQueueProcessorContext = createContext<{
  store: Partial<iMediaQueueProcessor>
}>({
  store: {}
})

export const MediaQueueProcessorProvider: React.FC = ({ children }) => {
  const [client] = useState<Client>(new Client())
  const [status, setStatus] = useState<iMediaQueueProcessor>({})

  const token = Cookies.get('token')

  client.configure({
    webSocketFactory: () => new SockeJS(`/api/ws?jwt=${token}`),
    onConnect: () => {
      client.subscribe('/user/queue/media-progress', (message: { body: string }) => {
        const { total, current, id, payload, finished } = JSON.parse(message.body)
        const progress = Math.round((current / total) * 100)
        setStatus(value => {
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

  return (
    <MediaQueueProcessorContext.Provider
      value={{
        store: status
      }}
    >
      {children}
    </MediaQueueProcessorContext.Provider>
  )
}
