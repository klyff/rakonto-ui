import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import { FileType } from '@root/types'
import { List } from './style'

interface iFiles {
  files: FileType[]
}

const FilesList: React.FC<iFiles> = ({ files }) => {
  return (
    <List relaxed="very" size="big">
      {files.map(file => (
        <List.Item item="true" key={file.id} as={Segment}>
          <Icon name="file alternate outline" size="big" />
          <List.Content verticalAlign="middle">
            <List.Header>
              <a href={file.url}>
                <b>{file.originalName}</b>
              </a>
            </List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  )
}
export default FilesList
