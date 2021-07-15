import React from 'react'
import { Menu as SMenu, Dropdown } from 'semantic-ui-react'
import { useRecoilValue } from 'recoil'
import { mediaQueryState } from '@root/states/mediaQueryState'

interface iMenu {
  tab: string
  onChange: (name: string) => void
}

const Menu: React.FC<iMenu> = ({ tab, onChange }) => {
  const { isMobile, isTablet } = useRecoilValue(mediaQueryState)
  if (isTablet || isMobile) {
    return (
      <SMenu vertical>
        <Dropdown item text={tab}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onChange('information')}>Information</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('transcript')}>Transcript</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('people')}>People</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('places')}>Places</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('timeline')}>Timeline</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('gallery')}>Gallery</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('subtitles')}>Subtitles</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('files')}>Files</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('links')}>Links</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('share')}>Share</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </SMenu>
    )
  }
  return (
    <SMenu pointing={true} stackable secondary>
      <SMenu.Item name="Information" active={tab === 'information'} onClick={() => onChange('information')} />
      <SMenu.Item name="Transcript" active={tab === 'transcript'} onClick={() => onChange('transcript')} />
      <SMenu.Item name="People" active={tab === 'people'} onClick={() => onChange('people')} />
      <SMenu.Item name="Places" active={tab === 'places'} onClick={() => onChange('places')} />
      <SMenu.Item name="Timeline" active={tab === 'timeline'} onClick={() => onChange('timeline')} />
      <SMenu.Item name="Gallery" active={tab === 'gallery'} onClick={() => onChange('gallery')} />
      <SMenu.Item name="Subtitles" active={tab === 'subtitles'} onClick={() => onChange('subtitles')} />
      <SMenu.Item name="Files" active={tab === 'files'} onClick={() => onChange('files')} />
      <SMenu.Item name="Links" active={tab === 'links'} onClick={() => onChange('links')} />
      <SMenu.Item name="Share" active={tab === 'share'} onClick={() => onChange('share')} />
    </SMenu>
  )
}

export default Menu
