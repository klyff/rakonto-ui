import * as yup from 'yup'

export default yup.object().shape({
  watcherShare: yup.string().email('Must be a valid email!')
})
