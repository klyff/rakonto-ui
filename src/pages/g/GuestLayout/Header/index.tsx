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
              <img width={135} height={40} src={logo} alt="rakonto" />
            </a>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
