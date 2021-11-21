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

export const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SimpleSnackbarProvider>
        <SimpleDialogProvider>
          <FormDialogProvider>
            <Router history={history}>
              <Routes />
            </Router>
          </FormDialogProvider>
        </SimpleDialogProvider>
      </SimpleSnackbarProvider>
    </ThemeProvider>
  )
}

export default App
