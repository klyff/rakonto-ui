import Box from '@mui/material/Box'
import initials from 'initials'
import Typography from '@mui/material/Typography'
import React from 'react'
import { PersonType } from '../../lib/types'

interface iPersonItem {
  person: PersonType
}

const PersonItem: React.FC<iPersonItem> = ({ person, children }) => {
  return (
    <Box
      sx={{
        height: '120px',
        width: '100%',
        padding: 2,
        bgcolor: '#313131',
        borderRadius: '20px',
        marginBottom: 3,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          height: '80px',
          width: '80px',
          borderRadius: '50%',
          border: '1px solid',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: person.picture?.url ? `url(${person.picture?.url})` : 'none',
          backgroundSize: 'contain',
          marginRight: 2
        }}
      >
        {!person.picture?.url && initials(person.name)}
      </Box>
      <Typography sx={{ flex: 1 }}>{person.name}</Typography>
      <Typography sx={{ flex: 1 }}>{person.link}</Typography>
      <Box>{children}</Box>
    </Box>
  )
}

export default PersonItem
