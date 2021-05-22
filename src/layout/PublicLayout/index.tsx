import React from 'react'
import { Grid } from 'semantic-ui-react'
import { GridImage, TextBox, PrimaryText, SecondaryText, GridLogin, FormBox } from './style'

const PublicLayout: React.FC = ({ children }) => {
  return (
    <Grid stackable inverted padded>
      <GridImage width={10} only="tablet computer">
        <TextBox>
          <PrimaryText style={{}}>Discover your family story</PrimaryText>
          <SecondaryText style={{}}>
            Grow your family tree, find new relatives, and explore billions of historical records
          </SecondaryText>
        </TextBox>
      </GridImage>
      <GridLogin width={6}>
        <FormBox>
          <div>{children}</div>
        </FormBox>
      </GridLogin>
    </Grid>
  )
}

export default PublicLayout
