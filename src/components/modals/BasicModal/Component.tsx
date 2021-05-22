import React from 'react'
import { useRecoilState } from 'recoil'
import Modal from '../ModalBasicLayout'

import { basicModalState } from './state'

const BasicModal: React.FC = () => {
  const [{ open, content, title, type, onClose }, setOpen] = useRecoilState(basicModalState)

  const handleClose = () => {
    if (onClose) onClose()
    setOpen({
      open: false,
      title: '',
      content: '',
      type: 'default'
    })
  }

  return <Modal open={open} content={content} title={title} type={type} onClose={handleClose} />
}

export default BasicModal
