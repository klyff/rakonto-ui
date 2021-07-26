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
  CommentFormType
} from '@root/types'

// User api
export const getMe = (request: AxiosInstance) => async (): Promise<UserType> => {
  try {
    const response = await request.get('a/me')
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const updateMe =
  (request: AxiosInstance) =>
  async (data: UserFormType): Promise<UserType> => {
    const response = await request.put(`a/profile`, data)
    return response.data
  }

export const signin =
  (request: AxiosInstance) =>
  async (data: SigninFormType): Promise<AuthType> => {
    const response = await request.post('u/auth/signin', data)
    return response.data
  }

export const singup =
  (request: AxiosInstance) =>
  async (data: SingupFormType): Promise<AuthType> => {
    const response = await request.post('u/auth/signup', data)
    return response.data
  }

export const singout = (request: AxiosInstance) => async (): Promise<unknown> => {
  const response = await request.post('a/auth/signout')
  return response.data
}

export const confirmEmail =
  (request: AxiosInstance) =>
  async (token: string): Promise<AuthType> => {
    const response = await request.post(`u/confirmation-email/${token}`)
    return response.data
  }

export const requestConfirmEmail =
  (request: AxiosInstance) =>
  async (email: string): Promise<void> => {
    await request.post(`u/confirmation-email`, { email })
  }

export const passwordReset =
  (request: AxiosInstance) =>
  async (data: PasswordResetForm): Promise<AuthType> => {
    const { token, ...rest } = data
    const response = await request.post(`u/password-reset/${token}`, rest)
    return response.data
  }

export const passwordChange =
  (request: AxiosInstance) =>
  async (data: PasswordChangeForm): Promise<AuthType> => {
    const response = await request.put(`a/password`, data)
    return response.data
  }

export const requestPasswordReset =
  (request: AxiosInstance) =>
  async (email: string): Promise<void> => {
    await request.post(`u/password-reset`, { email })
  }

// Story api
export const searchStories = (request: AxiosInstance) => async (): Promise<any[]> => {
  return Promise.resolve(new Array(10).fill('x'))
}

export const getStories =
  (request: AxiosInstance) =>
  async (page: number, size: number): Promise<Pageable<StoryType>> => {
    const response = await request.get<Pageable<StoryType>>(`a/stories?page=${page}&size=${size}`)
    return response.data
  }

export const getStory =
  (request: AxiosInstance) =>
  async (id: string): Promise<StoryType> => {
    const response = await request.get<StoryType>(`a/stories/${id}`)
    return response.data
  }

export const createStory =
  (request: AxiosInstance) =>
  async (file: File, progressCallback: (progress: { total: number; loaded: number }) => void): Promise<StoryType> => {
    const data = new FormData()
    data.append('file', file)
    const response = await request.post(`a/stories`, data, {
      onUploadProgress: e => progressCallback({ total: e.total, loaded: e.loaded })
    })
    return response.data
  }

export const updateStory =
  (request: AxiosInstance) =>
  async (id: string, data: Partial<StoryUpdateType>): Promise<StoryType> => {
    const response = await request.put(`a/stories/${id}`, data)
    return response.data
  }

export const getCollections =
  (request: AxiosInstance) =>
  async (page: number, size: number): Promise<Pageable<CollectionType>> => {
    const response = await request.get(`a/collections?page=${page}&size=${size}`)
    return response.data
  }

export const addPersonToStory =
  (request: AxiosInstance) =>
  async (id: string, personId: string): Promise<void> => {
    return await request.post(`a/stories/${id}/add-person`, { personId })
  }

export const removePersonFromStory =
  (request: AxiosInstance) =>
  async (id: string, personId: string): Promise<void> => {
    return await request.post(`a/stories/${id}/remove-person`, { personId })
  }

export const publishStory =
  (request: AxiosInstance) =>
  async (id: string, publish: boolean): Promise<void> => {
    return publish ? await request.post(`a/stories/${id}/publish`) : await request.post(`a/stories/${id}/draft`)
  }

// Image api
export const uploadImage =
  (request: AxiosInstance) =>
  async (file: File, progressCallback?: (progress: { total: number; loaded: number }) => void): Promise<ImageType> => {
    const data = new FormData()
    data.append('file', file)
    const response = await request.post<ImageType>(`a/images`, data, {
      onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
    })
    return response.data
  }

export const getImage =
  (request: AxiosInstance) =>
  async (id: string): Promise<ImageType> => {
    const response = await request.get<ImageType>(`a/images/${id}`)
    return response.data
  }

// File api
export const uploadFile =
  (request: AxiosInstance) =>
  async (
    storyId: string,
    file: File,
    progressCallback?: (progress: { total: number; loaded: number }) => void
  ): Promise<FileType> => {
    const data = new FormData()
    data.append('file', file)
    data.append('storyId', storyId)
    const response = await request.post<FileType>(`a/files`, data, {
      onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
    })
    return response.data
  }

export const getFile =
  (request: AxiosInstance) =>
  async (id: string): Promise<FileType> => {
    const response = await request.get<FileType>(`a/files/${id}`)
    return response.data
  }

export const deleteFile =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete<FileType>(`a/files/${id}`)
  }

// Person api
export const getPersons =
  (request: AxiosInstance) =>
  async (page: number, size: number, name?: string): Promise<Pageable<PersonType>> => {
    const response = await request.get(`a/persons?page=${page}&size=${size}${name ? `&name=${name}` : ''}`)
    return response.data
  }

export const createPerson =
  (request: AxiosInstance) =>
  async (data: PersonFormType): Promise<PersonType> => {
    const response = await request.post(`a/persons`, data)
    return response.data
  }

export const updatePerson =
  (request: AxiosInstance) =>
  async (id: string, data: PersonFormType): Promise<PersonType> => {
    const response = await request.put(`a/persons/${id}`, data)
    return response.data
  }

// Link api
export const getLink =
  (request: AxiosInstance) =>
  async (id: string): Promise<LinkType> => {
    const response = await request.get(`a/links/${id}`)
    return response.data
  }

export const createLink =
  (request: AxiosInstance) =>
  async (data: LinkFormType): Promise<LinkType> => {
    const response = await request.post(`a/links`, data)
    return response.data
  }

export const deleteLink =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    const response = await request.delete(`a/links/${id}`)
    return response.data
  }

