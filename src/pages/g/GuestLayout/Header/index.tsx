import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

export default function PrimarySearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <a href="/">
            <img width={135} height={40} src={'/images/logo-withe.svg'} alt="rakonto" />
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
