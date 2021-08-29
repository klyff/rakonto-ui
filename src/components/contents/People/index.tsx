import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea, Layout } from '../style'
import { TitleArea } from './style'
import { PersonType } from '@root/types'
import Peoples from './Peoples'
import { api } from '@root/api'

const People: React.FC = () => {
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<PersonType>({
    size: 15,
    request: api.getPersons
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
          <Header as="h1">People</Header>
        </TitleArea>
        <Peoples persons={items} />
        {hasNextPage && <div ref={sentryRef}>loading...</div>}
      </Layout>
    </ContentArea>
  )
}

export default People
