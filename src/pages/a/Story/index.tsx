import React, { useEffect, useState, useContext } from 'react'
import { StoryType } from '../../../lib/types'
import Player from '../../../components/Player'
import Box from '@mui/material/Box'
import TabsArea from './TabsArea'
import About from './About'
import { ApiContext } from '../../../lib/api'
import MetaTags from 'react-meta-tags'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'

const Story: React.FC<RouteComponentProps<{ storyId: string }>> = ({ match }) => {
  const { api } = useContext(ApiContext)
  const { storyId } = match.params
  const [story, setStory] = useState<StoryType | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)

    const fetch = async () => {
      const result = await api({ errorBoundary: true }).getStory(storyId)
      setStory(result)
      setIsLoading(false)
    }
    fetch()
  }, [])

  if (isLoading) {
    return <CircularLoadingCentred />
  }

  if (!story) {
    return <Redirect to={'/a/my-library'} />
  }

  const { type, video, audio, thumbnail, subtitles, owner, title, description, collections, comments, watchers } = story

  return (
    <>
      <MetaTags>
        <title>Rakonto - {title}</title>
        <meta property="description" content={description || ''} />
        <meta property="creator" content={owner.firstName || ''} />
        <meta property="publisher" content={'Rakonto'} />
        <meta property="og:image" content={thumbnail} />
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
