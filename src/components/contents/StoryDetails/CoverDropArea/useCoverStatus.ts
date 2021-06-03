import { useCallback, useEffect, useRef, useState } from 'react'
import { Client } from '@stomp/stompjs'
import SockeJS from 'sockjs-client'

export const useCoverStatus = (coverId?: string, callback?: (id: string) => void) => {
  const [coverProgress, setCoverProgress] = useState<number>(0)
  const coverIdRef = useRef<string | undefined | null>(null)
  const [isProcessingCover, setIsProcessingCover] = useState<boolean>(false)
  const [client] = useState<Client>(new Client())

  const getToken = () => {
    const tokenItem = localStorage.getItem('token')
    return tokenItem ? JSON.parse(tokenItem) : null
  }

  const startProcess = useCallback(() => {
    setIsProcessingCover(true)
    client.configure({
      webSocketFactory: () => new SockeJS(`/api/ws?jwt=${getToken()}`),
      onConnect: () => {
        client.subscribe('/user/queue/media-progress', (message: { body: string }) => {
          const { total, current, id } = JSON.parse(message.body)
          if (!coverIdRef.current) return
          if (coverIdRef.current !== id) return
          const progress = Math.round((current / total) * 100)
          setCoverProgress(progress)
          if (current === total) setIsProcessingCover(false)
          if (callback) callback(id)
        })
      }
    })
    client.activate()
  }, [client, coverId, callback])

  useEffect(() => {
    coverIdRef.current = coverId
  }, [coverIdRef, coverId])

  useEffect(() => {
    if (!isProcessingCover && client.connected) {
      client.deactivate()
    }
  }, [isProcessingCover, client])

  return { coverProgress, isProcessingCover, startProcess }
}
