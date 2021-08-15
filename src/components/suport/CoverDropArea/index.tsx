import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { DropAreaWrapper, ButtonRemove } from './style'
import { Button, Header, Icon, Grid } from 'semantic-ui-react'
import LoadingArea from '@root/components/suport/LoadingArea'
import { useCoverApi } from './useCoverApi'
import { useCoverStatus } from './useCoverStatus'
import { ImageType } from '@root/types'

interface iCoverDropArea {
  onIdChange: (coverId: string | undefined) => void
  progress?: number
  message?: string
  ButtonLabel?: string
  noClick?: boolean
  cover?: Partial<ImageType>
}

const CoverDropArea: React.FC<iCoverDropArea> = ({
  onIdChange,
  message,
  noClick = true,
  ButtonLabel = 'Upload',
  cover
}) => {
  const { coverInfo, uploadProgress, isUploadingCover, upload, getCoverInfo, removeCover } = useCoverApi({ cover })
  const { coverProgress, isProcessingCover, startProcess } = useCoverStatus(coverInfo?.id, getCoverInfo)

  useEffect(() => {
    onIdChange(coverInfo?.id)
  }, [coverInfo])

  const handleDrop = async (acceptedFiles: File[]) => {
    await upload(acceptedFiles[0])
    startProcess()
  }

  const { open, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: ['image/*'],
    noClick: noClick,
    noKeyboard: true,
    onDrop: handleDrop
  })

  return (
    <Grid style={{ margin: 0 }}>
      <Grid.Row>
        <DropAreaWrapper
          {...getRootProps()}
          thumbSrc={coverInfo?.thumbnail || ''}
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
              {!coverInfo?.thumbnail && (
                <Header icon>
                  <Icon name="upload" />
                  Drag and drop your cover
                </Header>
              )}
            </>
          )}
        </DropAreaWrapper>
      </Grid.Row>
      {message && (
        <Grid.Row>
          <div>{message}</div>
        </Grid.Row>
      )}
      <Grid.Row>
        <Button type="button" primary basic onClick={open}>
          {ButtonLabel}
        </Button>
        <ButtonRemove type="button" disabled={!coverInfo?.thumbnail} color="black" basic onClick={removeCover}>
          Remove
        </ButtonRemove>
      </Grid.Row>
    </Grid>
  )
}

export default CoverDropArea
