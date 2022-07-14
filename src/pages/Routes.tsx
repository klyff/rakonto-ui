import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import Cookies from 'js-cookie'
import { GuestLayoutProvider } from './g/GuestLayout'
import AuthenticatedLayout from './a/AuthenticatedLayout'
import PublicLayout from './u/PublicLayout'
import CircularLoadingCentred from '../components/CircularLoadingCentred'
import FacebookDataDeletion from './u/FacebookDataDeletion'

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
const Organization = lazy(() => import('./a/Organization'))
const Requests = lazy(() => import('./a/Requests'))
const CollectionInvite = lazy(() => import('./g/CollectionInvite'))
const StoryInvite = lazy(() => import('./g/StoryInvite'))
const ShortId = lazy(() => import('./ShortId'))
const Error404 = lazy(() => import('./Error404'))
const Error403 = lazy(() => import('./Error403'))
const Error500 = lazy(() => import('./Error500'))
const Embed = lazy(() => import('./u/Embed'))

const AuthenticadeRoutes: React.FC<RouteProps> = () => {
  const token = Cookies.get('token')
  if (!token) return <Redirect to="/u/signin" />
  return (
    <AuthenticatedLayout>
      <Switch>
        <Route exact path="/a/organization" component={Organization} />
        <Route exact path="/a/people" component={People} />
        <Route exact path="/a/profile" component={Profile} />
        <Route exact path="/a/my-library" component={MyLibrary} />
        <Route exact path="/a/search" component={Search} />
        <Route exact path="/a/Requests" component={Requests} />
        <Route exact path="/a/stories/:storyId" component={Story} />
        <Route exact path="/a/stories" component={Stories} />
        <Route exact path="/a/collections/:collectionId" component={Collection} />
        <Route exact path="/a/collections" component={Collections} />
        <Route exact path="/a/signout" component={Signout} />
        <Redirect to="/a/my-library" />
      </Switch>
    </AuthenticatedLayout>
  )
}

const GuestRoutes: React.FC<RouteProps> = ({ location }) => {
  return (
    <GuestLayoutProvider>
      <Switch>
        <Route exact path="/g/collection-invite/:id" component={CollectionInvite} />
        <Route exact path="/g/story-invite/:id" component={StoryInvite} />
        <Redirect to="/" />
      </Switch>
    </GuestLayoutProvider>
  )
}

const PublicRoutes: React.FC<RouteProps> = () => {
  const tokenItem = localStorage.getItem('token')
  const token = tokenItem ? JSON.parse(tokenItem) : undefined
  if (token) return <Redirect to="/a/my-library" />
  return (
    <PublicLayout>
      <Switch>
        <Route path="/u/signin" component={Signin} />
        <Route path="/u/signup" component={Signup} />
        <Route path="/u/forgot-password" component={ForgotPassword} />
        <Route path="/u/password-reset" component={PasswordReset} />
        <Route path="/u/confirmation-email" component={ConfirmationEmail} />
        <Route path="/u/facebook/data-deletion" component={FacebookDataDeletion} />
        <Redirect to="/u/signin" />
      </Switch>
    </PublicLayout>
  )
}

const Routes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<CircularLoadingCentred />}>
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
          <Route exact path="/404" component={Error404} />
          <Route exact path="/403" component={Error403} />
          <Route exact path="/500" component={Error500} />
          <Route exact path="/:id([0-9A-Z]{6})" component={ShortId} />
          <Route exact path="/embed/:type(stories|collections)/:id" component={Embed} />
          <Redirect to="/a" />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default Routes
