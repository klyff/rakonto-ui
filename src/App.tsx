import React from 'react'
import { Router } from 'react-router-dom'
import Routes from '@root/Routes'
import { createBrowserHistory } from 'history'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '@root/components/contents/Error/Error'
import ResizeObserver from './ResizeObserver'

export const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={Error} onReset={() => window.location.replace(window.location.href)}>
      <ResizeObserver />
      <Router history={history}>
        <Routes />
      </Router>
    </ErrorBoundary>
  )
}

export default App
