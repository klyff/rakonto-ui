import React from 'react'
import { Segment, Button, Icon } from 'semantic-ui-react'
import { SubtitleType } from '@root/types'
import { List, Actions } from './style'

interface iFiles {
  subtitles: SubtitleType[]
  onRemove: (file: SubtitleType) => void
}

const SubtitleList: React.FC<iFiles> = ({ subtitles, onRemove }) => {
  return (
    <List relaxed="very" size="big">
      {subtitles.map(subtitle => (
        <List.Item item="true" key={subtitle.id} as={Segment}>
          <Icon name="file alternate outline" size="big" />
          <List.Content verticalAlign="middle">
            <List.Header>
              <a href={subtitle.url}>
                <b>{subtitle.originalName}</b>
              </a>
            </List.Header>
            <List.Description>Language: {subtitle.language}</List.Description>
          </List.Content>
          <Actions>
            <div>
              <Button icon="trash" circular onClick={() => onRemove(subtitle)} />
            </div>
          </Actions>
        </List.Item>
      ))}
    </List>
  )
}
export default SubtitleList
