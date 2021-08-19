import React, { ReactNode } from 'react'
import LazyImage from '../LazyImage'
import { Card, Extra, TextBasicEllipsis, Actions } from './style'
import { CollectionType } from '@root/types'

interface iStoryCard {
  collection: CollectionType
  onClick?: () => void
  actions?: ReactNode
}

const StorieCard: React.FC<iStoryCard> = ({ onClick, collection, actions }) => {
  const { title, thumbnail, description, stories } = collection

  const cardProps = {
    onClick
  }

  return (
    <Card fluid as="div" className="ui fluid card" {...cardProps}>
      <LazyImage src={thumbnail} wrapped rounded={false} />
      <Card.Content>
        <Card.Header as={TextBasicEllipsis}>{title}</Card.Header>
        <Extra>
          <>
            <span>{`Stories: ${stories.length}`}</span>
            {actions && <Actions>{actions}</Actions>}
          </>
        </Extra>
      </Card.Content>
    </Card>
  )
}

export default StorieCard
