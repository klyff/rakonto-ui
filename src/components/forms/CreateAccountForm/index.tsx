import React from 'react'
import { Header, Message } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react'
import { Formik } from 'formik'
import schema from './schema'
import { iSingup, singup } from '@root/api'
import { toast } from 'react-semantic-toasts'
import { useSetRecoilState } from 'recoil'
import { InfoModalState } from '@root/components/modals/InfoModal'

const CreateAccountForm: React.FC = () => {
  const history = useHistory()
  const setInfoModalState = useSetRecoilState(InfoModalState)

  const handleSubmit = async ({ email, firstName, lastName, password, confirmation }: iSingup) => {
    try {
      await singup({ email, firstName, lastName, password, confirmation })
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
          <Input name="email" fluid placeholder="E-mail address" errorPrompt />
          <Input name="firstName" fluid placeholder="First Name" errorPrompt />
          <Input name="lastName" fluid placeholder="Last Name" errorPrompt />
          <Input name="password" fluid icon="eye" placeholder="Password" type="password" errorPrompt />
          <Input name="confirmation" fluid icon="eye" placeholder="Confirm password" type="password" errorPrompt />
          <SubmitButton color="blue" fluid size="large">
            Create account
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

export default CreateAccountForm
