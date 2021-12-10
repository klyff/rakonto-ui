import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import CardImage from './CardImage'
import { MediaType, UserType } from '../../lib/types'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import AuthorAvatar from '../AuthorAvatar'

interface iCard {
  title: string
  subTitle: string
  thumbnail: string
  preview?: string
  loading: boolean
  owner?: UserType
  type?: MediaType | 'COLLECTION'
}

const Card: React.FC<iCard> = ({ preview, title = '', loading, owner, type, thumbnail = '', subTitle = '' }) => {
  const fullName = `${owner?.firstName} ${owner?.lastName}`

  const prefix =
    type === 'AUDIO' ? (
      <HeadphonesIcon />
    ) : type === 'VIDEO' ? (
      <LocalMoviesIcon />
    ) : type === 'COLLECTION' ? (
      <LocalMoviesIcon />
    ) : null

  return (
    <Box
      sx={{
        width: 416,
        height: 402,
        backgroundColor: 'common.black',
        borderRadius: 2,
        marginRight: 3
      }}
    >
      <Box
        sx={{
          height: 251
        }}
      >
        {loading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              width: '100%',
              height: '100%'
            }}
          />
        ) : (
          <CardImage preview={preview} thumbnail={thumbnail} type={type} />
        )}
      </Box>
      <Box
        sx={{
          height: 3,
          backgroundColor: 'primary.light'
        }}
      />
      <Box
        sx={{
          marginLeft: 2,
          marginRight: 2,
          marginTop: 3
        }}
      >
        <Box>
          {loading ? (
            <Skeleton animation="wave" variant="text" height={40} width="80%" component="div" />
          ) : (
            <Typography sx={{ fontWeight: 700, color: 'grey.A200' }} noWrap variant="h5" component="div">
              {title}
            </Typography>
          )}
          {loading ? (
            <Skeleton animation="wave" variant="text" height={20} width="40%" />
          ) : (
            <Typography sx={{ fontWeight: 700, color: 'grey.A400' }} noWrap variant="h6" gutterBottom component="div">
              {subTitle}
            </Typography>
          )}
        </Box>
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
          {loading && <Skeleton animation="wave" variant="rectangular" width={24} height={24} />}

          <AuthorAvatar prefix={prefix} fullName={fullName} loading={loading} thumbnail={owner?.picture?.url} />
        </Box>
      </Box>
    </Box>
  )
}

export default Card
