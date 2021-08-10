import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Dimmer, Icon, Header } from 'semantic-ui-react'
import { userState } from '@root/states/userState'
import { api } from '@root/api'
import { parse } from 'qs'
import { basicModalState } from '@root/components/modals/BasicModal'
import { formModalState } from '@root/components/modals/FormModal'
import { Form, FormikValues } from 'formik'
import { Input } from '@root/components/suport/FormFields'
import schema from './schema'

const ConfirmEmail: React.FC = ({ children }) => {
  const setUser = useSetRecoilState(userState)
  const history = useHistory()
  const { search } = useLocation()
  const { token: confirmationToken } = parse(search, { ignoreQueryPrefix: true })
  const setBasicModalState = useSetRecoilState(basicModalState)
  const setFormModalState = useSetRecoilState(formModalState)
  const [showLoading, setShowLoading] = useState<boolean>(false)

  const handleSubmit = async ({ email }: FormikValues) => {
    try {
      await api.requestConfirmEmail(email)
      setBasicModalState({
        open: true,
        title: 'Confirm email',
        content: <>We sent an email to you to confirm your account. Please check this.</>
      })
      history.push('/u/signin')
    } catch (error) {
      history.push('/u/signin')
    }
  }

  useEffect(() => {
    const confirm = async () => {
      try {
        setShowLoading(true)
        const { user, token } = await api.confirmEmail(confirmationToken as string)
        setShowLoading(false)
        setUser(user)
        localStorage.setItem('token', JSON.stringify(token))
        setBasicModalState({
          open: true,
          title: 'Welcome!',
          content: <>You are about to enter a platform to create and watch videos. enjoy it!</>
        })
        history.push('/a/home')
      } catch (error) {
        setShowLoading(false)
        if (error.response.data.code === '1003') {
          setFormModalState({
            open: true,
            title: 'Expired link',
            type: 'warning',
            initialValues: { email: '' },
            validationSchema: schema,
            isConfirmation: true,
            onSubmit: handleSubmit,
            content: (
              <>
                <div
                  style={{
                    marginBottom: '16px'
                  }}
                >
                  This link has expired. Please enter your email address to resend another link to you to confirm your
                  account.
                </div>
                <div>
                  <Form>
                    <Input name="email" placeholder="Email address" />
                  </Form>
                </div>
              </>
            )
          })
        }

        if (error.response.data.code === '1002') {
          setBasicModalState({
            open: true,
            title: 'Confirm email',
            type: 'error',
            content: (
              <>
                This token not found. <br />
                if you have registered, please try to login to request another confirmation email.
              </>
            )
          })
          history.push('/u/signin')
        }
      }
    }
    confirm()
  }, [])

  return (
    <>
      {children}
      <Dimmer active={showLoading} page>
        <Header as="h2" icon inverted>
          <Icon name="spinner" loading />
        </Header>
      </Dimmer>
    </>
  )
}

export default ConfirmEmail
