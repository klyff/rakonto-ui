import React from 'react'

const getInitials = (name: string): string => {
  const splitedName = name.split(' ')
  if (splitedName.length > 1) {
    return `${splitedName[0].charAt(0).toUpperCase()}${splitedName[splitedName.length - 1].charAt(0).toUpperCase()}`
  } else if (splitedName.length === 1) {
    return `${splitedName[0].charAt(0).toUpperCase()}${splitedName[0].charAt(1).toLowerCase()}`
  }
  return ''
}

interface iAvatar {
  name: string
}

const Avatar: React.FC<iAvatar> = ({ name }) => (
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

export default Avatar
