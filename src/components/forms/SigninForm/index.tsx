import React, { useState } from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import schema from './schema'
import { iSignin, api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { userState } from '@root/states/userState'
import FormField from '@root/components/suport/FormField'
import { basicModalState } from '@root/components/modals/BasicModal'

const SigninForm: React.FC = () => {
  const history = useHistory()
  const setUser = useSetRecoilState(userState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const setBasicModalState = useSetRecoilState(basicModalState)

  const handleResend = async (email: string) => {
    try {
      await api.requestConfirmEmail(email)
      setBasicModalState({
        open: false,
        title: '',
        content: ''
      })
    } catch (error) {
      setBasicModalState({
        open: true,
        title: 'Confirm email',
        content: (
          <>
            This email has not confirmed. <br />
            In the next few minutes, we are sending another confirmation email.
            <br />
            Please, verify our email box and confirm it.
          </>
        )
      })
    }
  }

  const handleSubmit = async ({ email, password }: iSignin) => {
    try {
      setErrorMessage('')
      const { token, user } = await api.signin({ email, password })
      localStorage.setItem('token', JSON.stringify(token))
      setUser(user)
      history.push('/a')
    } catch (error) {
      if (error.response.data.code === '1004') {
        setErrorMessage('Email or password are incorrect. Please try again')
        return
      }
      if (error.response.data.code === '1005') {
        setBasicModalState({
          open: true,
          title: 'Verify email',
          content: (
            <>
              Please verify your email by clicking the link in the message we sent you.
              <br />
              <br />
              <Button basic color="blue" onClick={() => handleResend(email)}>
                Resend email
              </Button>
            </>
          )
        })
        return
      }
      setErrorMessage(error.response.data.message)
    }
  }

  const initialValues: iSignin = { email: '', password: '' }
  return (
    <>
      <Header as="h2" color="black" textAlign="left">
        Login
      </Header>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormField name="email" placeholder="Email address" errorMessage={errorMessage} />
            <FormField name="password" placeholder="Password" type="password" errorMessage={errorMessage} />
            <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
              Login
            </Button>
            <Message
              size="huge"
              style={{
                textAlign: 'center',
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
        )}
      </Formik>
    </>
  )
}

export default SigninForm
