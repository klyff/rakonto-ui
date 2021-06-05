import React from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import { DropAreaWrapper } from './style'
import { Button, Header, Icon } from 'semantic-ui-react'
import LoadingArea from '@root/components/suport/LoadingArea'

interface iDropArea {
  handleDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void
  isUploading: boolean
  progress: number
}

const DropArea: React.FC<iDropArea> = ({ handleDrop, isUploading, progress }) => {
  const { open, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: ['audio/*', 'video/*'],
    noClick: true,
    noKeyboard: true,
    onDrop: handleDrop
  })

  return (
    <DropAreaWrapper
      {...getRootProps()}
      isDragActive={isDragActive}
      isDragAccept={isDragAccept}
      isDragReject={isDragReject}
    >
      <input {...getInputProps()} />
      {isUploading && (
        <LoadingArea
          progress={progress !== 100 ? progress : undefined}
          message={progress === 100 ? 'Processing...' : ''}
          isLoading={isUploading}
        />
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
    </DropAreaWrapper>
  )
}

export default DropArea
