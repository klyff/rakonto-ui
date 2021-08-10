import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Header, Modal as SModal } from 'semantic-ui-react'
import { ModalDescription } from '../style'
import { Input, TextArea } from '@root/components/suport/FormFields'
import schema from './schema'
import { PlaceType } from '@root/types'
import Search from './Search'

interface iAddEditPlaceFormModal {
  place: PlaceType | null
  open: boolean
  onClose: (place: PlaceType | null) => void
}

interface iformikValues {
  description: string
  name: string
  location: string
  latitude: string
  longitude: string
  id?: string
}

const AddEditPlaceFormModal: React.FC<iAddEditPlaceFormModal> = ({ place, open, onClose }) => {
  const [initialValues, setInitialValues] = useState<iformikValues>({
    description: place?.description || '',
    name: place?.name || '',
    location: place?.location || '',
    latitude: place?.latitude || '',
    longitude: place?.longitude || ''
  })

  const isEdit = !!place?.id

  const submit = async (values: iformikValues) => {
    onClose({
      description: values.description,
      name: values.name,
      location: values.location,
      latitude: values.latitude,
      longitude: values.longitude,
      id: values.id || ''
    })
  }

  useEffect(() => {
    setInitialValues({
      description: place?.description || '',
      name: place?.name || '',
      location: place?.location || '',
      latitude: place?.latitude || '',
      longitude: place?.longitude || '',
      id: place?.id || ''
    })
  }, [place])

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
      {({ isSubmitting, handleSubmit, setValues, setFieldValue }) => {
        useEffect(() => {
          setValues(initialValues)
        }, [initialValues])
        return (
          <SModal open={open} size="tiny">
            <Header content={isEdit ? 'Edit location' : 'New location'} />
            <SModal.Content image>
              <ModalDescription>
                <Input
                  name="name"
                  label="Name"
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
                <Search
                  onSelected={({ result }) => {
                    // eslint-disable-next-line camelcase
                    const { display_name, lat, lon } = result
                    setFieldValue('location', display_name)
                    setFieldValue('latitude', lat)
                    setFieldValue('longitude', lon)
                  }}
                />
                <TextArea
                  disabled
                  rows={2}
                  name="location"
                  label="Address"
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
