import React from 'react'
import Header from './Header'
import { StepStoryUploadProvider } from '../../../components/StepStoryUpload'

const AuthenticatedLayout: React.FC = ({ children }) => {
  return (
    <>
      <StepStoryUploadProvider>
        <Header />
        {children}
      </StepStoryUploadProvider>
    </>
  )
}

export default AuthenticatedLayout
