import React, { createContext, useCallback, useState } from 'react'
import { history } from '../../App'
import axios from 'axios'
import Cookies from 'js-cookie'
import ErrorFallback from './ErrorFallback'

import {
  singup,
  singout,
  requestPasswordReset,
  getMe,
  updateMe,
  updateMeCover,
  passwordReset,
  passwordChange,
  signinGoogle,
  signinFacebook,
  signin,
  confirmEmail,
  requestConfirmEmail,
  createStory,
  deleteStory,
  updateStory,
  updateStoryCover,
  getImage,
  getStories,
  getProcessingStories,
  getStory,
  getCollections,
  getCollection,
  updateCollection,
  updateCollectionCover,
  createCollection,
  deleteCollection,
  uploadImage,
  getPersons,
  updatePerson,
  createPerson,
  addPersonToStory,
  removePersonFromStory,
  uploadFile,
  getFile,
  getFiles,
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
  getGalleryItem,
  getGallery,
  getTimelines,
  getTimeline,
  createTimeline,
  deleteTimeline,
  getPlaces,
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
  createComment,
  editComment,
  search,
  searchSuggestions,
  getComments
} from './services'
import {
  addWatcherType,
  apiOptions,
  AuthType,
  CollectionFormType,
  CollectionType,
  CommentFormType,
  CommentType,
  CommentTypes,
  FileType,
  GalleryType,
  ImageType,
  LanguageEnum,
  LinkFormType,
  LinkType,
  LocationSearchType,
  Pageable,
  PasswordChangeForm,
  PasswordResetForm,
  PersonFormType,
  PersonType,
  PlaceFormType,
  PlaceType,
  SigninFormFacebook,
  SigninFormGoogle,
  SigninFormType,
  SingupFormType,
  StoryCreateType,
  StoryType,
  StoryUpdateType,
  SubtitleType,
  TimelineFormType,
  TimelineType,
  TranscriptionFormType,
  TranscriptionType,
  UserFormType,
  UserType,
  WatcherType
} from '../types'

