import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

const Header: React.FC<{ logo: string; isLoading: boolean }> = ({ logo, isLoading }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {!isLoading && (
            <a href="/">
              <Box component="img" sx={{ width: 192.5, maxHeight: 57 }} src={logo} alt="rakonto" />
            </a>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
