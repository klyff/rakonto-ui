import React, { useState } from 'react'
import { Header, Grid, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import CollectionCard from '@root/components/suport/CollectionCard'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea } from '../style'
import { TitleArea } from './style'
import { CollectionType } from '@root/types'
import { api } from '@root/api'
import AddCollectionFormModal from '@root/components/modals/AddCollectionFormModal'

const Collections: React.FC = () => {
  const history = useHistory()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { loading, items, hasNextPage, error, loadMore, setItems } = usePageableRequest<CollectionType>({
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

  const handleClose = (collection?: CollectionType) => {
    if (collection) {
      setItems([collection, ...items])
    }
    setOpenModal(false)
  }

  return (
    <ContentArea>
      <TitleArea>
        <Header as="h1">Collections</Header>
        <Button icon="add" circular primary onClick={() => setOpenModal(true)} />
      </TitleArea>
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
      <AddCollectionFormModal open={openModal} onClose={handleClose} />
    </ContentArea>
  )
}

export default Collections
