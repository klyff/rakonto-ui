import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import schema from './schema'
import FormField from '@root/components/suport/FormField'

const StoryDetailForm: React.FC = () => {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

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
            {/* <FormField name="firstName" placeholder="First Name" errorMessage={errorMessage} /> */}
            {/* <FormField name="lastName" placeholder="Last Name" errorMessage={errorMessage} /> */}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default StoryDetailForm
