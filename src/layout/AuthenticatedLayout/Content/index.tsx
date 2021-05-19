import React from 'react'

const Content: React.FC = ({ children }) => {
  return (
    <div
      style={{
        overflowY: 'auto',
        height: '100vh'
      }}
    >
      {children}
    </div>
  )
}

export default Content
