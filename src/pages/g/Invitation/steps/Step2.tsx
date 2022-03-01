import React from 'react'
import { InviteType } from '../../../../lib/types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useField } from 'formik'
import InputFileArea from '../../../../components/InputFileArea'

const Step2: React.FC<{ invite: InviteType }> = ({ invite }) => {
  const [{ value: file }, , { setValue }] = useField('file')
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          {`${invite.user.firstName} would like you to record ${
            invite.requestedMediaType?.toLowerCase() || 'audio or video'
          }.
          If possible, please keep your recording under ${invite.requestedMediaLength} minutes.`}
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
