import React from 'react'
import { Button, Modal, Header, SemanticICONS, SemanticCOLORS } from 'semantic-ui-react'
import { useRecoilState } from 'recoil'

import { basicModalState } from './state'

const BasicModal: React.FC = () => {
  const [{ open, content, title, type }, setOpen] = useRecoilState(basicModalState)
  const handleClose = () => {
    setOpen({
      open: false,
      title: '',
      content: '',
      type: 'default'
    })
  }

  const headerProps: Partial<{ icon: SemanticICONS; color: SemanticCOLORS }> = {}
  const buttonProps: Partial<{ basic: boolean; color: SemanticCOLORS; positive: boolean }> = {}

  if (type === 'default' || !type) {
    buttonProps.positive = true
  }

  if (type === 'error') {
    headerProps.icon = 'exclamation triangle'
    headerProps.color = 'red'
    buttonProps.color = 'red'
    buttonProps.basic = true
  }

  if (type === 'warning') {
    headerProps.icon = 'warning circle'
    headerProps.color = 'orange'
    buttonProps.color = 'blue'
    buttonProps.basic = true
  }

  return (
    <Modal open={open} size="tiny">
      <Header content={title} {...headerProps} />
      <Modal.Content image>
        <Modal.Description
          style={{
            wordBreak: 'break-word',
            width: 'fit-content'
          }}
        >
          {content}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose} {...buttonProps}>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default BasicModal
