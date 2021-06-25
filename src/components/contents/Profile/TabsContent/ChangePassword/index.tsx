import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import schema from './schema'
import { Input } from '@root/components/suport/FormFields'
import { PasswordChangeForm } from '@root/types'
import { api } from '@root/api'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import { Layout } from './style'

const ChangePassword: React.FC = () => {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const setBasicModalState = useSetRecoilState(basicModalState)

  const handleSubmit = async ({ newPassword, confirmation, password }: PasswordChangeForm) => {
    try {
      await api.passwordChange({ password, newPassword, confirmation })
      localStorage.removeItem('token')
      history.push('/u/login')
      setBasicModalState({
        open: true,
        title: 'Password changed',
        content: <>Your password has been changed.</>
      })
    } catch (error) {
      if (error.response.data.code === '1004') {
        setErrorMessage('Wrong password! please try again.')
        return
      }
      setErrorMessage('Something was wrong! please try again.')
    }
  }

  return (
    <Layout>
      <div
        style={{
          padding: '16px 0px 32px'
        }}
      >
        <Header as="h4" color="black" textAlign="left">
          We suggest you use 8 or more characters with a mix of letters, numbers for the most secure password:
        </Header>
      </div>
      <Formik
        initialValues={{ newPassword: '', confirmation: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Input name="password" placeholder="Your password" type="password" errorMessage={errorMessage} />
            <Input name="newPassword" placeholder="New password" type="password" errorMessage={errorMessage} />
            <Input name="confirmation" placeholder="Confirm new password" type="password" errorMessage={errorMessage} />
            <Button basic color="blue" fluid size="large" loading={isSubmitting} type="submit">
              Change
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default ChangePassword
