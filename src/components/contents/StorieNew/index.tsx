import React from 'react'
import Upload from './Upload'
import { useHistory, useLocation } from 'react-router-dom'
import { Progress } from 'semantic-ui-react'
import { parse, stringify } from 'qs'
import { useSendFile } from './useSendFile'
import { useFileStatus } from './useFileStatus'

export type Steps = 'videoDetails'

const StorieNew: React.FC = () => {
  const { pathname, search } = useLocation()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { step: currentStep } = parsedQs
  const history = useHistory()
  const { sendFile, progress, resultId } = useSendFile()
  const { fileStatus } = useFileStatus(resultId)

  console.log(fileStatus)

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

  if (currentStep === 'videoDetails') {
    return (
      <div>
        <Progress percent={progress} indicating />
      </div>
    )
  }
  return <Upload handleNext={nextStep} sendFile={sendFile} />
}

export default StorieNew
