import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { VideoJS } from '../../../components/Player/VideoJs'
import api from '../../../lib/api'
import CircularProgress from '@mui/material/CircularProgress'
import { CollectionType, StoryType } from '../../../lib/types'

const Embed: React.FC<RouteComponentProps<{ type: string; id: string }>> = ({ match, history }) => {
  const { type, id } = match.params
  const [playlist, setPlaylist] = useState<any[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getEmbed = async () => {
      try {
        setLoading(true)
        const response = type === 'stories' ? await api.getEmbedStory(id) : await api.getEmbedCollection(id)
        let playlist: any[] = []

        if (type === 'stories') {
          const story = response as StoryType

          playlist = [
            {
              src: story.url,
              type: story.mimeType,
              thumb: story.thumbnailUrl,
              title: `${story.title}${story.submission ? ` by ${story.submission.name}` : ''}`,
              duration: story.duration,
              tracks:
                story.subtitles?.map(subtitle => ({
                  // If develop mode need replace proxy port = subtitle.url.replace('8080', '3000')
                  kind: 'captions',
                  src: subtitle.url,
                  srlang: subtitle.language,
                  label: subtitle.language,
                  default: '1'
                })) || []
            }
          ]
        }

        if (type === 'collections') {
          const collection = response as CollectionType

          playlist = collection?.stories?.map(story => ({
            src: story.url,
            type: story.mimeType,
            thumb: story.thumbnailUrl,
            title: `${story.title}${story.submission ? ` by ${story.submission.name}` : ''}`,
            duration: story.duration,
            tracks:
              story.subtitles?.map(subtitle => ({
                // If develop mode need replace proxy port = subtitle.url.replace('8080', '3000')
                kind: 'captions',
                src: subtitle.url,
                srlang: subtitle.language,
                label: subtitle.language,
                default: '1'
              })) || []
          }))
        }

        setPlaylist(playlist)
      } catch (e) {
        history.push('/500')
      } finally {
        setLoading(false)
      }
    }

    getEmbed()
  }, [type, id])

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress size={60} />
      </div>
    )
  }

  return <VideoJS type="playlist" playlist={playlist} embedded />
}

export default Embed
