import * as yup from 'yup'

export default yup.object().shape({
  name: yup.string().required().label('Name'),
  link: yup.string().url().nullable().label('Link')
})
