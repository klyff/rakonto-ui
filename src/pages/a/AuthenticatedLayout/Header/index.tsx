import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import HomeIcon from '@mui/icons-material/Home'
import MovieIcon from '@mui/icons-material/Movie'
import useUser from '../../../../components/hooks/useUser'
import { GreetingsDialogContext } from '../../../../components/GreetingsDialog'
import FeedbackIcon from '@mui/icons-material/Feedback'

export default function PrimarySearchAppBar() {
  const user = useUser()
  const history = useHistory()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const { actions: greetingsActions } = useContext(GreetingsDialogContext)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
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
  }

  const menuOptions = [
    { name: 'my-library', href: '/a/my-library', icon: <HomeIcon />, text: 'My Library' },
    { name: 'collections', href: '/a/collections', icon: <FolderSpecialIcon />, text: 'Collections' },
    { name: 'stories', href: '/a/stories', icon: <MovieIcon />, text: 'Stories' },
    { name: 'people', href: '/a/people', icon: <PeopleAltIcon />, text: 'People' }
  ]

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
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
          history.push('/a/profile')
          handleMenuClose()
        }}
      >
        Profile
      </MenuItem>
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
          history.push(`/a/profile`)
          handleMenuClose()
        }}
      >
        Profile
      </MenuItem>
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <a href="/">
            <img width={135} height={40} src={'/images/logo-withe.svg'} alt="rakonto" />
          </a>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, paddingLeft: 8 }}>
            {menuOptions.map(({ href, text, icon, name }, index) => {
              const isSelected = location.pathname.startsWith(href)
              return (
                <Button
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
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSdwKpH3CNqVKx4' +
                    'k4HmXoWWPv60J_LDYdFcIQp63O-EdXLiytw/viewform?usp=sf_link',
                  '_blank'
                )
              }}
            >
              <FeedbackIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Avatar
              sx={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: 'common.white',
                color: 'common.white'
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
}
