import React from 'react'
import { Segment, Button } from 'semantic-ui-react'
import Avatar from '@root/components/suport/Avatar'
import { PersonType } from '@root/types'
import { List, Actions } from './style'

interface iPeoples {
  persons: PersonType[]
  removePerson: (person: PersonType) => void
  editPerson: (person: PersonType) => void
}

const Peoples: React.FC<iPeoples> = ({ persons, removePerson, editPerson }) => {
  return (
    <List relaxed="very" size="big">
      {persons.map(person => (
        <List.Item item="true" key={person.id} as={Segment}>
          <div className="ui image">
            <Avatar name={person.name} src={person.picture?.thumbnail} />
          </div>
          <List.Content verticalAlign="middle">
            <List.Header>{person.name}</List.Header>
            <List.Description>
              <a>
                <b>{person.description}</b>
              </a>{' '}
            </List.Description>
          </List.Content>
          <Actions>
            <div>
              <Button
                icon="pencil"
                circular
                onClick={() => {
                  editPerson(person)
                }}
              />
              <Button icon="trash" circular onClick={() => removePerson(person)} />
            </div>
          </Actions>
        </List.Item>
      ))}
    </List>
  )
}
export default Peoples
