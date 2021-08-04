import React, { Fragment } from 'react'
import { TimelineType } from '@root/types'
import { OcurrenciesArea } from './style'
import { Chrono } from 'react-chrono'
import { formatRelative, parse } from 'date-fns'
import ShowMore from '@root/components/suport/ShowMore'
import { Header } from 'semantic-ui-react'

interface iTimeline {
  ocurrencies: TimelineType[]
}

const Timeline: React.FC<iTimeline> = ({ ocurrencies }) => {
  const items = ocurrencies.map(item => {
    console.log('as')
    const date = parse(item.at as unknown as string, "yyyy-MM-dd'T'HH:mm:ss'Z'", new Date())
    return {
      title: formatRelative(date, new Date())
    }
  })
  return (
    <OcurrenciesArea>
      <Chrono items={items} mode="VERTICAL">
        {ocurrencies.map(item => (
          <Fragment key={item.id}>
            <Header>{item.title}</Header>
            {item.description && <ShowMore>{item.description}</ShowMore>}
          </Fragment>
        ))}
      </Chrono>
    </OcurrenciesArea>
  )
}

export default Timeline
