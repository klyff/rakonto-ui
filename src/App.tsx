import React from 'react'
import { RecoilRoot } from 'recoil'
import Routes from '@root/Routes'

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  )
}

export default App
