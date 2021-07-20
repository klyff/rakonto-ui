import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { SelectFileButton, DropAreaBox } from './style'
import { mediaQueryState } from '@root/states/mediaQueryState'
import DropArea from './DropArea'
import { useRecoilValue } from 'recoil'
import { useCreateStory } from '@root/hooks/useCreateStory'
import { Link } from 'react-router-dom'
import { ContentArea } from '../style'

const Index: React.FC = () => {
  const { isMobile } = useRecoilValue(mediaQueryState)
  const { createStory, progress, isUploading } = useCreateStory()

  const handleDrop = async (acceptedFiles: File[]) => {
    await createStory(acceptedFiles[0])
  }

  return (
    <ContentArea>
      <Link to={'/a/stories'}>
        <Icon name="arrow left" />
        Back
      </Link>
      <Grid centered stackable>
        <Grid.Column width={10}>
          {!isMobile ? (
            <DropAreaBox>
              <DropArea isUploading={isUploading} progress={progress} handleDrop={handleDrop} />
            </DropAreaBox>
          ) : (
            <>
              <SelectFileButton primary basic fluid size="big" onClick={open}>
                Select file
              </SelectFileButton>
            </>
          )}
        </Grid.Column>
      </Grid>
    </ContentArea>
  )
}

export default Index
