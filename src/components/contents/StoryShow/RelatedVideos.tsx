import React, { useState } from 'react'
import { Header } from 'semantic-ui-react'
import { StoryItem } from './style'
import LazyImage from '@root/components/suport/LazyImage'
import { Link } from 'react-router-dom'
import { StoryType } from '@root/types'
import { useStoryPreview } from '@root/hooks/useStoryPreview'
import Avatar from '@root/components/suport/Avatar'

interface iStory {
  story: StoryType
}

const Story: React.FC<iStory> = ({ story }) => {
  const [hover, setHover] = useState<boolean>(false)

  const { video, owner, type } = story

  const { preview } = useStoryPreview({ video })

  const name = `${owner.firstName.charAt(0).toUpperCase() + owner.firstName.slice(1)} ${
    owner.lastName.charAt(0).toUpperCase() + owner.lastName.slice(1)
  }`

  return (
    <StoryItem onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <LazyImage className={`${type?.toLowerCase()}`} src={hover ? preview : story.thumbnail} wrapped rounded={false} />
      <StoryItem.Content>
        <StoryItem.Header as={Link} to={`/a/stories/${story.id}`}>
          {story.title}
        </StoryItem.Header>
        <StoryItem.Description>{story.description}</StoryItem.Description>
        <StoryItem.Meta>
          <Avatar name={name} picture={owner.picture?.thumbnail} />
          <span>{name}</span>
        </StoryItem.Meta>
      </StoryItem.Content>
    </StoryItem>
  )
}

interface iRelatedVideos {
  stories: StoryType[]
}

const RelatedVideos: React.FC<iRelatedVideos> = ({ stories = [] }) => {
  return (
    <>
      <Header as="h3" dividing>
        Related stories
      </Header>
      <StoryItem.Group>
        {stories.map(item => (
          <Story key={item.id} story={item} />
        ))}
      </StoryItem.Group>
    </>
  )
}

export default RelatedVideos
