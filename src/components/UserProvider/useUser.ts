import { useContext } from 'react'
import { UserContext } from './Context'

const useUser = () => {
  const { refetch, user } = useContext(UserContext)

  return { refetch, user }
}

export default useUser
