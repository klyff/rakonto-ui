import React from 'react'
import { Icon, SemanticICONS } from 'semantic-ui-react'
import LazyImage from '../LazyImage'
import { Card, Extra, Actions, ActionButton, Description, TextBasicEllipsis } from './style'
import img0 from './img0.png'
import Avatar from '@root/components/suport/Avatar'

const StorieCard: React.FC = () => {
  const type = Math.floor(Math.random() * 2) % 2 ? 'audio' : 'video'
  return (
    <Card fluid>
      <LazyImage className={`${type}`} src={img0} wrapped rounded={false} height={200} />

      <Card.Content>
        <Card.Header as={TextBasicEllipsis}>Barry Sorensen – A Life is a circle</Card.Header>
        <Card.Meta as={TextBasicEllipsis}>Chapter 1 – The Mud House</Card.Meta>
        <Description>
          Barry and Kathy talk about birthdates, home v. hospital births and their early Barry and Kathy talk about
          birthdates, home v. hospital births and their early
        </Description>
        <Extra>
          <Icon size="large" name={`file ${type} outline` as SemanticICONS} />
          <Avatar name={'Philipe Carrazzoni'} src="https://avatars0.githubusercontent.com/u/246180?v=4" />
          <span>Joseph Klimber</span>
          <Actions>
            <ActionButton basic circular icon="share square" />
            <ActionButton basic circular icon="ellipsis vertical" />
          </Actions>
        </Extra>
      </Card.Content>
    </Card>
  )
}

export default StorieCard
