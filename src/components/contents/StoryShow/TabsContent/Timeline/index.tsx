import React from 'react'
import { TimelineType } from '@root/types'
import { OcurrenciesArea } from './style'
import { Chrono } from 'react-chrono'
import { formatRelative, parseISO } from 'date-fns'

interface iTimeline {
  ocurrencies: TimelineType[]
}

const Timeline: React.FC<iTimeline> = ({ ocurrencies }) => {
  const items = ocurrencies.map(item => {
    console.log('as')
    const date = parseISO(item.at as unknown as string)
    return {
      title: formatRelative(date, new Date()),
      cardTitle: item.title,
      cardDetailedText: item.description
    }
  })
  return (
    <OcurrenciesArea>
      <Chrono items={items} mode="VERTICAL" />
    </OcurrenciesArea>
  )
}

export default Timeline
