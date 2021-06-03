import React, { useState } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import StoryDetailForm from './StoryDetailForm'
import { Link, useParams } from 'react-router-dom'
import StatusBox from './StatusBox'
import { useGetStory } from './useGetStory'
import VideoPlayer from '@root/components/suport/VideoPlayer'
import LoadingArea from '@root/components/suport/LoadingArea'
import { PreviewBox, ColumnContainer, ColumnPreview, ColumnForm } from './style'
import CoverDropArea from './CoverDropArea'

const StoryDetails: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const { type, ready, video, cover, refresh, isLoading, thumbnail } = useGetStory(storyId)
  const [coverId, setCoverId] = useState<string | undefined>(undefined)

  const handleUploadFinish = (coverId: string | undefined) => {
    setCoverId(coverId)
  }

  return (
    <LoadingArea isLoading={isLoading}>
      <Link to={'/a/home'}>
        <Icon name="arrow left" />
        Back
      </Link>
      <Header as="h1">Story</Header>
      <ColumnContainer>
        <ColumnForm>
          <StoryDetailForm />
        </ColumnForm>
        <ColumnPreview>
          <PreviewBox>
            <>
              {!ready && <StatusBox type={type} videoId={video?.id} onComplete={() => refresh()} />}
              {ready && <VideoPlayer video={video} cover={cover} />}
            </>
          </PreviewBox>
          <CoverDropArea handledUploadFinish={handleUploadFinish} thumbnailSrc={thumbnail} />
        </ColumnPreview>
        <ColumnForm>
          <StoryDetailForm />
        </ColumnForm>
      </ColumnContainer>
    </LoadingArea>
  )
}

export default StoryDetails
