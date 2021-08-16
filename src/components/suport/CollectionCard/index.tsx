import React, { ReactNode } from 'react'
import LazyImage from '../LazyImage'
import { Card, Description, Extra, TextBasicEllipsis, Actions } from './style'
import { CollectionType } from '@root/types'
import { Icon, SemanticICONS } from 'semantic-ui-react'

interface iStoryCard {
  collection: CollectionType
  onClick?: () => void
  actions?: ReactNode
}

const StorieCard: React.FC<iStoryCard> = ({ onClick, collection, actions }) => {
  const { title, thumbnail, description } = collection

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
            <span>{`Stories: ${'0'}`}</span>
            {actions && <Actions>{actions}</Actions>}
          </>
        </Extra>
      </Card.Content>
    </Card>
  )
}

export default StorieCard
