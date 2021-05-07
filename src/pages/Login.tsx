import React from 'react'
import { Grid, Container } from 'semantic-ui-react'

import LoginForm from '@root/components/forms/LoginForm'

const Login: React.FC = () => {
  return (
    <Grid stackable padded={true}>
      <Grid.Column
        verticalAlign="middle"
        width={10}
        style={{
          backgroundColor: 'transparent',
          position: 'relative',
          display: 'flex',
          height: '100vh',
          backgroundImage: 'url(/sideLogin.png)',
          backgroundSize: 'cover'
        }}
        only="tablet computer Large Screen Widescreen "
      >
        <div
          style={{
            position: 'absolute',
            background: 'rgba(0,0,0,0.5)',
            height: '100%',
            width: '100%',
            marginLeft: '-1rem',
            marginTop: '-1rem'
          }}
        />
        <div
          style={{
            position: 'absolute',
            zIndex: 1,
            height: '100%',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Lato', sans-serif",
            fontStyle: 'normal',
            letterSpacing: '0.04em',
            maxWidth: '656px'
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 'bolder',
              lineHeight: '67px',
              textAlign: 'left',
              width: '100%'
            }}
          >
            Discover your family
          </div>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              lineHeight: '67px',
              textAlign: 'left',
              width: '100%'
            }}
          >
            story
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'lighter',
              lineHeight: '38px',
              textAlign: 'justify',
              width: '100%'
            }}
          >
            Grow your family tree, find new relatives, and explore billions of historical records
          </div>
        </div>
      </Grid.Column>
      <Grid.Column
        width={6}
        centered
        verticalAlign={'middle'}
        textAlign={'center'}
        stretched
        style={{
          backgroundColor: 'white'
        }}
      >
        <Container>
          <LoginForm />
        </Container>
      </Grid.Column>
    </Grid>
  )
}

export default Login
