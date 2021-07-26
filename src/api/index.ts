import axios from 'axios'
import {
  singup,
  singout,
  requestPasswordReset,
  getMe,
  updateMe,
  passwordReset,
  passwordChange,
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
  getPersons,
  updatePerson,
  createPerson,
  addPersonToStory,
  removePersonFromStory,
  uploadFile,
  getFile,
  deleteFile,
  getLink,
  createLink,
  deleteLink,
  getTranscriptions,
  deleteTranscriptions,
  createTranscriptions,
  updateTranscriptions,
  createGallery,
  deleteGallery,
  getGallery,
  getTimeline,
  createTimeline,
  deleteTimeline,
  createPlace,
  deletePlace,
  searchLocation,
  uploadSubtitle,
  deleteSubtitle,
  addWatcher,
  removeWatcher,
  notifyWatcher,
  publishStory,
  deleteComment,
  getComment,
  createComment,
  editComment
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
  updateMe: updateMe(request),
  passwordReset: passwordReset(request),
  passwordChange: passwordChange(request),
  signin: signin(request),
  confirmEmail: confirmEmail(request),
  requestConfirmEmail: requestConfirmEmail(request),
  searchStories: searchStories(request),
  getStories: getStories(request),
  getStory: getStory(request),
  createStory: createStory(request),
  updateStory: updateStory(request),
  publishStory: publishStory(request),
  uploadImage: uploadImage(request),
  getImage: getImage(request),
  getCollections: getCollections(request),
  getPersons: getPersons(request),
  updatePerson: updatePerson(request),
  createPerson: createPerson(request),
  addPersonToStory: addPersonToStory(request),
  removePersonFromStory: removePersonFromStory(request),
  uploadFile: uploadFile(request),
  deleteFile: deleteFile(request),
  getFile: getFile(request),
  getLink: getLink(request),
  createLink: createLink(request),
  deleteLink: deleteLink(request),
  getTranscriptions: getTranscriptions(request),
  deleteTranscriptions: deleteTranscriptions(request),
  updateTranscriptions: updateTranscriptions(request),
  createTranscriptions: createTranscriptions(request),
  getGallery: getGallery(request),
  createGallery: createGallery(request),
  deleteGallery: deleteGallery(request),
  getTimeline: getTimeline(request),
  createTimeline: createTimeline(request),
  deleteTimeline: deleteTimeline(request),
  createPlace: createPlace(request),
  deletePlace: deletePlace(request),
  searchLocation: searchLocation(request),
  uploadSubtitle: uploadSubtitle(request),
  deleteSubtitle: deleteSubtitle(request),
  addWatcher: addWatcher(request),
  removeWatcher: removeWatcher(request),
  notifyWatcher: notifyWatcher(request),
  deleteComment: deleteComment(request),
  getComment: getComment(request),
  createComment: createComment(request),
  editComment: editComment(request)
}
