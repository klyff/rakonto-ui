import React, { useContext, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import LinearProgress from '@mui/material/LinearProgress'
import useStorage from '../../../components/hooks/useStorage'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'
import api from '../../../lib/api'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import useUser from '../../../components/UserProvider/useUser'
import { SimpleDialogContext } from '../../../components/SimpleDialog'

const Storage: React.FC = () => {
  const { storage, isLoading } = useStorage()
  const { user, refetch } = useUser()
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { actions: simpleDialogActions } = useContext(SimpleDialogContext)

  const handleOptimize = async () => {
    simpleDialogActions.open(
      'Optimize library capacity',
      "Are you sure? You will lose original media on stories that aren't optimized yet.",
      { okText: 'Yes, optimize', showOk: true, cancelText: 'cancel' },
      async success => {
        try {
          await api.optimizeStorage()
          snackActions.open('Optimization requested with success')
        } catch (error) {
          // @ts-ignore
          const { data } = error
          if (data.code) {
            snackActions.open(data.message)
            return
          }
          snackActions.open('Something was wrong! please try again.')
        }
      }
    )
  }

  const handleOptimizeToogleChange = async () => {
    await api.toogleOptimizeStorage(!user.keepOnlyOptimized)
    await refetch()
  }

  return (
    <Box component="form" sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', padding: 2 }}>
      {isLoading && <CircularLoadingCentred />}
      {!isLoading && (
        <Box sx={{ minWidth: '320px', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginY: 4, maxWidth: '422px' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" value={storage!.percentual} />
            </Box>
            <Box sx={{ minWidth: 35 }}>{storage!.percentual}%</Box>
          </Box>
          <Typography sx={{ paddingBottom: 4 }} variant="h5">
            You are using <b>{storage!.used}</b> of you available <b>{storage!.available}</b> quota.
          </Typography>
          <Typography sx={{ paddingBottom: 4 }} variant="h5">
            You still have <b>{storage!.free}</b> remaining on library capacity.
          </Typography>

          <Typography sx={{ paddingBottom: 4, color: 'secondary.main', pb: 'unset' }} variant="h5">
            {`To Increase your library capacity, You may `}
            <Link href="/a/profile?tab=subscription">upgrade your plan</Link>.
          </Typography>
          {user.tier !== 3 && (
            <>
              <Typography sx={{ paddingBottom: 4, color: 'secondary.main', pb: 'unset', mt: 4 }} variant="h5">
                {`Alternatively, you may `}
                <Button onClick={handleOptimize} size="large" variant="contained">
                  optimize
                </Button>
                {` your library by only keeping converted .mp3 audio and .mp4 (720p) video files.`}
              </Typography>
              <Typography sx={{ paddingBottom: 4, color: 'secondary.main', pb: 'unset', mt: 4 }} variant="h5">
                You can let Rakonto always optimize your library, remember, Rakonto will only keep converted .mp3 audio
                and .mp4 (720p) video files.
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch value={user.keepOnlyOptimized} onChange={handleOptimizeToogleChange} />}
                  label="Automatic optimization"
                />
              </FormGroup>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Storage
