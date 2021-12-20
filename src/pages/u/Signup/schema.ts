import * as yup from 'yup'

export default yup.object().shape({
  email: yup.string().email().required().label('E-mail'),
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  password: yup
    .string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can onlsy contain Latin letters.')
    .label('Password'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required()
    .label('Password confirmation')
})
