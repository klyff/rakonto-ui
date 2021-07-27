import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import { LinkType } from '@root/types'
import { List } from './style'

interface iFiles {
  links: LinkType[]
}

const LinksList: React.FC<iFiles> = ({ links }) => {
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
        </List.Item>
      ))}
    </List>
  )
}
export default LinksList
