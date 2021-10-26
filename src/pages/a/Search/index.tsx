import React, { useContext } from 'react'
import Grid from '@mui/material/Grid'
import { ApiContext } from '../../../lib/api'
import { StoryType } from '../../../lib/types'
import useInfiniteScroll from '../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../components/hooks/usePageableRequest'
import Card from '../../../components/Card'
import StoryCard from '../../../components/StoryCard'
import CollectionCard from '../../../components/CollectionCard'
import { RouteComponentProps } from 'react-router-dom'

const Search: React.FC<RouteComponentProps> = () => {
  const { api } = useContext(ApiContext)
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<StoryType>({
    size: 15,
    request: api().getStories
  })

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <Grid container>
      {items.map(item => {
        // @ts-ignore
        if (item.type !== 'COLLECTION') {
          // @ts-ignore
          return <CollectionCard key={item.id} collection={item} />
        }
        return <StoryCard key={item.id} story={item} />
      })}
      {hasNextPage && (
        <Grid>
          <Card loading={true} title={''} subTitle={''} thumbnail={''} preview={''} />
          <div ref={sentryRef} />
        </Grid>
      )}
    </Grid>
  )
}

export default Search
