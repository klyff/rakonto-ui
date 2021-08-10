import React from 'react'
import { Formik } from 'formik'
import { Button, Header, Modal as SModal } from 'semantic-ui-react'
import { ModalDescription } from '../style'
import { Input } from '@root/components/suport/FormFields'
import schema from './schema'
import { useLinkApi } from './useLinkApi'
import { FormikHelpers } from 'formik/dist/types'

interface iAddEditPersonFormModal {
  open: boolean
  storyId: string
  onClose: (reload: boolean) => void
}

interface iformikValues {
  url: string
}

const AddEditLinkFormModal: React.FC<iAddEditPersonFormModal> = ({ open, storyId, onClose }) => {
  const { createLink } = useLinkApi()

  const submit = async (values: iformikValues, helpers: FormikHelpers<iformikValues>) => {
    await createLink({ url: values.url, storyId: storyId })
    onClose(true)
    helpers.resetForm()
  }

  return (
    <Formik
      initialValues={{
        url: ''
      }}
      validationSchema={schema}
      onSubmit={submit}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <SModal open={open} size="tiny">
            <Header content={'New link'} />
            <SModal.Content image>
              <ModalDescription>
                <Input
                  name="url"
                  label="Link url"
                  onKeyPress={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') e.preventDefault()
                  }}
                />
              </ModalDescription>
            </SModal.Content>
            <SModal.Actions>
              <Button
                negative
                disabled={isSubmitting}
                loading={isSubmitting}
                type="button"
                onClick={() => onClose(false)}
                basic
              >
                Cancel
              </Button>
              <Button
                primary
                disabled={isSubmitting}
                loading={isSubmitting}
                onClick={() => {
                  handleSubmit()
                }}
              >
                Save
              </Button>
            </SModal.Actions>
          </SModal>
        )
      }}
    </Formik>
  )
}

export default AddEditLinkFormModal
