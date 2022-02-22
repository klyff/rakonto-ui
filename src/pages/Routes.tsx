import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import Cookies from 'js-cookie'
import GuestLayout from './g/GuestLayout'
import AuthenticatedLayout from './a/AuthenticatedLayout'
import PublicLayout from './u/PublicLayout'
import CircularLoadingCentred from '../components/CircularLoadingCentred'

const Signin = lazy(() => import('./u/Signin'))
const Search = lazy(() => import('./a/Search'))
const Signup = lazy(() => import('./u/Signup'))
const ConfirmationEmail = lazy(() => import('./u/ConfirmationEmail'))
const PasswordReset = lazy(() => import('./u/PasswordReset'))
const ForgotPassword = lazy(() => import('./u/ForgotPassword'))
const MyLibrary = lazy(() => import('./a/MyLibrary'))
const Story = lazy(() => import('./a/Story'))
const Stories = lazy(() => import('./a/Stories'))
const Signout = lazy(() => import('./a/Signout'))
const Collections = lazy(() => import('./a/Collections'))
const Collection = lazy(() => import('./a/Collection'))
const Profile = lazy(() => import('./a/Profile'))
const People = lazy(() => import('./a/People'))
const Invitation = lazy(() => import('./g/Invitation'))

const AuthenticadeRoutes: React.FC<RouteProps> = () => {
  const token = Cookies.get('token')
  if (!token) return <Redirect to="/u/signin" />
  return (
    <AuthenticatedLayout>
      <Suspense fallback={<CircularLoadingCentred />}>
        <Switch>
          <Route exact path="/a/people" component={People} />
          <Route exact path="/a/profile" component={Profile} />
          <Route exact path="/a/my-library" component={MyLibrary} />
          <Route exact path="/a/search" component={Search} />
          <Route exact path="/a/stories/:storyId" component={Story} />
          <Route exact path="/a/stories" component={Stories} />
          <Route exact path="/a/collections/:collectionId" component={Collection} />
          <Route exact path="/a/collections" component={Collections} />
          <Route exact path="/a/signout" component={Signout} />
          <Redirect to="/a/my-library" />
        </Switch>
      </Suspense>
    </AuthenticatedLayout>
  )
}

const GuestRoutes: React.FC<RouteProps> = () => {
  const defaultUrl = localStorage.getItem('token') ? '/a' : '/u'
  return (
    <GuestLayout>
      <Suspense fallback={<CircularLoadingCentred />}>
        <Switch>
          <Route exact path="/g/invitation" component={Invitation} />
          <Redirect to={defaultUrl} />
        </Switch>
      </Suspense>
    </GuestLayout>
  )
}

const PublicRoutes: React.FC<RouteProps> = () => {
  const tokenItem = localStorage.getItem('token')
  const token = tokenItem ? JSON.parse(tokenItem) : undefined
  if (token) return <Redirect to="/a/my-library" />
  return (
    <PublicLayout>
      <Suspense fallback={<CircularLoadingCentred />}>
        <Switch>
          <Route path="/u/signin" component={Signin} />
          <Route path="/u/signup" component={Signup} />
          <Route path="/u/forgot-password" component={ForgotPassword} />
          <Route path="/u/password-reset" component={PasswordReset} />
          <Route path="/u/confirmation-email" component={ConfirmationEmail} />
          <Redirect to="/u/signin" />
        </Switch>
      </Suspense>
    </PublicLayout>
  )
}

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/a">
          <AuthenticadeRoutes />
        </Route>
        <Route path="/g">
          <GuestRoutes />
        </Route>
        <Route path="/u">
          <PublicRoutes />
        </Route>
        <Redirect to="/a" />
      </Switch>
    </Router>
  )
}

export default Routes
