import React, { useRef } from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'
import { FileType } from '@root/types'

interface iUploadButton extends ButtonProps {
  onSelected: (event: React.ChangeEvent<HTMLInputElement>) => void
  api: (
    storyId: string,
    file: File,
    progressCallback?: (progress: { total: number; loaded: number }) => void
  ) => Promise<FileType>
}
const UploadButton: React.FC<iUploadButton> = ({ api, onSelected, children, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelectClick = () => {
    inputRef?.current?.click()
  }

  return (
    <>
      <input ref={inputRef} type="file" multiple={false} hidden={true} onChange={onSelected} />
      <Button onClick={handleFileSelectClick} {...rest}>
        {children && children}
      </Button>
    </>
  )
}

export default UploadButton
