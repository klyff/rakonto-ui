import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import AuthenticatedLayout from './a/AuthenticatedLayout'
import PublicLayout from './u/PublicLayout'
import Signin from './u/Signin'
import Cookies from 'js-cookie'
import Signup from './u/Signup'
import ConfirmationEmail from './u/ConfirmationEmail'
import PasswordReset from './u/PasswordReset'
import ForgotPassword from './u/ForgotPassword'
import Forbidden from './403'
import NotFound from './404'
import MyLibary from './a/MyLibrary'
import Story from './a/Story'
import Stories from './a/Stories'
import Signout from './a/Signout'
import Collections from './a/Collections'
import Collection from './a/Collection'

const AuthenticadeRoutes: React.FC<RouteProps> = () => {
  const token = Cookies.get('token')
  if (!token) return <Redirect to="/u/signin" />
  return (
    <AuthenticatedLayout>
      <Switch>
        <Route exact path="/a/my-library" component={MyLibary} />
        <Route exact path="/a/stories/:storyId" component={Story} />
        <Route exact path="/a/stories" component={Stories} />
        <Route exact path="/a/collections/:collectionId" component={Collection} />
        <Route exact path="/a/collections" component={Collections} />
        <Route exact path="/a/signout" component={Signout} />
        <Route exact path="/a/404" component={NotFound} />
        <Route exact path="/a/403" component={Forbidden} />
        <Redirect to="/a/my-library" />
      </Switch>
    </AuthenticatedLayout>
  )
}

const PublicRoutes: React.FC<RouteProps> = () => {
  const tokenItem = localStorage.getItem('token')
  const token = tokenItem ? JSON.parse(tokenItem) : undefined
  if (token) return <Redirect to="/a/home" />
  return (
    <PublicLayout>
      <Switch>
        <Route path="/u/signin" component={Signin} />
        <Route path="/u/signup" component={Signup} />
        <Route path="/u/forgot-password" component={ForgotPassword} />
        <Route path="/u/password-reset" component={PasswordReset} />
        <Route path="/u/confirmation-email" component={ConfirmationEmail} />
        <Redirect to="/u/signin" />
      </Switch>
    </PublicLayout>
  )
}

const Routes: React.FC = () => {
  return (
    <Router>
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
