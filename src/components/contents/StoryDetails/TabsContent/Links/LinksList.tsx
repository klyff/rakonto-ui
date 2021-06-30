import React from 'react'
import { Segment, Button, Icon } from 'semantic-ui-react'
import { LinkType } from '@root/types'
import { List, Actions } from './style'

interface iFiles {
  links: LinkType[]
  onRemove: (link: LinkType) => void
}

const LinksList: React.FC<iFiles> = ({ links, onRemove }) => {
  return (
    <List relaxed="very" size="big">
      {links.map(link => (
        <List.Item item="true" key={link.id} as={Segment}>
          <Icon name="chain" size="big" />
          <List.Content verticalAlign="middle">
            <List.Header>
              <a href={link.url} target="_blank" rel="noreferrer">
                <b>{link.url}</b>
              </a>
            </List.Header>
          </List.Content>
          <Actions>
            <div>
              <Button icon="trash" circular onClick={() => onRemove(link)} />
            </div>
          </Actions>
        </List.Item>
      ))}
    </List>
  )
}
export default LinksList
