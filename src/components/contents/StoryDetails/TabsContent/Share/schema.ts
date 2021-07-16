import * as yup from 'yup'

export default yup.object().shape({
  watcher: yup.string().required().email('Must be a valid email!')
})
