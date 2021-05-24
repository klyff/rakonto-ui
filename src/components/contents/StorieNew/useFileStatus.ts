import { useState, useEffect } from 'react'
import { Client } from '@stomp/stompjs'

export interface Item {
  key: number
  value: string
}

export const useFileStatus = (id: string) => {
  const [fileStatus, setFileStatus] = useState<string>('')

  const getToken = () => {
    const tokenItem = localStorage.getItem('token')
    return tokenItem ? JSON.parse(tokenItem) : null
  }

  useEffect(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8080/api/ws?token=${getToken()}`,
      debug: str => {
        console.log(str)
      },
      onWebSocketError: e => {
        console.log(e)
      },
      onStompError: e => {
        console.log(e)
      },
      onConnect: frame => {
        console.log('connected')
        client.subscribe('/user/queue/video-progess', msg => {
          setFileStatus(msg.body)
        })
      }
    })
    client.activate()
  }, [])

  return { fileStatus }
}
