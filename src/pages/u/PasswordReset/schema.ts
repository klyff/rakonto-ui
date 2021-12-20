import * as yup from 'yup'

export default yup.object().shape({
  token: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can onlsy contain Latin letters.')
    .label('New password'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'new passwords must match')
    .required()
    .label('Email')
})
