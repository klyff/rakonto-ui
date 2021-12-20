import * as yup from 'yup'

export default yup.object().shape({
  title: yup.string().required().label('Title'),
  description: yup.string().max(500).required().label('Description')
})
