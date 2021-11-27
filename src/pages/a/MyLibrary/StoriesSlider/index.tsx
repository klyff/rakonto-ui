import React, { useContext } from 'react'
import Grid from '@mui/material/Grid'
import api from '../../../../lib/api'
import { SearchResultType, StoryType } from '../../../../lib/types'
import useInfiniteScroll from '../../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../../components/hooks/usePageableRequest'
import Card from '../../../../components/Card'
import StoryCard from '../../../../components/StoryCard'
import { useHistory } from 'react-router-dom'

const StoriesSliderTile: React.FC = () => {
  const history = useHistory()
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<SearchResultType>({
    size: 15,
    request: api.searchStories
  })

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
        .filter(item => item.kind === 'STORY_AUDIO' || item.kind === 'STORY_VIDEO')
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
