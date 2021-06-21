import React from 'react'
import { useRecoilState } from 'recoil'
import Modal from '../ModalBasicLayout'

import { basicModalState } from './state'

const BasicModal: React.FC = () => {
  const [{ open, content, title, type, onClose, isConfirmation }, setOpen] = useRecoilState(basicModalState)

  const handleClose = (isSuccess: boolean) => {
    if (onClose) onClose(isSuccess)
    setOpen({
      open: false,
      title: '',
      content: '',
      type: 'default'
    })
  }

  return (
    <Modal
      open={open}
      content={content}
      title={title}
      type={type}
      onClose={handleClose}
      isConfirmation={isConfirmation || false}
    />
  )
}

export default BasicModal
