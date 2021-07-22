import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import Modals from '@root/components/modals'
import AuthenticatedLayout from '@root/layout/AuthenticatedLayout'
import PublicLayout from '@root/layout/PublicLayout'
import SigninForm from '@root/components/forms/SigninForm'
import ForgotPasswordForm from '@root/components/forms/ForgotPasswordForm'
import SignupForm from '@root/components/forms/SignupForm'
import Home from '@root/components/contents/Home'
import Profile from '@root/components/contents/Profile'
import Signout from '@root/components/contents/Signout'
import ConfirmEmail from '@root/components/contents/ConfirmEmail'
import StoryNew from '@root/components/contents/StoryNew'
import StoryShow from '@root/components/contents/StoryShow'
import StoryDetails from '@root/components/contents/StoryDetails'
import Stories from '@root/components/contents/Stories'

import { SemanticToastContainer } from 'react-semantic-toasts'
import ChangePasswordForm from '@root/components/forms/ChangePasswordForm'
import VideoRecorder from '@root/components/contents/VideoRecorder'

const AuthenticadeRoutes: React.FC<RouteProps> = () => {
  const tokenItem = localStorage.getItem('token')
  const token = tokenItem ? JSON.parse(tokenItem) : undefined
  if (!token) return <Redirect to="/u/signin" />
  return (
    <AuthenticatedLayout>
      <Switch>
        <Route exact path="/a/home">
          <Home />
        </Route>
        <Route exact path="/a/profile">
          <Profile />
        </Route>
        <Route exact path="/a/stories/new">
          <StoryNew />
        </Route>
        <Route exact path="/a/stories/record/video">
          <VideoRecorder />
        </Route>
        <Route exact path="/a/stories/:storyId/edit">
          <StoryDetails />
        </Route>
        <Route exact path="/a/stories/:storyId">
          <StoryShow />
        </Route>
        <Route exact path="/a/stories">
          <Stories />
        </Route>
        <Route exact path="/a/signout">
          <Signout />
        </Route>
        <Redirect to="/a/home" />
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
        <Route path="/u/signin">
          <SigninForm />
        </Route>
        <Route path="/u/signup">
          <SignupForm />
        </Route>
        <Route path="/u/forgot-password">
          <ForgotPasswordForm />
        </Route>
        <Route path="/u/password-reset">
          <ChangePasswordForm />
        </Route>
        <Route path="/u/confirmation-email">
          <ConfirmEmail>
            <SigninForm />
          </ConfirmEmail>
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
