import React, { useContext } from 'react'
import { CollectionType, SearchResultType } from '../../../../lib/types'
import useInfiniteScroll from '../../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../../components/hooks/usePageableRequest'
import Grid from '@mui/material/Grid'
import Card from '../../../../components/Card'
import CollectionCard from '../../../../components/CollectionCard'
import { useHistory } from 'react-router-dom'
import api from '../../../../lib/api'

interface iCollectionsSlider {
  q: string
}

const CollectionsSlider: React.FC<iCollectionsSlider> = ({ q }) => {
  const history = useHistory()
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<SearchResultType>({
    size: 15,
    q: q,
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
      {items.map(item => (
        <CollectionCard key={item.id} id={item.id} />
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
