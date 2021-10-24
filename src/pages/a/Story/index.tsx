import React, { useEffect, useState } from 'react'
import { StoryType } from '../../../lib/types'
import Player from '../../../components/Player'
import Box from '@mui/material/Box'
import TabsArea from './TabsArea'
import About from './About'
import { api } from '../../../lib/api'
import MetaTags from 'react-meta-tags'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

const Story: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { id } = match.params
  const [story, setStory] = useState<StoryType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    const fetch = async () => {
      setStory(await api.getStory(id))
      setIsLoading(false)
    }
    fetch()
  }, [])

  if (isLoading) {
    return <CircularProgress />
  }

  if (!story) {
    return <Redirect to={'a/403'} />
  }

  const { type, video, audio, thumbnail, subtitles, owner, title, description, collections, comments, watchers } = story

  return (
    <>
      <MetaTags>
        <title>Rakonto - {story.title}</title>
        <meta property="description" content={story.description || ''} />
        <meta property="creator" content={story.owner.firstName || ''} />
        <meta property="publisher" content={'Rakonto'} />
        <meta property="og:image" content={story.thumbnail} />
      </MetaTags>
      <Box
        sx={{
          width: '100%',
          maxHeight: `720px`,
          display: 'flex',
          flexFlow: 'column'
        }}
      >
        <Box sx={{ width: '100%', height: '100%', margin: `8px 0` }}>
          <Player subtitles={subtitles || []} type={type} media={video || audio} cover={thumbnail} />
        </Box>
        <Box
          sx={{
            width: '100%'
          }}
        >
          <About description={description} owner={owner} title={title} collections={collections} />
          {/* <Comments comments={comments} watchers={watchers} storyId={id} /> */}
          <TabsArea story={story} />
        </Box>
      </Box>
    </>
  )
}

export default Story
