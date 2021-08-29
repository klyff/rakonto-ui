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
      <SMenu.Item className="menu-item" as={Link} to="/a/collections" active={matchRouter('/a/collections')}>
        <Icon name="book" />
        Collections
      </SMenu.Item>
      <SMenu.Item className="menu-item" as={Link} to="/a/people" active={matchRouter('/a/people')}>
        <Icon name="group" />
        People
      </SMenu.Item>
      <SMenu.Item className="menu-item" as={Link} to="/a/places" active={matchRouter('/a/places')}>
        <Icon name="map" />
        Places
      </SMenu.Item>
      <SMenu.Item className="menu-item" as={Link} to="/a/photos" active={matchRouter('/a/photos')}>
        <Icon name="camera" />
        Photos
      </SMenu.Item>
      <SMenu.Item className="menu-item" as={Link} to="/a/files" active={matchRouter('/a/files')}>
        <Icon name="file" />
        Files
      </SMenu.Item>
      <SMenu.Item className="menu-item" as={Link} to="/a/timelines" active={matchRouter('/a/timelines')}>
        <Icon name="calendar" />
        Timeline
      </SMenu.Item>
    </>
  )
}

export default Menu
