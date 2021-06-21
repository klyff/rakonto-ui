import { Button, Header, Modal as SModal, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react'
import React, { ReactNode } from 'react'
import { ModalDescription } from './style'

interface iModal {
  open: boolean
  title: string
  content: string | ReactNode
  isConfirmation: boolean
  type?: 'default' | 'error' | 'warning'
  onClose: (success: boolean) => void
}

const ModalBasicLayout: React.FC<iModal> = ({ open, isConfirmation, content, title, type, onClose }) => {
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
        <ModalDescription>{content}</ModalDescription>
      </SModal.Content>
      <SModal.Actions>
        {!isConfirmation && (
          <Button onClick={() => onClose && onClose(false)} {...buttonProps}>
            Ok
          </Button>
        )}
        {isConfirmation && (
          <>
            <Button onClick={() => onClose && onClose(false)} basic>
              Cancel
            </Button>
            <Button onClick={() => onClose && onClose(true)} {...buttonProps}>
              Confirm
            </Button>
          </>
        )}
      </SModal.Actions>
    </SModal>
  )
}

export default ModalBasicLayout
