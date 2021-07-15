import CAvatar from '@root/components/suport/Avatar'
import React, { useEffect, useRef, useState } from 'react'
import { api } from '@root/api'
import { ImageType } from '@root/types'
import { useRecoilValue } from 'recoil'
import { mediaStatusState } from '@root/states/mediaStatusState'
import { ButtonUpload, AdvisorWrapper } from './style'
import { Progress } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'

interface iUploadAvatar {
  name: string
  size?: 'small' | 'medium' | 'large'
  defaultPicture: ImageType | null
  onChange: (id: string | null) => void
}
const UploadAvatar: React.FC<iUploadAvatar> = ({ name, defaultPicture, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [avatarProgress, setAvatarProgress] = useState<{ progress: number; label: string } | null>(null)
  const mediaStatus = useRecoilValue(mediaStatusState)
  const [picture, setPicture] = useState<ImageType | null>(defaultPicture)

  useEffect(() => {
    const id = picture?.id || ''
    if (!mediaStatus[id]) return
    const { payload, finished, progress } = mediaStatus[id]
    setAvatarProgress({ progress, label: 'Processing...' })
    if (finished) {
      setAvatarProgress(null)
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
    try {
      const picture = await api.uploadImage(file, ({ loaded, total }) => {
        const progress = Math.round((loaded * 100) / total)
        setAvatarProgress({ progress, label: 'Uploading...' })
      })
      setPicture(picture)
      onChange(picture.id)
    } catch (error) {
      toast({
        type: 'error',
        title: error.response.data.message,
        time: 3000,
        description: `Error: ${error.response.data.code}`
      })
    }
  }

  const handleRemove = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(null)
    onChange(null)
  }

  return (
    <>
      <CAvatar name={name} size="large" src={picture?.thumbnail} />
      <input ref={inputRef} type="file" hidden={true} onChange={handleSelected} accept={'image/png, image/jpeg'} />
      {avatarProgress !== null && (
        <AdvisorWrapper>
          <Progress
            color="blue"
            progress
            percent={avatarProgress.progress || 0}
            label={avatarProgress.label || ''}
            size="small"
          />
        </AdvisorWrapper>
      )}
      {avatarProgress === null &&
        (!picture?.thumbnail ? (
          <ButtonUpload onClick={handleFileSelectClick} basic primary>
            Upload new picture
          </ButtonUpload>
        ) : (
          <ButtonUpload onClick={handleRemove} basic primary>
            Remove picture
          </ButtonUpload>
        ))}
    </>
  )
}

export default UploadAvatar
