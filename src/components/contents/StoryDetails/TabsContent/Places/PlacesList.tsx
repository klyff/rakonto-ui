import React from 'react'
import { Actions, List, Item } from './style'
import { Button, Segment } from 'semantic-ui-react'
import { PlaceType } from '@root/types'
import { LatLngExpression } from 'leaflet'
import MapViewer from '@root/components/suport/MapViewer'

interface iOcurrencies {
  places: PlaceType[]
  removeOcurrence: (timeline: PlaceType) => void
}

const PlacesList: React.FC<iOcurrencies> = ({ places, removeOcurrence }) => {
  return (
    <List>
      {places.map(place => {
        const position: LatLngExpression = [Number(place.latitude), Number(place.longitude)]
        return (
          <Item item="true" key={place.id} as={Segment}>
            <Actions>
              <div>
                <Button icon="pencil" circular disabled />
                <Button icon="trash" circular onClick={() => removeOcurrence(place)} />
              </div>
            </Actions>
            <div>
              <b>
                <label>Name:</label>
              </b>{' '}
              {place.name}
            </div>
            <div>
              <b>
                <label>Description:</label>
              </b>{' '}
              {place.description}
            </div>
            <div>
              <b>
                <label>Address:</label>
              </b>{' '}
              {place.location}
            </div>
            <MapViewer position={position} markers={[position]} />
          </Item>
        )
      })}
    </List>
  )
}

export default PlacesList
