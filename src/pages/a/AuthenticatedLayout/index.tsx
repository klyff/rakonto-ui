import React, { useEffect } from 'react'
import Header from './Header'
import Cookies from 'js-cookie'
import { StepStoryUploadProvider } from '../../../components/StepStoryUpload'
import { StepInviteRecorderProvider } from '../../../components/StepInviteRecorder'
import { GreetingsDialogProvider } from '../../../components/GreetingsDialog'
import { QueueProcessorProvider } from '../../../components/QueueProcessor'
import { CreateCollectionProvider } from '../../../components/CreateCollection'
import { SocketConnectorProvider } from '../../../components/SocketConnector'
import { ChangeMediaProvider } from '../../../components/ChangeMedia'
import api from '../../../lib/api'

const AuthenticatedLayout: React.FC = ({ children }) => {
  useEffect(() => {
    const fetch = async () => {
      const user = await api.getMe()
      Cookies.set('user', JSON.stringify(user))
    }
    fetch()
  }, [])
  return (
    <>
      <SocketConnectorProvider>
        <QueueProcessorProvider>
          <CreateCollectionProvider>
            <StepStoryUploadProvider>
              <StepInviteRecorderProvider>
                <ChangeMediaProvider>
                  <GreetingsDialogProvider>
                    <Header />
                    {children}
                  </GreetingsDialogProvider>
                </ChangeMediaProvider>
              </StepInviteRecorderProvider>
            </StepStoryUploadProvider>
          </CreateCollectionProvider>
        </QueueProcessorProvider>
      </SocketConnectorProvider>
    </>
  )
}

export default AuthenticatedLayout
