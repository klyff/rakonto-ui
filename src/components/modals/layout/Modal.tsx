import { Button, Header, Modal as SModal, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react'
import React, { ReactNode } from 'react'

interface iModal {
  open: boolean
  title: string
  content: string | ReactNode
  type?: 'default' | 'error' | 'warning'
  onClose?: () => void
}

const Modal: React.FC<iModal> = ({ open, content, title, type, onClose }) => {
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
    <SModal open={open} size="tiny">
      <Header content={title} {...headerProps} />
      <SModal.Content image>
        <SModal.Description
          style={{
            wordBreak: 'break-word',
            width: 'fit-content'
          }}
        >
          {content}
        </SModal.Description>
      </SModal.Content>
      <SModal.Actions>
        <Button onClick={onClose} {...buttonProps}>
          Ok
        </Button>
      </SModal.Actions>
    </SModal>
  )
}

export default Modal
