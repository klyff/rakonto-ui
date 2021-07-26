import React, { ReactNode } from 'react'
import { Icon, SemanticICONS } from 'semantic-ui-react'
import LazyImage from '../LazyImage'
import { Card, Extra, Actions, Description, TextBasicEllipsis } from './style'
import Avatar from '@root/components/suport/Avatar'
import { StoryType } from '@root/types'
import { useStoryPreview } from '@root/hooks/useStoryPreview'

interface iStoryCard {
  story: StoryType
  actions?: ReactNode
  showAutor?: boolean
}

const StorieCard: React.FC<iStoryCard> = ({ showAutor = true, story, actions }) => {
  const { preview } = useStoryPreview({ video: story.video })

  let iconType = 'file'
  if (story.type) iconType += ` ${story.type?.toLowerCase()}`
  iconType += ' outline'

  return (
    <Card fluid>
      <LazyImage
        className={`${story.type?.toLowerCase()}`}
        src={story.thumbnail}
        preview={preview}
        wrapped
        rounded={false}
        height={200}
      />

      <Card.Content>
        <Card.Header as={TextBasicEllipsis}>{story.title}</Card.Header>
        <Card.Meta as={TextBasicEllipsis}>{story.title}</Card.Meta>
        <Description>{story.description}</Description>
        <Extra>
          <Icon size="large" name={iconType as SemanticICONS} />
          {showAutor ? (
            <>
              <Avatar name={'Philipe Carrazzoni'} picture="https://avatars0.githubusercontent.com/u/246180?v=4" />
              <span>Joseph Klimber</span>
            </>
          ) : null}
          <span>Status: {story.published ? 'Published' : 'Draft'}</span>
          {!story.ready ? <span>Processing Video</span> : null}
          {actions && <Actions>{actions}</Actions>}
        </Extra>
      </Card.Content>
    </Card>
  )
}

export default StorieCard
