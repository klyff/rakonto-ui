import { createTheme } from '@mui/material/styles'
import { red, grey } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: grey['800']
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'unset'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 40
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '40px !important'
        }
      }
    }
  },
  palette: {
    mode: 'dark',
    background: {
      paper: '#141414',
      default: '#1D2120'
    },
    primary: {
      main: '#6EC069'
    },
    secondary: {
      main: grey.A400
    },
    error: {
      main: red.A100
    }
  },
  typography: {
    fontFamily: 'Lato, sans-serif'
  }
})

console.log(theme)

export default theme
