import React, { useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Button from '@mui/material/Button'
import { useFormik, FormikValues } from 'formik'
import TextField from '@mui/material/TextField'
import schema from './schema'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import api from '../../../../../lib/api'
import { TimelineType } from '../../../../../lib/types'
import Typography from '@mui/material/Typography'
import { SimpleSnackbarContext } from '../../../../../components/SimpleSnackbar'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface iCreateTimeline {
  storyId: string
  onClose: (place?: TimelineType) => void
}

const CreateTimeline: React.FC<iCreateTimeline> = ({ storyId, onClose }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleClose = (timeline?: TimelineType) => {
    onClose(timeline)
  }

  const onSubmit = async ({ title, description, at }: FormikValues) => {
    try {
      const timeline = await api.createTimeline({
        storyId,
        title,
        description,
        at
      })
      snackActions.open(`${timeline.title} added to this story!`)
      handleClose(timeline)
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code) {
        snackActions.open(`Error to add ${title} to this story!`)
        return
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const initialValues: { title: string; description: string; at: Date } = {
    title: '',
    description: '',
    at: new Date()
  }

  const { isSubmitting, values, handleBlur, handleChange, setFieldValue, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit
  })

  return (
    <form>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
        open={true}
      >
        <DialogTitle>
          Event
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ marginBottom: 3 }} gutterBottom>
            Fill in the event data
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={values.at}
              onChange={date => setFieldValue('at', date)}
              renderInput={params => (
                <TextField
                  {...params}
                  onBlur={handleBlur}
                  error={touched.at && Boolean(errors.at)}
                  helperText={(touched.at && errors.at) || ' '}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            autoFocus
            name="title"
            fullWidth
            label="Title"
            type="text"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={(touched.title && errors.title) || ' '}
          />
          <TextField
            name="description"
            fullWidth
            multiline
            rows={4}
            label="Description"
            type="text"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={(touched.description && errors.description) || ' '}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} sx={{ mt: 1, mr: 1 }}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} variant="contained" onClick={() => handleSubmit()} sx={{ mt: 1, mr: 1 }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default CreateTimeline
