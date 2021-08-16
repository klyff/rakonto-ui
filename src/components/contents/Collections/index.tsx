import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import CollectionCard from '@root/components/suport/CollectionCard'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea } from '../style'
import { CollectionType } from '@root/types'
import { api } from '@root/api'

const Collections: React.FC = () => {
  const history = useHistory()
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<CollectionType>({
    size: 15,
    request: api.getCollections
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
      <Header as="h1">Collections</Header>
      <Grid>
        {items.map(collection => {
          return (
            <Grid.Column key={collection.id} tablet={8} mobile={16} widescreen={4} computer={8} largeScreen={4}>
              <CollectionCard
                collection={collection}
                onClick={() => history.push(`/a/collections/${collection.id}/edit`)}
              />
            </Grid.Column>
          )
        })}
        {hasNextPage && <div ref={sentryRef}>loading...</div>}
      </Grid>
    </ContentArea>
  )
}

export default Collections
