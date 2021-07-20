import React from 'react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { Button, Header, Segment, SegmentGroup, Checkbox, CheckboxProps } from 'semantic-ui-react'
import { WhatchersContainer, Box } from './style'
import Whatchers from './Whatchers'
import { api } from '@root/api'
import { WatcherType } from '@root/types'
import schema from './schema'
import { Form, Formik, FormikHelpers } from 'formik'
import { Input } from '@root/components/suport/FormFields'
import { toast } from 'react-semantic-toasts'

interface iTranscript {
  storyId: string
  published: boolean
  refresh: () => void
  watchers: WatcherType[]
}

interface iFormikValues {
  watcher: string
}

const Share: React.FC<iTranscript> = ({ children, refresh, published, watchers, storyId }) => {
  const handleToogle = async (e: React.FormEvent<HTMLInputElement>, { checked }: CheckboxProps) => {
    try {
      await api.publishStory(storyId, !!checked)
      refresh()
      toast({
        type: 'success',
        title: `Story ${published ? 'Published' : 'Draft'}`,
        time: 3000
      })
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message || 'Something wrong, try again!',
        time: 3000,
        description: `Error: ${error.response.data.code || 500}`
      })
    }
  }

  const submit = async ({ watcher }: iFormikValues, helpers: FormikHelpers<iFormikValues>) => {
    try {
      await api.addWatcher({ storyId, email: watcher })
      helpers.resetForm()
      refresh()
      toast({
        type: 'success',
        title: 'Watcher added',
        time: 3000
      })
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message || 'Something wrong, try again!',
        time: 3000,
        description: `Error: ${error.response.data.code || 500}`
      })
    }
  }

  const onRemoveWatcher = async (id: string) => {
    try {
      await api.removeWatcher(id)
      refresh()
      toast({
        type: 'success',
        title: 'Watcher removed',
        time: 3000
      })
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message || 'Something wrong, try again!',
        time: 3000,
        description: `Error: ${error.response.data.code || 500}`
      })
    }
  }

  const resendInvite = async (id: string) => {
    try {
      await api.notifyWatcher(id)
      refresh()
      toast({
        type: 'success',
        title: 'Invite resented',
        time: 3000
      })
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message || 'Something wrong, try again!',
        time: 3000,
        description: `Error: ${error.response.data.code || 500}`
      })
    }
  }

  const initialValues: iFormikValues = {
    watcher: ''
  }

  return (
    <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
      {({ isSubmitting }) => (
        <Form style={{ height: '100%' }}>
          <Layout>
            <ColumnForm>
              <Checkbox toggle label={published ? 'Published' : 'Draft'} onChange={handleToogle} checked={published} />
              <SegmentGroup>
                <Segment>
                  <Header as="h4" textAlign="left">
                    Choose who will be able to view your video.
                  </Header>
                  <Box>
                    <Input
                      fluid
                      name="watcher"
                      placeholder="type an email"
                      onKeyPress={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') e.preventDefault()
                      }}
                    />
                    <Button type="submit" fluid primary loading={isSubmitting}>
                      Share
                    </Button>
                  </Box>
                </Segment>
                <WhatchersContainer>
                  <Whatchers list={watchers} onRemoveWatcher={onRemoveWatcher} resendInvite={resendInvite} />
                </WhatchersContainer>
              </SegmentGroup>
            </ColumnForm>
            <ColumnPreview>{children}</ColumnPreview>
          </Layout>
        </Form>
      )}
    </Formik>
  )
}

export default Share
