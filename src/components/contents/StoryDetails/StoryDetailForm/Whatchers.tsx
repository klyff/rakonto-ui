import React from 'react'
import { List, Image, Icon } from 'semantic-ui-react'
import { WatcherType } from '@root/types'

interface iUserList {
  list: WatcherType[]
  onRemoveWatcher: (email: string) => void
}

const Whatchers: React.FC<iUserList> = ({ list, onRemoveWatcher }) => {
  return (
    <List divided relaxed>
      {list.map(({ email, user }) => (
        <List.Item key={email}>
          {user?.picture?.thumbnail ? (
            <Image avatar src={user.picture.thumbnail} />
          ) : (
            <List.Icon name="user" size="large" verticalAlign="middle" />
          )}
          <List.Content>
            <List.Header as="a">{email}</List.Header>
            {user?.firstName && user?.lastName && (
              <List.Description as="a">{`${user.firstName} ${user.lastName}`}</List.Description>
            )}
          </List.Content>
          <Icon name="close" color="red" link onClick={() => onRemoveWatcher(email)} size="big" />
        </List.Item>
      ))}
    </List>
  )
}

export default Whatchers