// Transcipt api
export const getTranscriptions =
  (request: AxiosInstance) =>
  async (id: string): Promise<TranscriptionType> => {
    const response = await request.get(`a/transcriptions/${id}`)
    return response.data
  }

export const updateTranscriptions =
  (request: AxiosInstance) =>
  async (id: string, data: TranscriptionFormType): Promise<TranscriptionType> => {
    const response = await request.put(`a/transcriptions/${id}`, data)
    return response.data
  }

export const createTranscriptions =
  (request: AxiosInstance) =>
  async (data: TranscriptionFormType): Promise<TranscriptionType> => {
    const response = await request.post(`a/transcriptions`, data)
    return response.data
  }

export const deleteTranscriptions =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    const response = await request.delete(`a/transcriptions/${id}`)
    return response.data
  }

// Gallery api
export const getGallery =
  (request: AxiosInstance) =>
  async (id: string): Promise<FileType> => {
    const response = await request.get(`a/gallery-entries/${id}`)
    return response.data
  }

export const createGallery =
  (request: AxiosInstance) =>
  async (storyId: string, imageId: string): Promise<FileType> => {
    const response = await request.post<FileType>(`a/gallery-entries`, {
      storyId,
      imageId
    })
    return response.data
  }

export const deleteGallery =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/gallery-entries/${id}`)
  }

// Timeline api

export const getTimeline =
  (request: AxiosInstance) =>
  async (id: string): Promise<TimelineType> => {
    const response = await request.get(`a/timeline-entries/${id}`)
    return response.data
  }

export const createTimeline =
  (request: AxiosInstance) =>
  async (data: TimelineFormType): Promise<TimelineType> => {
    console.log(data)
    const response = await request.post<TimelineType>(`a/timeline-entries`, {
      ...data,
      at: new Date(data.at).toJSON()
    })
    return response.data
  }

export const deleteTimeline =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/timeline-entries/${id}`)
  }

export const createPlace =
  (request: AxiosInstance) =>
  async (data: PlaceFormType): Promise<PlaceType> => {
    const response = await request.post<PlaceType>(`a/places`, data)
    return response.data
  }

export const deletePlace =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/places/${id}`)
  }

export const searchLocation =
  (request: AxiosInstance) =>
  async (address: string): Promise<LocationSearchType[]> => {
    const response = await request.get<LocationSearchType[]>(`a/geomap/search?format=json&q=${address}`)
    return response.data
  }

// Subtitile api
export const uploadSubtitle =
  (request: AxiosInstance) =>
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
    const response = await request.post<SubtitleType>(`a/subtitles`, data, {
      onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
    })
    return response.data
  }

export const deleteSubtitle =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete<SubtitleType>(`a/subtitles/${id}`)
  }

// Watcher api

export const addWatcher =
  (request: AxiosInstance) =>
  async (data: addWatcherType): Promise<WatcherType> => {
    const response = await request.post<WatcherType>(`a/watchers`, data)
    return response.data
  }

export const removeWatcher =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/watchers/${id}`)
  }

export const notifyWatcher =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.post(`a/watchers/${id}/notify`)
  }

// Comments api
export const getComment =
  (request: AxiosInstance) =>
  async (id: string): Promise<CommentType> => {
    const response = await request.get<CommentType>(`a/comments/${id}`)
    return response.data
  }

export const createComment =
  (request: AxiosInstance) =>
  async (comment: CommentFormType): Promise<CommentType> => {
    const response = await request.post<CommentType>(`a/comments`, comment)
    return response.data
  }

export const editComment =
  (request: AxiosInstance) =>
  async (id: string, comment: CommentFormType): Promise<CommentType> => {
    const response = await request.put<CommentType>(`a/comments/${id}`, comment)
    return response.data
  }

export const deleteComment =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    return await request.delete(`a/comments/${id}`)
  }
