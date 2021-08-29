import React from 'react'
import { List, Item } from './style'
import { Segment } from 'semantic-ui-react'
import { TimelineType } from '@root/types'
import { format, parse } from 'date-fns'

interface iOcurrencies {
  ocurrencies: TimelineType[]
}

const Ocurrencies: React.FC<iOcurrencies> = ({ ocurrencies }) => {
  return (
    <List>
      {ocurrencies.map(ocurrence => {
        return (
          <Item item="true" key={ocurrence.id} as={Segment}>
            <div>
              <b>
                <label>At:</label>
              </b>{' '}
              {format(parse(ocurrence.at as unknown as string, "yyyy-MM-dd'T'HH:mm:ss'Z'", new Date()), 'PPP')}
            </div>
            <div>
              <b>
                <label>Title:</label>
              </b>{' '}
              {ocurrence.title}
            </div>
            <div>
              <b>
                <label>Description:</label>
              </b>{' '}
              {ocurrence.description}
            </div>
          </Item>
        )
      })}
    </List>
  )
}

export default Ocurrencies
