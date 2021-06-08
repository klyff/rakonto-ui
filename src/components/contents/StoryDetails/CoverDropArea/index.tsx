import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { DropAreaWrapper } from './style'
import { Button, Header, Icon } from 'semantic-ui-react'
import LoadingArea from '@root/components/suport/LoadingArea'
import { useCoverApi } from './useCoverApi'
import { useCoverStatus } from './useCoverStatus'

interface iCoverDropArea {
  onIdChange: (coverId: string | undefined) => void
  progress?: number
  thumbnailSrc?: string
}

const CoverDropArea: React.FC<iCoverDropArea> = ({ onIdChange, thumbnailSrc }) => {
  const { coverInfo, uploadProgress, isUploadingCover, uploadCover, getCoverInfo } = useCoverApi()
  const { coverProgress, isProcessingCover, startProcess } = useCoverStatus(coverInfo?.id, getCoverInfo)
  const [src, setSrc] = useState<string | undefined>(thumbnailSrc)

  useEffect(() => {
    if (coverInfo?.thumbnail) setSrc(coverInfo?.thumbnail)
    onIdChange(coverInfo?.id)
  }, [coverInfo])

  const handleDrop = async (acceptedFiles: File[]) => {
    await uploadCover(acceptedFiles[0])
    startProcess()
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
        thumbSrc={src || ''}
        {...getRootProps()}
        isDragActive={isDragActive}
        isDragAccept={isDragAccept}
        isDragReject={isDragReject}
      >
        <input {...getInputProps()} />
        {isUploadingCover && <LoadingArea isLoading={isUploadingCover} progress={uploadProgress} />}
        {isProcessingCover && (
          <LoadingArea isLoading={isProcessingCover} progress={coverProgress} message={'Processing cover...'} />
        )}
        {!isUploadingCover && !isProcessingCover && (
          <>
            {!src && (
              <Header icon>
                <Icon name="upload" />
                Drag and drop your cover
              </Header>
            )}
          </>
        )}
      </DropAreaWrapper>
      <Button primary onClick={open}>
        Change Cover
      </Button>
    </>
  )
}

export default CoverDropArea
