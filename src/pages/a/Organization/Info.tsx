import React, { useState, useContext, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import CreateIcon from '@mui/icons-material/Create'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import { ImageType, OrganizationInput, OrganizationType } from '../../../lib/types'
import api from '../../../lib/api'
import { useFormik } from 'formik'
import { organizationSchema } from './schemas'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

interface iInfo {
  organization?: OrganizationType | null
  onSave: (input: OrganizationInput) => void
  onDelete: () => void
}

const Info: React.FC<iInfo> = ({ organization, onSave, onDelete }) => {
  const [progress, setProgress] = useState<number>(0)
  const [image, setImage] = useState<ImageType | null>(organization?.logo || null)

  const onSubmit = async (data: OrganizationInput) => {
    onSave({ ...data, logoId: image?.id || null })
  }

  const handleDelete = async () => {
    onDelete()
  }

  const initialValues: OrganizationInput = {
    logoId: organization?.logo?.id || null,
    name: organization?.name || '',
    addressLine1: organization?.addressLine1 || '',
    addressLine2: organization?.addressLine2 || '',
    city: organization?.city || '',
    state: organization?.state || '',
    postalCode: organization?.postalCode || '',
    country: organization?.country || '',
    phone: organization?.phone || '',
    email: organization?.email || '',
    socialFacebook: organization?.socialFacebook || '',
    socialTwitter: organization?.socialTwitter || '',
    socialInstagram: organization?.socialInstagram || '',
    socialLinkedin: organization?.socialLinkedin || '',
    socialWhatsapp: organization?.socialWhatsapp || ''
  }

  const {
    isSubmitting,
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    dirty
  } = useFormik({
    initialValues,
    validationSchema: organizationSchema,
    onSubmit,
    enableReinitialize: true
  })

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      const selectedFile = acceptedFiles[0]
      const imageUploaded = await api.uploadImage(selectedFile, event => {
        setProgress(Math.round((event.loaded * 100) / event.total))
      })
      setFieldTouched('logoId')
      setFieldValue('logoId', imageUploaded?.id || null)
      setImage(imageUploaded)
      setProgress(0)
    }

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: 'image/*',
    onDragOver: () => {
      setFieldTouched('logoId')
    },
    onFileDialogCancel: () => {
      setFieldTouched('logoId')
    }
  })

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 'inherit' }}>
      <Box component="form" sx={{ bgcolor: 'background.paper', padding: 2, marginBottom: 3 }}>
        <Box sx={{ minWidth: '320px', width: '100%', maxWidth: '422px' }}>
          <Button color={'primary'} variant="contained" disabled={!dirty} onClick={() => handleSubmit()}>
            Save
          </Button>
          {organization?.id && (
            <Button sx={{ ml: 2 }} color={'error'} variant="contained" onClick={() => handleDelete()}>
              Delete
            </Button>
          )}
          <Box
            sx={{
              paddingTop: 2,
              paddingBottom: 4,
              display: 'flex',
              flexFlow: 'column'
            }}
          >
            <Typography sx={{ pb: 1, ml: 2 }} variant="h6">
              Logo
            </Typography>
            <Box sx={{ mb: 0 }}>
              <Box
                {...getRootProps()}
                sx={{
                  ml: 2,
                  height: '40px',
                  width: '135px',
                  border: '1px solid',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundImage: image?.url ? `url(${image.url})` : 'none',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <input {...getInputProps()} />
                {progress ? (
                  <CircularProgress value={progress} variant="determinate" />
                ) : (
                  !image?.url && <AddAPhotoIcon sx={{ fontSize: 20 }} />
                )}
              </Box>
              <Typography sx={{ pb: 1, ml: 2 }} color="error" variant="caption">
                {(touched.logoId && errors?.logoId) || ' '}
              </Typography>
            </Box>
            <Box
              sx={{
                paddingLeft: 2
              }}
            >
              <Button onClick={open} startIcon={image?.id ? <CreateIcon /> : <AddIcon />} variant="outlined">
                {image?.id ? 'Change' : 'Add'}
              </Button>
            </Box>
            <Typography sx={{ paddingTop: 1, ml: 2 }} variant="h6">
              Better fit with dimensions of 135x40, transparent background and PNG file.
            </Typography>
          </Box>
        </Box>
        <Grid container sx={{ maxWidth: '844px' }} spacing={2}>
          <Grid item xs={12} md>
            <TextField
              name="name"
              fullWidth
              placeholder="Organization name"
              label="Organization name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={(touched.name && errors.name) || ' '}
            />
            <TextField
              name="phone"
              fullWidth
              placeholder="Phone"
              label="Phone"
              type="text"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && Boolean(errors.phone)}
              helperText={(touched.phone && errors.phone) || ' '}
            />
            <TextField
              name="email"
              fullWidth
              placeholder="Email"
              label="Email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={(touched.email && errors.email) || ' '}
            />
            <Typography sx={{ pb: 1, ml: 2 }} variant="h6">
              Localization
            </Typography>
            <TextField
              name="addressLine1"
              fullWidth
              placeholder="Address Line 1"
              label="Address Line 1"
              type="text"
              value={values.addressLine1}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.addressLine1 && Boolean(errors.addressLine1)}
              helperText={(touched.addressLine1 && errors.addressLine1) || ' '}
            />
            <TextField
              name="addressLine2"
              fullWidth
              placeholder="Address Line 2"
              label="Address Line 2"
              type="text"
              value={values.addressLine2}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.addressLine2 && Boolean(errors.addressLine2)}
              helperText={(touched.addressLine2 && errors.addressLine2) || ' '}
            />
            <TextField
              name="city"
              fullWidth
              placeholder="City"
              label="City"
              type="text"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && Boolean(errors.city)}
              helperText={(touched.city && errors.city) || ' '}
            />
            <TextField
              name="state"
              fullWidth
              placeholder="State / Province"
              label="State / Province"
              type="text"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.state && Boolean(errors.state)}
              helperText={(touched.state && errors.state) || ' '}
            />
            <TextField
              name="postalCode"
              fullWidth
              placeholder="Postal Code"
              label="Postal Code"
              type="text"
              value={values.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.postalCode && Boolean(errors.postalCode)}
              helperText={(touched.postalCode && errors.postalCode) || ' '}
            />
            <TextField
              name="country"
              fullWidth
              placeholder="Country"
              label="Country"
              type="text"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.country && Boolean(errors.country)}
              helperText={(touched.country && errors.country) || ' '}
            />
            <Typography sx={{ pb: 1, ml: 2 }} variant="h6">
              Social
            </Typography>
            <TextField
              name="socialFacebook"
              fullWidth
              placeholder="Facebook"
              label="Facebook"
              type="text"
              value={values.socialFacebook}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.socialFacebook && Boolean(errors.socialFacebook)}
              helperText={(touched.socialFacebook && errors.socialFacebook) || ' '}
            />
            <TextField
              name="socialTwitter"
              fullWidth
              placeholder="Twitter"
              label="Twitter"
              type="text"
              value={values.socialTwitter}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.socialTwitter && Boolean(errors.socialTwitter)}
              helperText={(touched.socialTwitter && errors.socialTwitter) || ' '}
            />
            <TextField
              name="socialInstagram"
              fullWidth
              placeholder="Instagram"
              label="Instagram"
              type="text"
              value={values.socialInstagram}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.socialInstagram && Boolean(errors.socialInstagram)}
              helperText={(touched.socialInstagram && errors.socialInstagram) || ' '}
            />
            <TextField
              name="socialLinkedin"
              fullWidth
              placeholder="Linkedin"
              label="Linkedin"
              type="text"
              value={values.socialLinkedin}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.socialLinkedin && Boolean(errors.socialLinkedin)}
              helperText={(touched.socialLinkedin && errors.socialLinkedin) || ' '}
            />
            <TextField
              name="socialWhatsapp"
              fullWidth
              placeholder="Whatsapp"
              label="Whatsapp"
              type="text"
              value={values.socialWhatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.socialWhatsapp && Boolean(errors.socialWhatsapp)}
              helperText={(touched.socialWhatsapp && errors.socialWhatsapp) || ' '}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Info
