import React from 'react'
import { Header, Grid, Dropdown } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import StoryCard from '@root/components/suport/StoryCard'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea } from '../style'
import { StoryType } from '@root/types'
import { api } from '@root/api'

const Stories: React.FC = () => {
  const history = useHistory()
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
        {items.map(story => {
          return (
            <Grid.Column key={story.id} tablet={8} mobile={16} widescreen={4} computer={8} largeScreen={4}>
              <StoryCard
                showAutor={false}
                story={story}
                actions={
                  <>
                    <Dropdown pointing="bottom right" icon="ellipsis vertical">
                      <Dropdown.Menu>
                        <Dropdown.Item
                          text="Preview"
                          icon="eye"
                          onClick={() => history.push(`/a/stories/${story.id}`)}
                        />
                        <Dropdown.Item
                          text="Edit"
                          icon="pencil"
                          onClick={() => history.push(`/a/stories/${story.id}/edit`)}
                        />
                        <Dropdown.Item
                          text="Delete Forever"
                          icon="trash"
                          onClick={() => history.push(`/a/stories/${story.id}/edit`)}
                        />
                        <Dropdown.Item
                          text="Download"
                          icon="download"
                          onClick={() => history.push(`/a/stories/${story.id}/edit`)}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                }
              />
            </Grid.Column>
          )
        })}
        {hasNextPage && <div ref={sentryRef}>loading...</div>}
      </Grid>
    </ContentArea>
  )
}

export default Stories
