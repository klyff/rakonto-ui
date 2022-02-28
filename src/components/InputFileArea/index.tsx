import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import Box from '@mui/material/Box'
import Droparea from './DropArea'
import Recorder from './Recorder'
import MobileUpload from './MobileUpload'
import RemoveFile from './RemoveFile'

interface iInputFileArea {
  file: File | null
  callback: (file: File | null) => void
  disableChangeMediaType?: boolean
  countdown?: number
  startType?: 'AUDIO' | 'VIDEO' | null
}

const InputFileArea: React.FC<iInputFileArea> = ({ file, callback, disableChangeMediaType, countdown, startType }) => {
  const [uploadType, setUploadType] = useState<'FILE' | 'RECORD' | null>(file ? 'FILE' : null)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: {
          xs: 'unset',
          md: 'center'
        },
        flexFlow: {
          xs: 'column',
          md: 'row'
        }
      }}
    >
      {!!file && (
        <RemoveFile
          file={file}
          onRemove={() => {
            callback(null)
            setUploadType(null)
          }}
        />
      )}
      {!file &&
        (isMobile ? (
          <MobileUpload
            onDrop={f => {
              callback(f)
            }}
          />
        ) : (
          <>
            {(uploadType === 'FILE' || !uploadType) && (
              <Droparea
                filter={startType}
                onDrop={acceptedFiles => {
                  const file = acceptedFiles[0]
                  callback(file)
                  setUploadType('FILE')
                }}
              />
            )}
            {(uploadType === 'RECORD' || !uploadType) && (
              <Recorder
                type={startType}
                onDrop={file => {
                  callback(file)
                }}
                onSelected={isSelected => {
                  setUploadType(isSelected ? 'RECORD' : null)
                }}
                disableChangeMediaType={disableChangeMediaType}
                countdown={countdown}
              />
            )}
          </>
        ))}
    </Box>
  )
}

export default InputFileArea
