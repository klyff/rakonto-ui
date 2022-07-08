import Box from '@mui/material/Box'
import { parseISO, format } from 'date-fns'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import { InviteType } from '../../lib/types'

interface iRequestItem {
  invite: InviteType
}

const RequestItem: React.FC<iRequestItem> = ({ invite, children }) => {
  return (
    <Box
      sx={{
        minHeight: '120px',
        width: '100%',
        padding: 2,
        bgcolor: '#313131',
        borderRadius: '20px',
        marginBottom: 3,
        display: 'flex',
        alignItems: 'center',
        flexFlow: { xs: 'column', md: 'row' }
      }}
    >
      <Box
        sx={{
          flex: { xs: 'unset', md: '1' },
          width: { xs: '100%', md: 'unset' },
          paddingX: '8px'
        }}
      >
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Typography>
            Request <b>{invite.title}</b> to collection <b>{invite.collectionTitle}</b>
          </Typography>
          <Typography variant="caption" color="secondary">
            on {format(parseISO(invite.createdAt), 'PPPp')}
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Typography component="span">
            Request <b>{invite.title}</b> to collection <b>{invite.collectionTitle}</b>
          </Typography>
          <Typography component="span" variant="caption" color="secondary">
            {' '}
            on {format(parseISO(invite.createdAt), 'PPPp')}
          </Typography>
        </Box>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default RequestItem
