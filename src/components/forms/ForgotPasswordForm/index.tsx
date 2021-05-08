import React from 'react'
import { Header, Message } from 'semantic-ui-react'
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react'
import { Formik } from 'formik'
import schema from './schema'
import { useSetRecoilState } from 'recoil'
import { InfoModalState } from '@root/components/modals/InfoModal'

interface LoginFormProps {
  handleBack: () => void
}

const ForgotPasswordForm: React.FC<LoginFormProps> = ({ handleBack }) => {
  const setInfoModalState = useSetRecoilState(InfoModalState)

  const handleSubmit = () => {
    console.log('submited')
    setInfoModalState({
      open: true,
      title: 'Forgot Password',
      content: 'Instructions have been sent to change your password in your e-mail address.'
    })
    handleBack()
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
            <a href="#" onClick={handleBack}>
              Back to login
            </a>
          </Message>
        </Form>
      </Formik>
    </>
  )
}

export default ForgotPasswordForm
