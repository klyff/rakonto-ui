import React from 'react'
import StoriesSlider from './StoriesSlider'
import CollectionsTile from './CollectionsSlider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Search from './Search'
import { RouteComponentProps } from 'react-router-dom'

const MyLibrary: React.FC<RouteComponentProps> = () => {
  return (
    <Grid
      container
      sx={{
        padding: '24px'
      }}
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography variant="h6">My Libary</Typography>
      </Grid>
      <Grid item xs={12}>
        <Search />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
          Collections
        </Typography>
        <div>
          <CollectionsTile />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
          Stories
        </Typography>
        <div>
          <StoriesSlider />
        </div>
      </Grid>
    </Grid>
  )
}

export default MyLibrary
