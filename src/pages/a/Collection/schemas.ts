import * as yup from 'yup'

export const aboutSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().max(500).required()
})
