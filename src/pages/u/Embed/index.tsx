import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { VideoJS } from '../../../components/Player/VideoJs'
import api from '../../../lib/api'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
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
              sources: [
                {
                  src: story.url,
                  type: story.mimeType
                }
              ],
              thumb: story.thumbnailUrl,
              title: `${story.title}${story.submission ? ` by ${story.submission.name}` : ''}`,
              duration: story.duration,
              tracks:
                story.subtitles?.map(subtitle => ({
                  kind: 'captions',
                  src: subtitle.url,
                  srclang: subtitle.language,
                  label: subtitle.language,
                  default: '1'
                })) || []
            }
          ]
        }

        if (type === 'collections') {
          const collection = response as CollectionType

          playlist = collection?.stories?.map(story => ({
            sources: [
              {
                src: story.url,
                type: story.mimeType
              }
            ],
            thumb: story.thumbnailUrl,
            title: `${story.title}${story.submission ? ` by ${story.submission.name}` : ''}`,
            duration: story.duration,
            tracks:
              story.subtitles?.map(subtitle => ({
                kind: 'captions',
                src: subtitle.url,
                srclang: subtitle.language,
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

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <VideoJS type="playlist" playlist={playlist} embedded />
      <Box
        component={Link}
        href="/"
        target="_blank"
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          opacity: 0.3,
          '&:hover': {
            opacity: 'unset'
          }
        }}
      >
        <img width="66px" src="/images/poweredByRakonto.png" />
      </Box>
    </div>
  )
}

export default Embed
