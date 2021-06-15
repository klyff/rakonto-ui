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
          <Icon size="large" name={`file ${story.type?.toLowerCase()} outline` as SemanticICONS} />
          {showAutor ? (
            <>
              <Avatar name={'Philipe Carrazzoni'} src="https://avatars0.githubusercontent.com/u/246180?v=4" />
              <span>Joseph Klimber</span>
            </>
          ) : story.published ? (
            <span>Status: Published</span>
          ) : story.ready ? (
            <span>Status: Ready</span>
          ) : (
            <span>Status: Processing Video</span>
          )}
          {actions && <Actions>{actions}</Actions>}
        </Extra>
      </Card.Content>
    </Card>
  )
}

export default StorieCard