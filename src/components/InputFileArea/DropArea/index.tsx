import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone'
import { SimpleSnackbarContext } from '../../SimpleSnackbar'

interface iDroparea {
  onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void
  filter?: 'AUDIO' | 'VIDEO' | null
}

const Droparea: React.FC<iDroparea> = ({ onDrop, filter }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  let accept
  switch (filter) {
    case 'AUDIO':
      accept = 'audio/*'
      break
    case 'VIDEO':
      accept = 'video/*'
      break
    default:
      accept = 'audio/*, video/*'
  }

  const handleDrop = <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => {
    if (fileRejections.length > 0) {
      snackActions.open(`This file is not accepted: ${fileRejections.map(f => f.file.name).join(', ')}`)
      return
    }
    onDrop(acceptedFiles, fileRejections, event)
  }

  return (
    <Dropzone multiple={false} noClick noKeyboard accept={accept} onDrop={handleDrop}>
      {({ getRootProps, getInputProps, open }) => (
        <Box
          sx={{
            width: { xs: '100%', md: 422 },
            height: 422,
            border: '1px dashed #7b7b7c',
            borderRadius: '20px'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px 85px'
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 50,
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 2
                }}
              >
                <FileUploadIcon
                  sx={{
                    fontSize: 52,
                    color: 'common.black'
                  }}
                />
              </Box>
              <Typography fontWeight="700" align="center" variant="h6" gutterBottom>
                {`Drag and drop a ${!filter ? 'video or audio' : filter.toLowerCase()} file here`}
              </Typography>
              <Typography fontWeight="700" align="center" variant="h6" gutterBottom>
                or
              </Typography>
              <Button size="large" onClick={open} variant="outlined">
                Choose file
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Dropzone>
  )
}

export default Droparea
