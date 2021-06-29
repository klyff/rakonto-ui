import React, { useRef, useState, useEffect } from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'
import { FileType } from '@root/types'

interface iUploadButton extends ButtonProps {
  onFinished: (value: FileType) => void
  onProgressChange?: (value: number) => void
  api: (file: File, progressCallback?: (progress: { total: number; loaded: number }) => void) => Promise<FileType>
}
const UploadButton: React.FC<iUploadButton> = ({ api, onFinished, onProgressChange, children, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const handleFileSelectClick = () => {
    inputRef?.current?.click()
  }

  useEffect(() => {
    onProgressChange && onProgressChange(uploadProgress)
  }, [uploadProgress])

  const handleSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const file: File = event.target.files[0]
    const result = await api(file, ({ loaded, total }) => {
      const progress = Math.round((loaded * 100) / total) - 1
      setUploadProgress(progress < 0 ? 0 : progress)
    })
    onFinished(result)
  }

  return (
    <>
      <input ref={inputRef} type="file" multiple={false} hidden={true} onChange={handleSelected} />
      <Button onClick={handleFileSelectClick} {...rest}>
        {children && children}
      </Button>
    </>
  )
}

export default UploadButton
