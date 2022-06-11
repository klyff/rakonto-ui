import {
  addPersonToStory,
  addWatcher,
  confirmEmail,
  createCollection,
  createComment,
  createGallery,
  createLink,
  createPerson,
  createPlace,
  createStory,
  createTimeline,
  createTranscriptions,
  deleteCollection,
  deleteComment,
  deleteFile,
  deleteGallery,
  deleteLink,
  deletePlace,
  deleteStory,
  deleteSubtitle,
  deleteTimeline,
  deleteTranscriptions,
  editComment,
  getCollection,
  getCollections,
  getComments,
  getFile,
  getFiles,
  getGallery,
  getGalleryItem,
  getImage,
  getLink,
  getMe,
  getProductSubscriptions,
  cancelProductSubscription,
  getPersons,
  getPlaces,
  getStories,
  getStory,
  getTimeline,
  getTimelines,
  getTranscriptions,
  getWatchers,
  notifyWatcher,
  passwordChange,
  passwordReset,
  publish,
  isPublished,
  removePersonFromStory,
  removeWatcher,
  requestConfirmEmail,
  requestPasswordReset,
  search,
  searchStories,
  searchCollections,
  searchLocation,
  searchSuggestions,
  signin,
  signinFacebook,
  signinGoogle,
  singout,
  singup,
  updateCollection,
  updateCollectionCover,
  updateMe,
  updateMeCover,
  updatePerson,
  updateStory,
  updateStoryCover,
  updateTranscriptions,
  uploadFile,
  uploadImage,
  uploadSubtitle,
  updateStoryStatus,
  isStoryPublished,
  moveStoryToCollection,
  changeStoryToCollection,
  closeAccount,
  getSubtitles,
  getLinks,
  changeStoryMedia,
  removePlaceFromStory,
  addPlaceToStory,
  editPlace,
  createInvite,
  sendInviteEmails,
  getInviteSubmission,
  sendInviteSubmission,
  verifyStorageUsage,
  createContributorInvite,
  sendInviteContributorEmails,
  getContributorInviteSubmission,
  sendContributorInviteSubmission,
  getShortId,
  getStorageQuota,
  optimizeStorage,
  toogleOptimizeStorage,
  getInvites,
  deleteInvite,
  downloadInvitesSubmissions,
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  organizationAddMembers,
  organizationDeleteMembers
} from './services'
import axios from 'axios'
import Cookies from 'js-cookie'
import { history } from '../../App'

const request = axios.create({
  baseURL: '/api'
})

request.interceptors.request.use(function (config) {
  const token = Cookies.get('token')
  if (config!.url!.startsWith('g/')) return config
  config.headers.Authorization = `Bearer ${token}`
  return config
})

request.interceptors.response.use(
  response => {
    return response
  },
  e => {
    if (e?.response?.status === 401) {
      Cookies.remove('token')
      Cookies.remove('user')
      if (history.location.pathname === '/u/signin') return Promise.reject(e)
      history.push('/u/signin')
      window.location.reload()
      return Promise.reject(e)
    }

    if (e?.response?.status === 404) {
      history.push('/404')
      window.location.reload()
      return Promise.reject(e)
    }

    if (e?.response?.status === 403) {
      history.push('/403')
      window.location.reload()
      return Promise.reject(e)
    }

    e.status = e?.response?.status || 500
    e.data = e?.response?.data || 'server error'

    return Promise.reject(e)
  }
)

