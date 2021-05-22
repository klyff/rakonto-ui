import React from 'react'
import { AvatarWrapper } from './style'

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
  <AvatarWrapper>
    <span>{getInitials(name)}</span>
  </AvatarWrapper>
)

export default Avatar
