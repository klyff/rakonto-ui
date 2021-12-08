import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Password from './Password'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SecurityIcon from '@mui/icons-material/Security'
import Info from './Info'
import Stack from '@mui/material/Stack'

const Profile: React.FC<RouteComponentProps> = () => {
  const [tab, setTab] = useState('info')

  const onTabClick = (tab: string) => {
    setTab(tab)
  }

  return (
    <>
      <Typography
        sx={{
          paddingTop: 4,
          paddingBottom: 2,
          paddingLeft: 3
        }}
        variant="h4"
      >
        Profile
      </Typography>
      <Box sx={{ height: 'calc(100% - 155px)', display: 'flex' }}>
        <Box
          component={Stack}
          direction="column"
          spacing={2}
          sx={{
            width: '212px',
            paddingLeft: 2,
            paddingRight: 2
          }}
        >
          <Button
            color={tab === 'info' ? 'secondary' : 'primary'}
            fullWidth
            startIcon={<AccountCircleIcon />}
            onClick={() => onTabClick('info')}
          >
            <Box sx={{ width: '122px', textAlign: 'start' }}>Personal info</Box>
          </Button>
          <Button
            color={tab === 'password' ? 'secondary' : 'primary'}
            fullWidth
            startIcon={<SecurityIcon />}
            onClick={() => onTabClick('password')}
          >
            <Box sx={{ width: '122px', textAlign: 'start' }}>Password</Box>
          </Button>
        </Box>
        <Box
          sx={{
            flex: '1',
            minHeight: '730px'
          }}
        >
          {tab === 'info' && <Info />}
          {tab === 'password' && <Password />}
        </Box>
      </Box>
    </>
  )
}

export default Profile
