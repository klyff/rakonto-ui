import React, { useState, useEffect } from 'react'
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Password from './Password'
import Subscription from './Subscription'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SecurityIcon from '@mui/icons-material/Security'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import Info from './Info'
import Stack from '@mui/material/Stack'
import { parse } from 'qs'

const Profile: React.FC<RouteComponentProps> = () => {
  const [t, setTab] = useState('info')
  const history = useHistory()
  const location = useLocation()

  const onTabClick = (tab: string) => {
    history.push(`/a/profile?tab=${tab}`)
  }

  useEffect(() => {
    const { tab } = parse(location?.search === '' ? 'tab=info' : (location?.search as string), {
      ignoreQueryPrefix: true
    })
    setTab(tab as string)
  }, [location])

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
      <Box sx={{ minHeight: 'calc(100% - 155px)', display: 'flex' }}>
        <Box
          component={Stack}
          direction="column"
          spacing={2}
          sx={{
            paddingLeft: 2,
            paddingRight: 2
          }}
        >
          <Button
            color={t === 'info' ? 'primary' : 'secondary'}
            fullWidth
            startIcon={<AccountCircleIcon />}
            onClick={() => onTabClick('info')}
          >
            <Box sx={{ width: '122px', textAlign: 'start' }}>Personal info</Box>
          </Button>
          <Button
            color={t === 'password' ? 'primary' : 'secondary'}
            fullWidth
            startIcon={<SecurityIcon />}
            onClick={() => onTabClick('password')}
          >
            <Box sx={{ width: '122px', textAlign: 'start' }}>Password</Box>
          </Button>
          <Button
            color={t === 'subscription' ? 'primary' : 'secondary'}
            fullWidth
            startIcon={<CreditCardIcon />}
            onClick={() => onTabClick('subscription')}
          >
            <Box sx={{ width: '122px', textAlign: 'start' }}>Subscription</Box>
          </Button>
        </Box>
        <Box
          sx={{
            flex: '1'
          }}
        >
          {t === 'info' && <Info />}
          {t === 'password' && <Password />}
          {t === 'subscription' && <Subscription />}
        </Box>
      </Box>
    </>
  )
}

export default Profile
