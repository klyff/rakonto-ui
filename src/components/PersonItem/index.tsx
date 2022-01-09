import Box from '@mui/material/Box'
import initials from 'initials'
import Typography from '@mui/material/Typography'
import React from 'react'
import { PersonType } from '../../lib/types'
import Link from '@mui/material/Link'

interface iPersonItem {
  person: PersonType
  storyList?: { [key: string]: string }
}

const PersonItem: React.FC<iPersonItem> = ({ person, children, storyList }) => {
  const stories = Object.entries(storyList || {})
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
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          flexFlow: 'column'
        }}
      >
        <Typography sx={{ flex: 1 }}>
          {person.link ? (
            <Link href={person.link} target="_blank">
              {person.name}
            </Link>
          ) : (
            person.name
          )}
        </Typography>
        {!!stories.length && (
          <Typography sx={{ flex: 1 }}>
            Reference stories:{' '}
            <span>
              {stories.map(([k, v], i) => (
                <>
                  {i !== 0 && <span> ,</span>}
                  <Link key={k} href={`/a/stories/${k}`} variant="caption">
                    {v}
                  </Link>
                </>
              ))}
            </span>
          </Typography>
        )}
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default PersonItem
