import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Recorder from '../../InputFileArea/Recorder'
import React from 'react'
import { useField } from 'formik'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'

const Step2 = () => {
  const [, { error: errorFile }, { setValue }] = useField('file')
  const [{ onChange, onBlur, value }, { error, touched }] = useField('instructions')
  return (
    <>
      <Typography mb={2}>
        What story would you like recorders to share with you? Provide a brief description of what you&apos;re looking
        for.
      </Typography>
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        autoFocus
        label="Instructions"
        key="instructions"
        name="instructions"
        fullWidth
        margin="dense"
        multiline
        rows={3}
        placeholder="Describe your recording request here"
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        error={touched && Boolean(error)}
        helperText={(touched && error) || ' '}
      />
      <Typography mb={2}>If you like you can record an invitation so those you invite can see your request.</Typography>
      <Box>
        <Recorder type="VIDEO" onDrop={file => setValue(file)} />
        {errorFile && <FormHelperText error>{errorFile}</FormHelperText>}
      </Box>
    </>
  )
}

export default Step2
