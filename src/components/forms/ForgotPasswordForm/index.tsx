import React, { useState } from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import schema from './schema'
import { useSetRecoilState } from 'recoil'
import { InfoModalState } from '@root/components/modals/InfoModal'
import { Link, useHistory } from 'react-router-dom'
import { api } from '@root/api'
import FormField from '@root/components/suport/FormField'

const ForgotPasswordForm: React.FC = () => {
  const history = useHistory()
  const setInfoModalState = useSetRecoilState(InfoModalState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      await api.requestPasswordReset(email)
      setInfoModalState({
        open: true,
        title: 'Forgot Password',
        content: 'Instructions have been sent to change your password in your e-mail address.'
      })
      history.push('/u/singin')
    } catch (error) {
      setErrorMessage('Something was wrong! please try again.')
    }
  }

  return (
    <>
      <Header as="h2" color="black" textAlign="left">
        Forgot password
      </Header>
      <Formik initialValues={{ email: '' }} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormField name="email" placeholder="E-mail address" errorMessage={errorMessage} />
            <Button color="blue" fluid size="large" type="submit" loading={isSubmitting}>
              Submit
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

export default ForgotPasswordForm
