import React, { useState } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { SubmitButton } from 'formik-semantic-ui-react'
import StoryDetailForm from './StoryDetailForm'
import { Link, useParams } from 'react-router-dom'
import StatusBox from './StatusBox'
import { useApiStory } from './useApiStory'
import VideoPlayer from '@root/components/suport/VideoPlayer'
import LoadingArea from '@root/components/suport/LoadingArea'
import { PreviewBox, Footer } from './style'
import { ContentArea } from '../style'
import CoverDropArea from './CoverDropArea'
import { CollectionType, StoryUpdateType, WatcherType } from '@root/types'
import { Formik, FormikValues, Form } from 'formik'
import schema from './schema'

const StoryDetails: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const { story, isLoading, getStory, updateStory } = useApiStory(storyId)
  const { title = '', collections = [], watchers = [], description = '', type, ready, video, cover, thumbnail } = story
  const [coverId, setCoverId] = useState<string | undefined>('')

  const handleUploadFinish = (coverId: string | undefined) => {
    setCoverId(coverId)
  }

  const submit = async (values: FormikValues) => {
    const newValues: Partial<StoryUpdateType> = {
      coverId,
      title: values.title,
      description: values.description,
      watchersToAdd: values.watchers.map((watcher: WatcherType) => watcher.email),
      watchersToRemove: watchers
        ?.filter((watcher: WatcherType) => {
          return !values.watchers.some((item: WatcherType) => item.email === watcher.email)
        })
        .map((watcher: WatcherType) => watcher.email),
      collectionsToAdd: values.collections.map((collection: CollectionType) => collection.id),
      collectionsToRemove: collections
        ?.filter((collection: CollectionType) => {
          return !values.collections.some((item: CollectionType) => item.id === collection.id)
        })
        .map((collection: CollectionType) => collection.id)
    }
    await updateStory(newValues)
  }

  return (
    <LoadingArea isLoading={isLoading}>
      <ContentArea>
        <Formik
          initialValues={{
            title: title || '',
            collections: collections?.map(item => item.id) || [],
            watchers: watchers || [],
            description: description || ''
          }}
          onSubmit={submit}
          validationSchema={schema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Link to={'/a/home'}>
                <Icon name="arrow left" />
                Back
              </Link>
              <Header as="h1">Story</Header>
              <StoryDetailForm watchers={watchers}>
                <PreviewBox>
                  <>
                    {!ready && <StatusBox type={type} videoId={video?.id} onComplete={() => getStory()} />}
                    {ready && <VideoPlayer video={video} cover={cover} />}
                  </>
                </PreviewBox>
                <CoverDropArea handledUploadFinish={handleUploadFinish} thumbnailSrc={thumbnail} />
              </StoryDetailForm>
              <Footer>
                <SubmitButton primary loading={isSubmitting}>
                  Save
                </SubmitButton>
              </Footer>
            </Form>
          )}
        </Formik>
      </ContentArea>
    </LoadingArea>
  )
}

export default StoryDetails
