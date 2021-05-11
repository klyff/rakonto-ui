import axios from 'axios'
import { singup, singout, requestPasswordReset, getMe, passwordReset, signin, confirmEmail } from './services'
import { history } from '../App'
export type { iSingup, iSignin, iPasswordReset } from './services'

const request = axios.create({
  baseURL: '/'
})

request.interceptors.request.use(function (config) {
  const storageToken = localStorage.getItem('token')
  const token = storageToken ? JSON.parse(storageToken) : ''
  config.headers.Authorization = `Bearer ${token}`
  return config
})

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      history.push('/u/signout')
    }

    return Promise.reject(error)
  }
)

export const api = {
  singup: singup(request),
  singout: singout(request),
  requestPasswordReset: requestPasswordReset(request),
  getMe: getMe(request),
  passwordReset: passwordReset(request),
  signin: signin(request),
  confirmEmail: confirmEmail(request)
}
