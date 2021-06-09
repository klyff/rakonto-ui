import React, { ReactNode } from 'react'
import { Icon, SemanticICONS } from 'semantic-ui-react'
import LazyImage from '../LazyImage'
import { Card, Extra, Actions, Description, TextBasicEllipsis } from './style'
import img0 from './img0.png'
import Avatar from '@root/components/suport/Avatar'
import { StoryType } from '@root/types'

interface iStoryCard {
  story: StoryType
  actions?: ReactNode
}

const StorieCard: React.FC<iStoryCard> = ({ story, actions }) => {
  const type = story.audio ? 'audio' : 'video'
  return (
    <Card fluid>
      <LazyImage className={`${type}`} src={img0} wrapped rounded={false} height={200} />

      <Card.Content>
        <Card.Header as={TextBasicEllipsis}>{story.title}</Card.Header>
        <Card.Meta as={TextBasicEllipsis}>{story.title}</Card.Meta>
        <Description>{story.description}</Description>
        <Extra>
          <Icon size="large" name={`file ${type} outline` as SemanticICONS} />
          {story.published ? (
            <>
              <Avatar name={'Philipe Carrazzoni'} src="https://avatars0.githubusercontent.com/u/246180?v=4" />
              <span>Joseph Klimber</span>
            </>
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
