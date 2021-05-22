import React, { useState } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import LazyImage from '../LazyImage'
import img0 from './img0.png'

const StorieCard: React.FC = () => {
  return (
    <Card fluid>
      <LazyImage
        className={`${Math.floor(Math.random() * 2) % 2 ? 'audio' : 'video'}`}
        src={img0}
        wrapped
        rounded={false}
        style={{
          height: 200
        }}
      />

      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  )
}

export default StorieCard
