import React from 'react'
import { Segment } from 'semantic-ui-react'
import Avatar from '@root/components/suport/Avatar'
import { PersonType } from '@root/types'
import { List } from './style'

interface iPeoples {
  persons: PersonType[]
}

const Peoples: React.FC<iPeoples> = ({ persons }) => {
  return (
    <List relaxed="very" size="big">
      {persons.map(person => (
        <List.Item item="true" key={person.id} as={Segment}>
          <div className="ui image">
            <Avatar name={person.name} picture={person.picture?.thumbnail} />
          </div>
          <List.Content verticalAlign="middle">
            <List.Header>{person.name}</List.Header>
            <List.Description>
              <a href={person.link} target="_blank" rel="noreferrer">
                <b>{person.link}</b>
              </a>{' '}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  )
}
export default Peoples
