import React, { useState, createContext, useEffect } from 'react'
import { Client } from '@stomp/stompjs'
import SockeJS from 'sockjs-client'
import Cookies from 'js-cookie'

export const SocketConnectorContext = createContext<{ connected: boolean; client: Client }>({
  connected: false,
  client: new Client()
})

export const SocketConnectorProvider: React.FC = ({ children }) => {
  const token = Cookies.get('token')

  const [connected, setConnected] = useState<boolean>(false)
  const [client] = useState<Client>(
    new Client({
      webSocketFactory: () => new SockeJS(`/api/a/ws?jwt=${token}`),
      onConnect: () => setConnected(true)
    })
  )

  useEffect(() => {
    client.activate()
    return () => {
      client.deactivate()
    }
  }, [])

  return <SocketConnectorContext.Provider value={{ connected, client }}>{children}</SocketConnectorContext.Provider>
}
