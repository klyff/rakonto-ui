import { AxiosInstance } from 'axios'
import {
  StoryType,
  StoryUpdateType,
  ImageType,
  SingupFormType,
  PasswordResetForm,
  SigninFormType,
  UserType,
  AuthType,
  CollectionType,
  Pageable,
  WatcherType,
  PersonType,
  PersonFormType,
  PasswordChangeForm,
  UserFormType,
  FileType,
  LinkType,
  LinkFormType,
  TranscriptionType,
  TranscriptionFormType,
  TimelineType,
  TimelineFormType,
  LocationSearchType,
  PlaceFormType,
  PlaceType,
  SubtitleType,
  LanguageEnum,
  addWatcherType,
  CommentType,
  CommentFormType,
  CollectionFormType,
  GalleryType,
  SigninFormFacebook,
  SigninFormGoogle,
  CommentTypes,
  StoryCreateType
} from '../types'

// User api
export const getMe =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) => async (): Promise<UserType> => {
    return await request
      .get('a/me')
      .then(res => res.data)
      .catch(errorHandler)
  }

export const updateMe =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: UserFormType): Promise<UserType> => {
    return await request
      .put(`a/profile`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const updateMeCover =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (pictureId: string | null): Promise<UserType> => {
    return await request
      .post(`a/profile/change-picture`, { pictureId })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const signin =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: SigninFormType): Promise<AuthType> => {
    return await request
      .post('u/auth/signin', data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const singup =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: SingupFormType): Promise<AuthType> => {
    return await request
      .post('u/auth/signup', data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const signinGoogle =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: SigninFormGoogle): Promise<AuthType> => {
    return await request
      .post('u/auth/google', data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const signinFacebook =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: SigninFormFacebook): Promise<AuthType> => {
    return await request
      .post('u/auth/facebook', data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const singout = (request: AxiosInstance, errorHandler: (error: unknown) => void) => async (): Promise<void> => {
  await request
    .post('a/auth/signout')
    .then(res => res.data)
    .catch(errorHandler)
}

export const confirmEmail =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (token: string): Promise<AuthType> => {
    return await request
      .post(`u/confirmation-email/${token}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const requestConfirmEmail =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (email: string): Promise<void> => {
    await request.post(`u/confirmation-email`, { email }).catch(errorHandler)
  }

export const passwordReset =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: PasswordResetForm): Promise<AuthType> => {
    const { token, ...rest } = data
    return await request
      .post(`u/password-reset/${token}`, rest)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const passwordChange =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: PasswordChangeForm): Promise<AuthType> => {
    return await request
      .put(`a/password`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const requestPasswordReset =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (email: string): Promise<void> => {
    await request.post(`u/password-reset`, { email }).catch(errorHandler)
  }

// Story api

export const getStories =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (page: number, size: number): Promise<Pageable<StoryType>> => {
    return await request
      .get(`a/stories?page=${page}&size=${size}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const getProcessingStories =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) => async (): Promise<StoryType[]> => {
    return await request
      .get(`a/stories/processing`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const getStory =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<StoryType> => {
    return await request
      .get(`a/stories/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deleteStory =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/stories/${id}`).catch(errorHandler)
  }

export const createStory =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (
    file: File,
    data: StoryCreateType,
    progressCallback: (progress: { total: number; loaded: number }) => void
  ): Promise<StoryType> => {
    const formdata = new FormData()
    formdata.append('file', file, file.name)
    formdata.append(
      'story',
      new Blob([JSON.stringify(data)], {
        type: 'application/json'
      })
    )
    return await request
      .post(`a/stories`, formdata, {
        onUploadProgress: e => progressCallback({ total: e.total, loaded: e.loaded })
      })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const updateStory =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, data: Partial<StoryUpdateType>): Promise<StoryType> => {
    return await request
      .put(`a/stories/${id}`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const updateStoryCover =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, coverId: string): Promise<StoryType> => {
    return await request
      .post(`a/stories/${id}/change-cover`, { coverId })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const addPersonToStory =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, personId: string): Promise<void> => {
    return await request
      .post(`a/stories/${id}/add-person`, { personId })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const removePersonFromStory =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, personId: string): Promise<void> => {
    return await request
      .post(`a/stories/${id}/remove-person`, { personId })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const publishStory =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, publish: boolean): Promise<void> => {
    return publish
      ? await request
          .post(`a/stories/${id}/publish`)
          .then(res => res.data)
          .catch(errorHandler)
      : await request
          .post(`a/stories/${id}/draft`)
          .then(res => res.data)
          .catch(errorHandler)
  }

// Image api
export const uploadImage =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (file: File, progressCallback?: (progress: { total: number; loaded: number }) => void): Promise<ImageType> => {
    const data = new FormData()
    data.append('file', file)
    return await request
      .post(`a/images`, data, {
        onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
      })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const getImage =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<ImageType> => {
    return await request
      .get(`a/images/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

// File api
export const uploadFile =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (
    storyId: string,
    file: File,
    progressCallback?: (progress: { total: number; loaded: number }) => void
  ): Promise<FileType> => {
    const data = new FormData()
    data.append('file', file)
    data.append('storyId', storyId)
    return await request
      .post(`a/files`, data, {
        onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
      })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const getFiles =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (page: number, size: number): Promise<Pageable<FileType>> => {
    return await request
      .get(`a/files?page=${page}&size=${size}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const getFile =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<FileType> => {
    return await request
      .get(`a/files/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deleteFile =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/files/${id}`).catch(errorHandler)
  }

// Person api
export const getPersons =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (page: number, size: number, q?: string): Promise<Pageable<PersonType>> => {
    return await request
      .get(`a/persons?page=${page}&size=${size}${q ? `&name=${q}` : ''}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const createPerson =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: PersonFormType): Promise<PersonType> => {
    return await request
      .post(`a/persons`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const updatePerson =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, data: PersonFormType): Promise<PersonType> => {
    return await request
      .put(`a/persons/${id}`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

// Link api
export const getLink =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<LinkType> => {
    return await request
      .get(`a/links/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const createLink =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: LinkFormType): Promise<LinkType> => {
    return await request
      .post(`a/links`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deleteLink =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/links/${id}`).catch(errorHandler)
  }

// Transcipt api
export const getTranscriptions =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<TranscriptionType> => {
    return await request
      .get(`a/transcriptions/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const updateTranscriptions =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, data: TranscriptionFormType): Promise<TranscriptionType> => {
    return await request
      .put(`a/transcriptions/${id}`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const createTranscriptions =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: TranscriptionFormType): Promise<TranscriptionType> => {
    return await request
      .post(`a/transcriptions`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deleteTranscriptions =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/transcriptions/${id}`).catch(errorHandler)
  }

// Gallery api
export const getGallery =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (page: number, size: number): Promise<Pageable<GalleryType>> => {
    return await request
      .get(`a/gallery-entries?page=${page}&size=${size}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const getGalleryItem =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<GalleryType> => {
    return await request
      .get(`a/gallery-entries/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const createGallery =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (storyId: string, imageId: string): Promise<GalleryType> => {
    return await request
      .post(`a/gallery-entries`, {
        storyId,
        imageId
      })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deleteGallery =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/gallery-entries/${id}`).catch(errorHandler)
  }

// Timeline api

export const getTimelines =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (page: number, size: number): Promise<Pageable<TimelineType>> => {
    return await request
      .get(`a/timeline-entries?page=${page}&size=${size}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const getTimeline =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<TimelineType> => {
    return await request
      .get(`a/timeline-entries/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const createTimeline =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: TimelineFormType): Promise<TimelineType> => {
    return await request
      .post(`a/timeline-entries`, {
        ...data,
        at: new Date(data.at).toJSON()
      })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deleteTimeline =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request
      .delete(`a/timeline-entries/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

// Places api
export const getPlaces =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (page: number, size: number): Promise<Pageable<PlaceType>> => {
    return await request
      .get(`a/places?page=${page}&size=${size}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const createPlace =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: PlaceFormType): Promise<PlaceType> => {
    return await request
      .post(`a/places`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deletePlace =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/places/${id}`).catch(errorHandler)
  }

export const searchLocation =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (address: string): Promise<LocationSearchType[]> => {
    return await request
      .get(`a/geomap/search?format=json&q=${address}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

// Subtitile api
export const uploadSubtitle =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (
    storyId: string,
    language: LanguageEnum,
    file: File,
    progressCallback?: (progress: { total: number; loaded: number }) => void
  ): Promise<SubtitleType> => {
    const data = new FormData()
    data.append('file', file)
    data.append('language', language)
    data.append('storyId', storyId)
    return await request
      .post(`a/subtitles`, data, {
        onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
      })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deleteSubtitle =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request
      .delete(`a/subtitles/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

// Watcher api

export const addWatcher =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: addWatcherType): Promise<WatcherType> => {
    return await request
      .post(`a/watchers`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const removeWatcher =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/watchers/${id}`).catch(errorHandler)
  }

export const notifyWatcher =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request
      .post(`a/watchers/${id}/notify`)
      .then(res => res.data)
      .catch(errorHandler)
  }

// Search api
export const search =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (page: number, size: number, q?: string): Promise<Pageable<StoryType>> => {
    return await request
      .get(`a/search?q=${q || ''}&page=${page}&size=${size}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const searchSuggestions =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (query: string): Promise<{ suggestions: string[] }> => {
    return await request
      .get(`a/search/suggestions?q=${query || ''}&page=${0}&size=${10}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

// Comments api

export const getComments =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (commentId: string, type: CommentTypes): Promise<Pageable<CommentType>> => {
    return await request
      .get(`a/comments?commentableId=${commentId}&commentableType=${type}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const createComment =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (comment: CommentFormType): Promise<CommentType> => {
    return await request
      .post(`a/comments`, comment)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const editComment =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, comment: CommentFormType): Promise<CommentType> => {
    return await request
      .put(`a/comments/${id}`, comment)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deleteComment =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/comments/${id}`).catch(errorHandler)
  }

// Collection api

export const getCollections =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (page: number, size: number): Promise<Pageable<CollectionType>> => {
    return await request
      .get(`a/collections?page=${page}&size=${size}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const getCollection =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<CollectionType> => {
    return await request
      .get(`a/collections/${id}`)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const updateCollection =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, data: CollectionFormType): Promise<CollectionType> => {
    return await request
      .put(`a/collections/${id}`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const updateCollectionCover =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string, coverId: string): Promise<CollectionType> => {
    return await request
      .post(`a/collections/${id}/change-cover`, { coverId })
      .then(res => res.data)
      .catch(errorHandler)
  }

export const createCollection =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (data: CollectionFormType): Promise<CollectionType> => {
    return await request
      .post(`a/collections`, data)
      .then(res => res.data)
      .catch(errorHandler)
  }

export const deleteCollection =
  (request: AxiosInstance, errorHandler: (error: unknown) => void) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/collections/${id}`).catch(errorHandler)
  }
