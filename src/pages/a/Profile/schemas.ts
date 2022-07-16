import * as yup from 'yup'

export const updatePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must contain at least 8 characters and include uppercase, lowercase, numbers and special characters'
    )
    .label('Password'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required()
    .label('Password confirmation')
})

export const updateUserSchema = yup.object().shape({
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  about: yup.string().label('About')
})

export const closeAccountSchema = yup.object().shape({
  password: yup.string().required().label('Password')
})

export const emailSchema = yup.object().shape({
  email: yup.string().required().email().label('Email')
})
