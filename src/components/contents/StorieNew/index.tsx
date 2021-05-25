import React from 'react'
import Upload from './Upload'
import { useHistory, useLocation } from 'react-router-dom'
import { parse, stringify } from 'qs'
import { useSendFile } from './useSendFile'
import { useRecoilValue } from 'recoil'
import { fileIdState } from './state'
import { StompSessionProvider, useSubscription } from 'react-stomp-hooks'

export type Steps = 'videoDetails'

const WS = function <T>(Component: React.ComponentType<T>) {
  const getToken = () => {
    const tokenItem = localStorage.getItem('token')
    return tokenItem ? JSON.parse(tokenItem) : null
  }

  const ws = (props: T) => (
    <StompSessionProvider url={`/api/ws?jwt=${getToken()}`}>
      <Component {...props} />
    </StompSessionProvider>
  )

  return ws
}

const StorieNew: React.FC = () => {
  const { pathname, search } = useLocation()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { step: currentStep } = parsedQs
  const history = useHistory()

  const fileId = useRecoilValue(fileIdState)

  const { sendFile, progress } = useSendFile()

  const nextStep = (nextStep: Steps) => {
    history.replace({
      pathname,
      search: stringify(
        {
          ...parsedQs,
          step: nextStep
        },
        { addQueryPrefix: true }
      )
    })
  }

  useSubscription('/user/queue/video-progress', (message: { body: string }) => {
    console.log(JSON.parse(message.body))
  })

  return (
    <>
      <Upload handleNext={nextStep} sendFile={sendFile} />
    </>
  )
}

export default WS(StorieNew)
