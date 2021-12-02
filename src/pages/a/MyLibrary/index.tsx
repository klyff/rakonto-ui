import React, { useContext, useState } from 'react'
import StoriesSlider from './StoriesSlider'
import CollectionsTile from './CollectionsSlider'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SearchBox from '../../../components/SearchBox'
import { RouteComponentProps } from 'react-router-dom'
import { StepStoryUploadContext } from '../../../components/StepStoryUpload'

const MyLibrary: React.FC<RouteComponentProps> = () => {
  const { actions: newStoryActions } = useContext(StepStoryUploadContext)
  const [q, setQ] = useState<string>('')

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <SearchBox onSearch={value => setQ(value)} />
          <Button variant="outlined" onClick={() => newStoryActions.open()}>
            New story
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
          Collections
        </Typography>
        <div>
          <CollectionsTile q={q} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
          Stories
        </Typography>
        <div>
          <StoriesSlider q={q} />
        </div>
      </Grid>
    </Grid>
  )
}

export default MyLibrary
