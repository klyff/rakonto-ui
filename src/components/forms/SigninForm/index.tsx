import React from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react'
import { Formik } from 'formik'
import schema from './schema'
import { iSignin, signin } from '@root/api'
import { toast } from 'react-semantic-toasts'
import { useSetRecoilState } from 'recoil'
import { userState } from '@root/states/userState'

const SigninForm: React.FC = () => {
  const history = useHistory()
  const setUser = useSetRecoilState(userState)

  const handleSubmit = async ({ email, password }: iSignin) => {
    try {
      const { token, user } = await signin({ email, password })
      localStorage.setItem('token', JSON.stringify(token))
      setUser(user)
      history.push('/a')
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
              background: 'none',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Link to="/u/forgot-password">Forgot Password</Link>
          </Message>
          <Button basic color="blue" fluid size="large" as={Link} to="/u/signup">
            Create new Account
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default SigninForm
