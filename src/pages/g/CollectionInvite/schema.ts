import * as yup from 'yup'

export default yup.object().shape({
  name: yup.string().required().label('Name'),
  file: yup.mixed().required().label('File'),
  email: yup.string().required().email().label('Email'),
  allowEmail: yup.boolean(),
  allowShareInfo: yup.boolean()
})
