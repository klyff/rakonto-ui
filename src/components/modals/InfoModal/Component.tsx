import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { useRecoilState } from 'recoil'

import { InfoModalState } from './state'

const InfoModal: React.FC = () => {
  const [{ open, content, title }, setOpen] = useRecoilState(InfoModalState)
  const handleClose = () => {
    setOpen({
      open: false,
      title: '',
      content: ''
    })
  }
  return (
    <Modal open={open} size="tiny">
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content image>
        <Modal.Description
          style={{
            wordBreak: 'break-word',
            width: 'fit-content'
          }}
        >
          <p>{content}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose} positive>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default InfoModal
