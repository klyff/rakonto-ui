import Box from '@mui/material/Box'
import { parseISO, format } from 'date-fns'
import Typography from '@mui/material/Typography'
import React from 'react'
import { InviteType } from '../../lib/types'

interface iRequestItem {
  invite: InviteType
}

const RequestItem: React.FC<iRequestItem> = ({ invite, children }) => {
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
          flex: '1',
          display: 'flex',
          flexFlow: 'column'
        }}
      >
        <Typography>
          Request <b>{invite.title}</b> to collection <b>{invite.collectionTitle}</b>
        </Typography>
        <Typography variant="caption" color="secondary">
          on {format(parseISO(invite.createdAt), 'PPPpp')}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default RequestItem
