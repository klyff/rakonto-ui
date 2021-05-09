import React from 'react'
import { Segment, Sidebar as SidebarSemantic, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { sidebarState } from '../state'

const Sidebar: React.FC = ({ children }) => {
  const showSidebar = useRecoilValue(sidebarState)
  return (
    <SidebarSemantic.Pushable as={'div'} style={{ overflow: 'hidden' }} padded={false}>
      <SidebarSemantic as={Menu} animation="push" direction="left" visible={showSidebar} vertical borderless>
        <Menu.Item as={Link} to>
          Home
          <Icon name="home" />
        </Menu.Item>
        <Menu.Item as={Link}>
          Stories
          <Icon name="photo" />
        </Menu.Item>
        <Menu.Item as={Link}>
          Colections
          <Icon name="book" />
        </Menu.Item>
        <Menu.Item as={Link}>
          People
          <Icon name="users" />
        </Menu.Item>
        <Menu.Item as={Link}>
          Places
          <Icon name="map marker" />
        </Menu.Item>
        <Menu.Item as={Link}>
          Photos
          <Icon name="camera" />
        </Menu.Item>
        <Menu.Item as={Link}>
          Files
          <Icon name="file" />
        </Menu.Item>
      </SidebarSemantic>
      <SidebarSemantic.Pusher>{children}</SidebarSemantic.Pusher>
    </SidebarSemantic.Pushable>
  )
}

export default Sidebar
