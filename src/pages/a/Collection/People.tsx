import React from 'react'
import { PersonType } from '../../../lib/types'
import Box from '@mui/material/Box'

interface iPeople {
  persons: PersonType[]
}

const People: React.FC<iPeople> = ({ persons }) => {
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      People
    </Box>
  )
}

export default People
