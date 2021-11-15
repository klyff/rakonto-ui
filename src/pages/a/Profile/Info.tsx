import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { ApiContext } from '../../../lib/api'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import useUser from '../../../components/hooks/useUser'
import { UserFormType } from '../../../lib/types'
import { FormikHelpers } from 'formik/dist/types'
import { useFormik } from 'formik'
import { updateUserSchema } from './schemas'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Cookies from 'js-cookie'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CreateIcon from '@mui/icons-material/Create'

const Info: React.FC = () => {
  const { api } = useContext(ApiContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const user = useUser()

  const onSubmit = async (data: UserFormType) => {
    try {
      const me = await api().updateMe(data)
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

  return (
    <Box component="form" sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', padding: 2 }}>
      <Box sx={{ width: '660px' }}>
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
            sx={{
              height: '120px',
              width: '120px',
              borderRadius: '50%',
              border: '1px solid',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CameraAltIcon sx={{ fontSize: 40 }} />
          </Box>
          <Box
            sx={{
              paddingLeft: 2
            }}
          >
            <Button startIcon={<CreateIcon />} variant="outlined">
              Edit
            </Button>
            <Typography sx={{ paddingTop: 1 }} variant="h6">
              JPG or PNG. Max size of 5 MB.
            </Typography>
          </Box>
        </Box>

        <TextField
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
          Let people know about you. Your profile will appear on the Information page of the stories and collections you
          create, as well as any comments you post.
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
  )
}

export default Info
