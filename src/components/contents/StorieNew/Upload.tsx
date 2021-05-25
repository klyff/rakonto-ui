import React from 'react'
import { Link } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { Grid, Icon, Button, Header } from 'semantic-ui-react'
import { HugeButton, DropArea, SelectFileButton } from './style'
import { mediaQueryState } from '@root/states/mediaQueryState'
import { useRecoilValue } from 'recoil'
import { Steps } from './index'

interface iUpload {
  handleNext: (value: Steps) => void
  sendFile: (file: File) => void
}

const Upload: React.FC<iUpload> = ({ handleNext, sendFile }) => {
  const { isMobile } = useRecoilValue(mediaQueryState)
  const { open, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: ['video/*', 'audio/*'],
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      sendFile(acceptedFiles[0])
      handleNext('videoDetails')
    }
  })

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
              <Header icon>
                <Icon name="upload" />
                Drag and drop your video, audio files to upload
              </Header>
              <Header>or</Header>
              <Button primary onClick={open}>
                Select file
              </Button>
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
            <HugeButton>
              <Icon name="video" size="big" />
              <h3>Create your video</h3>
            </HugeButton>
          </Grid.Column>
          <Grid.Column width={5}>
            <HugeButton>
              <Icon name="microphone" size="big" />
              <h3>Create your video</h3>
            </HugeButton>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default Upload
