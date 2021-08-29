import React from 'react'
import { Header } from 'semantic-ui-react'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea, Layout } from '../style'
import { TitleArea } from './style'
import Ocurrencies from './Ocurrencies'
import { api } from '@root/api'
import { TimelineType } from '@root/types'

const People: React.FC = () => {
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<TimelineType>({
    size: 15,
    request: api.getTimelines
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
          <Header as="h1">Files</Header>
        </TitleArea>
        <Ocurrencies ocurrencies={items} />
        {hasNextPage && <div ref={sentryRef}>loading...</div>}
      </Layout>
    </ContentArea>
  )
}

export default People
