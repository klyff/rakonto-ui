import React from 'react'
import { Router } from 'react-router-dom'
import Routes from '@root/Routes'
import { createBrowserHistory } from 'history'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@root/components/suport/ErrorFallback'

export const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace(window.location.href)}>
      <Router history={history}>
        <Routes />
      </Router>
    </ErrorBoundary>
  )
}

export default App
