import React, { useContext, useState } from 'react'
import StoriesSlider from './StoriesSlider'
import CollectionsTile from './CollectionsSlider'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import SearchBox from '../../../components/SearchBox'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { StepStoryUploadContext } from '../../../components/StepStoryUpload'
import { StepInviteRecorderContext } from '../../../components/StepInviteRecorder'

const MyLibrary: React.FC<RouteComponentProps> = () => {
  const { actions: newStoryActions } = useContext(StepStoryUploadContext)
  const { actions: recorderActions } = useContext(StepInviteRecorderContext)
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
          <Grid item xs={12} sm>
            <SearchBox onSearch={value => history.push({ pathname: '/a/search', search: `q=${value}` })} />
          </Grid>
          <Grid item xs={12} sm minWidth={180} textAlign="right">
            <ButtonGroup sx={{ height: '56px' }} size="large" variant="outlined">
              <Button onClick={() => newStoryActions.open()}>New story</Button>
              <Button onClick={() => recorderActions.open(null)}>Request a story</Button>
            </ButtonGroup>
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
