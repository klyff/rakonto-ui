import { useState, useEffect } from 'react'
import { Client } from '@stomp/stompjs'

export interface Item {
  key: number
  value: string
}

export const useFileStatus = () => {
  const [fileStatus, setFileStatus] = useState<string>('')

  const getToken = () => {
    const tokenItem = localStorage.getItem('token')
    return tokenItem ? JSON.parse(tokenItem) : null
  }

  useEffect(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8080/api/ws?jwt=${getToken()}`
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    client.onConnect(function (frame) {
      console.log('connected')
      client.subscribe('/user/queue/video-progess', function (msg) {
        console.log('msg', msg)
        setFileStatus(msg.body)
      })
    })
    client.activate()
  }, [])

  return { fileStatus }
}
