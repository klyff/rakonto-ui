import React, { useState } from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import schema from './schema'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import { Link, useHistory } from 'react-router-dom'
import { api } from '@root/api'
import FormField from '@root/components/suport/FormField'

const ForgotPasswordForm: React.FC = () => {
  const history = useHistory()
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      await api.requestPasswordReset(email)
      setBasicModalState({
        open: true,
        title: 'Forgot Password',
        content: 'We sent you an email with a link to reset your password.'
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
            <FormField name="email" placeholder="Email address" errorMessage={errorMessage} />
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
