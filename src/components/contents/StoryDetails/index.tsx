import React, { useCallback, useState } from 'react'
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
import { CollectionType, StoryUpdateType, WatcherType } from '@root/types'
import { Formik, Form } from 'formik'
import schema from './schema'

interface iformikValues {
  title: string
  collections: CollectionType[]
  watchers: WatcherType[]
  description: string
  watcherShare: string
  published: boolean
}

const StoryDetails: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const { story, isLoading, setStory, updateStory } = useApiStory(storyId)

  const {
    title = '',
    published = false,
    collections = [],
    watchers = [],
    description = '',
    type,
    ready,
    video,
    cover,
    thumbnail
  } = story
  const [coverId, setCoverId] = useState<string | undefined>('')

  const submit = useCallback(
    async (values: iformikValues) => {
      const newValues: Partial<StoryUpdateType> = {
        coverId: coverId,
        title: values.title,
        published: values.published,
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
    },
    [coverId]
  )

  const initialValues: iformikValues = {
    title: title || '',
    collections: collections || [],
    watchers: watchers || [],
    description: description || '',
    watcherShare: '',
    published
  }

  return (
    <LoadingArea isLoading={isLoading}>
      <ContentArea>
        <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
          {({ isSubmitting, setFieldValue, handleSubmit }) => (
            <Form>
              <Link to={'/a/stories'}>
                <Icon name="arrow left" />
                Back
              </Link>
              <Header as="h1">Story</Header>
              <StoryDetailForm watchers={watchers}>
                <PreviewBox>
                  <>
                    {!ready && (
                      <StatusBox
                        type={type}
                        videoId={video?.id}
                        onComplete={payload => {
                          setStory(value => {
                            return {
                              ...value,
                              ready: true,
                              thumbnail: payload.thumbnail,
                              video: {
                                ...value.video,
                                ...payload
                              }
                            }
                          })
                        }}
                      />
                    )}
                    {ready && <VideoPlayer video={video} cover={cover} />}
                  </>
                </PreviewBox>
                <CoverDropArea onIdChange={setCoverId} thumbnailSrc={thumbnail} />
              </StoryDetailForm>
              <Footer>
                <Button type="submit" primary id="save" loading={isSubmitting}>
                  Save
                </Button>
                <Button
                  id="publish"
                  type="button"
                  loading={isSubmitting}
                  positive
                  onClick={() => {
                    setFieldValue('published', true)
                    handleSubmit()
                  }}
                >
                  Done
                </Button>
              </Footer>
            </Form>
          )}
        </Formik>
      </ContentArea>
    </LoadingArea>
  )
}

export default StoryDetails
