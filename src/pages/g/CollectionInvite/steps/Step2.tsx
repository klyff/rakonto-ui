import React from 'react'
import { InviteType } from '../../../../lib/types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useField } from 'formik'
import InputFileArea from '../../../../components/InputFileArea'
import { intervalToDuration, formatDuration } from 'date-fns'

const Step2: React.FC<{ invite: InviteType }> = ({ invite }) => {
  const [{ value: file }, , { setValue }] = useField('file')
  const duration = intervalToDuration({ start: 0, end: invite.requestedMediaLength * 1000 })
  const name = invite.organization?.name || `${invite.user.firstName} ${invite.user.lastName}`
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          {`${name} would like you to record ${invite.requestedMediaType?.toLowerCase() || 'audio or video'}.
          If possible, please keep your recording duration under ${String(
            (duration.hours || 0) * 60 + (duration.minutes || 0)
          ).padStart(2, '0')} minutes${
            duration.seconds ? ` and ${String(duration.seconds).padStart(2, '0')} seconds` : ''
          }.`}
        </Typography>
        <Typography variant="h6">When you are ready, upload or record your story.</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        mt={4}
        mb={9}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <InputFileArea
          file={file}
          callback={file => setValue(file)}
          countdown={invite.requestedMediaLength}
          disableChangeMediaType={!!invite.requestedMediaType}
          startType={invite.requestedMediaType || null}
        />
      </Grid>
    </Grid>
  )
}

export default Step2
