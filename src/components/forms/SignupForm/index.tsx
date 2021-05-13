import React, { useState } from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import schema from './schema'
import { iSingup, api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import FormField from '@root/components/suport/FormField'

const SignupForm: React.FC = () => {
  const history = useHistory()
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const handleSubmit = async ({ email, firstName, lastName, password, confirmation }: iSingup) => {
    try {
      await api.singup({ email, firstName, lastName, password, confirmation })
      history.push('/login/singin')
      setBasicModalState({
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
      if (error.response.data.code === '1001') {
        setErrorMessage('E-mail is already taken')
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
            <FormField name="email" placeholder="E-mail address" errorMessage={errorMessage} />
            <FormField name="firstName" placeholder="First Name" errorMessage={errorMessage} />
            <FormField name="lastName" placeholder="Last Name" errorMessage={errorMessage} />
            <FormField name="password" placeholder="Password" type="password" errorMessage={errorMessage} />
            <FormField
              name="confirmation"
              placeholder="Confirmation password"
              type="password"
              errorMessage={errorMessage}
            />
            <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
              Create account
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
              <Link to="/u/signin">Back to login</Link>
            </Message>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SignupForm
