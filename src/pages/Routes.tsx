import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import Cookies from 'js-cookie'
import AuthenticatedLayout from './a/AuthenticatedLayout'
import PublicLayout from './u/PublicLayout'
import Signin from './u/Signin'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Signup = lazy(() => import('./u/Signup'))
const ConfirmationEmail = lazy(() => import('./u/ConfirmationEmail'))
const PasswordReset = lazy(() => import('./u/PasswordReset'))
const ForgotPassword = lazy(() => import('./u/ForgotPassword'))
const Forbidden = lazy(() => import('./403'))
const NotFound = lazy(() => import('./404'))
const MyLibary = lazy(() => import('./a/MyLibrary'))
const Story = lazy(() => import('./a/Story'))
const Stories = lazy(() => import('./a/Stories'))
const Signout = lazy(() => import('./a/Signout'))
const Collections = lazy(() => import('./a/Collections'))
const Collection = lazy(() => import('./a/Collection'))

const Loading = () => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    <CircularProgress size={60} />
  </Box>
)

const AuthenticadeRoutes: React.FC<RouteProps> = () => {
  const token = Cookies.get('token')
  if (!token) return <Redirect to="/u/signin" />
  return (
    <AuthenticatedLayout>
      <Suspense fallback={Loading}>
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
      </Suspense>
    </AuthenticatedLayout>
  )
}

const PublicRoutes: React.FC<RouteProps> = () => {
  const tokenItem = localStorage.getItem('token')
  const token = tokenItem ? JSON.parse(tokenItem) : undefined
  if (token) return <Redirect to="/a/home" />
  return (
    <PublicLayout>
      <Suspense fallback={Loading}>
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
