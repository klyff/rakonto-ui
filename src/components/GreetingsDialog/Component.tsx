import React, { useState, useContext } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { GreetingsDialogContext } from './Context'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { StepStoryUploadContext } from '../StepStoryUpload'

const GreetingsDialog = () => {
  const { store, actions } = useContext(GreetingsDialogContext)
  const { actions: stepStoryUploadActions } = useContext(StepStoryUploadContext)
  // @ts-ignore
  const hidden = useMediaQuery(theme => theme.breakpoints.up('md'))
  console.log(hidden)
  return (
    <Modal
      disableEnforceFocus
      open={store.isOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          actions.close()
        }
      }}
    >
      <Box
        component={Paper}
        sx={{
          margin: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '400px',
          minWidth: { xs: 'unset', md: '800px' }
        }}
      >
        <Grid container spacing={2}>
          {hidden && (
            <Grid item xs sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Box
                component="img"
                sx={{
                  maxHeight: '400px'
                }}
                src={'/images/GreetingsImage.png'}
              />
            </Grid>
          )}
          <Grid
            item
            xs
            sx={{
              minWidth: '250px',
              margin: 5
            }}
          >
            <Typography align="center" gutterBottom variant="h5">
              <Box sx={{ color: 'primary.main' }} component="span">
                Welcome to Rakonto
              </Box>
              ,
            </Typography>
            <Typography
              align="center"
              sx={{
                marginBottom: 5
              }}
              gutterBottom
              variant="h5"
            >
              all your memories in one place!
            </Typography>
            <Box
              sx={{
                margin: 'auto',
                maxWidth: '210px',
                '&>button': {
                  marginBottom: 3
                }
              }}
            >
              <Button disabled size="large" fullWidth variant="contained">
                Take a tour
              </Button>
              <Button
                onClick={() => {
                  actions.close()
                  stepStoryUploadActions.open()
                }}
                size="large"
                fullWidth
                variant="outlined"
                autoFocus
              >
                Create my first story
              </Button>
              <Button size="large" color={'secondary'} fullWidth onClick={() => actions.close()}>
                Ignore it
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default GreetingsDialog