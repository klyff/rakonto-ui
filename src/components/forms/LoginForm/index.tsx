import React from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react'
import { Formik } from 'formik'
import schema from './schema'
import { iSingin, singin } from '@root/api'
import { useLocalStorage } from '@root/hooks/useLocalStorage'
import { toast } from 'react-semantic-toasts'

const LoginForm: React.FC = () => {
  const history = useHistory()
  const [token, setToken] = useLocalStorage<string>('token', '')

  const handleSubmit = async ({ email, password }: iSingin) => {
    try {
      const result = await singin({ email, password })
      setToken(result)
      history.push('/')
    } catch (error) {
      toast({
        title: 'Login',
        description: error.response.data.message,
        type: 'error'
      })
    }
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
              textAlign: 'center',
              background: 'none',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Link to="/login/forgot-password">Forgot Password?</Link>
          </Message>
          <Button basic color="blue" fluid size="large" as={Link} to="/login/singup">
            Create new Account
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default LoginForm
