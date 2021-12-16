import * as yup from 'yup'

export default yup.object().shape({
  title: yup.string().max(50).required(),
  at: yup.date().required(),
  description: yup.string().max(500).nullable()
})
