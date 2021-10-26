import React from 'react'
import Header from './Header'
import { StepStoryUploadProvider } from '../../../components/StepStoryUpload'
import { GreetingsDialogProvider } from '../../../components/GreetingsDialog'

const AuthenticatedLayout: React.FC = ({ children }) => {
  return (
    <>
      <StepStoryUploadProvider>
        <GreetingsDialogProvider>
          <Header />
          {children}
        </GreetingsDialogProvider>
      </StepStoryUploadProvider>
    </>
  )
}

export default AuthenticatedLayout
