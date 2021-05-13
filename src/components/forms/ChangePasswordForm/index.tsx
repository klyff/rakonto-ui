import React, { ReactNode, useState } from 'react'
import { Header, Button, Message } from 'semantic-ui-react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import schema from './schema'
import { iPasswordReset, api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import FormField from '@root/components/suport/FormField'
import { parse } from 'qs'

const ChangePasswordForm: React.FC = () => {
  const history = useHistory()
  const { search } = useLocation()
  const { token } = parse(search, { ignoreQueryPrefix: true })
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const handleSubmit = async ({ password, confirmation, token }: iPasswordReset) => {
    try {
      await api.passwordReset({ password, confirmation, token })
      history.push('/u/signin')
      setBasicModalState({
        open: true,
        title: 'Password changed',
        content: <>Your password has been reset.</>
      })
    } catch (error) {
      if (error.response.data.code === '1003') {
        setBasicModalState({
          open: true,
          title: 'Password change',
          type: 'error',
          content: (
            <>
              This token is expired. <br />
              Repeat the flow to forgot your email.
            </>
          )
        })
        history.push('/u/signin')
      }

      if (error.response.data.code === '1002') {
        setBasicModalState({
          open: true,
          title: 'Password change',
          type: 'error',
          content: (
            <>
              This token not found. <br />
            </>
          )
        })
        history.push('/u/signin')
      }
      setErrorMessage('Something was wrong! please try again.')
    }
  }

  return (
    <>
      <Header as="h2" color="black" textAlign="left">
        Change your password
      </Header>
      <div
        style={{
          padding: '16px 0px 32px'
        }}
      >
        <Header as="h4" color="black" textAlign="left">
          We suggest you use 8 or more characters with a mix of letters, numbers and symbols for the most secure
          password:
        </Header>
      </div>
      <Formik
        initialValues={{ password: '', confirmation: '', token: token as string }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormField name="password" placeholder="Password" type="password" errorMessage={errorMessage} />
            <FormField
              name="confirmation"
              placeholder="Confirmation password"
              type="password"
              errorMessage={errorMessage}
            />
            <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
              Change
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

export default ChangePasswordForm
