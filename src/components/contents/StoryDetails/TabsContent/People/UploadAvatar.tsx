import CAvatar from '@root/components/suport/Avatar'
import React from 'react'

interface iAvatar {
  name: string
  size?: 'small' | 'medium' | 'large'
  src?: string
}
const UploadAvatar: React.FC<iAvatar> = ({ name, src }) => {
  return <CAvatar name={name} size="large" src={src} />
}

export default UploadAvatar
