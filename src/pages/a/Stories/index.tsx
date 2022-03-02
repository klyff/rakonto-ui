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
import { StepInviteRecorderContext } from '../../../components/StepInviteRecorder'
import ButtonGroup from '@mui/material/ButtonGroup'

const Stories: React.FC<RouteComponentProps> = () => {
  const { actions: newStoryActions } = useContext(StepStoryUploadContext)
  const { actions: recorderActions } = useContext(StepInviteRecorderContext)
  const { client: socketClient, connected } = useContext(SocketConnectorContext)

  const { loading, items, hasNextPage, error, loadMore, setItems, reload } = usePageableRequest<SearchResultType>({
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
    connected &&
      socketClient.subscribe('/user/queue/story-media-success', (message: { body: string }) => {
        reload()
      })
  }, [socketClient, connected])

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
          <ButtonGroup sx={{ height: '56px' }} size="large" variant="outlined">
            <Button onClick={() => newStoryActions.open()}>New story</Button>
            <Button onClick={() => recorderActions.open()}>Request a story</Button>
          </ButtonGroup>
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
