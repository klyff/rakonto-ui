import React, { useState, createContext, ReactNode, useEffect } from 'react'
import { UserType } from '../../lib/types'
import api from '../../lib/api'
import Cookies from 'js-cookie'
import initials from 'initials'

// @ts-ignore
export const UserContext = createContext<{
  refetch: () => void
  user: UserType & { initials: string; fullName: string }
}>({
  // @ts-ignore
  refetch: {}
})

export const UserProvider: React.FC<{ initialUser?: UserType | null }> = ({ children, initialUser }) => {
  const [userString, setUserString] = useState<string>()

  const fetch = async () => {
    const user = await api.getMe()
    const userString = JSON.stringify(user)
    Cookies.set('user', userString)
    setUserString(userString)
  }

  useEffect(() => {
    setUserString(JSON.stringify(initialUser))
  }, [initialUser])

  return (
    <UserContext.Provider
      value={{
        refetch: fetch,
        user: (() => {
          if (userString) {
            const user = JSON.parse(userString)
            const fullName = `${user.firstName} ${user.lastName}`
            return { ...user, initials: initials(fullName), fullName }
          }
        })()
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
