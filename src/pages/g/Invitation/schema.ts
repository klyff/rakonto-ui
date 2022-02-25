import * as yup from 'yup'

export default yup.object().shape({
  firstName: yup.string().required().label('First name'),
  file: yup.mixed().required().label('File')
})
