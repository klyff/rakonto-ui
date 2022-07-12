import React, { useCallback, useContext } from 'react'
import Grid from '@mui/material/Grid'
import { CollectionType, SearchResultType } from '../../../lib/types'
import useInfiniteScroll from '../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../components/hooks/usePageableRequest'
import Card from '../../../components/Card'
import CollectionCard from '../../../components/CollectionCard'
import Typography from '@mui/material/Typography'
import { RouteComponentProps } from 'react-router-dom'
import api from '../../../lib/api'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { CreateCollectionContext } from '../../../components/CreateCollection'

const Collections: React.FC<RouteComponentProps> = () => {
  const { actions: createCollectionActions } = useContext(CreateCollectionContext)
  const { loading, items, hasNextPage, error, loadMore, setItems } = usePageableRequest<SearchResultType>({
    size: 15,
    q: '',
    request: api.searchCollections
  })

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  const handleCallback = useCallback(
    (collection: CollectionType | null) => {
      if (!collection) return
      setItems([
        {
          kind: 'COLLECTION',
          title: collection.title,
          id: collection.id
        },
        ...items
      ])
    },
    [items, setItems]
  )

  return (
    <Grid
      container
      sx={{
        padding: '24px'
      }}
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Collections</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ flex: '1' }} />
          <Button
            variant="outlined"
            sx={{ height: '56px' }}
            onClick={() => createCollectionActions.open(handleCallback)}
          >
            New collection
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {items.map(item => (
            <CollectionCard key={item.id} id={item.id} />
          ))}
          {hasNextPage && (
            <Grid item xs>
              <Card loading={true} title={''} subTitle={''} thumbnail={''} preview={''} />
              <div ref={sentryRef} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Collections
