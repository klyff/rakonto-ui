import React, { useEffect, useState } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { Button, Header, Modal as SModal } from 'semantic-ui-react'
import { ModalDescription } from '../style'
import UploadAvatar from '@root/components/suport/UploadAvatar'
import { Input } from '@root/components/suport/FormFields'
import schema from './schema'
import { usePeopleApi } from './usePeopleApi'
import { PersonType } from '@root/types'
import { toast } from 'react-semantic-toasts'

interface iAddEditPersonFormModal {
  person: PersonType | null
  open: boolean
  onClose: (person: PersonType | null) => void
  isEdit: boolean
}

interface iformikValues {
  name: string
  link: string
}

const AddEditPersonFormModal: React.FC<iAddEditPersonFormModal> = ({ person, open, onClose }) => {
  const { updatePerson, createPerson } = usePeopleApi()
  const [pictureId, setPictureId] = useState<string | null>(person?.picture?.id || null)
  const [initialValues, setInitialValues] = useState<iformikValues>({
    name: person?.name || '',
    link: person?.link || ''
  })

  const isEdit = !!person?.id

  const submit = async (values: iformikValues, helpers: FormikHelpers<iformikValues>) => {
    try {
      if (isEdit) {
        await updatePerson(person?.id as string, { name: values.name, link: values.link, pictureId })
        onClose(null)
      } else {
        onClose(await createPerson({ name: values.name, link: values.link, pictureId }))
      }
      toast({
        type: 'success',
        title: 'Saved',
        time: 3000
      })
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message,
        time: 3000,
        description: `Error: ${error.response.data.code}`
      })
      onClose(null)
    } finally {
      helpers.resetForm()
    }
  }

  useEffect(() => {
    setInitialValues({
      name: person?.name || '',
      link: person?.link || ''
    })
  }, [person])

  const handleUploadPictureChange = (pictureId: string | null) => {
    setPictureId(pictureId)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
      {({ isSubmitting, handleSubmit, setValues, values }) => {
        useEffect(() => {
          setValues(initialValues)
        }, [initialValues])
        return (
          <SModal open={open} size="tiny">
            <Header content={isEdit ? 'Edit person' : 'New person'} />
            <SModal.Content image>
              <ModalDescription>
                <UploadAvatar
                  name={values?.name || ''}
                  defaultPicture={person?.picture || null}
                  onChange={handleUploadPictureChange}
                />
                <Input
                  name="name"
                  label="Full Name"
                  onKeyPress={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') e.preventDefault()
                  }}
                />
                <Input
                  name="link"
                  label="Link"
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

export default AddEditPersonFormModal
