import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import StoryCard from '@root/components/suport/StoryCard'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea } from '../style'
import { StoryType } from '@root/types'
import { api } from '@root/api'

const StoryList: React.FC = () => {
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<StoryType>({
    size: 15,
    request: api.getStories
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
      <Header as="h1">Stories</Header>
      <Grid>
        {items.map((card, i) => {
          return (
            <Grid.Column key={i} tablet={8} mobile={16} widescreen={4} computer={8} largeScreen={4}>
              <StoryCard />
            </Grid.Column>
          )
        })}
        {hasNextPage && <div ref={sentryRef}>loading...</div>}
      </Grid>
    </ContentArea>
  )
}

export default StoryList
