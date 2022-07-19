import React, { useState, useEffect } from 'react'
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SecurityIcon from '@mui/icons-material/Security'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CloudIcon from '@mui/icons-material/Cloud'
import GroupIcon from '@mui/icons-material/Group'
import Password from './Password'
import Subscription from './Subscription'
import Storage from './Storage'
import Info from './Info'
import ProfessionalServices from './ProfessionalServices'
import TeamMembers from './TeamMembers'
import { parse } from 'qs'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import EngineeringIcon from '@mui/icons-material/Engineering'
import useUser from '../../../components/UserProvider/useUser'

const Profile: React.FC<RouteComponentProps> = () => {
  const { user } = useUser()
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
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
        My Profile
      </Typography>
      <Box
        sx={{
          height: `100%`,
          display: 'flex',
          flexFlow: isMd ? 'column' : 'row'
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Tabs
            value={t}
            orientation={isMd ? 'horizontal' : 'vertical'}
            variant="fullWidth"
            onChange={(event, value) => onTabClick(value)}
          >
            <Tab
              sx={{ minWidth: { xs: '60px', md: '70px' } }}
              value="info"
              label={
                <Tooltip placement="right" title="Info">
                  <AccountCircleIcon />
                </Tooltip>
              }
            />
            <Tab
              sx={{ minWidth: { xs: '60px', md: '70px' } }}
              value="teamMembers"
              label={
                <Tooltip placement="right" title="Team members">
                  <GroupIcon />
                </Tooltip>
              }
            />
            <Tab
              sx={{ minWidth: { xs: '60px', md: '70px' } }}
              value="password"
              label={
                <Tooltip placement="right" title="Password">
                  <SecurityIcon />
                </Tooltip>
              }
            />
            <Tab
              sx={{ minWidth: { xs: '60px', md: '70px' } }}
              value="subscription"
              label={
                <Tooltip placement="right" title="Subscription">
                  <CreditCardIcon />
                </Tooltip>
              }
            />
            <Tab
              sx={{ minWidth: { xs: '60px', md: '70px' } }}
              value="storage"
              label={
                <Tooltip placement="right" title="Storage">
                  <CloudIcon />
                </Tooltip>
              }
            />
            <Tab
              sx={{ minWidth: { xs: '60px', md: '70px' } }}
              value="professionalServices"
              label={
                <Tooltip placement="right" title="Professional Services">
                  <EngineeringIcon />
                </Tooltip>
              }
            />
          </Tabs>
        </Box>
        <Box
          sx={{
            flex: '1'
          }}
        >
          {t === 'info' && <Info />}
          {t === 'teamMembers' && <TeamMembers />}
          {t === 'password' && <Password />}
          {t === 'subscription' && <Subscription />}
          {t === 'storage' && <Storage />}
          {t === 'professionalServices' && <ProfessionalServices />}
        </Box>
      </Box>
    </>
  )
}

export default Profile
