import React, { useCallback, useState } from 'react'
import { Button } from 'semantic-ui-react'
import StoryDetailForm from './StoryDetailForm'
import { useHistory } from 'react-router-dom'
import { Footer } from './style'
import CoverDropArea from './CoverDropArea'
import { CollectionType, StoryType, StoryUpdateType, WatcherType } from '@root/types'
import { Formik, Form } from 'formik'
import schema from './schema'
import LoadingArea from '@root/components/suport/LoadingArea'

interface iInfo {
  story: Partial<StoryType>
  updateStory: (newValues: Partial<StoryUpdateType>) => void
  isLoading: boolean
}

interface iformikValues {
  title: string
  collections: string[]
  watchers: WatcherType[]
  description: string
  watcherShare: string
  published: boolean
}

const StoryDetails: React.FC<iInfo> = ({ isLoading, story, updateStory, children }) => {
  const history = useHistory()

  const {
    id,
    title = '',
    published = false,
    collections = [],
    watchers = [],
    description = '',
    cover = { id: '' }
  } = story

  const [coverId, setCoverId] = useState<string | undefined>()

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
        collectionsToAdd: values.collections,
        collectionsToRemove: collections
          ?.filter((collection: CollectionType) => {
            return !values.collections.some((item: string) => item === collection.id)
          })
          .map((collection: CollectionType) => collection.id)
      }
      await updateStory(newValues)
    },
    [coverId]
  )

  const initialValues: iformikValues = {
    title: title || '',
    collections: collections.map((collection: CollectionType) => collection.id) || [],
    watchers: watchers || [],
    description: description || '',
    watcherShare: '',
    published
  }

  return (
    <LoadingArea isLoading={isLoading}>
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <StoryDetailForm watchers={watchers} storyId={id || ''}>
              {children}
              <CoverDropArea onIdChange={setCoverId} cover={cover} />
            </StoryDetailForm>
            <Footer>
              <Button type="submit" primary id="save" loading={isSubmitting}>
                Save
              </Button>
              <Button
                id="publish"
                type="button"
                positive
                onClick={() => {
                  handleSubmit()
                  history.push('/a/stories')
                }}
              >
                Done
              </Button>
            </Footer>
          </Form>
        )}
      </Formik>
    </LoadingArea>
  )
}

export default StoryDetails
