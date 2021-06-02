import React from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import { DropAreaWrapper } from './style'
import { Button, Header, Icon } from 'semantic-ui-react'
import LoadingArea from '@root/components/suport/LoadingArea'
import { useUploadCover } from './useUploadCover'

interface iDropArea {
  handledUploadFinish: (coverId: string | undefined) => void
}

const DropArea: React.FC<iDropArea> = ({ handledUploadFinish }) => {
  const { coverInfo, progress, isUploadingCover, uploadCover } = useUploadCover()

  const handleDrop = async (acceptedFiles: File[]) => {
    await uploadCover(acceptedFiles[0])
    handledUploadFinish(coverInfo?.id)
  }

  const { open, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: ['image/*'],
    noClick: true,
    noKeyboard: true,
    onDrop: handleDrop
  })

  return (
    <>
      <DropAreaWrapper
        {...getRootProps()}
        isDragActive={isDragActive}
        isDragAccept={isDragAccept}
        isDragReject={isDragReject}
      >
        <input {...getInputProps()} />
        {isUploadingCover && <LoadingArea isLoading={isUploadingCover} progress={progress} />}
        {!isUploadingCover && (
          <>
            <Header icon>
              <Icon name="upload" />
              Drag and drop your cover
            </Header>
          </>
        )}
      </DropAreaWrapper>
      <Button primary onClick={open}>
        Change Cover
      </Button>
    </>
  )
}

export default DropArea
