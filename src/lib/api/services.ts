import { AxiosInstance } from 'axios'
import { stringify } from 'qs'
import {
  addWatcherType,
  AssetTypes,
  AuthType,
  CollectionFormType,
  CollectionType,
  CommentFormType,
  CommentType,
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
  SearchResultType,
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

// User api
export const getMe = (request: AxiosInstance) => async (): Promise<UserType> => {
  return await request.get('a/me').then(res => res.data)
}

export const updateMe =
  (request: AxiosInstance) =>
  async (data: UserFormType): Promise<UserType> => {
    return await request.put(`a/profile`, data).then(res => res.data)
  }

export const closeAccount =
  (request: AxiosInstance) =>
  async (data: UserFormType): Promise<void> => {
    await request.delete(`a/account`, { data }).then(res => res.data)
  }

export const updateMeCover =
  (request: AxiosInstance) =>
  async (pictureId: string | null): Promise<UserType> => {
    return await request.post(`a/profile/change-picture`, { pictureId }).then(res => res.data)
  }

export const signin =
  (request: AxiosInstance) =>
  async (data: SigninFormType): Promise<AuthType> => {
    return await request.post('u/auth/signin', data).then(res => res.data)
  }

export const singup =
  (request: AxiosInstance) =>
  async (data: SingupFormType): Promise<AuthType> => {
    return await request.post('u/auth/signup', data).then(res => res.data)
  }

export const signinGoogle =
  (request: AxiosInstance) =>
  async (data: SigninFormGoogle): Promise<AuthType> => {
    return await request.post('u/auth/google', data).then(res => res.data)
  }

export const signinFacebook =
  (request: AxiosInstance) =>
  async (data: SigninFormFacebook): Promise<AuthType> => {
    return await request.post('u/auth/facebook', data).then(res => res.data)
  }

export const singout = (request: AxiosInstance) => async (): Promise<void> => {
  await request.post('a/auth/signout').then(res => res.data)
}

export const confirmEmail =
  (request: AxiosInstance) =>
  async (token: string): Promise<AuthType> => {
    return await request.post(`u/confirmation-email/${token}`).then(res => res.data)
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
    return await request.post(`u/password-reset/${token}`, rest).then(res => res.data)
  }

export const passwordChange =
  (request: AxiosInstance) =>
  async (data: PasswordChangeForm): Promise<AuthType> => {
    return await request.put(`a/password`, data).then(res => res.data)
  }

export const requestPasswordReset =
  (request: AxiosInstance) =>
  async (email: string): Promise<void> => {
    await request.post(`u/password-reset`, { email })
  }

// Story api

export const getStories =
  (request: AxiosInstance) =>
  async (page: number, size: number): Promise<Pageable<StoryType>> => {
    return await request.get(`a/stories?page=${page}&size=${size}`).then(res => res.data)
  }

export const getProcessingStories = (request: AxiosInstance) => async (): Promise<StoryType[]> => {
  return await request.get(`a/stories/processing`).then(res => res.data)
}

export const getStory =
  (request: AxiosInstance) =>
  async (id: string): Promise<StoryType> => {
    return await request.get(`a/stories/${id}`).then(res => res.data)
  }

export const deleteStory =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/stories/${id}`)
  }

export const createStory =
  (request: AxiosInstance) =>
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
  }

export const changeStoryMedia =
  (request: AxiosInstance) =>
  async (
    id: string,
    file: File,
    progressCallback: (progress: { total: number; loaded: number }) => void
  ): Promise<StoryType> => {
    const formdata = new FormData()
    formdata.append('file', file, file.name)
    return await request
      .post(`a/stories/${id}/change-media`, formdata, {
        onUploadProgress: e => progressCallback({ total: e.total, loaded: e.loaded })
      })
      .then(res => res.data)
  }

export const updateStory =
  (request: AxiosInstance) =>
  async (id: string, data: Partial<StoryUpdateType>): Promise<StoryType> => {
    return await request.put(`a/stories/${id}`, data).then(res => res.data)
  }

export const updateStoryStatus =
  (request: AxiosInstance) =>
  async (id: string, publish: boolean): Promise<StoryType> => {
    if (publish) {
      return await request.post(`a/stories/${id}/publish`).then(res => res.data)
    }
    return await request.post(`a/stories/${id}/draft`).then(res => res.data)
  }

export const moveStoryToCollection =
  (request: AxiosInstance) =>
  async (id: string, collectionId: string): Promise<void> => {
    await request.post(`a/stories/${id}/add-collection`, { collectionId }).then(res => res.data)
  }

export const changeStoryToCollection =
  (request: AxiosInstance) =>
  async (id: string, newCollectionId: string, oldCollectionId: string): Promise<void> => {
    await request.post(`a/stories/${id}/change-collection`, { newCollectionId, oldCollectionId }).then(res => res.data)
  }

export const isStoryPublished =
  (request: AxiosInstance) =>
  async (id: string): Promise<boolean> => {
    const story = await getStory(request)(id)
    return story.published
  }

export const updateStoryCover =
  (request: AxiosInstance) =>
  async (id: string, coverId: string): Promise<StoryType> => {
    return await request.post(`a/stories/${id}/change-cover`, { coverId }).then(res => res.data)
  }

export const addPersonToStory =
  (request: AxiosInstance) =>
  async (id: string, personId: string): Promise<void> => {
    return await request.post(`a/stories/${id}/add-person`, { personId }).then(res => res.data)
  }

export const removePersonFromStory =
  (request: AxiosInstance) =>
  async (id: string, personId: string): Promise<void> => {
    return await request.post(`a/stories/${id}/remove-person`, { personId }).then(res => res.data)
  }

export const addPlaceToStory =
  (request: AxiosInstance) =>
  async (id: string, placeId: string): Promise<void> => {
    return await request.post(`a/stories/${id}/add-place`, { placeId }).then(res => res.data)
  }

export const removePlaceFromStory =
  (request: AxiosInstance) =>
  async (id: string, placeId: string): Promise<void> => {
    return await request.post(`a/stories/${id}/remove-place`, { placeId }).then(res => res.data)
  }

// Image api
export const uploadImage =
  (request: AxiosInstance) =>
  async (file: File, progressCallback?: (progress: { total: number; loaded: number }) => void): Promise<ImageType> => {
    const data = new FormData()
    data.append('file', file)
    return await request
      .post(`a/images`, data, {
        onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
      })
      .then(res => res.data)
  }

export const getImage =
  (request: AxiosInstance) =>
  async (id: string): Promise<ImageType> => {
    return await request.get(`a/images/${id}`).then(res => res.data)
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
    return await request
      .post(`a/files`, data, {
        onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
      })
      .then(res => res.data)
  }

export const getFiles =
  (request: AxiosInstance) =>
  async (page: number, size: number, storyIds?: string[]): Promise<Pageable<FileType>> => {
    const queryString = stringify({ page, size, storyIds }, { indices: false, addQueryPrefix: true })
    return await request.get(`a/files${queryString}`).then(res => res.data)
  }

export const getFile =
  (request: AxiosInstance) =>
  async (id: string): Promise<FileType> => {
    return await request.get(`a/files/${id}`).then(res => res.data)
  }

export const deleteFile =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/files/${id}`)
  }

