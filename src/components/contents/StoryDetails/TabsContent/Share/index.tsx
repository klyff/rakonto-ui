import React from 'react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { Button, Header, Segment, SegmentGroup } from 'semantic-ui-react'
import { Input, Select } from '@root/components/suport/FormFields'
import { WhatchersContainer } from './style'
import Whatchers from './Whatchers'
import { api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import { useField } from 'formik'
import { WatcherType } from '@root/types'

interface iTranscript {
  storyId: string
  refresh: () => void
}

const Share: React.FC<iTranscript> = ({ children, refresh, storyId }) => {
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [watcherShareField, watcherShareMeta] = useField('watcherShare')
  const [watchersShareField, , watchersHelper] = useField<WatcherType[]>('watchers')

  const onAddUser = async () => {
    if (
      !watcherShareField?.value ||
      watchersShareField.value.some(whatcher => whatcher.email === watcherShareField.value)
    )
      return
    const watcher = await api.getWatcher(watcherShareField.value)
    watchersHelper.setValue([...watchersShareField.value, watcher], false)
  }

  const onRemoveWatcher = async (email: string) => {
    watchersHelper.setValue([...watchersShareField.value.filter(item => item.email !== email)], false)
  }

  const resendInvite = async (email: string) => {
    try {
      await api.resendInvite(storyId, email)
      setBasicModalState({
        open: true,
        title: 'Resend email',
        content: <>Invite email sent again to {email}!</>
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Layout>
      <ColumnForm>
        <SegmentGroup>
          <Segment>
            <Header as="h4" textAlign="center">
              Choose who will be able to view your video.
            </Header>
            <Input
              name="watcherShare"
              placeholder="type an email"
              onKeyPress={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') e.preventDefault()
              }}
            />
            <Button
              type="button"
              fluid
              primary
              onClick={onAddUser}
              disabled={!watcherShareField.value || !!watcherShareMeta.error}
            >
              Share
            </Button>
          </Segment>
          <WhatchersContainer>
            <Whatchers list={watchersShareField.value} onRemoveWatcher={onRemoveWatcher} resendInvite={resendInvite} />
          </WhatchersContainer>
        </SegmentGroup>
        <Select
          options={[
            { key: 'published', value: true, text: 'Published' },
            { key: 'draft', value: false, text: 'Draft' }
          ]}
          label="Status"
          name="published"
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        />
      </ColumnForm>
      <ColumnPreview>{children}</ColumnPreview>
    </Layout>
  )
}

export default Share
