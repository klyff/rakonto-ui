import Cookies from 'js-cookie'
import * as initials from 'initials'
import { UserType } from '../../../lib/types'

const useUser = (): (UserType & { initials: string; fullName: string }) | null => {
  const userString = Cookies.get('user')
  if (userString) {
    const user = JSON.parse(userString)
    const fullName = `${user.firstName} ${user.lastName}`
    // @ts-ignore
    return { ...user, initials: initials(fullName), fullName }
  }
  return null
}

export default useUser
