import * as yup from 'yup'

export default yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  at: yup.date().required()
})
