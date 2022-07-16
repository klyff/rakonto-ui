import React, { useContext, forwardRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import CameraFrontIcon from '@mui/icons-material/CameraFront'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import HomeIcon from '@mui/icons-material/Home'
import MovieIcon from '@mui/icons-material/Movie'
import useUser from '../../../../components/UserProvider/useUser'
import { GreetingsDialogContext } from '../../../../components/GreetingsDialog'
import RateReviewIcon from '@mui/icons-material/RateReview'
import useStorage from '../../../../components/hooks/useStorage'
import { FormDialogContext } from '../../../../components/FormDialog'
import api from '../../../../lib/api'
import { SimpleSnackbarContext } from '../../../../components/SimpleSnackbar'
import Cookies from 'js-cookie'

const Header = forwardRef((props, ref) => {
  const { storage, isLoading, refetch } = useStorage()
  const { user } = useUser()
  const history = useHistory()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const { actions: greetingsActions } = useContext(GreetingsDialogContext)
  const { actions: formDialogActions } = useContext(FormDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    refetch()
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
    refetch()
  }

  const switchAccount = () => {
    handleMenuClose()
    formDialogActions.open(
      'Switch account',
      'You will access logged with team member account that you choose.',
      [
        {
          label: 'Email',
          name: 'email',
          placeholder: 'select email to switch account',
          type: 'select',
          options: user.teams
        }
      ],
      { email: '' },
      null,
      async ({ email }: { email: string }) => {
        try {
          const newAccess = await api.switchAccount(email)
          Cookies.set('token', newAccess.token)
          console.log('token changed')
          await refetch()
          snackActions.open('Account switched with success!')
        } catch (error) {
          snackActions.open('You access was revoked.')
        }
      },
      { okText: 'Switch account', cancelText: `cancel` }
    )
  }

  const menuOptions = [
    { name: 'my-library', href: '/a/my-library', icon: <HomeIcon />, text: 'My Library' },
    { name: 'collections', href: '/a/collections', icon: <FolderSpecialIcon />, text: 'Collections' },
    { name: 'stories', href: '/a/stories', icon: <MovieIcon />, text: 'Stories' },
    { name: 'requests', href: '/a/requests', icon: <CameraFrontIcon />, text: 'Requests' },
    { name: 'people', href: '/a/people', icon: <PeopleAltIcon />, text: 'People' }
  ]

  const menuId = 'primary-search-account-menu'

  const StorageInfo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, width: '100%' }}>
      {isLoading && <CircularProgress size={15} />}
      {!isLoading && (
        <>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={storage!.percentual} />
          </Box>
          <Box sx={{ minWidth: 35, mr: 3 }}>{storage!.percentual}%</Box>
        </>
      )}
    </Box>
  )

  const renderMenu = (
    <Menu
      PaperProps={{
        style: {
          width: 220
        }
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          greetingsActions.open()
          handleMenuClose()
        }}
      >
        Take a tour
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push(`/a/organization`)
          handleMenuClose()
        }}
      >
        Organization
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push('/a/profile')
          handleMenuClose()
        }}
      >
        My profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push(`/a/profile?tab=subscription`)
          handleMenuClose()
        }}
      >
        Subscription
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push(`/a/profile?tab=professionalServices`)
          handleMenuClose()
        }}
      >
        Professional services
      </MenuItem>
      {!!user?.teams.length && <MenuItem onClick={switchAccount}>Switch account</MenuItem>}
      <MenuItem
        onClick={() => {
          history.push('/a/signout')
          handleMenuClose()
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      PaperProps={{
        style: {
          width: 200
        }
      }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem sx={{ pointerEvents: 'none' }}>
        <Box sx={{ width: '100%', display: 'flex', flexFlow: 'column' }}>
          Storage
          <StorageInfo />
        </Box>
      </MenuItem>
      <Divider />
      {menuOptions.map(item => (
        <MenuItem
          key={item.name}
          onClick={() => {
            history.push(item.href)
            handleMenuClose()
          }}
        >
          {item.text}
        </MenuItem>
      ))}
      <MenuItem
        onClick={() => {
          history.push(`/a/organization`)
          handleMenuClose()
        }}
      >
        Organization
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push(`/a/profile`)
          handleMenuClose()
        }}
      >
        My profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push(`/a/profile?tab=subscription`)
          handleMenuClose()
        }}
      >
        Subscription
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push(`/a/profile?tab=professionalServices`)
          handleMenuClose()
        }}
      >
        Professional services
      </MenuItem>
      {!!user?.teams.length && <MenuItem onClick={switchAccount}>Switch account</MenuItem>}
      <MenuItem
        onClick={() => {
          history.push('/a/signout')
          handleMenuClose()
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }} ref={ref}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Box component="img" sx={{ width: 135, height: 40 }} src={'/images/logo-withe.svg'} alt="rakonto" />
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, paddingLeft: 8 }}>
            {menuOptions.map(({ href, text, icon, name }, index) => {
              const isSelected = location.pathname.startsWith(href)
              return (
                <Button
                  sx={{
                    width: '150px'
                  }}
                  key={index}
                  color={isSelected ? 'primary' : 'inherit'}
                  variant={isSelected ? 'contained' : undefined}
                  onClick={() => history.push(href)}
                  startIcon={icon}
                  size="large"
                >
                  {text}
                </Button>
              )
            })}
            <IconButton
              onClick={() => {
                // eslint-disable-next-line prettier/prettier
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSdwKpH3CNqVKx4k4HmXoWWPv60J_LDYdFcIQp63O-EdXLiytw/viewform?usp=sf_link',
                  '_blank'
                )
              }}
            >
              <RateReviewIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {user?.tier < 3 && (
            <Box sx={{ minWidth: '150px', display: { xs: 'none', md: 'flex' } }}>
              <StorageInfo />
            </Box>
          )}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Avatar
              sx={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: 'common.white',
                color: 'common.white',
                '&>img': {
                  objectFit: 'contain'
                }
              }}
              onClick={handleProfileMenuOpen}
              alt={user?.fullName}
              src={user?.picture?.url}
            >
              {user?.initials}
            </Avatar>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
})

export default Header
