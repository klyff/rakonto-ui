import { useState, useEffect } from 'react'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

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
    const client = Stomp.over(new SockJS(`/api/ws?jwt=${getToken()}`, null))
    client.onConnect = frame => {
      console.log('connected', frame)
      client.subscribe('/user/queue/video-progess', msg => {
        console.log('msg', msg)
        setFileStatus(msg.body)
      })
    }
    client.activate()
    return () => {
      client.deactivate()
    }
  }, [])

  return { fileStatus }
}
