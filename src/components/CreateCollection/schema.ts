import * as yup from 'yup'

export default yup.object().shape({
  title: yup.string().required().label('Title'),
  type: yup.string().label('Type'),
  description: yup.string().max(500).required().label('Description')
})
