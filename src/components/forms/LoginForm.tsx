import React from 'react'
import { Button, Form, Header, Message } from 'semantic-ui-react'

const LoginForm: React.FC = () => {
  return (
    <>
      <Header as="h2" color="black" textAlign="left">
        Login
      </Header>
      <Form>
        <Form.Input fluid placeholder="E-mail address" />
        <Form.Input fluid icon="eye" placeholder="Password" type="password" />
        <Button color="blue" fluid size="large">
          Login
        </Button>
        <Message size="huge">
          <a href="#">Forgot Password</a>
        </Message>
        <Button basic color="blue" fluid size="large">
          Create new Account
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
