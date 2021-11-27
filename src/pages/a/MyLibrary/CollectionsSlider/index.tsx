import React, { useContext } from 'react'
import { CollectionType, SearchResultType } from '../../../../lib/types'
import useInfiniteScroll from '../../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../../components/hooks/usePageableRequest'
import Grid from '@mui/material/Grid'
import Card from '../../../../components/Card'
import CollectionCard from '../../../../components/CollectionCard'
import { useHistory } from 'react-router-dom'
import api from '../../../../lib/api'

const CollectionsSlider: React.FC = () => {
  const history = useHistory()
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<SearchResultType>({
    size: 15,
    request: api.searchCollections
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
        .filter(item => item.kind === 'COLLECTION')
        .map(item => item.entity as CollectionType)
        .map(collection => (
          <CollectionCard key={collection.id} collection={collection} />
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

export default CollectionsSlider
