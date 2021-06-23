import CAvatar from '@root/components/suport/Avatar'
import React, { useEffect, useRef, useState } from 'react'
import { api } from '@root/api'
import { ImageType } from '@root/types'
import { useRecoilValue } from 'recoil'
import { mediaStatusState } from '@root/states/mediaStatusState'
import { ButtonUpload, AdvisorWrapper } from './style'
import { Loader } from 'semantic-ui-react'

interface iUploadAvatar {
  name: string
  size?: 'small' | 'medium' | 'large'
  defaultPicture: ImageType | null
  onChange: (id: string) => void
}
const UploadAvatar: React.FC<iUploadAvatar> = ({ name, defaultPicture, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [avatarProgress, setAvatarProgress] = useState<boolean>(false)
  const mediaStatus = useRecoilValue(mediaStatusState)
  const [picture, setPicture] = useState<ImageType | null>(defaultPicture)

  useEffect(() => {
    const id = picture?.id || ''
    if (!mediaStatus[id]) return
    const { payload, finished } = mediaStatus[id]
    setAvatarProgress(true)
    if (finished) {
      setAvatarProgress(false)
      setPicture(value => {
        return {
          ...value,
          ...payload
        }
      })
    }
  }, [mediaStatus])

  const handleFileSelectClick = () => {
    inputRef?.current?.click()
  }

  const handleSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const file: File = event.target.files[0]
    const picture = await api.uploadImage(file, () => {
      setAvatarProgress(true)
    })
    setPicture(picture)
    onChange(picture.id)
  }

  return (
    <>
      <CAvatar name={name} size="large" src={picture?.thumbnail} />
      <input ref={inputRef} type="file" hidden={true} onChange={handleSelected} />
      {avatarProgress && (
        <AdvisorWrapper>
          <Loader active inline />
          <span>Sending file...</span>
        </AdvisorWrapper>
      )}
      {!avatarProgress && (
        <ButtonUpload onClick={handleFileSelectClick} basic primary>
          Upload new picture
        </ButtonUpload>
      )}
    </>
  )
}

export default UploadAvatar
