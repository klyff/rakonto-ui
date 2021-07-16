import React, { useCallback, useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import StoryDetailForm from './StoryDetailForm'
import { useHistory } from 'react-router-dom'
import { Footer, Layout } from './style'
import CoverDropArea from './CoverDropArea'
import { CollectionType, StoryType, StoryUpdateType, WatcherType } from '@root/types'
import { Formik, Form } from 'formik'
import LoadingArea from '@root/components/suport/LoadingArea'
import { ColumnPreview, ColumnForm } from '../style'

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

  const { title = '', published = false, collections = [], watchers = [], description = '', cover = { id: '' } } = story

  const [coverId, setCoverId] = useState<string | undefined>()

  const submit = useCallback(
    async (values: iformikValues) => {
      const newValues: Partial<StoryUpdateType> = {
        coverId: coverId,
        title: values.title,
        description: values.description,
        collections: values.collections
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
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ isSubmitting, handleSubmit }) => (
          <Form style={{ height: '100%' }}>
            <Layout>
              <ColumnForm>
                <StoryDetailForm />
              </ColumnForm>
              <ColumnPreview>
                {children}
                <CoverDropArea onIdChange={setCoverId} cover={cover} />
              </ColumnPreview>
            </Layout>
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
