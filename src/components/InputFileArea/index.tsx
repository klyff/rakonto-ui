import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import Box from '@mui/material/Box'
import Droparea from './DropArea'
import Recorder from './Recorder'
import MobileUpload from './MobileUpload'

interface iInputFileArea {
  file: File | null
  callback: (file: File | null) => void
}

const InputFileArea: React.FC<iInputFileArea> = ({ file, callback }) => {
  const [uploadType, setUploadType] = useState<'FILE' | 'AUDIO' | 'VIDEO' | null>(null)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
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
      {isMobile ? (
        <MobileUpload
          file={file}
          onDrop={f => {
            callback(f)
          }}
          onRemove={() => {
            callback(null)
            setUploadType(null)
          }}
        />
      ) : (
        <>
          {(uploadType === 'FILE' || !uploadType) && (
            <Droparea
              file={file}
              onDrop={acceptedFiles => {
                const file = acceptedFiles[0]
                callback(file)
                setUploadType('FILE')
              }}
              onRemove={() => {
                callback(null)
                setUploadType(null)
              }}
            />
          )}
          {(uploadType === 'AUDIO' || uploadType === 'VIDEO' || !uploadType) && (
            <Recorder
              type={uploadType}
              onDrop={file => {
                callback(file)
              }}
              onSelected={(value: 'AUDIO' | 'VIDEO' | null) => {
                setUploadType(value)
              }}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default InputFileArea
