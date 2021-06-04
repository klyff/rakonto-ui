import React, { useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import schema from './schema'
import { api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import { Input } from '@root/components/suport/FormFields'
import MessageLink from '@root/components/suport/MessageLink'
import { SingupFormType } from '@root/types'

const SignupForm: React.FC = () => {
  const history = useHistory()
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const handleSubmit = async ({ email, firstName, lastName, password, confirmation }: SingupFormType) => {
    try {
      await api.singup({ email, firstName, lastName, password, confirmation })
      history.push('/login/singin')
      setBasicModalState({
        open: true,
        title: 'Confirm email',
        content: <>We sent an email to you to confirm your account. Please check this.</>
      })
    } catch (error) {
      if (error.response.data.code === '1001') {
        setErrorMessage('Email is already taken.')
        return
      }
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <>
      <Header as="h2" color="black" textAlign="left">
        Create account
      </Header>
      <Formik
        initialValues={{ email: '', password: '', confirmation: '', firstName: '', lastName: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Input name="email" placeholder="Email address" errorMessage={errorMessage} />
            <Input name="firstName" placeholder="First Name" errorMessage={errorMessage} />
            <Input name="lastName" placeholder="Last Name" errorMessage={errorMessage} />
            <Input name="password" placeholder="Password" type="password" errorMessage={errorMessage} />
            <Input
              name="confirmation"
              placeholder="Confirmation password"
              type="password"
              errorMessage={errorMessage}
            />
            <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
              Create account
            </Button>
            <MessageLink to="/u/signin">Back to login</MessageLink>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SignupForm
