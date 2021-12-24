import React, { ReactNode } from 'react'
import Skeleton from '@mui/material/Skeleton'
import Avatar from '@mui/material/Avatar'
import initials from 'initials'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface iAuthorAvatar {
  loading?: boolean
  fullName: string
  thumbnail?: string
  prefix?: ReactNode
}

const AuthorAvatar: React.FC<iAuthorAvatar> = ({ loading, fullName, thumbnail, prefix }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        '& > *': {
          marginRight: 1
        }
      }}
    >
      {prefix ? (
        loading ? (
          <Skeleton animation="wave" variant="rectangular" width={24} height={24} />
        ) : (
          <div>{prefix}</div>
        )
      ) : null}
      {loading ? (
        <Skeleton animation="wave" variant="circular" width={32} height={32} />
      ) : (
        <Avatar
          sx={{
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: '1px solid',
            borderColor: 'common.white',
            color: 'common.white',
            width: 32,
            height: 32,
            fontSize: '0.9em',
            '&>img': {
              objectFit: 'contain'
            }
          }}
          src={thumbnail}
        >
          {initials(fullName)}
        </Avatar>
      )}
      {loading ? (
        <Skeleton animation="wave" variant="text" height={40} width="80%" />
      ) : (
        <Typography>{fullName}</Typography>
      )}
    </Box>
  )
}

export default AuthorAvatar
