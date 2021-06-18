import React from 'react'
import { Menu as SMenu } from 'semantic-ui-react'

interface iMenu {
  tab: string
  onChange: (name: string) => void
}

const Menu: React.FC<iMenu> = ({ tab, onChange }) => {
  return (
    <SMenu pointing={true} secondary stackable>
      <SMenu.Item name="Information" active={tab === 'information'} onClick={() => onChange('information')} />
      <SMenu.Item name="Transcript" active={tab === 'transcript'} onClick={() => onChange('transcript')} />
      <SMenu.Item name="People" active={tab === 'people'} onClick={() => onChange('people')} />
      <SMenu.Item name="Places" active={tab === 'places'} onClick={() => onChange('places')} />
      <SMenu.Item name="Timeline" active={tab === 'timeline'} onClick={() => onChange('timeline')} />
      <SMenu.Item name="Gallery" active={tab === 'gallery'} onClick={() => onChange('gallery')} />
      <SMenu.Item name="Files" active={tab === 'files'} onClick={() => onChange('files')} />
      <SMenu.Item name="Links" active={tab === 'links'} onClick={() => onChange('links')} />
    </SMenu>
  )
}

export default Menu
