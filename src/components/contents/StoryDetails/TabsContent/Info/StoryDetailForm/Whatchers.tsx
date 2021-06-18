import React from 'react'
import { List, Image, Dropdown } from 'semantic-ui-react'
import { UserType, WatcherType } from '@root/types'
import { Actions } from './style'
import { useFormikContext } from 'formik'

interface iUserList {
  list: WatcherType[]
  onRemoveWatcher: (email: string) => void
  resendInvite: (email: string) => void
}

const Whatchers: React.FC<iUserList> = ({ list, onRemoveWatcher, resendInvite }) => {
  const { initialValues } = useFormikContext<{ watchers: UserType[]; published: boolean }>()
  console.log(initialValues)
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
          <Actions>
            <Dropdown pointing="right" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item text="Remove" icon="close" onClick={() => onRemoveWatcher(email)} />
                <Dropdown.Item
                  disabled={
                    !(initialValues.published && initialValues.watchers.some(watcher => watcher.email === email))
                  }
                  text="Resend invite"
                  icon="mail outline"
                  onClick={() => resendInvite(email)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Actions>
        </List.Item>
      ))}
    </List>
  )
}

export default Whatchers
