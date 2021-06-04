import React from 'react'
import { Formik } from 'formik'
import { Input, TextArea, Select } from '@root/components/suport/FormFields'
import { useCollectionList } from './useCollectionList'
import { ColumnForm, ColumnPreview, Form } from './style'

interface StoryDetailForm {
  initalValues: Partial<{
    title: string
    description: string
    collections: string[]
  }>
  onChange: (values: { name: string; value: string | string[] }) => void
}

const StoryDetailForm: React.FC<StoryDetailForm> = ({ initalValues, onChange, children }) => {
  const { collectionList, isLoading } = useCollectionList()

  return (
    <>
      <Formik
        initialValues={initalValues}
        onSubmit={values => {
          console.log(values)
        }}
      >
        <Form>
          <ColumnForm>
            <Input
              name="title"
              placeholder="Add a title"
              label="Title"
              onChange={e => onChange({ name: e.target.name, value: e.target.value })}
            />
            <TextArea
              onChange={e => onChange({ name: e.target.name, value: e.target.value })}
              name="description"
              label="Description"
              placeholder="Talk about your video"
              rows={10}
            />
            <Select
              onChange={(e, data) => onChange({ name: 'collections', value: data.value as string[] })}
              loading={isLoading}
              options={collectionList}
              label="Collections"
              multiple
              name="collections"
              placeholder="Select"
            />
          </ColumnForm>
          <ColumnPreview>{children}</ColumnPreview>
          <ColumnForm>
            <div>test</div>
          </ColumnForm>
        </Form>
      </Formik>
    </>
  )
}

export default StoryDetailForm
