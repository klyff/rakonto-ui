import React, { useContext } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import LinearProgress from '@mui/material/LinearProgress'
import useStorage from '../../../components/hooks/useStorage'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'
import api from '../../../lib/api'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import useUser from '../../../components/hooks/useUser'

const Storage: React.FC = () => {
  const { storage, isLoading } = useStorage()
  const user = useUser()
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleOptimize = async () => {
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
            You still have <b>{storage!.free}</b> remaining storage quota.
          </Typography>

          {user!.tier > 0 && storage!.percentual > 80 && (
            <>
              <Typography sx={{ paddingBottom: 4, color: 'secondary.main', pb: 'unset' }} variant="h5">
                {`You have already reached more than 80% of your storage quota. You can request a storage `}
                <Button onClick={handleOptimize} size="large" variant="contained">
                  optamization*
                </Button>
                {` or `}
                <Link href="/a/profile?tab=subscription">upgrade your plan</Link>.
              </Typography>
              <Typography sx={{ color: 'secondary.main' }} variant="subtitle1">
                * Will maintain only converted 720p videos instead original ones.
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Storage
