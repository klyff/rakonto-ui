import * as yup from 'yup'

export default yup.object().shape({
  email: yup.string().email().required().label('E-mail'),
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  allowEmail: yup.boolean(),
  allowShareInfo: yup.boolean(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must contain at least 8 characters and include uppercase, lowercase, numbers and special characters'
    )
    .label('Password'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required()
    .label('Password confirmation')
})
