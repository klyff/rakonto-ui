import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { GridImage, TextBox, PrimaryText, SecondaryText, FormBox, Logo } from './style'

const PublicLayout: React.FC = ({ children }) => {
  return (
    <Grid verticalAlign="middle" stackable inverted padded>
      <GridImage width={10} only="tablet computer">
        <TextBox>
          <PrimaryText style={{}}>Discover your family story</PrimaryText>
          <SecondaryText style={{}}>
            Grow your family tree, find new relatives, and explore billions of historical records
          </SecondaryText>
        </TextBox>
      </GridImage>
      <Grid.Column width={6}>
        <Logo>
          <Image src={'/images/logo2.svg'} />
        </Logo>
        <FormBox>
          <div>{children}</div>
        </FormBox>
      </Grid.Column>
    </Grid>
  )
}

export default PublicLayout
