import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { red, grey } from '@mui/material/colors'

// Create a theme instance.
let theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: grey['800'],
          '& > input:autofill': {
            backgroundClip: 'content-box'
          }
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
          borderRadius: '40px !important',
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #000 inset',
            '-webkit-text-fill-color': '#fff'
          }
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
theme = responsiveFontSizes(theme)
export default theme
