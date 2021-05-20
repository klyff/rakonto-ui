import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

interface iAvatar {
  name: string
}

const getInitials = (name: string): string => {
  const splitedName = name.split(' ')
  if (splitedName.length > 1) {
    return `${splitedName[0].charAt(0).toUpperCase()}${splitedName[splitedName.length - 1].charAt(0).toUpperCase()}`
  } else if (splitedName.length === 1) {
    return `${splitedName[0].charAt(0).toUpperCase()}${splitedName[0].charAt(1).toLowerCase()}`
  }
  return ''
}

const Avatar: React.FC<iAvatar> = ({ name }) => {
  const history = useHistory()
  const trigger = (
    <div
      style={{
        borderRadius: '50%',
        border: '1px solid #000000',
        height: '36px',
        width: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
      }}
    >
      <span>{getInitials(name)}</span>
    </div>
  )

  const handleExit = () => {
    history.push('/a/signout')
  }

  return (
    <Dropdown
      item
      icon={''}
      pointing={false}
      trigger={trigger}
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
  )
}

export default Avatar
