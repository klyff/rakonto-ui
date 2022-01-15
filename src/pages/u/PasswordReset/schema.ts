import * as yup from 'yup'

export default yup.object().shape({
  token: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must contain at least 8 characters and include uppercase, lowercase, numbers and special characters'
    )
    .label('New password'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'new passwords must match')
    .required()
    .label('Email')
})
