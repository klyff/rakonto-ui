import React, { useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import schema from './schema'
import { api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { userState } from '@root/states/userState'
import { Input } from '@root/components/suport/FormFields'
import MessageLink from '@root/components/suport/MessageLink'
import { basicModalState } from '@root/components/modals/BasicModal'
import { SigninFormType } from '@root/types'

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

  const handleSubmit = async ({ email, password }: SigninFormType) => {
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

  const initialValues: SigninFormType = { email: '', password: '' }
  return (
    <>
      <Header as="h2" color="black" textAlign="left">
        Login
      </Header>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Input name="email" placeholder="Email address" errorMessage={errorMessage} />
            <Input name="password" placeholder="Password" type="password" errorMessage={errorMessage} />
            <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
              Login
            </Button>
            <MessageLink to="/u/forgot-password">Forgot Password</MessageLink>
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
