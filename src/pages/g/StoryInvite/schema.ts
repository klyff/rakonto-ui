import * as yup from 'yup'

export default yup.object().shape({
  name: yup.string().required().label('Name'),
  files: yup.array().min(1, 'at least 1').required('required').label('Files'),
  email: yup.string().email()
})
