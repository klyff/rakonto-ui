import Typography from '@mui/material/Typography'
import React from 'react'
import { useField } from 'formik'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Switch from '@mui/material/Switch'

const Step1 = () => {
  const [{ onChange, onBlur, value }, { error, touched }] = useField('instructions')
  const [
    { value: titleValue, onBlur: titleOnBlur, onChange: titleOnChange },
    { touched: titleTouched, error: titleError }
  ] = useField('title')
  const [
    { value: expireValue, onBlur: expireOnBlur },
    { touched: expireTouched, error: expireError },
    { setValue: setExpire }
  ] = useField('expire')
  const [{ value: allowExpire }, , { setValue: setAllowExpire }] = useField('allowExpire')
  const [{ value: recordingTypeValue, onChange: recordingTypeChange }] = useField('recordingType')
  return (
    <>
      <Typography mb={2}>
        What about would you like Contributors to share with you? Provide a brief description of what you&apos;re
        looking for.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
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
            placeholder="Describe your contributor request here"
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            error={touched && Boolean(error)}
            helperText={(touched && error) || ' '}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Type a title for the contribution"
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
          <FormControl>
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
          <FormControl>
            <FormLabel id="recordings">Recording type</FormLabel>
            <RadioGroup
              value={recordingTypeValue}
              onChange={recordingTypeChange}
              defaultValue="NONE"
              name="recordingType"
            >
              <FormControlLabel value="NONE" control={<Radio />} label="File or Image" />
              <FormControlLabel value="FILE" control={<Radio />} label="File" />
              <FormControlLabel value="GALLERY_ENTRY" control={<Radio />} label="Image" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default Step1
