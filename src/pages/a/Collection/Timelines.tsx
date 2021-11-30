import React from 'react'
import { TimelineType } from '../../../lib/types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

interface iTimelines {
  timelines: TimelineType[]
}

const Timelines: React.FC<iTimelines> = ({ timelines }) => {
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
        Timelines
      </Box>
    </Box>
  )
}

export default Timelines
