import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Header, Modal as SModal } from 'semantic-ui-react'
import { ModalDescription } from '../style'
import UploadAvatar from '@root/components/contents/StoryDetails/TabsContent/People/UploadAvatar'
import { Input } from '@root/components/suport/FormFields'
import schema from './schema'
import { usePeopleApi } from './usePeopleApi'

interface iAddEditPersonFormModal {
  person: { id?: string; name: string; link: string; picture: string }
  open: boolean
  onClose: () => void
  isEdit: boolean
}

interface iformikValues {
  name: string
  link: string
}

const AddEditPersonFormModal: React.FC<iAddEditPersonFormModal> = ({ person, open, onClose }) => {
  const { updatePerson, createPerson } = usePeopleApi()
  const [initialValues, setInitialValues] = useState<iformikValues>({
    name: person.name,
    link: person.link
  })

  const isEdit = !!person.id

  const submit = (values: iformikValues) => {
    if (isEdit) {
      updatePerson(person.id as string, { name: values.name, description: values.link, pictureId: '' })
    } else {
      createPerson({ name: values.name, description: values.link, pictureId: '' })
    }
    onClose()
  }

  useEffect(() => {
    setInitialValues({
      name: person.name,
      link: person.link
    })
  }, [person])

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
      {({ isSubmitting, handleSubmit, setValues }) => {
        useEffect(() => {
          setValues(initialValues)
        }, [initialValues])
        return (
          <SModal open={open} size="tiny">
            <Header content={isEdit ? 'Edit person' : 'New person'} />
            <SModal.Content image>
              <ModalDescription>
                <UploadAvatar name={person.name} src="https://avatars0.githubusercontent.com/u/246180?v=4" />
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
              <Button negative disabled={isSubmitting} loading={isSubmitting} type="button" onClick={onClose} basic>
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
