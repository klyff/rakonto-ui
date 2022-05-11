import React, { useEffect, useState } from 'react'
import Header from './Header'
import { StepStoryUploadProvider } from '../../../components/StepStoryUpload'
import { StepInviteRecorderProvider } from '../../../components/StepInviteRecorder'
import { StepInviteContributorProvider } from '../../../components/StepInviteContributor'
import { GreetingsDialogProvider } from '../../../components/GreetingsDialog'
import { QueueProcessorProvider } from '../../../components/QueueProcessor'
import { CreateCollectionProvider } from '../../../components/CreateCollection'
import { SocketConnectorProvider } from '../../../components/SocketConnector'
import { ChangeMediaProvider } from '../../../components/ChangeMedia'
import api from '../../../lib/api'
import { UserProvider } from '../../../components/UserProvider'
import { UserType } from '../../../lib/types'

const AuthenticatedLayout: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserType | null>()
  useEffect(() => {
    const fetch = async () => {
      const userResponse = await api.getMe()
      setUser(userResponse)
    }
    fetch()
  }, [])
  return (
    <>
      <UserProvider initialUser={user}>
        <SocketConnectorProvider>
          <QueueProcessorProvider>
            <CreateCollectionProvider>
              <StepStoryUploadProvider>
                <StepInviteContributorProvider>
                  <StepInviteRecorderProvider>
                    <ChangeMediaProvider>
                      <GreetingsDialogProvider>
                        <Header />
                        {children}
                      </GreetingsDialogProvider>
                    </ChangeMediaProvider>
                  </StepInviteRecorderProvider>
                </StepInviteContributorProvider>
              </StepStoryUploadProvider>
            </CreateCollectionProvider>
          </QueueProcessorProvider>
        </SocketConnectorProvider>
      </UserProvider>
    </>
  )
}

export default AuthenticatedLayout
