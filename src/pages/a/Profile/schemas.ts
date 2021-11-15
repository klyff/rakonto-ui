import * as yup from 'yup'

export const updatePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required()
})

export const updateUserSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  about: yup.string()
})
