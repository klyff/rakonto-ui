import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import api from '../lib/api'

const ShortId: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const { id } = match.params

  useEffect(() => {
    const getId = async () => {
      try {
        const response = await api.getShortId(id)
        window.location.href = response.url
      } catch (e) {
        history.push('/')
      }
    }

    getId()
  }, [id])

  return null
}

export default ShortId
