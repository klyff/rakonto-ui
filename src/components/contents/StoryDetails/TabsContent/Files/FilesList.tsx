import React from 'react'
import { Segment, Button, Icon } from 'semantic-ui-react'
import { FileType } from '@root/types'
import { List, Actions } from './style'
import { api } from '@root/api'

interface iFiles {
  files: FileType[]
  onRemove: (file: FileType) => void
}

const FilesList: React.FC<iFiles> = ({ files, onRemove }) => {
  return (
    <List relaxed="very" size="big">
      {files.map(file => (
        <List.Item item="true" key={file.id} as={Segment}>
          <Icon name="file alternate outline" size="big" />
          <List.Content verticalAlign="middle">
            <List.Header>
              <a onClick={() => api.getFile(file.id)}>
                <b>{file.originalName}</b>
              </a>
            </List.Header>
          </List.Content>
          <Actions>
            <div>
              <Button icon="trash" circular onClick={() => onRemove(file)} />
            </div>
          </Actions>
        </List.Item>
      ))}
    </List>
  )
}
export default FilesList
