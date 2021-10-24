import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Comments from '../../../components/Comments'

interface iAbout {
  title: string
  collectionId: string
  description: string
}

const About: React.FC<iAbout> = ({ title, collectionId, description }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex'
      }}
    >
      <Box
        component={Paper}
        sx={{
          width: '100%',
          padding: 3
        }}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" paragraph>
          {'    ' + description}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 500,
          paddingLeft: 1
        }}
      >
        <Comments type={'collection'} id={collectionId} watchers={[]} />
      </Box>
    </Box>
  )
}

export default About
