import React, { useState } from 'react'
import { Header, Icon, Button } from 'semantic-ui-react'
import StoryDetailForm from './StoryDetailForm'
import { Link, useParams } from 'react-router-dom'
import StatusBox from './StatusBox'
import { useApiStory } from './useApiStory'
import VideoPlayer from '@root/components/suport/VideoPlayer'
import LoadingArea from '@root/components/suport/LoadingArea'
import { PreviewBox, Footer } from './style'
import { ContentArea } from '../style'
import CoverDropArea from './CoverDropArea'
import { StoryUpdateType } from '@root/types'

const StoryDetails: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const { story, isLoading, getStory, updateStory } = useApiStory(storyId)
  const { title = '', collections, description = '', type, ready, video, cover, thumbnail } = story
  const [updateValues, setUpdateValues] = useState<Partial<StoryUpdateType>>({})

  const handleUploadFinish = (coverId: string | undefined) => {
    setUpdateValues(oldValue => {
      return {
        ...oldValue,
        coverId
      }
    })
  }

  const onFormChange = (data: { name: string; value: string | string[] }) => {
    const { name, value } = data
    const newValues: Partial<StoryUpdateType> = {}
    if (name === 'title' && value) newValues.title = value as string
    if (name === 'description' && value) newValues.description = value as string
    if (name === 'collections' && typeof value !== 'string' && (value.length !== null || true)) {
      newValues.collectionsToAdd = value
      const collectionsToRemove = collections
        ?.filter(collection => {
          console.log('aqui')
          return !value.some(item => item === collection.id)
        })
        .map(item => item.id)
      if (collectionsToRemove?.length) newValues.collectionsToRemove = collectionsToRemove
    }
    setUpdateValues(oldValue => {
      return {
        ...oldValue,
        ...newValues
      }
    })
  }

  const handleSave = async () => {
    await updateStory(updateValues)
  }

  return (
    <LoadingArea isLoading={isLoading}>
      <ContentArea>
        <Link to={'/a/home'}>
          <Icon name="arrow left" />
          Back
        </Link>
        <Header as="h1">Story</Header>
        <StoryDetailForm
          initalValues={{
            title: title || '',
            collections: collections?.map(item => item.id) || [],
            description: description || ''
          }}
          onChange={onFormChange}
        >
          <PreviewBox>
            <>
              {!ready && <StatusBox type={type} videoId={video?.id} onComplete={() => getStory()} />}
              {ready && <VideoPlayer video={video} cover={cover} />}
            </>
          </PreviewBox>
          <CoverDropArea handledUploadFinish={handleUploadFinish} thumbnailSrc={thumbnail} />
        </StoryDetailForm>
        <Footer>
          <Button onClick={handleSave} primary>
            Save
          </Button>
        </Footer>
      </ContentArea>
    </LoadingArea>
  )
}

export default StoryDetails