// @ts-ignore
export const ApiContext = createContext<{
  api: (opts?: apiOptions) => {
    addWatcher: (data: addWatcherType) => Promise<WatcherType>
    updateStory: (id: string, data: Partial<StoryUpdateType>) => Promise<StoryType>
    updateStoryCover: (id: string, coverId: string) => Promise<StoryType>
    getGallery: (page: number, size: number) => Promise<Pageable<GalleryType>>
    createGallery: (storyId: string, imageId: string) => Promise<GalleryType>
    singout: () => Promise<void>
    getCollections: (page: number, size: number) => Promise<Pageable<CollectionType>>
    getFile: (id: string) => Promise<FileType>
    createLink: (data: LinkFormType) => Promise<LinkType>
    updateMe: (data: UserFormType) => Promise<UserType>
    updateMeCover: (pictureId: string | null) => Promise<UserType>
    deleteTranscriptions: (id: string) => Promise<void>
    editComment: (id: string, comment: CommentFormType) => Promise<CommentType>
    signin: (data: SigninFormType) => Promise<AuthType>
    getStory: (id: string) => Promise<StoryType>
    getPlaces: (page: number, size: number) => Promise<Pageable<PlaceType>>
    getComments: (commentId: string, type: CommentTypes) => Promise<Pageable<CommentType>>
    uploadImage: (
      file: File,
      progressCallback?: (progress: { total: number; loaded: number }) => void
    ) => Promise<ImageType>
    requestPasswordReset: (email: string) => Promise<void>
    addPersonToStory: (id: string, personId: string) => Promise<void>
    createTranscriptions: (data: TranscriptionFormType) => Promise<TranscriptionType>
    getTimeline: (id: string) => Promise<TimelineType>
    searchLocation: (address: string) => Promise<LocationSearchType[]>
    deleteCollection: (id: string) => Promise<void>
    signinFacebook: (data: SigninFormFacebook) => Promise<AuthType>
    notifyWatcher: (id: string) => Promise<void>
    confirmEmail: (token: string) => Promise<AuthType>
    getFiles: (page: number, size: number) => Promise<Pageable<FileType>>
    deleteGallery: (id: string) => Promise<void>
    createStory: (
      file: File,
      data: StoryCreateType,
      progressCallback: (progress: { total: number; loaded: number }) => void
    ) => Promise<StoryType>
    deleteSubtitle: (id: string) => Promise<void>
    signinGoogle: (data: SigninFormGoogle) => Promise<AuthType>
    getImage: (id: string) => Promise<ImageType>
    createCollection: (data: CollectionFormType) => Promise<CollectionType>
    searchSuggestions: (query: string) => Promise<{ suggestions: string[] }>
    deleteComment: (id: string) => Promise<void>
    removeWatcher: (id: string) => Promise<void>
    createComment: (comment: CommentFormType) => Promise<CommentType>
    singup: (data: SingupFormType) => Promise<AuthType>
    search: (page: number, size: number, q?: string) => Promise<Pageable<StoryType>>
    passwordChange: (data: PasswordChangeForm) => Promise<AuthType>
    getTimelines: (page: number, size: number) => Promise<Pageable<TimelineType>>
    getMe: () => Promise<UserType>
    getPersons: (page: number, size: number, q?: string) => Promise<Pageable<PersonType>>
    removePersonFromStory: (id: string, personId: string) => Promise<void>
    deleteTimeline: (id: string) => Promise<void>
    createPlace: (data: PlaceFormType) => Promise<PlaceType>
    deletePlace: (id: string) => Promise<void>
    passwordReset: (data: PasswordResetForm) => Promise<AuthType>
    uploadSubtitle: (
      storyId: string,
      language: LanguageEnum,
      file: File,
      progressCallback?: (progress: { total: number; loaded: number }) => void
    ) => Promise<SubtitleType>
    updateTranscriptions: (id: string, data: TranscriptionFormType) => Promise<TranscriptionType>
    getStories: (page: number, size: number) => Promise<Pageable<StoryType>>
    getProcessingStories: () => Promise<StoryType[]>
    deleteFile: (id: string) => Promise<void>
    uploadFile: (
      storyId: string,
      file: File,
      progressCallback?: (progress: { total: number; loaded: number }) => void
    ) => Promise<FileType>
    getCollection: (id: string) => Promise<CollectionType>
    publishStory: (id: string, publish: boolean) => Promise<void>
    createPerson: (data: PersonFormType) => Promise<PersonType>
    requestConfirmEmail: (email: string) => Promise<void>
    createTimeline: (data: TimelineFormType) => Promise<TimelineType>
    deleteLink: (id: string) => Promise<void>
    getLink: (id: string) => Promise<LinkType>
    deleteStory: (id: string) => Promise<void>
    updateCollection: (id: string, data: CollectionFormType) => Promise<CollectionType>
    updateCollectionCover: (id: string, coverId: string) => Promise<CollectionType>
    getTranscriptions: (id: string) => Promise<TranscriptionType>
    getGalleryItem: (id: string) => Promise<GalleryType>
    updatePerson: (id: string, data: PersonFormType) => Promise<PersonType>
  }
}>()

const request = axios.create({
  baseURL: '/api'
})

request.interceptors.request.use(function (config) {
  const token = Cookies.get('token')
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

    e.status = e?.response?.status || 500
    e.data = e?.response?.data || 'server error'

    return Promise.reject(e)
  }
)

