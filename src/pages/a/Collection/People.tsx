import React from 'react'
import { StoryType } from '../../../lib/types'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import PersonItem from '../../../components/PersonItem'
import Divider from '@mui/material/Divider'

interface iPeople {
  list: Array<StoryType>
}

const People: React.FC<iPeople> = ({ list }) => {
  return (
    <>
      {list.map(({ title, persons }) => (
        <Box
          key={title}
          component={Paper}
          sx={{
            width: '100%',
            display: 'flex',
            padding: '24px 24px 0 24px',
            flexFlow: 'column',
            marginBottom: 3
          }}
        >
          <Typography>{title}</Typography>
          <Divider sx={{ margin: '24px 0' }} />
          {persons.length ? (
            persons.map(person => <PersonItem key={person.id} person={person} />)
          ) : (
            <Typography align="center">No person added yet</Typography>
          )}
        </Box>
      ))}
    </>
  )
}

export default People
