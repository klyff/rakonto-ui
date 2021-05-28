import * as yup from 'yup'

export default yup.object().shape({
  title: yup.string().required().max(150),
  description: yup.string().required().max(1000)
})
