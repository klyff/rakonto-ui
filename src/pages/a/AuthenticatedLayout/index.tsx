import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
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
  const headerRef = useRef<HTMLDivElement>(null)
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
                        <Header ref={headerRef} />
                        <Box
                          sx={{
                            width: '100%',
                            height: `calc(100% - ${headerRef?.current?.clientHeight || 0}px)`
                          }}
                        >
                          {children}
                        </Box>
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
