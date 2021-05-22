import React from 'react'
import { Sidebar as SidebarSemantic, Menu as SMenu } from 'semantic-ui-react'
import { useRecoilValue } from 'recoil'
import { sidebarState } from '../state'
import Menu from './Menu'
import MediaQuery from 'react-responsive'

const Sidebar: React.FC = ({ children }) => {
  const showSidebar = useRecoilValue(sidebarState)

  return (
    <>
      <MediaQuery minWidth={768}>
        <SidebarSemantic.Pushable id="pushable" as={'div'} style={{ overflow: 'hidden' }} padded={false}>
          <SidebarSemantic
            as={SMenu}
            color="blue"
            animation="push"
            direction="left"
            visible={showSidebar}
            vertical
            borderless
          >
            <Menu />
          </SidebarSemantic>
          <SidebarSemantic.Pusher id="pusher" style={{ width: showSidebar ? 'calc(100% - 260px)' : '100%' }}>
            {children}
          </SidebarSemantic.Pusher>
        </SidebarSemantic.Pushable>
      </MediaQuery>
      <MediaQuery minWidth={0} maxWidth={767}>
        <SidebarSemantic.Pushable id="pushable" as={'div'} padded={false}>
          <SidebarSemantic
            as={SMenu}
            color="blue"
            animation="overlay"
            direction="left"
            visible={showSidebar}
            vertical
            borderless
            width="thin"
          >
            <Menu />
          </SidebarSemantic>

          <SidebarSemantic.Pusher id="pusher">{children}</SidebarSemantic.Pusher>
        </SidebarSemantic.Pushable>
      </MediaQuery>
    </>
  )
}
export default Sidebar
