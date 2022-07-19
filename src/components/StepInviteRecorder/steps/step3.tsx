import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useField } from 'formik'
import React, { useEffect, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Switch from '@mui/material/Switch'
import useUser from '../../UserProvider/useUser'

const Step3: React.FC<{ progress: number }> = ({ progress }) => {
  const { user } = useUser()
  const [minutes, setMinutes] = useState<number>(1)
  const [seconds, setSeconds] = useState<number>(0)

  const [
    { value: expireValue, onBlur: expireOnBlur },
    { touched: expireTouched, error: expireError },
    { setValue: setExpire }
  ] = useField('expire')

  const [{ value: allowExpire }, , { setValue: setAllowExpire }] = useField('allowExpire')

  const [{ value: allowOrganization }, , { setValue: setAllowOrganization }] = useField('allowOrganization')

  const [
    { onBlur: sizeOnBlur },
    { touched: sizeTouched, error: sizeError },
    { setValue: setSize, setTouched: setSizeTouchted }
  ] = useField('size')

  const [
    { value: callToActionValue, onBlur: callToActionOnBlur, onChange: callToActionOnChange },
    { touched: callToActionTouched, error: callToActionError }
  ] = useField('callToAction')

  const [
    {
      value: callToActionButtonLabelValue,
      onBlur: callToActionButtonLabelOnBlur,
      onChange: callToActionButtonLabelOnChange
    },
    { touched: callToActionButtonLabelTouched, error: callToActionButtonLabelError }
  ] = useField('callToActionButtonLabel')

  const [
    {
      value: callToActionInstructionsValue,
      onBlur: callToActionInstructionsOnBlur,
      onChange: callToActionInstructionsOnChange
    },
    { touched: callToActionInstructionsTouched, error: callToActionInstructionsError }
  ] = useField('callToActionInstructions')

  const [
    { value: titleValue, onBlur: titleOnBlur, onChange: titleOnChange },
    { touched: titleTouched, error: titleError }
  ] = useField('title')

  const [{ value: recordingTypeValue, onChange: recordingTypeChange }] = useField('recordingType')

  useEffect(() => {
    const time = (minutes || 0) * 60 + seconds || 0
    setSize(time)
  }, [minutes, seconds])

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
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography mb={2}>
                What title would you like to give the recordings? We&apos;ll append each recorder&apos;s name to their
                recording.
              </Typography>
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
              <FormControl sx={{ mb: 2 }}>
                <FormControlLabel
                  sx={{ mr: 'unset', ml: 'unset' }}
                  control={<Switch checked={allowExpire} onChange={e => setAllowExpire(e.target.checked)} />}
                  label="Invitation expiration date"
                  labelPlacement="start"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disabled={!allowExpire}
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
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              {user.tier >= 3 && !!user.organizations.length && (
                <FormControl sx={{ mt: 1 }}>
                  <FormControlLabel
                    sx={{ alignItems: 'flex-start', ml: 'unset' }}
                    id="recordings"
                    labelPlacement="top"
                    control={
                      <Switch checked={allowOrganization} onChange={e => setAllowOrganization(e.target.checked)} />
                    }
                    label="Use your organization information instead of your personal username, email and the Rakonto logo?"
                  />
                </FormControl>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ mb: 4, width: '100%' }}>
                <FormLabel sx={{ color: '#fff' }} error={sizeTouched && Boolean(sizeError)} id="recordings">
                  Suggested time limit for recorders
                </FormLabel>
                <Stack spacing={1} direction="row" sx={{ marginTop: 1 }}>
                  <TextField
                    label="minutes"
                    name="minutes"
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    value={minutes}
                    onChange={e => setMinutes(Number(e.target.value))}
                    onBlur={() => setSizeTouchted(true)}
                    error={sizeTouched && Boolean(sizeError)}
                    sx={{ width: 130 }}
                  />
                  <TextField
                    name="seconds"
                    type="number"
                    label="seconds"
                    InputProps={{ inputProps: { min: 0, max: 59 } }}
                    value={seconds}
                    onChange={e => setSeconds(Number(e.target.value))}
                    onBlur={() => setSizeTouchted(true)}
                    error={sizeTouched && Boolean(sizeError)}
                    sx={{ width: 130 }}
                  />
                </Stack>
                {sizeTouched && Boolean(sizeError) && <FormHelperText error={true}>{sizeError}</FormHelperText>}
              </FormControl>
              <FormControl>
                <FormLabel id="recordings" sx={{ color: '#fff' }}>
                  Desired recording type
                </FormLabel>
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
            {user.tier >= 3 && (
              <Grid item xs={12} md={6}>
                <Typography gutterBottom>Call to action</Typography>
                <Typography gutterBottom>
                  You can replace the default rakonto &quot;Thank you&quot; page with your own call-to action-by filling
                  in the fields below.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Type the action button instruction"
                    label="Instructions"
                    name="callToActionInstructions"
                    type="text"
                    value={callToActionInstructionsValue}
                    onChange={callToActionInstructionsOnChange}
                    onBlur={callToActionInstructionsOnBlur}
                    error={callToActionInstructionsTouched && Boolean(callToActionInstructionsError)}
                    helperText={(callToActionInstructionsTouched && callToActionInstructionsError) || ' '}
                  />
                  <TextField
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Type the action link"
                    label="Action link"
                    name="callToAction"
                    type="text"
                    value={callToActionValue}
                    onChange={callToActionOnChange}
                    onBlur={callToActionOnBlur}
                    error={callToActionTouched && Boolean(callToActionError)}
                    helperText={(callToActionTouched && callToActionError) || ' '}
                  />
                  <TextField
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Type a label for call to action button"
                    label="Button label"
                    name="callToActionButtonLabel"
                    type="text"
                    value={callToActionButtonLabelValue}
                    onChange={callToActionButtonLabelOnChange}
                    onBlur={callToActionButtonLabelOnBlur}
                    error={callToActionButtonLabelTouched && Boolean(callToActionButtonLabelError)}
                    helperText={(callToActionButtonLabelTouched && callToActionButtonLabelError) || ' '}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  )
}

export default Step3
