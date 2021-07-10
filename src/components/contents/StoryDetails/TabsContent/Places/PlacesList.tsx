import React from 'react'
import { Actions, List, Item } from './style'
import { Button, Segment } from 'semantic-ui-react'
import { PlaceType } from '@root/types'

interface iOcurrencies {
  places: PlaceType[]
  removeOcurrence: (timeline: PlaceType) => void
}

const PlacesList: React.FC<iOcurrencies> = ({ places, removeOcurrence }) => {
  return (
    <List>
      {places.map(place => (
        <Item item="true" key={place.id} as={Segment}>
          <div>
            <b>
              <label>Name:</label>
            </b>{' '}
            {place.name}
          </div>
          <Actions>
            <div>
              <Button icon="pencil" circular disabled />
              <Button icon="trash" circular onClick={() => removeOcurrence(place)} />
            </div>
          </Actions>
        </Item>
      ))}
    </List>
  )
}

export default PlacesList
