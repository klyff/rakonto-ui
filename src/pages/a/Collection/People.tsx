import React from 'react'
import { PersonType } from '../../../lib/types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

interface iPeople {
  persons: PersonType[]
}

const People: React.FC<iPeople> = ({ persons }) => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: 3
      }}
    >
      <Box
        component={Paper}
        sx={{
          width: '100%',
          padding: 3
        }}
      >
        People
      </Box>
    </Box>
  )
}

export default People
