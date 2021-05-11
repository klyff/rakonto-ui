import React from 'react'
import { RecoilRoot } from 'recoil'
import { Router } from 'react-router-dom'
import Routes from '@root/Routes'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router history={history}>
        <Routes />
      </Router>
    </RecoilRoot>
  )
}

export default App
