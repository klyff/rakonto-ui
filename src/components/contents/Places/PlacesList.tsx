import React from 'react'
import { List, Item } from './style'
import { Segment } from 'semantic-ui-react'
import { PlaceType } from '@root/types'
import { LatLngExpression } from 'leaflet'
import MapViewer from '@root/components/suport/MapViewer'

interface iOcurrencies {
  places: PlaceType[]
}

const PlacesList: React.FC<iOcurrencies> = ({ places }) => {
  return (
    <List>
      {places.map(place => {
        const position: LatLngExpression = [Number(place.latitude), Number(place.longitude)]
        return (
          <Item item="true" key={place.id} as={Segment}>
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
