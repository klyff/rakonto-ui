import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Icon, Button } from 'semantic-ui-react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { sidebarState } from '../state'
import { userState } from '@root/states/userState'
import Avatar from '@root/components/suport/Avatar'
import { Menu, Dropdown, Logo, Search } from './style'
import SearchInput from './SearchInput'

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
    history.push('/a/stories/new')
  }

  return (
    <Menu borderless>
      <Menu.Item onClick={onToggle}>
        <Icon name="sidebar" />
      </Menu.Item>
      <Menu.Item>
        <Link to="/a/home">
          <Logo />
        </Link>
      </Menu.Item>
      <Search position="left" fluid>
        <SearchInput />
      </Search>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button primary onClick={handleNewStorie}>
            New Story
          </Button>
        </Menu.Item>
        <Dropdown
          item
          icon={''}
          pointing={false}
          trigger={
            <Avatar picture={user?.picture?.thumbnail} name={user ? `${user?.firstName} ${user?.lastName}` : ''} />
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item icon="user" text="Profile" onClick={() => history.push('/a/profile')} />
            <Dropdown.Divider />
            <Dropdown.Item icon="log out" text="Exit" onClick={handleExit} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
