import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import Modals from '@root/components/modals'
import AuthenticatedLayout from '@root/layout/AuthenticatedLayout'
import PublicLayout from '@root/layout/PublicLayout'
import SigninForm from '@root/components/forms/SigninForm'
import ForgotPasswordForm from '@root/components/forms/ForgotPasswordForm'
import SignupForm from '@root/components/forms/SignupForm'
import Home from '@root/components/contents/Home'
import Signout from '@root/components/contents/Signout'

import { SemanticToastContainer } from 'react-semantic-toasts'

const AuthenticadeRoutes: React.FC<RouteProps> = () => {
  const tokenItem = localStorage.getItem('token')
  const token = tokenItem ? JSON.parse(tokenItem) : undefined
  if (!token) return <Redirect to="/u/signin" />
  return (
    <AuthenticatedLayout>
      <Switch>
        <Route path="/a/home">
          <Home />
        </Route>
        <Redirect to="/a/home" />
      </Switch>
    </AuthenticatedLayout>
  )
}

const PublicRoutes: React.FC<RouteProps> = () => {
  return (
    <PublicLayout>
      <Switch>
        <Route path="/u/signin">
          <SigninForm />
        </Route>
        <Route path="/u/signup">
          <SignupForm />
        </Route>
        <Route path="/u/forgot-password">
          <ForgotPasswordForm />
        </Route>
        <Route path="/u/signout">
          <Signout />
        </Route>
        <Redirect to="/u/signin" />
      </Switch>
    </PublicLayout>
  )
}

const Routes: React.FC = () => {
  return (
    <Router>
      <Modals />
      <SemanticToastContainer position={'bottom-left'} />
      <Switch>
        <Route path="/u">
          <PublicRoutes />
        </Route>
        <Route path="/a">
          <AuthenticadeRoutes />
        </Route>
        <Redirect to="/a" />
      </Switch>
    </Router>
  )
}

export default Routes