// Person api
export const getPersons =
  (request: AxiosInstance) =>
  async (page: number, size: number, q?: string, storyIds?: string[]): Promise<Pageable<PersonType>> => {
    const queryString = stringify({ page, size, name: q, storyIds }, { indices: false, addQueryPrefix: true })
    return await request.get(`a/persons${queryString}`).then(res => res.data)
  }

export const createPerson =
  (request: AxiosInstance) =>
  async (data: PersonFormType): Promise<PersonType> => {
    return await request.post(`a/persons`, data).then(res => res.data)
  }

export const updatePerson =
  (request: AxiosInstance) =>
  async (id: string, data: PersonFormType): Promise<PersonType> => {
    return await request.put(`a/persons/${id}`, data).then(res => res.data)
  }

// Link api
export const getLinks =
  (request: AxiosInstance) =>
  async (page: number, size: number, storyIds?: string[]): Promise<Pageable<LinkType>> => {
    const queryString = stringify({ page, size, storyIds }, { indices: false, addQueryPrefix: true })
    return await request.get(`a/links${queryString}`).then(res => res.data)
  }

export const getLink =
  (request: AxiosInstance) =>
  async (id: string): Promise<LinkType> => {
    return await request.get(`a/links/${id}`).then(res => res.data)
  }

export const createLink =
  (request: AxiosInstance) =>
  async (data: LinkFormType): Promise<LinkType> => {
    return await request.post(`a/links`, data).then(res => res.data)
  }

export const deleteLink =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/links/${id}`)
  }

// Transcipt api
export const getTranscriptions =
  (request: AxiosInstance) =>
  async (page: number, size: number, storyIds?: string[]): Promise<Pageable<TranscriptionType>> => {
    const queryString = stringify({ page, size, storyIds }, { indices: false, addQueryPrefix: true })
    return await request.get(`a/transcriptions${queryString}`).then(res => res.data)
  }

export const getTranscription =
  (request: AxiosInstance) =>
  async (id: string): Promise<TranscriptionType> => {
    return await request.get(`a/transcriptions/${id}`).then(res => res.data)
  }

export const updateTranscriptions =
  (request: AxiosInstance) =>
  async (id: string, data: TranscriptionFormType): Promise<TranscriptionType> => {
    return await request.put(`a/transcriptions/${id}`, data).then(res => res.data)
  }

export const createTranscriptions =
  (request: AxiosInstance) =>
  async (data: TranscriptionFormType): Promise<TranscriptionType> => {
    return await request.post(`a/transcriptions`, data).then(res => res.data)
  }

export const deleteTranscriptions =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/transcriptions/${id}`)
  }

