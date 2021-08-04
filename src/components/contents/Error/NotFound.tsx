import React from 'react'
import { Subtitle, Wrapper } from './style'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const NotFound: React.FC = () => {
  const history = useHistory()
  return (
    <Wrapper>
      <Segment placeholder>
        <Header icon>
          <Icon name="warning circle" />
          <div>Sorry!</div>
        </Header>
        <Subtitle>THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST</Subtitle>
        <Button onClick={() => history.push('/a/home')} primary>
          Go to home
        </Button>
      </Segment>
    </Wrapper>
  )
}

export default NotFound
