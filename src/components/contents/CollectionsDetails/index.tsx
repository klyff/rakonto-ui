import React, { useState } from 'react'
import schema from './schema'
import { ContentArea } from '../style'
import { StoriesArea, FormArea, Layout, Title } from './style'
import { Input } from '@root/components/suport/FormFields'
import CoverDropArea from '@root/components/suport/CoverDropArea'
import { Formik, Form } from 'formik'
import { Header, Icon, Button } from 'semantic-ui-react'
import { useCollectionApi } from './useCollectionApi'
import { Link, useParams } from 'react-router-dom'

interface iFormkValues {
  title: string
}

const CollectionsDetails: React.FC = () => {
  const [coverId, setCoverId] = useState<string | undefined>()
  const { collectionId } = useParams<{ collectionId: string }>()

  const { collection, isLoading, updateCollection } = useCollectionApi(collectionId)

  const submit = async (values: iFormkValues) => {
    await updateCollection({ ...values, coverId })
  }

  const initalValues: iFormkValues = {
    title: collection?.title || ''
  }

  return (
    <ContentArea>
      <Layout>
        <FormArea>
          <Title>
            <Link to={'/a/collections'}>
              <Icon name="arrow left" />
              Back
            </Link>
          </Title>
          <Formik initialValues={initalValues} validationSchema={schema} onSubmit={submit}>
            <Form>
              <Input
                name="title"
                label="Title"
                onKeyPress={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
              />
              <CoverDropArea
                onIdChange={setCoverId}
                cover={collection?.cover}
                noClick={false}
                ButtonLabel="Upload cover"
              />
              <Button primary fluid>
                Save
              </Button>
            </Form>
          </Formik>
        </FormArea>
        <StoriesArea>
          <Header as="h1">Collection videos</Header>
        </StoriesArea>
      </Layout>
    </ContentArea>
  )
}

export default CollectionsDetails
