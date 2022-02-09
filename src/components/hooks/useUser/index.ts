import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import * as initials from 'initials'
import { UserType } from '../../../lib/types'
import api from '../../../lib/api'

const useUser = (): (UserType & { initials: string; fullName: string }) | null => {
  const [userString, setUserString] = useState(Cookies.get('user'))

  useEffect(() => {
    const fetch = async () => {
      const user = await api.getMe()
      const userString = JSON.stringify(user)
      Cookies.set('user', userString)
      setUserString(userString)
    }
    fetch()
  }, [])

  if (userString) {
    const user = JSON.parse(userString)
    const fullName = `${user.firstName} ${user.lastName}`
    // @ts-ignore
    return { ...user, initials: initials(fullName), fullName }
  }

  return null
}

export default useUser
