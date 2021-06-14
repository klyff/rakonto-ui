import axios from 'axios'
import {
  singup,
  singout,
  requestPasswordReset,
  getMe,
  passwordReset,
  signin,
  confirmEmail,
  requestConfirmEmail,
  searchStories,
  createStory,
  updateStory,
  getImage,
  getStories,
  getStory,
  getCollections,
  uploadImage,
  getWatcher,
  resendInvite
} from './services'
import { history } from '../App'

const request = axios.create({
  baseURL: '/api'
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
      localStorage.removeItem('token')
      if (history.location.pathname === '/u/signin') return Promise.reject(error)
      history.push('/u/signin')
      window.location.reload()
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
  confirmEmail: confirmEmail(request),
  requestConfirmEmail: requestConfirmEmail(request),
  searchStories: searchStories(request),
  getStories: getStories(request),
  getStory: getStory(request),
  createStory: createStory(request),
  updateStory: updateStory(request),
  uploadImage: uploadImage(request),
  getImage: getImage(request),
  getWatcher: getWatcher(request),
  getCollections: getCollections(request),
  resendInvite: resendInvite(request)
}
