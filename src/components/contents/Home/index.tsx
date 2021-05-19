import React, { useEffect } from 'react'
import { Header, Grid } from 'semantic-ui-react'
import { api } from '@root/api'
import StorieCard from '@root/components/suport/StorieCard'

const Home: React.FC = () => {
  useEffect(() => {
    api.getMe()
  }, [])

  const arrayExample = new Array(100).fill('x')

  return (
    <div
      style={{
        padding: '20px 24px 0px 24px'
      }}
    >
      <Header as="h1">Home</Header>
      <Grid padded>
        <Grid.Row>
          {arrayExample.map((card, i) => {
            return (
              <Grid.Column
                key={i}
                tablet={8}
                mobile={16}
                widescreen={2}
                computer={8}
                largeScreen={4}
                style={{
                  marginBottom: '24px'
                }}
              >
                <StorieCard />
              </Grid.Column>
            )
          })}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Home
