import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { Subtitle, Wrapper } from '@root/components/contents/Error/style'
import { useHistory } from 'react-router-dom'

const Forbidden: React.FC = () => {
  const history = useHistory()
  return (
    <Wrapper>
      <Segment placeholder>
        <Header icon>
          <Icon name="warning circle" />
          <div>Sorry!</div>
        </Header>
        <Subtitle>YOU DON`T HAVE PERMISSION TO ACCESS THIS PAGE</Subtitle>
        <Button onClick={() => history.goBack()} primary>
          Go Back
        </Button>
      </Segment>
    </Wrapper>
  )
}

export default Forbidden
