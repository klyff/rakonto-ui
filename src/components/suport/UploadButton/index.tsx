import React, { useRef } from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'

interface iUploadButton extends ButtonProps {
  onSelected: (event: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string | undefined
  multiple?: boolean
}
const UploadButton: React.FC<iUploadButton> = ({ api, multiple = false, accept, onSelected, children, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelectClick = () => {
    inputRef?.current?.click()
  }

  return (
    <>
      <input ref={inputRef} type="file" multiple={multiple} hidden={true} onChange={onSelected} accept={accept} />
      <Button onClick={handleFileSelectClick} {...rest}>
        {children && children}
      </Button>
    </>
  )
}

export default UploadButton
