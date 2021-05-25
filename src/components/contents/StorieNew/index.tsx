import React from 'react'
import Upload from './Upload'
import { useHistory, useLocation } from 'react-router-dom'
import { parse, stringify } from 'qs'
import { useSendFile } from './useSendFile'
import { useFileStatus } from './useFileStatus'
import { useRecoilValue } from 'recoil'
import { fileIdState } from './state'

export type Steps = 'videoDetails'

const StorieNew: React.FC = () => {
  const { pathname, search } = useLocation()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { step: currentStep } = parsedQs
  const history = useHistory()

  const fileId = useRecoilValue(fileIdState)

  const { sendFile, progress } = useSendFile()
  const { fileStatus } = useFileStatus()

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

  return (
    <>
      <Upload handleNext={nextStep} sendFile={sendFile} />
    </>
  )
}

export default StorieNew
