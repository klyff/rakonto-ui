import React from 'react'
import { Router } from 'react-router-dom'
import Routes from './pages/Routes'
import { createBrowserHistory } from 'history'
import { ErrorBoundary } from 'react-error-boundary'
import Error from './pages/500'
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
            <ErrorBoundary FallbackComponent={Error} onReset={() => window.location.replace(window.location.href)}>
              <Router history={history}>
                <Routes />
              </Router>
            </ErrorBoundary>
          </FormDialogProvider>
        </SimpleDialogProvider>
      </SimpleSnackbarProvider>
    </ThemeProvider>
  )
}

export default App
