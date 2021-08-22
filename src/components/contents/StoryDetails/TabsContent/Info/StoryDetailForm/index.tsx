import React, { useState } from 'react'
import { Input, TextArea, Select } from '@root/components/suport/FormFields'
import AddCollectionFormModal from '@root/components/modals/AddCollectionFormModal'
import { useCollectionList } from './useCollectionList'
import { Button } from 'semantic-ui-react'
import { CollectionArea } from './style'
import { CollectionType } from '@root/types'
import { useFormikContext } from 'formik'

const StoryDetailForm: React.FC = () => {
  const { collectionList, isLoading, setCollectionList } = useCollectionList()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { setFieldValue } = useFormikContext()

  const handleClose = (collection?: CollectionType) => {
    if (collection) {
      setCollectionList([{ key: collection.id, value: collection.id, text: collection.title }, ...collectionList])
      setFieldValue('collections', collection.id)
    }
    setOpenModal(false)
  }

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
      <CollectionArea>
        <Select
          loading={isLoading}
          options={collectionList}
          label="Collection"
          name="collections"
          placeholder="Select"
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        />
        <div>
          <Button id="publish" type="button" primary={true} onClick={() => setOpenModal(true)}>
            New collection
          </Button>
        </div>
      </CollectionArea>
      <AddCollectionFormModal open={openModal} onClose={handleClose} />
    </>
  )
}

export default StoryDetailForm
