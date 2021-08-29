import React from 'react'
import { Header } from 'semantic-ui-react'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea, Layout } from '../style'
import { TitleArea, GridImages } from './style'
import { GalleryType } from '@root/types'
import GalleryItem from './GalleryItem'
import { api } from '@root/api'

const People: React.FC = () => {
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<GalleryType>({
    size: 15,
    request: api.getGallery
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
          <Header as="h1">Photos</Header>
        </TitleArea>
        <GridImages>
          {items.map(value => {
            return <GalleryItem key={value.id} image={value.image} />
          })}
          {hasNextPage && <div ref={sentryRef}>loading...</div>}
        </GridImages>
      </Layout>
    </ContentArea>
  )
}

export default People
