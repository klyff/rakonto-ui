import React from 'react'
import { Image, Loader } from 'semantic-ui-react'
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
  size?: 'small' | 'medium' | 'large'
  src?: string
}

const Avatar: React.FC<iAvatar> = ({ name, size = 'medium', src }) => {
  const hasImage = !!src
  return (
    <AvatarWrapper className="avatar" size={size} borderless={hasImage}>
      {hasImage && <Image src={src} circular />}
      {!hasImage && <span>{getInitials(name)}</span>}
    </AvatarWrapper>
  )
}

export default Avatar
