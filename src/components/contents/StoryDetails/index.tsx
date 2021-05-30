import React from 'react'
import { Embed, Grid, Header, Icon } from 'semantic-ui-react'
import StoryDetailForm from '@root/components/forms/StoryDetailForm'
import { Link, useParams } from 'react-router-dom'
import StatusBox from './StatusBox'
import { useGetStory } from './useGetStory'
import VideoPlayer from '@root/components/suport/VideoPlayer'

const StoryDetails: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const { type, ready, video, cover } = useGetStory(storyId)

  return (
    <>
      <Link to={'/a/home'}>
        <Icon name="arrow left" />
        Back
      </Link>
      <Header as="h1">Story</Header>
      <Grid stackable columns={3}>
        <Grid.Column>
          <StoryDetailForm />
        </Grid.Column>
        <Grid.Column>
          <>
            {!ready && <StatusBox type={type} storyId={storyId} />}
            {ready && <VideoPlayer video={video} cover={cover} />}
          </>
        </Grid.Column>
        <Grid.Column>
          <StoryDetailForm />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default StoryDetails
