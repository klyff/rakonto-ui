import * as yup from 'yup'

export default yup.object().shape({
  language: yup.string().required().nullable().label('Language')
})
