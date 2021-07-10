import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Header, Modal as SModal } from 'semantic-ui-react'
import { ModalDescription } from '../style'
import { Input, TextArea } from '@root/components/suport/FormFields'
import schema from './schema'
import { PlaceType } from '@root/types'

interface iAddEditPlaceFormModal {
  place: PlaceType | null
  open: boolean
  onClose: (place: PlaceType | null) => void
}

interface iformikValues {
  description: string
  name: string
  location: string
  id?: string
}

const AddEditPlaceFormModal: React.FC<iAddEditPlaceFormModal> = ({ place, open, onClose }) => {
  const [initialValues, setInitialValues] = useState<iformikValues>({
    description: place?.description || '',
    name: place?.name || '',
    location: place?.location || ''
  })

  const isEdit = !!place?.id

  const submit = async (values: iformikValues) => {
    onClose({
      description: place?.description || '',
      name: place?.name || '',
      location: place?.location || '',
      latitude: '',
      longitude: '',
      id: values.id || ''
    })
  }

  useEffect(() => {
    setInitialValues({
      description: place?.description || '',
      name: place?.name || '',
      location: place?.location || '',
      id: place?.id || ''
    })
  }, [place])

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
      {({ isSubmitting, handleSubmit, setValues }) => {
        useEffect(() => {
          setValues(initialValues)
        }, [initialValues])
        return (
          <SModal open={open} size="tiny">
            <Header content={isEdit ? 'Edit ocurrency' : 'New ocurrency'} />
            <SModal.Content image>
              <ModalDescription>
                <Input
                  name="title"
                  label="Title"
                  onKeyPress={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') e.preventDefault()
                  }}
                />
                <TextArea
                  rows={26}
                  name="description"
                  label="Description"
                  onKeyPress={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') e.preventDefault()
                  }}
                />
                <Input
                  name="at"
                  label="At"
                  type="date"
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
                onClick={() => onClose(null)}
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

export default AddEditPlaceFormModal
