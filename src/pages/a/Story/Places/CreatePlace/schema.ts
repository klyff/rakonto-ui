import * as yup from 'yup'

export default yup.object().shape({
  name: yup.string().required().label('Name'),
  description: yup.string().nullable().label('Description')
})
