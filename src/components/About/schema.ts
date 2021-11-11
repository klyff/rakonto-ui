import * as yup from 'yup'

export default yup.object().shape({
  title: yup.string().required(),
  description: yup.string().max(500).required()
})
