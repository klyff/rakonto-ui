import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

const PublicLayout: React.FC = ({ children }) => {
  return (
    <Grid stackable inverted padded>
      <Grid.Column
        width={10}
        style={{
          position: 'relative',
          display: 'flex',
          height: '100vh',
          backgroundImage: 'url(/sideLogin.png)',
          backgroundSize: 'cover'
        }}
        only="tablet computer"
      >
        <div
          style={{
            position: 'absolute',
            background: 'rgba(0,0,0,0.5)',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              lineHeight: '67px',
              letterSpacing: '0.04em',
              color: 'white',
              maxWidth: '560px',
              marginBottom: '64px'
            }}
          >
            Discover your family story
          </div>
          <div
            style={{
              fontSize: '32px',
              letterSpacing: '0.04em',
              fontWeight: 'normal',
              lineHeight: '38px',
              color: 'white',
              maxWidth: '684px'
            }}
          >
            Grow your family tree, find new relatives, and explore billions of historical records
          </div>
        </div>
      </Grid.Column>
      <Grid.Column
        width={6}
        style={{
          height: '100vh'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <div
            style={{
              width: '100%',
              alignSelf: 'center'
            }}
          >
            {children}
          </div>
        </div>
      </Grid.Column>
    </Grid>
  )
}

export default PublicLayout
