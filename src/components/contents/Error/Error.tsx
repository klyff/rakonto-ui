import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { Subtitle, Wrapper } from '@root/components/contents/Error/style'

const Error: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <Wrapper>
      <Segment placeholder>
        <Header icon>
          <Icon name="warning circle" />
          <div>Sorry!</div>
        </Header>
        <Subtitle>Something went wrong!</Subtitle>
        <Button onClick={resetErrorBoundary} primary>
          Try again
        </Button>
      </Segment>
    </Wrapper>
  )
}

export default Error
