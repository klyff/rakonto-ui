import React from 'react'
import { Menu, Image, Icon, Input, Button } from 'semantic-ui-react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { sidebarState } from '../state'
import { userState } from '@root/states/userState'
import Avatar from './Avatar'

const NavBar: React.FC = () => {
  const [showSidebar, setShowsidebar] = useRecoilState(sidebarState)
  const user = useRecoilValue(userState)
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
        <Menu.Item>
          <Input action={{ type: 'submit', content: 'Go' }} placeholder="Navigate to..." />
        </Menu.Item>
        <Menu.Item>
          <Button primary>New Story</Button>
        </Menu.Item>
        <Avatar name={user ? `${user?.firstName} ${user?.lasName}` : ''} />
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
