import { useContext } from 'react'
import { UserContext } from './Context'

const useUser = () => {
  const { refetch, user, isLoading } = useContext(UserContext)

  return { refetch, user, isLoading }
}

export default useUser
