import React from 'react'
import { Grid } from 'semantic-ui-react'

import LoginForm from '@root/components/forms/LoginForm'
import ForgotPasswordForm from '@root/components/forms/ForgotPasswordForm'
import CreateAccountForm from '@root/components/forms/CreateAccountForm'
import { Redirect, Route, Switch } from 'react-router-dom'

const Login: React.FC = () => {
  return (
    <Grid stackable padded>
      <Grid.Column
        width={10}
        style={{
          position: 'relative',
          display: 'flex',
          height: '100vh',
          backgroundImage: 'url(/sideLogin.png)',
          backgroundSize: 'cover'
        }}
        only="tablet computer"
      >
        <div
          style={{
            position: 'absolute',
            background: 'rgba(0,0,0,0.5)',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 'bolder',
              lineHeight: '67px',
              color: 'white',
              alignSelf: 'center',
              width: '100%'
            }}
          >
            Discover your family <br />
            story <br />
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'lighter',
              lineHeight: '38px',
              color: 'white',
              alignSelf: 'center',
              width: '100%'
            }}
          >
            Grow your family tree, find new relatives, and explore billions of historical records
          </div>
        </div>
      </Grid.Column>
      <Grid.Column
        width={6}
        style={{
          height: '100vh'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <div
            style={{
              width: '100%',
              alignSelf: 'center'
            }}
          >
            <Switch>
              <Route path="/login/singin">
                <LoginForm />
              </Route>
              <Route path="/login/forgot-password">
                <ForgotPasswordForm />
              </Route>
              <Route path="/login/singup">
                <CreateAccountForm />
              </Route>
              <Redirect to={'/login/singin'} />
            </Switch>
          </div>
        </div>
      </Grid.Column>
    </Grid>
  )
}

export default Login
