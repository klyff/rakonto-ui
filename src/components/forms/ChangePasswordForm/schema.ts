import * as yup from 'yup'

export default yup.object().shape({
  token: yup.string().required(),
  password: yup
    .string()
    .required('new password is a required field.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can onlsy contain Latin letters.'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'new passwords must match')
    .required('confirm new password is a required field.')
})
