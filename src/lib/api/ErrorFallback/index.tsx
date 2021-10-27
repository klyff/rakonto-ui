import React from 'react'
import Forbidden from './403'
import NotFound from './404'
import ServerError from './500'

// @ts-ignores
const ErrorFallback: React.FC<{ status: number | null; onCallback: () => void }> = ({
  onCallback,
  status,
  children
}) => {
  if (!status) return children
  switch (status) {
    case 403:
      return <Forbidden onCallback={onCallback} />
    case 404:
      return <NotFound onCallback={onCallback} />
    default:
      return <ServerError onCallback={onCallback} />
  }
}

export default ErrorFallback
