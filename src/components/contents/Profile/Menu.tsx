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
            <Dropdown.Item onClick={() => onChange('general')}>General</Dropdown.Item>
            <Dropdown.Item onClick={() => onChange('change-password')}>Change password</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </SMenu>
    )
  }
  return (
    <SMenu pointing={true} stackable secondary>
      <SMenu.Item name="General" active={tab === 'general'} onClick={() => onChange('general')} />
      <SMenu.Item
        name="Change password"
        active={tab === 'change-password'}
        onClick={() => onChange('change-password')}
      />
    </SMenu>
  )
}

export default Menu
