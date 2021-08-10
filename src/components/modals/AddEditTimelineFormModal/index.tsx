import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Header, Modal as SModal } from 'semantic-ui-react'
import { ModalDescription } from '../style'
import { Input, TextArea } from '@root/components/suport/FormFields'
import schema from './schema'
import { TimelineType } from '@root/types'

interface iAddEditTimelineFormModal {
  timeline: TimelineType | null
  open: boolean
  onClose: (ocurrency: TimelineType | null) => void
}

interface iformikValues {
  description: string
  title: string
  at: Date
  id?: string
}

const AddEditTimelineFormModal: React.FC<iAddEditTimelineFormModal> = ({ timeline, open, onClose }) => {
  const [initialValues, setInitialValues] = useState<iformikValues>({
    description: timeline?.description || '',
    title: timeline?.title || '',
    at: timeline?.at || new Date(),
    id: timeline?.id
  })

  const isEdit = !!timeline?.id

  const submit = async (values: iformikValues) => {
    onClose({
      at: values.at,
      title: values.title,
      description: values.description,
      id: values.id || ''
    })
  }

  useEffect(() => {
    setInitialValues({
      description: timeline?.description || '',
      title: timeline?.title || '',
      at: timeline?.at || new Date(),
      id: timeline?.id || ''
    })
  }, [timeline])

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
      {({ isSubmitting, handleSubmit, setValues }) => {
        useEffect(() => {
          setValues(initialValues)
        }, [initialValues])
        return (
          <SModal open={open} size="tiny">
            <Header content={isEdit ? 'Edit event' : 'New event'} />
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
                  rows={4}
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

export default AddEditTimelineFormModal
