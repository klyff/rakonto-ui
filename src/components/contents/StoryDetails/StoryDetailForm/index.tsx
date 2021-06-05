import React, { useState } from 'react'
import { Input, TextArea, Select } from '@root/components/suport/FormFields'
import { useCollectionList } from './useCollectionList'
import { ColumnForm, ColumnPreview, FormColumnsArea } from './style'
import { Header, Segment, SegmentGroup, Button } from 'semantic-ui-react'
import Whatchers from './Whatchers'
import { WatcherType } from '@root/types'
import { useField, useFormikContext } from 'formik'
import { api } from '@root/api'

interface StoryDetailForm {
  watchers: WatcherType[]
}

const StoryDetailForm: React.FC<StoryDetailForm> = ({ children, watchers: initialWatchers }) => {
  const { collectionList, isLoading } = useCollectionList()
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

  return (
    <FormColumnsArea>
      <ColumnForm>
        <Input
          name="title"
          placeholder="Add a title"
          label="Title"
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        />
        <TextArea
          name="description"
          label="Description"
          placeholder="Talk about your video"
          rows={10}
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        />
        <Select
          loading={isLoading}
          options={collectionList}
          label="Collections"
          multiple
          name="collections"
          placeholder="Select"
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        />
      </ColumnForm>
      <ColumnPreview>{children}</ColumnPreview>
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
          <Segment>
            <Whatchers list={watchersShareField.value} onRemoveWatcher={onRemoveWatcher} />
          </Segment>
        </SegmentGroup>
      </ColumnForm>
    </FormColumnsArea>
  )
}

export default StoryDetailForm
