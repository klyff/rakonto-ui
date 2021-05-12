import React, { ReactNode, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Dimmer, Icon, Header } from 'semantic-ui-react'
import { userState } from '@root/states/userState'
import { api } from '@root/api'
import { parse } from 'qs'
import { InfoModalState } from '@root/components/modals/InfoModal'

const ConfirmEmail: React.FC = ({ children }) => {
  const setUser = useSetRecoilState(userState)
  const history = useHistory()
  const { search } = useLocation()
  const { token: confirmationToken } = parse(search, { ignoreQueryPrefix: true })
  const setInfoModalState = useSetRecoilState(InfoModalState)
  const [showLoading, setShowLoading] = useState<boolean>(false)

  useEffect(() => {
    const confirm = async () => {
      try {
        setShowLoading(true)
        const { user, token } = await api.confirmEmail(confirmationToken as string)
        setShowLoading(false)
        setUser(user)
        localStorage.setItem('token', JSON.stringify(token))
        setInfoModalState({
          open: true,
          title: 'Welcome!',
          content: <>You are about to enter a platform to create and watch videos. enjoy it!</>
        })
        history.push('/a/home')
      } catch (error) {
        setShowLoading(false)
        if (error.response.data.code === '1003') {
          setInfoModalState({
            open: true,
            title: 'Confirm email',
            content: (
              <>
                This token is expired. <br />
                We have sent an email in next minutes, please confirm it.
              </>
            )
          })
        }

        if (error.response.data.code === '1002') {
          setInfoModalState({
            open: true,
            title: 'Confirm email',
            content: (
              <>
                This token not found. <br />
                if you have registred, please try to login to retrive another confirmation e-mail.
              </>
            )
          })
        }

        history.push('/u/signin')
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
          Confirming email!
          <Header.Subheader>we try to confirm your e-mail, please wait a moment!</Header.Subheader>
        </Header>
      </Dimmer>
    </>
  )
}

export default ConfirmEmail
