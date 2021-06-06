import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { HugeButton, SelectFileButton, DropAreaBox } from './style'
import { mediaQueryState } from '@root/states/mediaQueryState'
import DropArea from './DropArea'
import { useRecoilValue } from 'recoil'
import { useCreateStory } from './useCreateStory'
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
          {!isMobile && (
            <DropAreaBox>
              <DropArea isUploading={isUploading} progress={progress} handleDrop={handleDrop} />
            </DropAreaBox>
          )}
          {isMobile && (
            <>
              <SelectFileButton primary basic fluid size="big" onClick={open}>
                Select file
              </SelectFileButton>
            </>
          )}
        </Grid.Column>
        <Grid.Row>
          <Grid.Column width={5}>
            <HugeButton disabled={isUploading}>
              <Icon name="video" size="big" />
              <h3>Create your video</h3>
            </HugeButton>
          </Grid.Column>
          <Grid.Column width={5}>
            <HugeButton disabled={isUploading}>
              <Icon name="microphone" size="big" />
              <h3>Create your video</h3>
            </HugeButton>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ContentArea>
  )
}

export default Index
