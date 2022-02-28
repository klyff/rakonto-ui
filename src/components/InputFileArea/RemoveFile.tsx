import Box from '@mui/material/Box'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import React from 'react'

interface RemoveFile {
  file: File
  onRemove: () => void
}

const RemoveFile: React.FC<RemoveFile> = ({ file, onRemove }) => {
  return (
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
  )
}

export default RemoveFile
