import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { RouteComponentProps } from 'react-router-dom'

const FacebookDataDeletion: React.FC<RouteComponentProps> = ({ location, history }) => {
  return (
    <Box width="100%" height="40vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h4" marginTop={'32px'}>
        Successfully deleted!
      </Typography>
    </Box>
  )
}

export default FacebookDataDeletion
