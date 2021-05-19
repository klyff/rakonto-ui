import React from 'react'
import { Sidebar as SidebarSemantic, Menu as SMenu } from 'semantic-ui-react'
import { useRecoilValue } from 'recoil'
import { sidebarState } from '../state'
import Menu from './Menu'
import MediaQuery from 'react-responsive'

const Sidebar: React.FC = ({ children }) => {
  const showSidebar = useRecoilValue(sidebarState)

  return (
    <div
      style={{
        marginBottom: '2.85714286em'
      }}
    >
      <MediaQuery minWidth={768}>
        <SidebarSemantic.Pushable as={'div'} style={{ overflow: 'hidden' }} padded={false}>
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
          <SidebarSemantic.Pusher style={{ marginRight: showSidebar ? '250px' : '0' }}>
            {children}
          </SidebarSemantic.Pusher>
        </SidebarSemantic.Pushable>
      </MediaQuery>
      <MediaQuery minWidth={0} maxWidth={767}>
        <SidebarSemantic.Pushable as={'div'} padded={false}>
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

          <SidebarSemantic.Pusher>{children}</SidebarSemantic.Pusher>
        </SidebarSemantic.Pushable>
      </MediaQuery>
    </div>
  )
}
export default Sidebar
