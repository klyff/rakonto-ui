import React from 'react'
import { Input, TextArea, Select } from '@root/components/suport/FormFields'
import { useCollectionList } from './useCollectionList'

const StoryDetailForm: React.FC = () => {
  const { collectionList, isLoading } = useCollectionList()

  return (
    <>
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
        rows={26}
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
    </>
  )
}

export default StoryDetailForm
