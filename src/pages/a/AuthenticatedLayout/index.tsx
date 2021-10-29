import React from 'react'
import Header from './Header'
import { StepStoryUploadProvider } from '../../../components/StepStoryUpload'
import { GreetingsDialogProvider } from '../../../components/GreetingsDialog'
import { QueueProcessorProvider } from '../../../components/QueueProcessor'
import { SocketConnectorProvider } from '../../../components/SocketConnector'

const AuthenticatedLayout: React.FC = ({ children }) => {
  return (
    <>
      <SocketConnectorProvider>
        <QueueProcessorProvider>
          <StepStoryUploadProvider>
            <GreetingsDialogProvider>
              <Header />
              {children}
            </GreetingsDialogProvider>
          </StepStoryUploadProvider>
        </QueueProcessorProvider>
      </SocketConnectorProvider>
    </>
  )
}

export default AuthenticatedLayout
