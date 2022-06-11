import React, { useState, useEffect } from 'react'
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Info from './Info'
import Members from './Members'
import Stack from '@mui/material/Stack'
import { parse } from 'qs'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import PeopleIcon from '@mui/icons-material/People'
import ApartmentIcon from '@mui/icons-material/Apartment'
import api from '../../../lib/api'
import { OrganizationInput, OrganizationType } from '../../../lib/types'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'

const Organisation: React.FC<RouteComponentProps> = () => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const [t, setTab] = useState<string>('info')
  const [loading, setLoading] = useState<boolean>(true)
  const [organization, setOrganization] = useState<OrganizationType | null>(null)
  const history = useHistory()
  const location = useLocation()

  const onTabClick = (tab: string) => {
    history.push(`/a/organisation?tab=${tab}`)
  }

  const fetch = async () => {
    setLoading(true)
    try {
      const { content } = await api.getOrganizations()
      if (content.length) setOrganization(content[0])
    } finally {
      setLoading(false)
    }
  }

  const save = async (input: OrganizationInput) => {
    const newOrganization = organization?.id ? await api.createOrganization(input) : await api.createOrganization(input)
    setOrganization(newOrganization)
  }

  useEffect(() => {
    const { tab } = parse(location?.search === '' ? 'tab=info' : (location?.search as string), {
      ignoreQueryPrefix: true
    })
    setTab(tab as string)
  }, [location])

  useEffect(() => {
    fetch()
  }, [])

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
        Organisation
      </Typography>
      <Box
        sx={{
          height: `calc(100% - 155px)`,
          display: 'flex',
          flexFlow: isMd ? 'column' : 'row'
        }}
      >
        <Box
          component={Stack}
          direction={isMd ? 'row' : 'column'}
          spacing={2}
          sx={{
            paddingLeft: 2,
            paddingRight: 2
          }}
        >
          <Button
            color={t === 'info' ? 'primary' : 'secondary'}
            fullWidth
            startIcon={<ApartmentIcon />}
            onClick={() => onTabClick('info')}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' }, width: { xs: 'unset', sm: '122px' }, textAlign: 'start' }}>
              Organisation info
            </Box>
          </Button>
          <Button
            color={t === 'members' ? 'primary' : 'secondary'}
            fullWidth
            startIcon={<PeopleIcon />}
            onClick={() => onTabClick('members')}
            disabled={!organization?.id}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' }, width: { xs: 'unset', sm: '122px' }, textAlign: 'start' }}>
              Members
            </Box>
          </Button>
        </Box>
        <Box
          sx={{
            flex: '1'
          }}
        >
          {loading ? (
            <CircularLoadingCentred />
          ) : (
            <>
              {t === 'info' && <Info organization={organization} onSave={save} />}
              {t === 'members' && <Members id={organization!.id} initialMembers={organization!.memberships} />}
            </>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Organisation
