import React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { LinkType } from '../../lib/types'

interface iLinkPreview {
  action?: React.ReactNode
  link: LinkType
}
const LinkPreview: React.FC<iLinkPreview> = ({ link, action }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        marginBottom: 1,
        '&>a': {
          backgroundColor: 'background.default',
          color: 'primary.main',
          borderColor: 'primary.main',
          width: '100%',
          maxWidth: 'unset',
          ':hover': {
            backgroundColor: 'action.hover'
          }
        }
      }}
    >
      {action && (
        <Box
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1001
          }}
        >
          {action}
        </Box>
      )}
      <Link href={link.url} target="_blank">
        {link.url}
      </Link>
    </Box>
  )
}

export default LinkPreview
