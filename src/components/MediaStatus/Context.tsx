import React, { useState, createContext, useEffect } from 'react'
import { iMediaStatus } from './index'
import { Client } from '@stomp/stompjs'
import SockeJS from 'sockjs-client'

// @ts-ignore
export const MediaStatusContext = createContext<{
  store: Partial<iMediaStatus>
}>({
  store: {}
})

export const MediaStatusProvider: React.FC = ({ children }) => {
  const [client] = useState<Client>(new Client())
  const [status, setStatus] = useState<iMediaStatus>({})

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
    <MediaStatusContext.Provider
      value={{
        store: status
      }}
    >
      {children}
    </MediaStatusContext.Provider>
  )
}
