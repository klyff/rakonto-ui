import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import schema from './schema'
import FormField from '@root/components/suport/FormField'
import { useCollectionList } from './useCollectionList'

const StoryDetailForm: React.FC = () => {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const { collectionList, isLoading } = useCollectionList()

  const handleSubmit = async ({ title, description }: any) => {
    console.log('submitted')
  }

  return (
    <>
      <Formik initialValues={{ title: '', description: '' }} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormField name="title" placeholder="Add a title" errorMessage={errorMessage} label="Title" />
            <FormField
              name="description"
              label="Description"
              isTextArea={true}
              placeholder="Tell us more"
              rows={10}
              errorMessage={errorMessage}
            />
            <FormField
              placeholder="select one collection"
              label="Collections"
              isSelect
              name="collectionList"
              selectProps={{
                multiple: true,
                search: true,
                selection: true,
                options: collectionList
              }}
            />
          </Form>
        )}
      </Formik>
    </>
  )
}

export default StoryDetailForm
