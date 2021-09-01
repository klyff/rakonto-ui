import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { SelectFileButton, DropAreaBox, HugeButton } from './style'
import { mediaQueryState } from '@root/states/mediaQueryState'
import DropArea from './DropArea'
import { useRecoilValue } from 'recoil'
import { useCreateStory } from '@root/hooks/useCreateStory'
import { Link, useHistory } from 'react-router-dom'
import { ContentArea, Layout } from '../style'

const Index: React.FC = () => {
  const history = useHistory()
  const { isMobile } = useRecoilValue(mediaQueryState)
  const { createStory, progress, isUploading } = useCreateStory()

  const handleDrop = async (acceptedFiles: File[]) => {
    await createStory(acceptedFiles[0])
  }

  return (
    <ContentArea>
      <Layout>
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
          <Grid.Row>
            <Grid.Column width={5}>
              <HugeButton disabled={isUploading} onClick={() => history.push('/a/stories/record/video')}>
                <Icon name="video" size="big" />
                <h3>Record your video</h3>
              </HugeButton>
            </Grid.Column>
            <Grid.Column width={5}>
              <HugeButton disabled={isUploading} onClick={() => history.push('/a/stories/record/audio')}>
                <Icon name="microphone" size="big" />
                <h3>Record your audio</h3>
              </HugeButton>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    </ContentArea>
  )
}

export default Index
