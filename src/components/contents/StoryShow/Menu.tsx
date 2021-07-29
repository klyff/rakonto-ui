import React from 'react'
import { Menu as SMenu, Dropdown } from 'semantic-ui-react'
import { useRecoilValue } from 'recoil'
import { mediaQueryState } from '@root/states/mediaQueryState'

interface iMenu {
  tab: string
  onChange: (name: string) => void
  showMenu: {
    transcript: boolean
    people: boolean
    places: boolean
    timeline: boolean
    gallery: boolean
    files: boolean
    links: boolean
  }
}

const Menu: React.FC<iMenu> = ({ tab, showMenu, onChange }) => {
  const { isMobile, isTablet } = useRecoilValue(mediaQueryState)

  if (isTablet || isMobile) {
    return (
      <SMenu vertical>
        <Dropdown item text={tab}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onChange('information')}>Information</Dropdown.Item>
            {showMenu.transcript && <Dropdown.Item onClick={() => onChange('transcript')}>Transcript</Dropdown.Item>}
            {showMenu.people && <Dropdown.Item onClick={() => onChange('people')}>People</Dropdown.Item>}
            {showMenu.places && <Dropdown.Item onClick={() => onChange('places')}>Places</Dropdown.Item>}
            {showMenu.timeline && <Dropdown.Item onClick={() => onChange('timeline')}>Timeline</Dropdown.Item>}
            {showMenu.gallery && <Dropdown.Item onClick={() => onChange('gallery')}>Gallery</Dropdown.Item>}
            {showMenu.files && <Dropdown.Item onClick={() => onChange('files')}>Files</Dropdown.Item>}
            {showMenu.links && <Dropdown.Item onClick={() => onChange('links')}>Links</Dropdown.Item>}
          </Dropdown.Menu>
        </Dropdown>
      </SMenu>
    )
  }
  return (
    <SMenu pointing={true} stackable secondary>
      <SMenu.Item name="Information" active={tab === 'information'} onClick={() => onChange('information')} />
      {showMenu.transcript && (
        <SMenu.Item name="Transcript" active={tab === 'transcript'} onClick={() => onChange('transcript')} />
      )}
      {showMenu.people && <SMenu.Item name="People" active={tab === 'people'} onClick={() => onChange('people')} />}
      {showMenu.places && <SMenu.Item name="Places" active={tab === 'places'} onClick={() => onChange('places')} />}
      {showMenu.timeline && (
        <SMenu.Item name="Timeline" active={tab === 'timeline'} onClick={() => onChange('timeline')} />
      )}
      {showMenu.gallery && <SMenu.Item name="Gallery" active={tab === 'gallery'} onClick={() => onChange('gallery')} />}
      {showMenu.files && <SMenu.Item name="Files" active={tab === 'files'} onClick={() => onChange('files')} />}
      {showMenu.links && <SMenu.Item name="Links" active={tab === 'links'} onClick={() => onChange('links')} />}
    </SMenu>
  )
}

export default Menu
