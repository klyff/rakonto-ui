import React, { useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { useHistory, useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import schema from './schema'
import { iPasswordReset, api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import FormField from '@root/components/suport/FormField'
import MessageLink from '@root/components/suport/MessageLink'
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
        content: <>Your password has been reseted.</>
      })
    } catch (error) {
      if (error.response.data.code === '1003') {
        setBasicModalState({
          open: true,
          title: 'Password change',
          type: 'error',
          content: <>This link to change the password has expired. Please try again!</>
        })
        history.push('/u/signin')
      }

      if (error.response.data.code === '1002') {
        setBasicModalState({
          open: true,
          title: 'Password change',
          type: 'error',
          content: <>This link not exists.</>
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
          For the most secure password create one with at least 8 numbers or letters:
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
              placeholder="Confirm new password"
              type="password"
              errorMessage={errorMessage}
            />
            <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
              Change
            </Button>
            <MessageLink to="/u/signin">Back to login</MessageLink>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ChangePasswordForm
