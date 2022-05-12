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
          <Typography sx={{}} variant="h5">
            You are using <b>{storage!.used}</b> of you available <b>{storage!.available}</b> quota.
          </Typography>
          <Typography sx={{ mb: 6 }} variant="h5">
            You still have <b>{storage!.free}</b> remaining on library capacity.
          </Typography>

          <Typography sx={{ color: 'secondary.main', pb: 'unset', mb: 3 }} variant="h5">
            {`You have tow options to increase your available library capacity:`}
          </Typography>
          <Typography sx={{ color: 'secondary.main', pb: 'unset', mb: 1 }} variant="h6">
            <Link href="/a/profile?tab=subscription">Upgrade my plan</Link>
            {` Choose this to upgrade to another plan and increase your library capacity.`}
          </Typography>
          <Typography sx={{ color: 'secondary.main', pb: 'unset', mb: 1 }} variant="h6">
            <Link sx={{ cursor: 'pointer' }} onClick={handleOptimize}>
              Optimize my library
            </Link>
            {` Choose this to remove previous audio / video original recordings, and only keep optimized* recordings.`}
          </Typography>
          <Typography sx={{ color: 'secondary.main', pb: 'unset', display: 'inline-flex', mb: 1 }} variant="h6">
            <FormGroup>
              <FormControlLabel
                control={<Switch value={user.keepOnlyOptimized} onChange={handleOptimizeToogleChange} />}
                label="Auto optimize"
              />
            </FormGroup>
            {` Keep only optimized* recordings from now on.`}
          </Typography>
          <Typography sx={{ color: 'secondary.main', pb: 'unset' }} variant="body1">
            {`*Recordings uploaded or recorded directly into Rakonto are converted automatically and optimized for streaming. Optimized audio recordings are stored in 128Khz mp3 format. Optimized video recordings are stored in 720p mp4 format. For more information about optimization please contact us at `}
            <Link href="mailto:support@rakonto.io">support@rakonto.io</Link>
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Storage
