import React, { useState } from 'react'
import { Image } from 'semantic-ui-react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import { Grid, GridColumn, Actions } from './style'
import ImageViewer from '@root/components/suport/ImageViewer'
import UploadButton from '@root/components/suport/UploadButton'
import { api } from '@root/api'

const Gallery: React.FC = ({ children }) => {
  const gallery = new Array<string>(100).fill('https://react.semantic-ui.com/images/wireframe/image.png')
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [showPreview, setShowPreview] = useState<boolean>(false)

  const handleShowPreview = (index: number) => {
    setSelectedImage(index)
    setShowPreview(true)
  }

  const handleDelete = () => {
    alert('delete')
  }

  const handleUploadProgress = (value: number) => {
    console.log(value)
  }

  return (
    <Layout>
      <ColumnForm>
        {/* <UploadButton api={api.uploadFile} onSelected={handleUploadFinished} onProgressChange={handleUploadProgress}> */}
        {/*  Upload new picture */}
        {/* </UploadButton> */}
        <Grid columns={3} stackable>
          {gallery.map((value, index) => {
            return (
              <GridColumn key={index}>
                <Actions pointing="right" icon="ellipsis vertical">
                  <Actions.Menu>
                    <Actions.Item text="Delete" icon="close" onClick={handleDelete} />
                  </Actions.Menu>
                </Actions>
                <Image src={value} onClick={() => handleShowPreview(index)} />
              </GridColumn>
            )
          })}
        </Grid>
      </ColumnForm>
      <ImageViewer images={[]} initialIndex={selectedImage} show={showPreview} onClose={() => setShowPreview(false)} />
      <ColumnPreview>{children}</ColumnPreview>
    </Layout>
  )
}

export default Gallery
