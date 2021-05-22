import React from 'react'
import { Router } from 'react-router-dom'
import Routes from '@root/Routes'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  )
}

export default App