// Gallery api
export const getGallery =
  (request: AxiosInstance) =>
  async (page: number, size: number, storyIds?: string[]): Promise<Pageable<GalleryType>> => {
    const queryString = stringify({ page, size, storyIds }, { indices: false, addQueryPrefix: true })
    return await request.get(`a/gallery-entries${queryString}`).then(res => res.data)
  }

export const getGalleryItem =
  (request: AxiosInstance) =>
  async (id: string): Promise<GalleryType> => {
    return await request.get(`a/gallery-entries/${id}`).then(res => res.data)
  }

export const createGallery =
  (request: AxiosInstance) =>
  async (storyId: string, imageId: string): Promise<GalleryType> => {
    return await request
      .post(`a/gallery-entries`, {
        storyId,
        imageId
      })
      .then(res => res.data)
  }

export const deleteGallery =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/gallery-entries/${id}`)
  }

// Timeline api

export const getTimelines =
  (request: AxiosInstance) =>
  async (page: number, size: number, storyIds?: string[]): Promise<Pageable<TimelineType>> => {
    const queryString = stringify({ page, size, storyIds }, { indices: false, addQueryPrefix: true })
    return await request.get(`a/timeline-entries${queryString}`).then(res => res.data)
  }

export const getTimeline =
  (request: AxiosInstance) =>
  async (id: string): Promise<TimelineType> => {
    return await request.get(`a/timeline-entries/${id}`).then(res => res.data)
  }

export const createTimeline =
  (request: AxiosInstance) =>
  async (data: TimelineFormType): Promise<TimelineType> => {
    return await request
      .post(`a/timeline-entries`, {
        ...data,
        at: new Date(data.at).toJSON()
      })
      .then(res => res.data)
  }

export const deleteTimeline =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/timeline-entries/${id}`).then(res => res.data)
  }

// Places api
export const getPlaces =
  (request: AxiosInstance) =>
  async (page: number, size: number, q?: string, storyIds?: string[]): Promise<Pageable<PlaceType>> => {
    const queryString = stringify({ page, size, q, storyIds }, { indices: false, addQueryPrefix: true })
    return await request.get(`a/places${queryString}`).then(res => res.data)
  }

export const createPlace =
  (request: AxiosInstance) =>
  async (data: PlaceFormType): Promise<PlaceType> => {
    return await request.post(`a/places`, data).then(res => res.data)
  }

export const editPlace =
  (request: AxiosInstance) =>
  async (id: string, data: PlaceFormType): Promise<PlaceType> => {
    return await request.put(`a/places/${id}`, data).then(res => res.data)
  }

export const deletePlace =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/places/${id}`)
  }

export const searchLocation =
  (request: AxiosInstance) =>
  async (address: string): Promise<LocationSearchType[]> => {
    return await request.get(`a/geomap/search?format=json&q=${address}`).then(res => res.data)
  }

// Subtitile api
export const getSubtitles =
  (request: AxiosInstance) =>
  async (page: number, size: number, storyIds?: string[]): Promise<Pageable<SubtitleType>> => {
    const queryString = stringify({ page, size, storyIds }, { indices: false, addQueryPrefix: true })
    return await request.get(`a/subtitles${queryString}`).then(res => res.data)
  }

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
    return await request
      .post(`a/subtitles`, data, {
        onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
      })
      .then(res => res.data)
  }

export const deleteSubtitle =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/subtitles/${id}`).then(res => res.data)
  }

// Watcher api

export const getWatchers =
  (request: AxiosInstance) =>
  async (id: string, type: AssetTypes): Promise<Pageable<WatcherType>> => {
    if (type === AssetTypes.collection) {
      return await request.get(`a/collection-watchers?collectionId=${id}`).then(res => res.data)
    }
    return await request.get(`a/story-watchers?storyId=${id}`).then(res => res.data)
  }

export const addWatcher =
  (request: AxiosInstance) =>
  async ({ id, email }: addWatcherType, type: AssetTypes): Promise<WatcherType> => {
    if (type === AssetTypes.collection) {
      return await request.post(`a/collection-watchers`, { email, collectionId: id }).then(res => res.data)
    }
    return await request.post(`a/story-watchers`, { email, storyId: id }).then(res => res.data)
  }

