import React from 'react'
import { Header, Grid, Dropdown } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import StoryCard from '@root/components/suport/StoryCard'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea, Layout } from '../style'
import { StoryType } from '@root/types'
import { api } from '@root/api'
import { toast } from 'react-semantic-toasts'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'

const Stories: React.FC = () => {
  const history = useHistory()
  const setBasicModalState = useSetRecoilState(basicModalState)
  const { loading, items, hasNextPage, error, loadMore, reload } = usePageableRequest<StoryType>({
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

  const handleDelete = async (id: string) => {
    setBasicModalState({
      open: true,
      title: 'Delete story',
      isConfirmation: true,
      onClose: async (isSuccess: boolean) => {
        if (!isSuccess) return
        try {
          await api.deleteStory(id)
          reload()
        } catch (error) {
          toast({
            type: 'error',
            title: error.response.data.message,
            time: 3000,
            description: `Error: ${error.response.data.code}`
          })
        }
      },
      content: <>Are ypu sure delete this story?</>
    })
  }

  return (
    <ContentArea>
      <Layout>
        <Header as="h1">Stories</Header>
        <Grid>
          {items.map(story => {
            return (
              <Grid.Column key={story.id} tablet={8} mobile={16} widescreen={4} computer={8} largeScreen={4}>
                <StoryCard
                  showAutor={false}
                  story={story}
                  onClick={() => history.push(`/a/stories/${story.id}/edit`)}
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
                          <Dropdown.Item text="Delete Forever" icon="trash" onClick={() => handleDelete(story.id)} />
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
      </Layout>
    </ContentArea>
  )
}

export default Stories
