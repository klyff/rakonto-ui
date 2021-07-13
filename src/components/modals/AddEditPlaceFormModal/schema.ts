import * as yup from 'yup'

export default yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  location: yup.string().required()
})
