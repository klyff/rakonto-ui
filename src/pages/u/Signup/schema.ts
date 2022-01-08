import * as yup from 'yup'

export default yup.object().shape({
  email: yup.string().email().required().label('E-mail'),
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    )
    .label('Password'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required()
    .label('Password confirmation')
})
