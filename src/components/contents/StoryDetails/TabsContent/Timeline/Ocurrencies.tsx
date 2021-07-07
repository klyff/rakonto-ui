import React from 'react'
import { Actions, List, Item } from './style'
import { Button, Segment } from 'semantic-ui-react'
import { TimelineType } from '@root/types'

interface iOcurrencies {
  ocurrencies: TimelineType[]
}

const Ocurrencies: React.FC<iOcurrencies> = ({ ocurrencies }) => {
  return (
    <List>
      {ocurrencies.map(ocurrency => (
        <Item item="true" key={ocurrency.id} as={Segment}>
          <div>
            <label>At:</label> {ocurrency.at}
          </div>
          <div>
            <label>Title:</label> {ocurrency.title}
          </div>
          <div>
            <label>Description:</label> {ocurrency.description}
          </div>
          <Actions>
            <div>
              <Button icon="pencil" circular disabled />
              <Button icon="trash" circular />
            </div>
          </Actions>
        </Item>
      ))}
    </List>
  )
}

export default Ocurrencies
