import { Link } from 'react-router-dom'
import { Message } from './style'
import React from 'react'

interface iMessageLink {
  to: string
}

const MessageLink: React.FC<iMessageLink> = ({ to, children }) => {
  return (
    <Message size="huge">
      <Link to={to}>{children}</Link>
    </Message>
  )
}

export default MessageLink
