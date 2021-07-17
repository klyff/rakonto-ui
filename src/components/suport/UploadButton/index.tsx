import React, { useRef } from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'

interface iUploadButton extends ButtonProps {
  onSelected: (event: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string | undefined
}
const UploadButton: React.FC<iUploadButton> = ({ api, accept, onSelected, children, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelectClick = () => {
    inputRef?.current?.click()
  }

  return (
    <>
      <input ref={inputRef} type="file" multiple={false} hidden={true} onChange={onSelected} accept={accept} />
      <Button onClick={handleFileSelectClick} {...rest}>
        {children && children}
      </Button>
    </>
  )
}

export default UploadButton
