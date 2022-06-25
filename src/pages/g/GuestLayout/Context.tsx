import React, { useState, createContext } from 'react'
import GuestLayout from './Component'

// @ts-ignore
export const GuestLayoutContext = createContext<{
  setLogo: (logoUrl: string) => void
  setIsloading: (isLoading: boolean) => void
}>({
  // @ts-ignore
  setLogo: (logoUrl: string) => null,
  setIsloading: (isLoading: boolean) => null
})

export const GuestLayoutProvider: React.FC = ({ children }) => {
  const [logo, setLogoState] = useState<string>('/images/logo-withe.svg')
  const [showPoweredByLogo, setShowPoweredByLogo] = useState<boolean>(false)
  const [isLoading, setIsLoadingState] = useState<boolean>(true)

  const setLogo = (logoUrl: string) => {
    setLogoState(logoUrl)
    setShowPoweredByLogo(true)
  }

  const setIsloading = (value: boolean) => {
    setIsLoadingState(value)
  }

  return (
    <GuestLayoutContext.Provider
      value={{
        setLogo,
        setIsloading
      }}
    >
      <GuestLayout isLoading={isLoading} logo={logo} showPoweredByLogo={showPoweredByLogo}>
        {children}
      </GuestLayout>
    </GuestLayoutContext.Provider>
  )
}
