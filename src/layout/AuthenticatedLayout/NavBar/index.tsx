import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Image, Icon, Input, Button, Dropdown } from 'semantic-ui-react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { sidebarState } from '../state'
import { userState } from '@root/states/userState'
import Avatar from '@root/components/suport/Avatar'

const NavBar: React.FC = () => {
  const history = useHistory()
  const [showSidebar, setShowsidebar] = useRecoilState(sidebarState)
  const user = useRecoilValue(userState)

  const onToggle = () => {
    setShowsidebar(!showSidebar)
  }

  const handleExit = () => {
    history.push('/a/signout')
  }

  const handleNewStorie = () => {
    history.push('/a/stories/new?step=upload')
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
          <Button primary onClick={handleNewStorie}>
            New Story
          </Button>
        </Menu.Item>
        <Dropdown
          item
          icon={''}
          pointing={false}
          trigger={<Avatar name={user ? `${user?.firstName} ${user?.lasName}` : ''} />}
          style={{
            borderLeft: '1px solid rgba(34, 36, 38, 0.15)',
            position: 'relative',
            width: '68px'
          }}
        >
          <Dropdown.Menu>
            <Dropdown.Item icon="user" text="Profile" />
            <Dropdown.Divider />
            <Dropdown.Item icon="log out" text="Exit" onClick={handleExit} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
