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
    <>
      <Header as="h1">Home</Header>
      <Grid>
        {items.map((card, i) => {
          return (
            <Grid.Column key={i} tablet={8} mobile={16} widescreen={4} computer={8} largeScreen={4}>
              <StorieCard />
            </Grid.Column>
          )
        })}
        <div ref={sentryRef}>loading...</div>
      </Grid>
    </>
  )
}

export default Home
