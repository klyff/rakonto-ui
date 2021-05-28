import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Grid, Icon, Button, Header } from 'semantic-ui-react'
import { HugeButton, DropArea, SelectFileButton } from './style'
import { mediaQueryState } from '@root/states/mediaQueryState'
import { useRecoilValue } from 'recoil'
import Lottie from 'react-lottie'
import animationData from './airplane-upload-icon-launch.json'
import { useCreateStory } from './useCreateStory'
import { Link } from 'react-router-dom'

const Index: React.FC = () => {
  const { isMobile } = useRecoilValue(mediaQueryState)
  const { createStory, progress, isUploading } = useCreateStory()
  const { open, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: ['video/*', 'audio/*'],
    noClick: true,
    noKeyboard: true,
    onDrop: async acceptedFiles => {
      await createStory(acceptedFiles[0])
    }
  })

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <>
      <Link to={'/a/home'}>
        <Icon name="arrow left" />
        Back
      </Link>
      <Grid centered stackable>
        <Grid.Column width={10}>
          {!isMobile && (
            <DropArea
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragAccept={isDragAccept}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {isUploading && (
                <>
                  <Lottie options={defaultOptions} height={'inherit'} width={'inherit'} isClickToPauseDisabled />
                  <Header>{`${progress}%`}</Header>
                </>
              )}
              {!isUploading && (
                <>
                  <Header icon>
                    <Icon name="upload" />
                    Drag and drop your video, audio files to upload
                  </Header>
                  <Header>or</Header>
                  <Button primary onClick={open}>
                    Select file
                  </Button>
                </>
              )}
            </DropArea>
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
    </>
  )
}

export default Index
