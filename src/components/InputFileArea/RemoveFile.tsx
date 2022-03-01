import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import React from 'react'
import Player from '../Player'

interface RemoveFile {
  file: File
  onRemove: () => void
}

const RemoveFile: React.FC<RemoveFile> = ({ file, onRemove }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center'
        }}
      >
        <Typography mb="unset" fontWeight="700" align="center" variant="subtitle1" gutterBottom>
          {file.name}
        </Typography>
        <Box flex={1} />
        <Box>
          <Button onClick={onRemove}>Remove</Button>
        </Box>
      </Box>
      <Player maxHeight="520px" subtitles={[]} type={'VIDEO'} media={{ id: 'local', url: URL.createObjectURL(file) }} />
    </Box>
  )
}

export default RemoveFile
