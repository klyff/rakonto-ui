import React, { useEffect } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { ContentArea } from '../style'
import { ContentBox } from './style'
import { Link, useLocation, useHistory } from 'react-router-dom'
import Menu from './Menu'
import { parse, stringify } from 'qs'
import { Location } from 'history'
import ChangePassword from './TabsContent/ChangePassword'
import General from './TabsContent/General'

const Profile: React.FC = () => {
  const { search, pathname } = useLocation()
  const history = useHistory()
  const parsedQs = parse(search, { ignoreQueryPrefix: true })
  const { tab } = parsedQs

  const handleTabChange = (name: string, isToReplace?: boolean) => {
    const search = stringify(
      {
        ...parsedQs,
        tab: name
      },
      { addQueryPrefix: true }
    )
    if (isToReplace) {
      history.replace({
        pathname,
        search
      } as unknown as Location)
      return
    }
    history.push({
      pathname,
      search
    } as unknown as Location)
  }

  useEffect(() => {
    if (!tab) handleTabChange('general', true)
  }, [tab])

  const stiwchRender = () => {
    switch (tab) {
      case 'change-password':
        return <ChangePassword />
      default:
        return <General />
    }
  }

  return (
    <ContentArea>
      <Link to={'/a/stories'}>
        <Icon name="arrow left" />
        Back
      </Link>
      <Header as="h1">Profile</Header>
      <Menu tab={tab as string} onChange={handleTabChange} />
      <ContentBox>{stiwchRender()}</ContentBox>
    </ContentArea>
  )
}

export default Profile
