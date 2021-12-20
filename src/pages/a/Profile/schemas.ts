import * as yup from 'yup'

export const updatePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
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
