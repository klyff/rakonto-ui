import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import api from '../../../lib/api'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import useUser from '../../../components/hooks/useUser'
import { UserFormType } from '../../../lib/types'
import { FormikValues, useFormik } from 'formik'
import { updateUserSchema, closeAccountSchema } from './schemas'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Cookies from 'js-cookie'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CreateIcon from '@mui/icons-material/Create'
import CloseIcon from '@mui/icons-material/Close'
import Link from '@mui/material/Link'
import { useDropzone, DropEvent, FileRejection } from 'react-dropzone'
import { FormDialogContext } from '../../../components/FormDialog'

const Info: React.FC = () => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { actions: formDialogActions } = useContext(FormDialogContext)
  const [progress, setProgress] = useState<number>(0)
  const user = useUser()

  const handleCloseSubmit = async (data: FormikValues) => {
    try {
      await api.closeAccount(data)
      snackActions.open('Account closed with success!')
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code) {
        snackActions.open('Wrong password.')
        return
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const handleCloseAccount = () => {
    formDialogActions.open(
      'Close account',
      'Are you sure you want to close your account? \n' +
        'We will maintain your account for 30 days. After that, your account will be removed along with your data and cannot be recovered. Please enter your password to confirm you wish to close your account.',
      [{ label: 'Password', name: 'password', placeholder: 'password', type: 'password' }],
      { password: '' },
      closeAccountSchema,
      handleCloseSubmit,
      { okText: 'Yes, close my account', cancelText: `No, keep my account` }
    )
  }

  const updateProfile = async (data: UserFormType) => {
    try {
      const me = await api.updateMe(data)
      snackActions.open('User info updated!')
      Cookies.set('user', JSON.stringify(me))
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data.code === '1004') {
        snackActions.open('Wrong password.')
        return
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const onSubmit = async (data: UserFormType) => {
    updateProfile(data)
  }

  const initialValues: UserFormType = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    about: user?.about || ''
  }

  const { isSubmitting, handleSubmit, handleBlur, values, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: updateUserSchema,
    onSubmit
  })

  const onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void =
    async acceptedFiles => {
      const selectedFile = acceptedFiles[0]
      const image = await api.uploadImage(selectedFile, event => {
        setProgress(Math.round((event.loaded * 100) / event.total))
      })
      setProgress(0)
      await api.updateMeCover(image.id)
      const userInfo = await api.getMe()
      Cookies.set('user', JSON.stringify(userInfo))
      snackActions.open('User picture updated!')
    }

  const onRemove = async () => {
    await api.updateMeCover(null)
    const userInfo = await api.getMe()
    Cookies.set('user', JSON.stringify(userInfo))
    snackActions.open('User picture removed!')
  }

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noClick: true, accept: 'image/png, image/jpeg' })

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box component="form" sx={{ bgcolor: 'background.paper', padding: 2, marginBottom: 3 }}>
        <Typography sx={{ paddingBottom: 2, paddingTop: 2 }} variant="h6">
          Let people know about you!
        </Typography>
        <Box sx={{ minWidth: '320px', width: '100%', maxWidth: '422px' }}>
          <Box
            sx={{
              paddingTop: 2,
              paddingBottom: 4,
              display: 'flex',
              flexFlow: 'row',
              alignItems: 'center'
            }}
          >
            <Box
              {...getRootProps()}
              sx={{
                height: '120px',
                minWidth: '120px',
                borderRadius: '50%',
                border: '1px solid',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: user?.picture?.url ? `url(${user.picture.url})` : 'none',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <input {...getInputProps()} />
              {!user?.picture?.url && <CameraAltIcon sx={{ fontSize: 40 }} />}
            </Box>
            <Box
              sx={{
                paddingLeft: 2
              }}
            >
              <div>
                <Button onClick={open} startIcon={<CreateIcon />} variant="outlined">
                  Change
                </Button>
                {user?.picture?.url && (
                  <Button onClick={onRemove} color="secondary" startIcon={<CloseIcon />}>
                    Remove
                  </Button>
                )}
              </div>
              <Typography sx={{ paddingTop: 1 }} variant="h6">
                JPG or PNG. Max size of 5 MB.
              </Typography>
            </Box>
          </Box>

          <TextField
            autoFocus
            name="firstName"
            fullWidth
            placeholder="First name"
            label="First name"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={(touched.firstName && errors.firstName) || ' '}
          />
          <TextField
            name="lastName"
            fullWidth
            placeholder="Last name"
            label="Last name"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={(touched.lastName && errors.lastName) || ' '}
          />
          <Typography sx={{ paddingBottom: 4, paddingTop: 2 }} variant="h6">
            Your profile will appear on stories and collections you create, as well as any comments you post.
          </Typography>
          <TextField
            name="about"
            fullWidth
            placeholder="About"
            multiline
            rows={6}
            label="About"
            type="text"
            value={values.about}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.about && Boolean(errors.about)}
            helperText={(touched.about && errors.about) || ' '}
          />
          <Box sx={{ textAlign: 'end' }}>
            <Button color={'primary'} variant="contained" onClick={() => handleSubmit()}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mb: 4, bgcolor: 'background.paper', padding: 2 }}>
        <Typography variant="body1">
          <Link component="button" onClick={handleCloseAccount} underline="hover" variant="body1">
            Close account
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Info
