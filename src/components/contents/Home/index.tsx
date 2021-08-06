import React, { useEffect } from 'react'
import { Header, Grid } from 'semantic-ui-react'
import { RouteComponentProps, useLocation } from 'react-router-dom'
import StoryCard from '@root/components/suport/StoryCard'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea } from '../style'
import LoadingArea from '@root/components/suport/LoadingArea'
import { StoryType } from '@root/types'
import { api } from '@root/api'
import { parse } from 'qs'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { search } = useLocation()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { q } = parsedQs

  const { loading, items, hasNextPage, error, loadMore, reload } = usePageableRequest<StoryType>({
    size: 15,
    request: api.search
  })

  useEffect(() => {
    reload(q as string | undefined)
  }, [q])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => loadMore(q as string | undefined),
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <ContentArea>
      <Header as="h1">Home</Header>
      <Grid>
        {items.map(story => {
          return (
            <Grid.Column key={story.id} tablet={8} mobile={16} widescreen={4} computer={8} largeScreen={4}>
              <StoryCard story={story} onClick={() => history.push(`/a/stories/${story.id}`)} />
            </Grid.Column>
          )
        })}
        <div ref={sentryRef}>
          <LoadingArea />
        </div>
      </Grid>
    </ContentArea>
  )
}

export default Home
