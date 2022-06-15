import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { VideoJS } from '../../../components/Player/VideoJs'
import api from '../../../lib/api'
import CircularProgress from '@mui/material/CircularProgress'

const Embed: React.FC<RouteComponentProps<{ type: string; id: string }>> = ({ match, history }) => {
  const { type, id } = match.params
  const [data, setData] = useState<any>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getEmbed = async () => {
      try {
        setLoading(true)
        const response = type === 'story' ? await api.getEmbedStory(id) : await api.getEmbedCollection(id)
        setData(response)
      } catch (e) {
        history.push('/500')
      } finally {
        setLoading(false)
      }
    }

    getEmbed()
  }, [type, id])

  if (isLoading) {
    return <CircularProgress size={15} />
  }

  console.log(data)
  return <VideoJS options={{}} />
}

export default Embed