export default {
  verifyStorageUsage: verifyStorageUsage(request),
  singup: singup(request),
  singout: singout(request),
  requestPasswordReset: requestPasswordReset(request),
  getMe: getMe(request),
  getProductSubscriptions: getProductSubscriptions(request),
  cancelProductSubscription: cancelProductSubscription(request),
  updateMe: updateMe(request),
  closeAccount: closeAccount(request),
  updateMeCover: updateMeCover(request),
  passwordReset: passwordReset(request),
  passwordChange: passwordChange(request),
  signin: signin(request),
  signinGoogle: signinGoogle(request),
  signinFacebook: signinFacebook(request),
  confirmEmail: confirmEmail(request),
  requestConfirmEmail: requestConfirmEmail(request),
  getStories: getStories(request),
  deleteStory: deleteStory(request),
  getStory: getStory(request),
  createStory: createStory(request),
  changeStoryMedia: changeStoryMedia(request),
  updateStory: updateStory(request),
  updateStoryStatus: updateStoryStatus(request),
  moveStoryToCollection: moveStoryToCollection(request),
  changeStoryToCollection: changeStoryToCollection(request),
  isStoryPublished: isStoryPublished(request),
  updateStoryCover: updateStoryCover(request),
  publish: publish(request),
  isPublished: isPublished(request),
  uploadImage: uploadImage(request),
  getImage: getImage(request),
  getCollections: getCollections(request),
  getCollection: getCollection(request),
  updateCollection: updateCollection(request),
  updateCollectionCover: updateCollectionCover(request),
  createCollection: createCollection(request),
  deleteCollection: deleteCollection(request),
  getPersons: getPersons(request),
  updatePerson: updatePerson(request),
  createPerson: createPerson(request),
  addPersonToStory: addPersonToStory(request),
  addPlaceToStory: addPlaceToStory(request),
  removePersonFromStory: removePersonFromStory(request),
  removePlaceFromStory: removePlaceFromStory(request),
  uploadFile: uploadFile(request),
  deleteFile: deleteFile(request),
  getFiles: getFiles(request),
  getFile: getFile(request),
  getLinks: getLinks(request),
  getLink: getLink(request),
  createLink: createLink(request),
  deleteLink: deleteLink(request),
  getTranscriptions: getTranscriptions(request),
  deleteTranscriptions: deleteTranscriptions(request),
  updateTranscriptions: updateTranscriptions(request),
  createTranscriptions: createTranscriptions(request),
  getGallery: getGallery(request),
  getGalleryItem: getGalleryItem(request),
  createGallery: createGallery(request),
  deleteGallery: deleteGallery(request),
  getTimelines: getTimelines(request),
  getTimeline: getTimeline(request),
  createTimeline: createTimeline(request),
  deleteTimeline: deleteTimeline(request),
  getPlaces: getPlaces(request),
  createPlace: createPlace(request),
  editPlace: editPlace(request),
  deletePlace: deletePlace(request),
  searchLocation: searchLocation(request),
  getSubtitles: getSubtitles(request),
  uploadSubtitle: uploadSubtitle(request),
  deleteSubtitle: deleteSubtitle(request),
  getWatchers: getWatchers(request),
  addWatcher: addWatcher(request),
  removeWatcher: removeWatcher(request),
  notifyWatcher: notifyWatcher(request),
  deleteComment: deleteComment(request),
  createComment: createComment(request),
  editComment: editComment(request),
  search: search(request),
  searchStories: searchStories(request),
  searchCollections: searchCollections(request),
  searchSuggestions: searchSuggestions(request),
  getComments: getComments(request),
  createInvite: createInvite(request),
  deleteInvite: deleteInvite(request),
  getInvites: getInvites(request),
  downloadInvitesSubmissions: downloadInvitesSubmissions(request),
  sendInviteEmails: sendInviteEmails(request),
  getInviteSubmission: getInviteSubmission(request),
  sendInviteSubmission: sendInviteSubmission(request),
  createContributorInvite: createContributorInvite(request),
  sendInviteContributorEmails: sendInviteContributorEmails(request),
  getContributorInviteSubmission: getContributorInviteSubmission(request),
  sendContributorInviteSubmission: sendContributorInviteSubmission(request),
  getShortId: getShortId(request),
  getStorageQuota: getStorageQuota(request),
  optimizeStorage: optimizeStorage(request),
  toogleOptimizeStorage: toogleOptimizeStorage(request),
  getOrganization: getOrganization(request),
  getOrganizations: getOrganizations(request),
  createOrganization: createOrganization(request),
  updateOrganization: updateOrganization(request),
  organizationAddMembers: organizationAddMembers(request),
  organizationDeleteMembers: organizationDeleteMembers(request)
}
