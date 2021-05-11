import React, { useEffect } from 'react'
import { api } from '@root/api'

const Home: React.FC = () => {
  useEffect(() => {
    api.getMe()
  }, [])
  return <div>Home</div>
}

export default Home
