import React from 'react'
import { Pushable, Pusher } from './style'
import { Menu as SMenu, Sidebar as SSidebar } from 'semantic-ui-react'
import { useRecoilValue } from 'recoil'
import { sidebarState } from '../state'
import Menu from './Menu'

const Sidebar: React.FC = ({ children }) => {
  const showSidebar = useRecoilValue(sidebarState)

  return (
    <>
      <Pushable>
        <SSidebar
          as={SMenu}
          color="blue"
          animation="overlay"
          direction="left"
          visible={showSidebar}
          vertical
          borderless
        >
          <Menu />
        </SSidebar>
        <Pusher>{children}</Pusher>
      </Pushable>
    </>
  )
}
export default Sidebar
