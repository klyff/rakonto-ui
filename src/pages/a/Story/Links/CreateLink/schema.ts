import * as yup from 'yup'

export default yup.object().shape({
  url: yup.string().url().required().nullable().label('Url')
})
