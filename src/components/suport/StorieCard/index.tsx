import React from 'react'
import { Icon } from 'semantic-ui-react'
import LazyImage from '../LazyImage'
import { Card } from './style'
import img0 from './img0.png'
import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.png'
import img4 from './img4.png'

const StorieCard: React.FC = () => {
  return (
    <Card fluid>
      <LazyImage
        className={`${Math.floor(Math.random() * 2) % 2 ? 'audio' : 'video'}`}
        src={[`img` + Math.floor(Math.random() * 2)]}
        wrapped
        rounded={false}
        height={200}
      />

      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>Joined in 2015</Card.Meta>
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
