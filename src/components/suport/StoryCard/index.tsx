import React, { ReactNode, useState } from 'react'
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
  onClick?: () => void
}

const StorieCard: React.FC<iStoryCard> = ({ onClick, showAutor = true, story, actions }) => {
  const { video, owner, type } = story
  const { preview } = useStoryPreview({ video })
  const [hover, setHover] = useState<boolean>(false)

  let iconType = 'file'
  if (type) iconType += ` ${type?.toLowerCase()}`
  iconType += ' outline'

  const cardProps = {
    onClick
  }

  const name = `${owner.firstName.charAt(0).toUpperCase() + owner.firstName.slice(1)} ${
    owner.lastName.charAt(0).toUpperCase() + owner.lastName.slice(1)
  }`

  return (
    <Card
      fluid
      as="div"
      className="ui fluid card"
      {...cardProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <LazyImage
        className={`${story.type?.toLowerCase()}`}
        src={hover ? preview : story.thumbnail}
        wrapped
        rounded={false}
      />

      <Card.Content>
        <Card.Header as={TextBasicEllipsis}>{story.title}</Card.Header>
        <Card.Meta as={TextBasicEllipsis}>{story.collections[0]?.title}</Card.Meta>
        <Description>{story.description}</Description>
        <Extra>
          <Icon size="large" name={iconType as SemanticICONS} />
          {showAutor ? (
            <>
              <Avatar name={name} picture={owner.picture?.thumbnail} />
              <span>{name}</span>
            </>
          ) : (
            <>
              <span>{`Status: ${!story.ready ? 'Processing Video' : story.published ? 'Published' : 'Draft'}`}</span>
              {actions && <Actions>{actions}</Actions>}
            </>
          )}
        </Extra>
      </Card.Content>
    </Card>
  )
}

export default StorieCard
