import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea, Layout } from '../style'
import { TitleArea } from './style'
import { PlaceType } from '@root/types'
import PlacesList from './PlacesList'
import { api } from '@root/api'

const Places: React.FC = () => {
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<PlaceType>({
    size: 15,
    request: api.getPlaces
  })
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <ContentArea>
      <Layout>
        <TitleArea>
          <Header as="h1">Places</Header>
        </TitleArea>
        <PlacesList places={items} />
        {hasNextPage && <div ref={sentryRef}>loading...</div>}
      </Layout>
    </ContentArea>
  )
}

export default Places
