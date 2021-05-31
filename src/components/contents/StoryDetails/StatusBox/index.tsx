import React from 'react'
import { useStoryStatus } from './useStoryStatus'
import { Icon, Progress, Header, SemanticICONS } from 'semantic-ui-react'
import { StatusBoxWrapper } from './style'
import { MediaType } from '@root/types'

interface iStatusBox {
  type?: MediaType
  storyId: string
}
const StatusBox: React.FC<iStatusBox> = ({ type, storyId }) => {
  const { storyProgress } = useStoryStatus(storyId)
  return (
    <StatusBoxWrapper>
      <Icon name={`file${type ? ` ${type.toLowerCase()}` : ''}` as SemanticICONS} size="huge" />
      <div>
        <Header>File processing....</Header>
        <Progress percent={storyProgress} success active size="small" />
      </div>
    </StatusBoxWrapper>
  )
}

export default StatusBox
