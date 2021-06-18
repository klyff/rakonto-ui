import React from 'react'
import { Icon, Progress, Header, SemanticICONS } from 'semantic-ui-react'
import { StatusBoxWrapper, PreviewBox } from './style'
import { MediaType, VideoDetails, AudioDetails } from '@root/types'
import Player from '@root/components/suport/Player'

interface iStatusBox {
  type?: MediaType
  progress: number
}
const StatusBox: React.FC<iStatusBox> = ({ type, progress }) => {
  return (
    <StatusBoxWrapper>
      <Icon name={`file ${type?.toLowerCase()}` as SemanticICONS} size="huge" />
      <div>
        <Header>File processing....</Header>
        <Progress percent={progress} success active size="small" progress="percent" />
      </div>
    </StatusBoxWrapper>
  )
}

interface iPreview {
  ready?: boolean
  progress: number
  type?: MediaType
  thumbnail?: string
  media?: AudioDetails | VideoDetails
}

const Preview: React.FC<iPreview> = ({ ready, type, progress, thumbnail, media }) => {
  return (
    <PreviewBox>
      {!ready && <StatusBox type={type} progress={progress} />}
      {ready && <Player type={type} media={media} cover={thumbnail} />}
    </PreviewBox>
  )
}

export default Preview
