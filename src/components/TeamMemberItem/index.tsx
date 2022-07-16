import Box from '@mui/material/Box'
import initials from 'initials'
import Typography from '@mui/material/Typography'
import React from 'react'
import { TeamMemberType } from '../../lib/types'

interface iTeamMemberItem {
  member: TeamMemberType
}

const TeamMemberItem: React.FC<iTeamMemberItem> = ({ member, children }) => {
  const fullName = `${member.user.firstName} ${member.user.lastName}`
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
          backgroundImage: member.user.picture?.url ? `url(${member.user.picture?.url})` : 'none',
          backgroundSize: 'contain',
          marginRight: 2
        }}
      >
        {!member.user.picture?.url && initials(fullName)}
      </Box>
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          flexFlow: 'column'
        }}
      >
        <Typography sx={{ flex: 1 }}>{fullName}</Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default TeamMemberItem
