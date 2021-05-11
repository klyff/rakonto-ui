import React from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import schema from './schema'
import { iSingup, api } from '@root/api'
import { toast } from 'react-semantic-toasts'
import { useSetRecoilState } from 'recoil'
import { InfoModalState } from '@root/components/modals/InfoModal'
import FormField from '@root/components/suport/FormField'

const SignupForm: React.FC = () => {
  const history = useHistory()
  const setInfoModalState = useSetRecoilState(InfoModalState)

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
      toast({
        title: 'Create account',
        description: error.response.data.message,
        type: 'error'
      })
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
        <Form>
          <FormField name="email" placeholder="E-mail address" />
          <FormField name="firstName" placeholder="First Name" />
          <FormField name="lastName" placeholder="Last Name" />
          <FormField name="password" placeholder="Password" type="password" icon="eye" />
          <FormField name="confirmation" placeholder="Confirmation password" type="password" icon="eye" />
          <Button color="blue" fluid size="large">
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
      </Formik>
    </>
  )
}

export default SignupForm
