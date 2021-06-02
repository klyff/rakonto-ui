import React, { useEffect } from 'react'
import { useStoryStatus } from './useStoryStatus'
import { Icon, Progress, Header, SemanticICONS } from 'semantic-ui-react'
import { StatusBoxWrapper } from './style'
import { MediaType } from '@root/types'

interface iStatusBox {
  type?: MediaType
  videoId?: string
  onComplete?: () => void
}
const StatusBox: React.FC<iStatusBox> = ({ type, videoId, onComplete }) => {
  const { storyProgress } = useStoryStatus(videoId)

  useEffect(() => {
    if (onComplete && storyProgress === 100) onComplete()
  }, [storyProgress])

  return (
    <StatusBoxWrapper>
      <Icon name={`file${type ? ` ${type.toLowerCase()}` : ''}` as SemanticICONS} size="huge" />
      <div>
        <Header>File processing....</Header>
        <Progress percent={storyProgress} success active size="small" progress="percent" />
      </div>
    </StatusBoxWrapper>
  )
}

export default StatusBox
