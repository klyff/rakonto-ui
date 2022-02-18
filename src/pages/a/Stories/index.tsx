import React, { useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { SearchResultType, StoryType } from '../../../lib/types'
import useInfiniteScroll from '../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../components/hooks/usePageableRequest'
import Card from '../../../components/Card'
import StoryCard from '../../../components/StoryCard'
import Typography from '@mui/material/Typography'
import api from '../../../lib/api'
import { RouteComponentProps } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { StepStoryUploadContext } from '../../../components/StepStoryUpload'
import { SocketConnectorContext } from '../../../components/SocketConnector'
import { QueueProcessorContext } from '../../../components/QueueProcessor'

const Stories: React.FC<RouteComponentProps> = () => {
  const { actions: newStoryActions } = useContext(StepStoryUploadContext)
  const { store: processorList } = useContext(QueueProcessorContext)

  const { loading, items, hasNextPage, error, loadMore, setItems } = usePageableRequest<SearchResultType>({
    size: 15,
    q: '',
    request: api.searchStories
  })

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  useEffect(() => {
    processorList.forEach(async object => {
      if (object.finished) {
        setTimeout(async () => {
          const story = await api.getStory(object.id as string)
          setItems([{ kind: 'STORY', entity: story }, ...items])
        }, 2000)
      }
    })
  }, [processorList])

  return (
    <Grid
      container
      sx={{
        padding: '24px'
      }}
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Stories</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ flex: '1' }} />
          <Button variant="outlined" onClick={() => newStoryActions.open()}>
            New story
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {items
            .map(item => item.entity as StoryType)
            .map(item => (
              <StoryCard key={item.id} story={item} />
            ))}
          {hasNextPage && (
            <Grid item xs>
              <Card loading={true} title={''} subTitle={''} thumbnail={''} preview={''} />
              <div ref={sentryRef} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Stories
