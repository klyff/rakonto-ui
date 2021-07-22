import React from 'react'
import { Title, SecondTitle, Description } from './style'

interface iInfo {
  title: string
  secondTile?: string
  description: string
}

const Info: React.FC<iInfo> = ({ title, secondTile, description }) => {
  return (
    <div>
      <Title as="h1">{title}</Title>
      <SecondTitle as="h2">{secondTile}</SecondTitle>
      <Description as="h2">{description}</Description>
    </div>
  )
}

export default Info
