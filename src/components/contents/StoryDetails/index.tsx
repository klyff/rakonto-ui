import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import StoryDetailForm from '@root/components/forms/StoryDetailForm'
import { Link } from 'react-router-dom'
import { useStoryStatus } from './useStoryStatus'
import { useGetStory } from './useGetStory'

const StoryDetails: React.FC = () => {
  const { fileStatus } = useStoryStatus()
  const { file } = useGetStory()
  return (
    <>
      <Link to={'/a/home'}>
        <Icon name="arrow left" />
        Back
      </Link>
      <Grid stackable columns={3}>
        <Grid.Column>
          <StoryDetailForm />
        </Grid.Column>
        <Grid.Column>
          <div>{fileStatus}</div>
        </Grid.Column>
        <Grid.Column>
          <StoryDetailForm />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default StoryDetails
