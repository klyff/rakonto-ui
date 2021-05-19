import { Link, useLocation } from 'react-router-dom'
import { Divider, Icon, Menu as SMenu } from 'semantic-ui-react'

import React from 'react'

const Menu: React.FC = () => {
  const { pathname } = useLocation()

  const matchRouter = (value: string) => {
    console.log(value, pathname, pathname.startsWith(value))
    return pathname.startsWith(value)
  }

  return (
    <>
      <SMenu.Item as={Link} to="a/home" active={matchRouter('/a/home')}>
        <div>
          <Icon name="home" /> Home
        </div>
      </SMenu.Item>
      <Divider />
      <SMenu.Item>
        <SMenu.Header>My libbary</SMenu.Header>
        <SMenu.Menu>
          <SMenu.Item as={Link} active={matchRouter('/a/stories')}>
            <div>
              <Icon name="photo" />
              Stories
            </div>
          </SMenu.Item>
          <SMenu.Item as={Link} active={matchRouter('/a/colection')}>
            <div>
              <Icon name="book" />
              Colections
            </div>
          </SMenu.Item>
          <SMenu.Item as={Link} active={matchRouter('/a/people')}>
            <div>
              <Icon name="users" />
              People
            </div>
          </SMenu.Item>
          <SMenu.Item as={Link} active={matchRouter('/a/places')}>
            <div>
              <Icon name="map marker" />
              Places
            </div>
          </SMenu.Item>
          <SMenu.Item as={Link} active={matchRouter('/a/photos')}>
            <div>
              <Icon name="camera" />
              Photos
            </div>
          </SMenu.Item>
          <SMenu.Item as={Link} active={matchRouter('/a/files')}>
            <div>
              <Icon name="file" />
              Files
            </div>
          </SMenu.Item>
        </SMenu.Menu>
      </SMenu.Item>
    </>
  )
}

export default Menu
