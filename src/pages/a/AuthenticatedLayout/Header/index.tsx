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
import MailIcon from '@mui/icons-material/Mail'
import TimelineIcon from '@mui/icons-material/Timeline'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import MoreIcon from '@mui/icons-material/MoreVert'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import RoomIcon from '@mui/icons-material/Room'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import HomeIcon from '@mui/icons-material/Home'
import MovieIcon from '@mui/icons-material/Movie'
import useUser from '../../../../components/hooks/useUser'
import { GreetingsDialogContext } from '../../../../components/GreetingsDialog'

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

  const handleLogout = () => {
    history.push('/a/signout')
  }

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
      <MenuItem onClick={greetingsActions.open}>Take a tour</MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
      <MenuItem href="/a/my-library">
        <MailIcon>My Libary</MailIcon>
      </MenuItem>
      <MenuItem href="/a/my-library">
        <MailIcon>My Libary</MailIcon>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )

  const menuOptions = [
    { name: 'my-library', href: '/a/my-library', icon: <HomeIcon />, text: 'My Library' },
    { name: 'stories', href: '/a/stories', icon: <MovieIcon />, text: 'Stories' },
    { name: 'collections', href: '/a/collections', icon: <FolderSpecialIcon />, text: 'Collections' },
    { name: 'peoples', href: '/a/peoples', icon: <PeopleAltIcon />, text: 'People' },
    { name: 'places', href: '/a/places', icon: <RoomIcon />, text: 'Places' },
    { name: 'photos', href: '/a/photos', icon: <PhotoCameraIcon />, text: 'Photos' },
    { name: 'files', href: '/a/files', icon: <InsertDriveFileIcon />, text: 'Files' },
    { name: 'timeline', href: '/a/timeline', icon: <TimelineIcon />, text: 'Timeline' }
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img width={135} height={40} src={'/images/logo-withe.svg'} alt="rakonto" />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, paddingLeft: 8 }}>
            {menuOptions.map(({ href, text, icon, name }, index) => {
              const isSelected = location.pathname.startsWith(href)
              return (
                <Button
                  key={index}
                  color={isSelected ? 'primary' : 'inherit'}
                  variant={isSelected ? 'contained' : undefined}
                  href={href}
                  startIcon={icon}
                  size="large"
                >
                  {text}
                </Button>
              )
            })}
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
              src={user?.picture?.thumbnail}
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
