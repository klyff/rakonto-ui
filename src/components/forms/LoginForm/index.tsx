import React from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react'
import { Formik } from 'formik'
import schema from './schema'

interface LoginFormProps {
  handleForgotPassword: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ handleForgotPassword }) => {
  const handleSubmit = () => {
    console.log('submited')
  }

  return (
    <>
      <Header as="h2" color="black" textAlign="left">
        Login
      </Header>
      <Formik initialValues={{ email: '', password: '' }} validationSchema={schema} onSubmit={handleSubmit}>
        <Form>
          <Input name="email" fluid placeholder="E-mail address" errorPrompt />
          <Input name="password" fluid icon="eye" placeholder="Password" type="password" errorPrompt />
          <SubmitButton color="blue" fluid size="large">
            Login
          </SubmitButton>
          <Message
            size="huge"
            style={{
              background: 'none',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <a href="#" onClick={handleForgotPassword}>
              Forgot Password
            </a>
          </Message>
          <Button basic color="blue" fluid size="large">
            Create new Account
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default LoginForm
