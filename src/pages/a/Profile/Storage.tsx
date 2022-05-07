import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import useStorage from '../../../components/hooks/useStorage'
import CircularLoadingCentred from '../../../components/CircularLoadingCentred'

const Storage: React.FC = () => {
  const { storage, isLoading } = useStorage()
  return (
    <Box component="form" sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', padding: 2 }}>
      {isLoading && <CircularLoadingCentred />}
      {!isLoading && (
        <Box sx={{ minWidth: '320px', width: '100%', maxWidth: '422px' }}>
          <Typography sx={{ paddingBottom: 4 }} variant="body1">
            This is your current storage usage
          </Typography>
          <Typography sx={{ paddingBottom: 4 }} variant="h4">
            Used {storage!.used} of {storage!.available}
          </Typography>
          <Typography sx={{ paddingBottom: 4 }} variant="h4">
            Free: {storage!.free}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" value={storage!.percentual} />
            </Box>
            <Box sx={{ minWidth: 35 }}>{storage!.percentual}%</Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Storage
