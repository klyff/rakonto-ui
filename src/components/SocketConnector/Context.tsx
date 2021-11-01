import React, { useState, createContext, useEffect } from 'react'
import { iSocketConnector } from './index'
import { Client } from '@stomp/stompjs'
import SockeJS from 'sockjs-client'
import Cookies from 'js-cookie'

// @ts-ignore
export const SocketConnectorContext = createContext<{
  store: iSocketConnector
}>({
  store: {}
})

export const SocketConnectorProvider: React.FC = ({ children }) => {
  const [client] = useState<Client>(new Client())
  const [status, setStatus] = useState<iSocketConnector>({})
  const [conneted, setConnected] = useState<boolean>(false)

  const token = Cookies.get('token')

  client.configure({
    webSocketFactory: () => new SockeJS(`/api/ws?jwt=${token}`),
    onConnect: () => {
      setConnected(true)
    }
  })

  useEffect(() => {
    if (!conneted) return
    client.subscribe('/user/queue/media-progress', (message: { body: string }) => {
      const { type, payload: data } = JSON.parse(message.body)
      const { total, current, id, payload, finished, title } = data
      const progress = Math.round((current / total) * 100)
      setStatus(value => {
        return {
          ...value,
          [id]: {
            progress,
            payload,
            finished,
            title
          }
        }
      })
    })
  }, [conneted, setStatus, status])

  useEffect(() => {
    client.activate()
    return () => {
      client.deactivate()
    }
  }, [])

  return (
    <SocketConnectorContext.Provider
      value={{
        store: status
      }}
    >
      {children}
    </SocketConnectorContext.Provider>
  )
}
