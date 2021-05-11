import React from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import schema from './schema'
import { useSetRecoilState } from 'recoil'
import { InfoModalState } from '@root/components/modals/InfoModal'
import { Link, useHistory } from 'react-router-dom'
import { api } from '@root/api'
import { toast } from 'react-semantic-toasts'
import FormField from '@root/components/suport/FormField'

const ForgotPasswordForm: React.FC = () => {
  const history = useHistory()
  const setInfoModalState = useSetRecoilState(InfoModalState)

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
      toast({
        title: 'Forgot password',
        description: 'Erro on try to recover password!',
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
          <FormField name="email" placeholder="E-mail address" />
          <Button color="blue" fluid size="large" type="submit">
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
            <Link to="/login/singin">Back to login</Link>
          </Message>
        </Form>
      </Formik>
    </>
  )
}

export default ForgotPasswordForm
