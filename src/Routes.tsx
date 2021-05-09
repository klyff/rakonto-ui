import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import Home from '@root/pages/Home'
import Login from '@root/pages/Login'
import Modals from '@root/components/modals'
import { userState } from '@root/states/userState'
import { getMe } from '@root/api'
import { useRecoilState } from 'recoil'
import { SemanticToastContainer } from 'react-semantic-toasts'
import 'react-semantic-toasts/styles/react-semantic-alert.css'
import { Page } from '@root/components/layout'

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    const connect = async () => {
      setUser(await getMe())
    }
    connect()
  }, [])

  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/login" />
      }}
    />
  )
}

const Routes: React.FC = () => {
  return (
    <Router>
      <Modals />
      <SemanticToastContainer position={'bottom-left'} />
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Page>
              <Home />
            </Page>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default Routes
