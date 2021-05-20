import React from 'react'
import { Header, Grid } from 'semantic-ui-react'

import StorieCard from '@root/components/suport/StorieCard'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { useLoadStories } from './useLoadStories'

const Home: React.FC = () => {
  const { loading, items, hasNextPage, error, loadMore } = useLoadStories()
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <div
      style={{
        padding: '20px 24px 0px 24px'
      }}
    >
      <Header as="h1">Home</Header>
      <Grid padded>
        <Grid.Row>
          {items.map((card, i) => {
            return (
              <Grid.Column
                key={i}
                tablet={8}
                mobile={16}
                widescreen={2}
                computer={8}
                largeScreen={4}
                style={{
                  marginBottom: '24px'
                }}
              >
                <StorieCard />
              </Grid.Column>
            )
          })}
          <div ref={sentryRef}>loading...</div>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Home
