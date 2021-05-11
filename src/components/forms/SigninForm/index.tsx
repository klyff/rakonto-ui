import React, { useState } from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import schema from './schema'
import { iSignin, api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { userState } from '@root/states/userState'
import FormField from '@root/components/suport/FormField'

const SigninForm: React.FC = () => {
  const history = useHistory()
  const setUser = useSetRecoilState(userState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const handleSubmit = async ({ email, password }: iSignin) => {
    try {
      const { token, user } = await api.signin({ email, password })
      localStorage.setItem('token', JSON.stringify(token))
      setUser(user)
      history.push('/a')
    } catch (error) {
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
            <FormField name="email" placeholder="E-mail address" errorMessage={errorMessage} />
            <FormField name="password" placeholder="Password" type="password" icon="eye" errorMessage={errorMessage} />
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
