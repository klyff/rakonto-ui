import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '@root/pages/Home'
import Login from '@root/pages/Login'
import Modals from '@root/components/modals'

const Routes: React.FC = () => {
  return (
    <Router>
      <Modals />
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default Routes
