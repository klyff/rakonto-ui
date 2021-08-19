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
import Collections from '@root/components/contents/Collections'
import CollectionsDetails from '@root/components/contents/CollectionsDetails'
import Forbidden from '@root/components/contents/Error/Forbidden'
import NotFound from '@root/components/contents/Error/NotFound'

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
        <Route exact path="/a/home" component={Home} />
        <Route exact path="/a/profile" component={Profile} />
        <Route exact path="/a/stories/new" component={StoryNew} />
        <Route exact path="/a/stories/record/video" component={VideoRecorder} />
        <Route exact path="/a/stories/:storyId/edit" component={StoryDetails} />
        <Route exact path="/a/stories/:storyId" component={StoryShow} />
        <Route exact path="/a/stories" component={Stories} />
        <Route exact path="/a/collections" component={Collections} />
        <Route exact path="/a/collections/:collectionId/edit" component={CollectionsDetails} />
        <Route exact path="/a/signout" component={Signout} />
        <Route exact path="/a/404" component={NotFound} />
        <Route exact path="/a/403" component={Forbidden} />
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
        <Route path="/u/signin" component={SigninForm} />
        <Route path="/u/signup" component={SignupForm} />
        <Route path="/u/forgot-password" component={ForgotPasswordForm} />
        <Route path="/u/password-reset" component={ChangePasswordForm} />
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
