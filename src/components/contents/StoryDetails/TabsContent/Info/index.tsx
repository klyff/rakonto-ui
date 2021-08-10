import React, { useCallback, useState } from 'react'
import { Button } from 'semantic-ui-react'
import StoryDetailForm from './StoryDetailForm'
import { useHistory } from 'react-router-dom'
import { Layout, SaveButtonArea } from './style'
import CoverDropArea from './CoverDropArea'
import { CollectionType, StoryType, StoryUpdateType, WatcherType } from '@root/types'
import { Formik, Form } from 'formik'
import LoadingArea from '@root/components/suport/LoadingArea'
import { ColumnPreview, ColumnForm } from '../style'
import { toast } from 'react-semantic-toasts'

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
      try {
        await updateStory(newValues)
        toast({
          type: 'success',
          title: 'Saved',
          time: 3000
        })
      } catch (error) {
        toast({
          type: 'error',
          title: error.response.data.message,
          time: 3000,
          description: `Error: ${error.response.data.code}`
        })
      }
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
        {({ handleSubmit }) => (
          <Form>
            <Layout>
              <ColumnForm>
                <SaveButtonArea>
                  <Button
                    id="publish"
                    type="button"
                    primary={true}
                    onClick={() => {
                      handleSubmit()
                      history.push('/a/stories')
                    }}
                  >
                    Save
                  </Button>
                </SaveButtonArea>
                <StoryDetailForm />
              </ColumnForm>
              <ColumnPreview>
                {children}
                <CoverDropArea onIdChange={setCoverId} cover={cover} />
              </ColumnPreview>
            </Layout>
          </Form>
        )}
      </Formik>
    </LoadingArea>
  )
}

export default StoryDetails