export const removeWatcher =
  (request: AxiosInstance) =>
  async (id: string, type: AssetTypes): Promise<void> => {
    if (type === AssetTypes.collection) {
      return await request.delete(`a/collection-watchers/${id}`).then(res => res.data)
    }
    return await request.delete(`a/story-watchers/${id}`).then(res => res.data)
  }

export const notifyWatcher =
  (request: AxiosInstance) =>
  async (id: string, type: AssetTypes): Promise<void> => {
    if (type === AssetTypes.collection) {
      return await request.post(`a/collection-watchers/${id}/notify`).then(res => res.data)
    }
    return await request.post(`a/story-watchers/${id}/notify`).then(res => res.data)
  }

// Search api
export const search =
  (request: AxiosInstance) =>
  async (page: number, size: number, q?: string): Promise<Pageable<SearchResultType>> => {
    return await request.get(`a/search?q=${q || ''}&page=${page}&size=${size}`).then(res => res.data)
  }

export const searchStories =
  (request: AxiosInstance) =>
  async (page: number, size: number, q?: string): Promise<Pageable<SearchResultType>> => {
    return await request.get(`a/search?q=${q || ''}&page=${page}&size=${size}&t=STORY`).then(res => res.data)
  }

export const searchCollections =
  (request: AxiosInstance) =>
  async (page: number, size: number, q?: string): Promise<Pageable<SearchResultType>> => {
    return await request.get(`a/search?q=${q || ''}&page=${page}&size=${size}&t=COLLECTION`).then(res => res.data)
  }

export const searchSuggestions =
  (request: AxiosInstance) =>
  async (query: string): Promise<{ suggestions: string[] }> => {
    return await request.get(`a/search/suggestions?q=${query || ''}&page=${0}&size=${10}`).then(res => res.data)
  }

// Comments api

export const getComments =
  (request: AxiosInstance) =>
  async (commentId: string, type: AssetTypes): Promise<Pageable<CommentType>> => {
    return await request.get(`a/comments?commentableId=${commentId}&commentableType=${type}`).then(res => res.data)
  }

export const createComment =
  (request: AxiosInstance) =>
  async (comment: CommentFormType): Promise<CommentType> => {
    return await request.post(`a/comments`, comment).then(res => res.data)
  }

export const editComment =
  (request: AxiosInstance) =>
  async (id: string, comment: CommentFormType): Promise<CommentType> => {
    return await request.put(`a/comments/${id}`, comment).then(res => res.data)
  }

export const deleteComment =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/comments/${id}`)
  }

// Collection api

export const getCollections =
  (request: AxiosInstance) =>
  async (page: number, size: number): Promise<Pageable<CollectionType>> => {
    return await request.get(`a/collections?page=${page}&size=${size}`).then(res => res.data)
  }

export const getCollection =
  (request: AxiosInstance) =>
  async (id: string): Promise<CollectionType> => {
    return await request.get(`a/collections/${id}`).then(res => res.data)
  }

export const updateCollection =
  (request: AxiosInstance) =>
  async (id: string, data: CollectionFormType): Promise<CollectionType> => {
    return await request.put(`a/collections/${id}`, data).then(res => res.data)
  }

export const updateCollectionCover =
  (request: AxiosInstance) =>
  async (id: string, coverId: string): Promise<CollectionType> => {
    return await request.post(`a/collections/${id}/change-cover`, { coverId }).then(res => res.data)
  }

export const createCollection =
  (request: AxiosInstance) =>
  async (data: CollectionFormType): Promise<CollectionType> => {
    return await request.post(`a/collections`, data).then(res => res.data)
  }

export const deleteCollection =
  (request: AxiosInstance) =>
  async (id: string): Promise<void> => {
    await request.delete(`a/collections/${id}`)
  }

// Publish api

export const isPublished =
  (request: AxiosInstance) =>
  async (id: string, type: AssetTypes): Promise<boolean> => {
    if (type === AssetTypes.collection) {
      return await getCollection(request)(id).then(res => res.publicAcl)
    }
    return await getStory(request)(id).then(res => res.publicAcl)
  }

export const publish =
  (request: AxiosInstance) =>
  async (id: string, publish: boolean, type: AssetTypes): Promise<void> => {
    if (type === AssetTypes.collection) {
      return publish
        ? await request.post(`a/collections/${id}/make-public`).then(res => res.data)
        : await request.post(`a/collections/${id}/make-private`).then(res => res.data)
    }
    return publish
      ? await request.post(`a/stories/${id}/make-public`).then(res => res.data)
      : await request.post(`a/stories/${id}/make-private`).then(res => res.data)
  }
