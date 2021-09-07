import React, { useState } from 'react'
import { Header, Grid, Button, Dropdown } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import CollectionCard from '@root/components/suport/CollectionCard'
import useInfiniteScroll from '@root/hooks/useInfiniteScroll'
import { usePageableRequest } from '@root/hooks/usePageableRequest'
import { ContentArea, Layout } from '../style'
import { TitleArea } from './style'
import { CollectionType } from '@root/types'
import { api } from '@root/api'
import AddCollectionFormModal from '@root/components/modals/AddCollectionFormModal'
import { toast } from 'react-semantic-toasts'
import { useSetRecoilState } from 'recoil'
import { basicModalState } from '@root/components/modals/BasicModal'
import { AxiosError } from 'axios'

const Collections: React.FC = () => {
  const history = useHistory()
  const setBasicModalState = useSetRecoilState(basicModalState)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { loading, items, hasNextPage, error, loadMore, setItems, reload } = usePageableRequest<CollectionType>({
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

  const handleDelete = async (id: string) => {
    setBasicModalState({
      open: true,
      title: 'Delete collection',
      isConfirmation: true,
      onClose: async (isSuccess: boolean) => {
        if (!isSuccess) return
        try {
          await api.deleteCollection(id)
          reload()
        } catch (error) {
          const errorAxios = error as AxiosError
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (errorAxios.response.status === 500) {
            toast({
              type: 'warning',
              title: 'Delete collection',
              time: 3000,
              description: `This collection can't be deleted. You need to remove stories from this collection and after try delete it.`
            })
            return
          }

          toast({
            type: 'error',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            title: errorAxios.response.data.message,
            time: 3000,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            description: `Error: ${errorAxios.response.data.code}`
          })
        }
      },
      content: <>Are you sure delete this collection?</>
    })
  }

  return (
    <ContentArea>
      <Layout>
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
                  actions={
                    <>
                      <Dropdown pointing="bottom right" icon="ellipsis vertical">
                        <Dropdown.Menu>
                          {!!collection.stories.length && (
                            <Dropdown.Item
                              text="Preview"
                              icon="eye"
                              onClick={() => history.push(`/a/stories/${collection.stories[0].id}`)}
                            />
                          )}
                          <Dropdown.Item
                            text="Edit"
                            icon="pencil"
                            onClick={() => history.push(`/a/collections/${collection.id}/edit`)}
                          />
                          <Dropdown.Item
                            text="Delete Forever"
                            icon="trash"
                            onClick={() => handleDelete(collection.id)}
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
        <AddCollectionFormModal open={openModal} onClose={handleClose} />
      </Layout>
    </ContentArea>
  )
}

export default Collections
