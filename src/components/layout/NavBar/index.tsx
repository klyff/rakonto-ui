import React from 'react'
import { Menu, Image, Icon } from 'semantic-ui-react'
import { useRecoilState } from 'recoil'
import { sidebarState } from '../state'

const NavBar: React.FC = () => {
  const [showSidebar, setShowsidebar] = useRecoilState(sidebarState)
  const onToggle = () => {
    setShowsidebar(!showSidebar)
  }

  return (
    <Menu
      borderless
      style={{
        margin: 0,
        borderRadius: 0
      }}
    >
      <Menu.Item onClick={onToggle}>
        <Icon name="sidebar" />
      </Menu.Item>
      <Menu.Item>
        <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>teste</Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
