import { Link, useLocation } from 'react-router-dom'
import { Divider, Icon, Menu as SMenu } from 'semantic-ui-react'

import React from 'react'

const Menu: React.FC = () => {
  const { pathname } = useLocation()

  const matchRouter = (value: string) => {
    return pathname.startsWith(value)
  }

  return (
    <>
      <SMenu.Item className="menu-item" as={Link} to="a/home" active={matchRouter('/a/home')}>
        <Icon name="home" />
        Home
      </SMenu.Item>
      <Divider />
      <SMenu.Item className="menu-item" as={Link} to="/a/stories" active={matchRouter('/a/stories')}>
        <Icon name="play" />
        Stories
      </SMenu.Item>
      <SMenu.Item className="menu-item" as={Link} to="/a/colection" active={matchRouter('/a/colection')}>
        <Icon name="book" />
        Colections
      </SMenu.Item>
    </>
  )
}

export default Menu
