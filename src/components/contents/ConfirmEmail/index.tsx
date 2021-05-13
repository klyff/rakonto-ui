import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Dimmer, Icon, Header } from 'semantic-ui-react'
import { userState } from '@root/states/userState'
import { api } from '@root/api'
import { parse } from 'qs'
import { basicModalState } from '@root/components/modals/BasicModal'
import ExpiredLinkModalForm from '@root/components/forms/ExpiredLinkModalForm'

const ConfirmEmail: React.FC = ({ children }) => {
  const setUser = useSetRecoilState(userState)
  const history = useHistory()
  const { search } = useLocation()
  const { token: confirmationToken } = parse(search, { ignoreQueryPrefix: true })
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [showLoading, setShowLoading] = useState<boolean>(false)

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
          setBasicModalState({
            open: true,
            title: 'Expired link',
            type: 'warning',
            content: <ExpiredLinkModalForm />
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
                if you have registred, please try to login to retrive another confirmation e-mail.
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
