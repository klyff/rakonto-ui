import React, { useState } from 'react'
import { Button, Grid, GridColumn, Image } from 'semantic-ui-react'
import { Layout, ColumnForm, ColumnPreview } from '../style'
import ImageViewer from '@root/components/suport/ImageViewer'

const Gallery: React.FC = ({ children }) => {
  const gallery = new Array<string>(100).fill('https://react.semantic-ui.com/images/wireframe/image.png')
  const [selectedImage, setSelectedImage] = useState<string>('')

  return (
    <Layout>
      <ColumnForm>
        <Button basic secondary>
          Upload new picture
        </Button>
        <Grid columns={3}>
          {gallery.map((value, index) => {
            return (
              <GridColumn key={index}>
                <Image src={value} onClick={() => setSelectedImage(value)} />
              </GridColumn>
            )
          })}
        </Grid>
      </ColumnForm>
      <ColumnPreview>{children}</ColumnPreview>
      <ImageViewer image={selectedImage} onClose={() => setSelectedImage('')} />
    </Layout>
  )
}

export default Gallery
