import React from 'react'
import Box from '@mui/material/Box'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone'

interface iDroparea {
  onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void
  file: File | null
  onRemove: () => void
}

const Droparea: React.FC<iDroparea> = ({ onDrop, file, onRemove }) => {
  return (
    <>
      {file && (
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column'
          }}
        >
          <Box
            component="div"
            sx={{
              height: 422,
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'center',
              alignItems: 'center'
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
              <UploadFileIcon
                sx={{
                  fontSize: 52,
                  color: 'common.black'
                }}
              />
            </Box>
            <Typography fontWeight="700" align="center" variant="h5" gutterBottom>
              {file.name}
            </Typography>
            <Button onClick={onRemove}>Remove</Button>
          </Box>
        </Box>
      )}
      {!file && (
        <Dropzone multiple={false} noClick noKeyboard accept={'video/*, audio/*'} onDrop={onDrop}>
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
                    Drag and drop a video or audio file here
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
      )}
    </>
  )
}

export default Droparea