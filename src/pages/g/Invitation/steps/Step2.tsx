import React, { useState } from 'react'
import { Invite } from '../../../../lib/types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Recorder from '../../../../components/InputFileArea/Recorder'
import { useField } from 'formik'

const Step2: React.FC<{ invite: Invite }> = ({ invite }) => {
  const [uploadType, setUploadType] = useState<'AUDIO' | 'VIDEO' | null>(invite.requestedMediaType)
  const [, , { setValue }] = useField('file')
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          {`${invite.user.firstName} would like you to record ${uploadType?.toLowerCase() || 'audio or video'}.
          If possible, please keep your recording under ${invite.requestedMediaLength} minutes.`}
        </Typography>
        <Typography variant="h6">When you are ready, press Record and tell your story.</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        mt={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Recorder
          type={uploadType}
          onDrop={file => setValue(file)}
          disableChangeMediaType={!!invite.requestedMediaType}
          countdown={invite.requestedMediaLength}
          onSelected={(value: 'AUDIO' | 'VIDEO' | null) => {
            setUploadType(value)
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Step2
