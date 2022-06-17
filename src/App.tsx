import React from 'react'
import { Router } from 'react-router-dom'
import Routes from './pages/Routes'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from '@mui/material/styles'
import { SimpleSnackbarProvider } from './components/SimpleSnackbar'
import { SimpleDialogProvider } from './components/SimpleDialog'
import { FormDialogProvider } from './components/FormDialog'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './lib/theme'
import { MittProvider } from 'react-mitt'
import { useKonamiCode } from '@bitmap/use-konami-code'
import Cookies from 'js-cookie'

export const history = createBrowserHistory()

const App: React.FC = () => {
  useKonamiCode(() => {
    const token = window.prompt('token?')
    if (!token) return
    Cookies.set('token', token)
    window.location.href = '/'
  }, 'iddqd'.split(''))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MittProvider>
        <SimpleSnackbarProvider>
          <SimpleDialogProvider>
            <FormDialogProvider>
              <Router history={history}>
                <Routes />
              </Router>
            </FormDialogProvider>
          </SimpleDialogProvider>
        </SimpleSnackbarProvider>
      </MittProvider>
    </ThemeProvider>
  )
}

export default App