export const ApiProvider: React.FC = ({ children }) => {
  const [status, setStatus] = useState<number | null>(null)

  const handleError = useCallback(
    (opts: apiOptions) => (error: unknown) => {
      // @ts-ignore
      if (opts.errorBoundary) setStatus(error?.response?.status || null)
      throw error
    },
    [setStatus]
  )

  const api = (opts: apiOptions = { errorBoundary: false }) => {
    return {
      singup: singup(request, handleError(opts)),
      singout: singout(request, handleError(opts)),
      requestPasswordReset: requestPasswordReset(request, handleError(opts)),
      getMe: getMe(request, handleError(opts)),
      updateMe: updateMe(request, handleError(opts)),
      updateMeCover: updateMeCover(request, handleError(opts)),
      passwordReset: passwordReset(request, handleError(opts)),
      passwordChange: passwordChange(request, handleError(opts)),
      signin: signin(request, handleError(opts)),
      signinGoogle: signinGoogle(request, handleError(opts)),
      signinFacebook: signinFacebook(request, handleError(opts)),
      confirmEmail: confirmEmail(request, handleError(opts)),
      requestConfirmEmail: requestConfirmEmail(request, handleError(opts)),
      getStories: getStories(request, handleError(opts)),
      getProcessingStories: getProcessingStories(request, handleError(opts)),
      deleteStory: deleteStory(request, handleError(opts)),
      getStory: getStory(request, handleError(opts)),
      createStory: createStory(request, handleError(opts)),
      updateStory: updateStory(request, handleError(opts)),
      updateStoryCover: updateStoryCover(request, handleError(opts)),
      publishStory: publishStory(request, handleError(opts)),
      uploadImage: uploadImage(request, handleError(opts)),
      getImage: getImage(request, handleError(opts)),
      getCollections: getCollections(request, handleError(opts)),
      getCollection: getCollection(request, handleError(opts)),
      updateCollection: updateCollection(request, handleError(opts)),
      updateCollectionCover: updateCollectionCover(request, handleError(opts)),
      createCollection: createCollection(request, handleError(opts)),
      deleteCollection: deleteCollection(request, handleError(opts)),
      getPersons: getPersons(request, handleError(opts)),
      updatePerson: updatePerson(request, handleError(opts)),
      createPerson: createPerson(request, handleError(opts)),
      addPersonToStory: addPersonToStory(request, handleError(opts)),
      removePersonFromStory: removePersonFromStory(request, handleError(opts)),
      uploadFile: uploadFile(request, handleError(opts)),
      deleteFile: deleteFile(request, handleError(opts)),
      getFiles: getFiles(request, handleError(opts)),
      getFile: getFile(request, handleError(opts)),
      getLink: getLink(request, handleError(opts)),
      createLink: createLink(request, handleError(opts)),
      deleteLink: deleteLink(request, handleError(opts)),
      getTranscriptions: getTranscriptions(request, handleError(opts)),
      deleteTranscriptions: deleteTranscriptions(request, handleError(opts)),
      updateTranscriptions: updateTranscriptions(request, handleError(opts)),
      createTranscriptions: createTranscriptions(request, handleError(opts)),
      getGallery: getGallery(request, handleError(opts)),
      getGalleryItem: getGalleryItem(request, handleError(opts)),
      createGallery: createGallery(request, handleError(opts)),
      deleteGallery: deleteGallery(request, handleError(opts)),
      getTimelines: getTimelines(request, handleError(opts)),
      getTimeline: getTimeline(request, handleError(opts)),
      createTimeline: createTimeline(request, handleError(opts)),
      deleteTimeline: deleteTimeline(request, handleError(opts)),
      getPlaces: getPlaces(request, handleError(opts)),
      createPlace: createPlace(request, handleError(opts)),
      deletePlace: deletePlace(request, handleError(opts)),
      searchLocation: searchLocation(request, handleError(opts)),
      uploadSubtitle: uploadSubtitle(request, handleError(opts)),
      deleteSubtitle: deleteSubtitle(request, handleError(opts)),
      addWatcher: addWatcher(request, handleError(opts)),
      removeWatcher: removeWatcher(request, handleError(opts)),
      notifyWatcher: notifyWatcher(request, handleError(opts)),
      deleteComment: deleteComment(request, handleError(opts)),
      createComment: createComment(request, handleError(opts)),
      editComment: editComment(request, handleError(opts)),
      search: search(request, handleError(opts)),
      searchSuggestions: searchSuggestions(request, handleError(opts)),
      getComments: getComments(request, handleError(opts))
    }
  }

  return (
    <ApiContext.Provider
      value={{
        api
      }}
    >
      <ErrorFallback status={status} onCallback={() => setStatus(null)}>
        {children}
      </ErrorFallback>
    </ApiContext.Provider>
  )
}
