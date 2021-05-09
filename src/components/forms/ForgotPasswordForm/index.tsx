import React from 'react'
import { Header, Message } from 'semantic-ui-react'
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react'
import { Formik } from 'formik'
import schema from './schema'
import { useSetRecoilState } from 'recoil'
import { InfoModalState } from '@root/components/modals/InfoModal'
import { Link, useHistory } from 'react-router-dom'
import { requestPasswordReset } from '@root/api'
import { toast } from 'react-semantic-toasts'

const ForgotPasswordForm: React.FC = () => {
  const history = useHistory()
  const setInfoModalState = useSetRecoilState(InfoModalState)

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      await requestPasswordReset(email)
      setInfoModalState({
        open: true,
        title: 'Forgot Password',
        content: 'Instructions have been sent to change your password in your e-mail address.'
      })
      history.push('/login/singin')
    } catch (error) {
      toast({
        title: 'Forgot password',
        description: error.response.data.message,
        type: 'error'
      })
    }
  }

  return (
    <>
      <Header as="h2" color="black" textAlign="left">
        Forgot password
      </Header>
      <Formik initialValues={{ email: '' }} validationSchema={schema} onSubmit={handleSubmit}>
        <Form>
          <Input fluid name="email" placeholder="E-mail address" errorPrompt />
          <SubmitButton color="blue" fluid size="large" type="submit">
            Submit
          </SubmitButton>
          <Message
            size="huge"
            style={{
              background: 'none',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Link to="/login/singin">Back to login</Link>
          </Message>
        </Form>
      </Formik>
    </>
  )
}

export default ForgotPasswordForm
