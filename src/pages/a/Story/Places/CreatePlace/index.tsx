import React, { useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useFormik, FormikValues } from 'formik'
import TextField from '@mui/material/TextField'
import schema from './schema'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import MapViewer from '../../../../../components/MapViewer'
import api from '../../../../../lib/api'
import { LocationSearchType, markerType, PlaceType } from '../../../../../lib/types'
import Typography from '@mui/material/Typography'
import Search from './Search'
import { LatLngExpression } from 'leaflet'
import { SimpleSnackbarContext } from '../../../../../components/SimpleSnackbar'

interface iCreatePlace {
  storyId: string
  onClose: (place?: PlaceType) => void
}

const CreatePlace: React.FC<iCreatePlace> = ({ storyId, onClose }) => {
  const [location, setLocation] = useState<LocationSearchType | undefined>(undefined)
  const [markers, setMarkers] = useState<markerType[]>([])
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleClose = (place?: PlaceType) => {
    onClose(place)
  }

  useEffect(() => {
    if (!location) return
    setMarkers([{ id: Math.random().toString(16).slice(2), marker: [Number(location.lat), Number(location.lon)] }])
  }, [location])

  const onSubmit = async ({ name, description }: FormikValues) => {
    if (!location) return
    try {
      const place = await api.createPlace({
        storyId,
        name,
        description,
        location: location.display_name,
        latitude: location.lat,
        longitude: location.lon
      })
      snackActions.open(`${place.name} added to this story!`)
      handleClose(place)
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code) {
        snackActions.open(`Error to add ${name} to this story!`)
        return
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const initialValues: { name?: string; description?: string } = {
    name: '',
    description: ''
  }

  const { isSubmitting, values, handleBlur, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit
  })

  return (
    <form>
      <Dialog
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
          Create place
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
          <TextField
            autoFocus
            name="name"
            fullWidth
            label="Title"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={(touched.name && errors.name) || ' '}
          />
          <TextField
            name="description"
            fullWidth
            label="Description"
            type="text"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={(touched.description && errors.description) || ' '}
          />
          <Typography sx={{ marginBottom: 2 }}>Please enter an address to link with this story.</Typography>
          <Search handleSelect={place => setLocation(place)} />
          <Box sx={{ width: '100%', height: '282px', padding: '16px 0px' }}>
            <MapViewer
              position={location ? [Number(location?.lat), Number(location?.lon)] : undefined}
              markers={markers}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} sx={{ mt: 1, mr: 1 }}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} variant="contained" onClick={() => handleSubmit()} sx={{ mt: 1, mr: 1 }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default CreatePlace
