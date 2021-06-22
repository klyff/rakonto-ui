import CAvatar from '@root/components/suport/Avatar'
import React, { useRef, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { api } from '@root/api'
import { ImageType } from '@root/types'

interface iAvatar {
  name: string
  size?: 'small' | 'medium' | 'large'
  defaultPicture: ImageType | null
  onChange: (id: string) => void
}
const UploadAvatar: React.FC<iAvatar> = ({ name, defaultPicture, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [picture, setPicture] = useState<ImageType | null>(defaultPicture)

  const handleFileSelectClick = () => {
    inputRef?.current?.click()
  }

  const handleSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const file: File = event.target.files[0]
    const picture = await api.uploadImage(file, progress => {
      console.log(progress)
    })
    setPicture(picture)
    onChange(picture.id)
  }

  return (
    <>
      <CAvatar name={name} size="large" src={picture?.thumbnail} />
      <input ref={inputRef} type="file" hidden={true} onChange={handleSelected} />
      <Button onClick={handleFileSelectClick}>Upload new picture</Button>
    </>
  )
}

export default UploadAvatar
