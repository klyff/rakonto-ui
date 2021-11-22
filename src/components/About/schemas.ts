import * as yup from 'yup'

export const editTitleDescriptionSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().max(500).required()
})

export const shareSchema = yup.object().shape({
  email: yup.string().email().required()
})
