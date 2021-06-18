import React from 'react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { PersonType } from '@root/types'
import { Input } from '@root/components/suport/FormFields'
import { Formik } from 'formik'
import { Form } from 'formik-semantic-ui-react'
import { Button, Divider, Header } from 'semantic-ui-react'
import { usePeopleApi } from './usePeopleApi'
import schema from './schema'

interface iPeople {
  persons?: PersonType[]
}

interface iformikValues {
  name: string
  link: string
}

const People: React.FC<iPeople> = ({ children, persons = [] }) => {
  const { createPerson, updatePerson } = usePeopleApi()

  const initialValues: iformikValues = {
    name: '',
    link: ''
  }

  const onSubmit = (values: iformikValues) => {
    createPerson({ name: values.name, description: values.link, pictureId: '' })
  }

  return (
    <Layout>
      <ColumnForm>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
          <Form>
            <div>
              Link people with your video, you can put a photo, full name and a link with other information for the
              person
            </div>
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
            <Button type="submit" primary id="save">
              add person
            </Button>
          </Form>
        </Formik>
        <Divider />
        <Header as="h1">List of people</Header>
        {persons?.map(person => {
          const initialPersonValues: iformikValues = {
            name: person.name,
            link: person.description
          }
          return (
            <Formik key={person.id} initialValues={initialPersonValues} onSubmit={onSubmit} validationSchema={schema}>
              <Form>
                <Input name="name" label="Full Name" />
                <Input name="link" label="Link" />
              </Form>
            </Formik>
          )
        })}
      </ColumnForm>
      <ColumnPreview>{children}</ColumnPreview>
    </Layout>
  )
}

export default People
