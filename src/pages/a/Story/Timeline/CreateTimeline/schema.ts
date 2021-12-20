import * as yup from 'yup'

export default yup.object().shape({
  title: yup.string().max(50).required().label('Title'),
  at: yup.date().required().label('Date'),
  description: yup.string().max(500).nullable().label('Description')
})
