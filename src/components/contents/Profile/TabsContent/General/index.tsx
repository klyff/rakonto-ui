import React, { useEffect, useState } from 'react'
import schema from './schema'
import { Button, Header } from 'semantic-ui-react'
import UploadAvatar from '@root/components/suport/UploadAvatar'
import { Input, TextArea } from '@root/components/suport/FormFields'
import { Formik } from 'formik'
import { useRecoilState } from 'recoil'
import { userState } from '@root/states/userState'
import { Layout } from './style'
import { api } from '@root/api'

interface iformikValues {
  firstName: string
  lastName: string
  pictureId?: string
  about?: string
  location?: string
}

const General: React.FC = () => {
  const [user, setUser] = useRecoilState(userState)
  const [pictureId, setPictureId] = useState<string | null>(user?.picture?.id || null)
  const [initialValues, setInitialValues] = useState<iformikValues>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    about: user?.about || '',
    location: user?.location || ''
  })

  const submit = async (values: iformikValues) => {
    const { firstName, lastName, about = '', location = '' } = values
    const result = await api.updateMe({ firstName, lastName, about, location, pictureId })
    setUser(result)
  }

  useEffect(() => {
    setInitialValues({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      about: user?.about || '',
      location: user?.location || ''
    })
  }, [user])

  const handleUploadPictureChange = (pictureId: string | null) => {
    setPictureId(pictureId)
  }

  return (
    <Layout>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
        {({ isSubmitting, handleSubmit, setValues, values }) => {
          useEffect(() => {
            setValues(initialValues)
          }, [initialValues])
          return (
            <>
              <Input
                name="firstName"
                label="Full Name"
                onKeyPress={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
              />
              <Input
                name="lastName"
                label="Link"
                onKeyPress={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
              />
              <div>
                <UploadAvatar
                  name={`${values?.firstName} ${values?.lastName}` || ''}
                  defaultPicture={user?.picture || null}
                  onChange={handleUploadPictureChange}
                />
              </div>
              <Header as="h4" color="black" textAlign="left">
                Let people know about you. Your profile will appear on the Information page of the stories and
                collections you create, as well as any comments you post.
              </Header>
              <TextArea
                name="about"
                label="About"
                rows={8}
                onKeyPress={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
              />
              <Input
                name="location"
                label="Location"
                onKeyPress={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
              />
              <Button
                fluid
                primary
                disabled={isSubmitting}
                loading={isSubmitting}
                onClick={() => {
                  handleSubmit()
                }}
              >
                Save
              </Button>
            </>
          )
        }}
      </Formik>
    </Layout>
  )
}

export default General
