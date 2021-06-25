import * as yup from 'yup'

export default yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required()
})
