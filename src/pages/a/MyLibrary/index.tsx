import React, { useContext, useState } from 'react'
import StoriesSlider from './StoriesSlider'
import CollectionsTile from './CollectionsSlider'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SearchBox from '../../../components/SearchBox'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { StepStoryUploadContext } from '../../../components/StepStoryUpload'

const MyLibrary: React.FC<RouteComponentProps> = () => {
  const { actions: newStoryActions } = useContext(StepStoryUploadContext)
  const history = useHistory()

  return (
    <Grid
      container
      sx={{
        padding: '24px'
      }}
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography variant="h6">My Library</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs>
            <SearchBox onSearch={value => history.push({ pathname: '/a/search', search: `q=${value}` })} />
          </Grid>
          <Grid item xs minWidth={111} textAlign="right">
            <Button variant="outlined" onClick={() => newStoryActions.open()}>
              New story
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
          Collections
        </Typography>
        <div>
          <CollectionsTile q={''} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
          Stories
        </Typography>
        <div>
          <StoriesSlider q={''} />
        </div>
      </Grid>
    </Grid>
  )
}

export default MyLibrary
