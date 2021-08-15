import React, { useState } from 'react'
import { Formik } from 'formik'
import { Button, Header, Modal as SModal } from 'semantic-ui-react'
import { ModalDescription } from '../style'
import { Input } from '@root/components/suport/FormFields'
import schema from './schema'
import { useCollectionApi } from './useCollectionApi'
import { FormikHelpers } from 'formik/dist/types'
import CoverDropArea from '@root/components/suport/CoverDropArea'
import { CollectionType } from '@root/types'

interface iAddEditPersonFormModal {
  open: boolean
  onClose: (collection?: CollectionType) => void
}

interface iformikValues {
  title: string
}

const AddEditLinkFormModal: React.FC<iAddEditPersonFormModal> = ({ open, onClose }) => {
  const [coverId, setCoverId] = useState<string | undefined>()
  const { createCollection } = useCollectionApi()

  const submit = async (values: iformikValues, helpers: FormikHelpers<iformikValues>) => {
    const collection = await createCollection({ title: values.title, coverId: coverId })
    onClose(collection)
    helpers.resetForm()
  }

  return (
    <Formik
      initialValues={{
        title: ''
      }}
      validationSchema={schema}
      onSubmit={submit}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <SModal open={open} size="tiny">
            <Header content={'New collection'} />
            <SModal.Content image>
              <ModalDescription>
                <Input
                  name="title"
                  label="Title"
                  onKeyPress={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') e.preventDefault()
                  }}
                />
                <CoverDropArea onIdChange={setCoverId} noClick={false} ButtonLabel="Upload cover" />
              </ModalDescription>
            </SModal.Content>
            <SModal.Actions>
              <Button
                negative
                disabled={isSubmitting}
                loading={isSubmitting}
                type="button"
                onClick={() => onClose()}
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
