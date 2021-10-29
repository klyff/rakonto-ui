import React from 'react'
import Header from './Header'
import { StepStoryUploadProvider } from '../../../components/StepStoryUpload'
import { GreetingsDialogProvider } from '../../../components/GreetingsDialog'
import { MediaQueueProcessorProvider } from '../../../components/MediaQueueProcessor'

const AuthenticatedLayout: React.FC = ({ children }) => {
  return (
    <>
      <MediaQueueProcessorProvider>
        <StepStoryUploadProvider>
          <GreetingsDialogProvider>
            <Header />
            {children}
          </GreetingsDialogProvider>
        </StepStoryUploadProvider>
      </MediaQueueProcessorProvider>
    </>
  )
}

export default AuthenticatedLayout
