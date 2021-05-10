import * as yup from 'yup'

export default yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can onlsy contain Latin letters.'),
  confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})
