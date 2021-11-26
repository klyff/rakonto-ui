import React, { useContext } from 'react'
import Grid from '@mui/material/Grid'
import api from '../../../lib/api'
import { CollectionType, SearchResultType, StoryType } from '../../../lib/types'
import useInfiniteScroll from '../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../components/hooks/usePageableRequest'
import Card from '../../../components/Card'
import StoryCard from '../../../components/StoryCard'
import CollectionCard from '../../../components/CollectionCard'
import { RouteComponentProps } from 'react-router-dom'
import Suggestion from '../../../components/Suggestion'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Search: React.FC<RouteComponentProps> = () => {
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<SearchResultType>({
    size: 15,
    request: api.search
  })

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <Grid
      container
      sx={{
        padding: '24px'
      }}
      spacing={4}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Suggestion />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {items.map(({ kind, entity }) => {
            // @ts-ignore
            if (kind === 'COLLECTION') {
              // @ts-ignore
              return <CollectionCard key={entity.id} collection={entity as CollectionType} />
            }
            return <StoryCard key={entity.id} story={entity as StoryType} />
          })}
          {hasNextPage && (
            <Grid>
              <Card loading={true} title={''} subTitle={''} thumbnail={''} preview={''} />
              <div ref={sentryRef} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Search
