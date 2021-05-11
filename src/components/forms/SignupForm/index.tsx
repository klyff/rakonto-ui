import React, { useState } from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import schema from './schema'
import { iSingup, api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { InfoModalState } from '@root/components/modals/InfoModal'
import FormField from '@root/components/suport/FormField'

const SignupForm: React.FC = () => {
  const history = useHistory()
  const setInfoModalState = useSetRecoilState(InfoModalState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const handleSubmit = async ({ email, firstName, lastName, password, confirmation }: iSingup) => {
    try {
      await api.singup({ email, firstName, lastName, password, confirmation })
      history.push('/login/singin')
      setInfoModalState({
        open: true,
        title: 'Create account',
        content: (
          <>
            You need to confirm your e-mail address. <br />
            In a few minutes a confirmation email going to send for you!
          </>
        )
      })
    } catch (error) {
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
            <FormField name="email" placeholder="E-mail address" errorMessage={errorMessage} />
            <FormField name="firstName" placeholder="First Name" errorMessage={errorMessage} />
            <FormField name="lastName" placeholder="Last Name" errorMessage={errorMessage} />
            <FormField name="password" placeholder="Password" type="password" icon="eye" errorMessage={errorMessage} />
            <FormField
              name="confirmation"
              placeholder="Confirmation password"
              type="password"
              icon="eye"
              errorMessage={errorMessage}
            />
            <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
              Create account
            </Button>
            <Message
              size="huge"
              style={{
                background: 'none',
                boxShadow: 'none',
                border: 'none'
              }}
            >
              <Link to="/u/signin">Back to login</Link>
            </Message>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SignupForm
