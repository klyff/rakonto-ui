import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useField } from 'formik'
import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Step3: React.FC<{ progress: number }> = ({ progress }) => {
  const [
    { value: expireValue, onBlur: expireOnBlur },
    { touched: expireTouched, error: expireError },
    { setValue: setExpire }
  ] = useField('expire')
  const [{ value: sizeValue, onBlur: sizeOnBlur, onChange: sizeOnChange }, { touched: sizeTouched, error: sizeError }] =
    useField('size')
  const [
    { value: titleValue, onBlur: titleOnBlur, onChange: titleOnChange },
    { touched: titleTouched, error: titleError }
  ] = useField('title')
  const [{ value: recordingTypeValue, onChange: recordingTypeChange }] = useField('recordingType')

  return (
    <>
      {!!progress && (
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: 'inherit'
          }}
        >
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress size={100} variant="determinate" value={progress || 100} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6" component="div" color="text.secondary">
                {`${Math.round(progress || 100)}%`}
              </Typography>
            </Box>
          </Box>
          <Typography mt={2} variant="h6" component="div" color="text.secondary">
            uploading media instructions...
          </Typography>
        </Box>
      )}
      {!progress && (
        <>
          <Typography mb={2}>
            What title would you like to give the recordings? We&apos;ll append each recorder&apos;s name to their
            recording.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="Type a title for the recording"
                label="Title"
                name="title"
                type="text"
                value={titleValue}
                onChange={titleOnChange}
                onBlur={titleOnBlur}
                error={titleTouched && Boolean(titleError)}
                helperText={(titleTouched && titleError) || ' '}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Invitation expiration date"
                  value={expireValue}
                  onChange={date => setExpire(date)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      onBlur={expireOnBlur}
                      error={expireTouched && Boolean(expireError)}
                      helperText={(expireTouched && expireError) || ' '}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Time limit per recording (minutes)"
                name="size"
                type="text"
                value={sizeValue}
                onChange={sizeOnChange}
                onBlur={sizeOnBlur}
                error={sizeTouched && Boolean(sizeError)}
                helperText={(sizeTouched && sizeError) || ' '}
                sx={{ width: 230 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="recordings">Recording type</FormLabel>
                <RadioGroup
                  value={recordingTypeValue}
                  onChange={recordingTypeChange}
                  defaultValue="NONE"
                  name="recordingType"
                >
                  <FormControlLabel value="NONE" control={<Radio />} label="Audio or Video" />
                  <FormControlLabel value="AUDIO" control={<Radio />} label="Audio" />
                  <FormControlLabel value="VIDEO" control={<Radio />} label="Video" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Step3
