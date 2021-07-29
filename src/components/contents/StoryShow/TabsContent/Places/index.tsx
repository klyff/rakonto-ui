import React from 'react'
import { PlaceType } from '@root/types'
import { Item, List } from './style'
import { LatLngExpression } from 'leaflet'
import { Segment } from 'semantic-ui-react'
import MapViewer from '@root/components/suport/MapViewer'

interface iTimeline {
  places: PlaceType[]
}

const Places: React.FC<iTimeline> = ({ places }) => {
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

export default Places
