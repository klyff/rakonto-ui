import React, { useContext, useState } from 'react'
import api from '../../../lib/api'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { PasswordChangeForm } from '../../../lib/types'
import { useFormik } from 'formik'
import { updatePasswordSchema } from './schemas'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { FormikHelpers } from 'formik/dist/types'

const Password: React.FC = () => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [showPassword, setShowPassword] = useState<{ password: boolean; newPassword: boolean; confirmation: boolean }>({
    password: false,
    newPassword: false,
    confirmation: false
  })

  const handleClickShowPassword = (field: 'password' | 'newPassword' | 'confirmation') => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    })
  }

  const onSubmit = async (data: PasswordChangeForm, helpers: FormikHelpers<PasswordChangeForm>) => {
    try {
      await api.passwordChange(data)
      snackActions.open('Password updated!')
      helpers.resetForm()
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

  const initialValues: PasswordChangeForm = { password: '', newPassword: '', confirmation: '' }

  const { isSubmitting, handleSubmit, handleBlur, values, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: updatePasswordSchema,
    onSubmit
  })

  return (
    <Box component="form" sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', padding: 2 }}>
      <Box sx={{ minWidth: '320px', width: '100%', maxWidth: '422px' }}>
        <Typography sx={{ paddingBottom: 4 }} variant="body1">
          We suggest you use 8 or more characters with a mix of letters, numbers for the most secure password:
        </Typography>
        <TextField
          name="password"
          fullWidth
          placeholder="Your password"
          label="Your password"
          type={showPassword.password ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={(touched.password && errors.password) || ' '}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleClickShowPassword('password')} edge="end">
                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          name="newPassword"
          fullWidth
          placeholder="New password"
          label="New password"
          type={showPassword.newPassword ? 'text' : 'password'}
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.newPassword && Boolean(errors.newPassword)}
          helperText={(touched.newPassword && errors.newPassword) || ' '}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleClickShowPassword('newPassword')} edge="end">
                  {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          name="confirmation"
          fullWidth
          placeholder="Confirmation password"
          label="Confirmation password"
          type={showPassword.confirmation ? 'text' : 'password'}
          value={values.confirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmation && Boolean(errors.confirmation)}
          helperText={(touched.confirmation && errors.confirmation) || ' '}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleClickShowPassword('confirmation')} edge="end">
                  {showPassword.confirmation ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ textAlign: 'end' }}>
          <Button color={'primary'} variant="contained" onClick={() => handleSubmit()}>
            Change
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Password
