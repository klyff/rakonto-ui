import React from 'react'
import { Sidebar as SidebarSemantic, Menu as SMenu } from 'semantic-ui-react'
import { useRecoilValue } from 'recoil'
import { sidebarState } from '../state'
import Menu from './Menu'

const Sidebar: React.FC = ({ children }) => {
  const showSidebar = useRecoilValue(sidebarState)

  return (
    <>
      <SidebarSemantic.Pushable id="pushable" padded={false}>
        <SidebarSemantic
          as={SMenu}
          color="blue"
          animation="overlay"
          direction="left"
          visible={showSidebar}
          vertical
          borderless
        >
          <Menu />
        </SidebarSemantic>
        <SidebarSemantic.Pusher id="pusher">{children}</SidebarSemantic.Pusher>
      </SidebarSemantic.Pushable>
    </>
  )
}
export default Sidebar
