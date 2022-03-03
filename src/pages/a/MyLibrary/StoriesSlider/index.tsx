import React, { useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import api from '../../../../lib/api'
import { SearchResultType, StoryType } from '../../../../lib/types'
import useInfiniteScroll from '../../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../../components/hooks/usePageableRequest'
import Card from '../../../../components/Card'
import StoryCard from '../../../../components/StoryCard'
import { useHistory } from 'react-router-dom'
import { SocketConnectorContext } from '../../../../components/SocketConnector'
import { useMitt } from 'react-mitt'

interface iStoriesSliderTiler {
  q: string
}

const StoriesSliderTile: React.FC<iStoriesSliderTiler> = ({ q }) => {
  const { emitter } = useMitt()
  const history = useHistory()
  const { client: socketClient, connected } = useContext(SocketConnectorContext)
  const { loading, items, hasNextPage, error, loadMore, setItems, reload } = usePageableRequest<SearchResultType>({
    size: 15,
    q: q,
    request: api.searchStories
  })

  useEffect(() => {
    emitter.on('story-media-success', event => {
      reload()
    })
  }, [])

  // @ts-ignore
  if (error?.status === 401) {
    history.push('/u/signin')
  }

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <Grid
      wrap="nowrap"
      sx={{
        overflowX: 'auto',
        '::-webkit-scrollbar': {
          display: 'none'
        }
      }}
      container
    >
      {items
        .map(item => item.entity as StoryType)
        .map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      {hasNextPage && (
        <Grid>
          <Card loading={true} title={''} subTitle={''} thumbnail={''} preview={''} />
          <div ref={sentryRef} />
        </Grid>
      )}
    </Grid>
  )
}

export default StoriesSliderTile
