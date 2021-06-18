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
  PersonFormType
} from '@root/types'

// User api
export const getMe = (request: AxiosInstance) => async (): Promise<UserType> => {
  try {
    const response = await request.get('/a/me')
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const signin =
  (request: AxiosInstance) =>
  async (data: SigninFormType): Promise<AuthType> => {
    const response = await request.post('/u/auth/signin', data)
    return response.data
  }

export const singup =
  (request: AxiosInstance) =>
  async (data: SingupFormType): Promise<AuthType> => {
    const response = await request.post('/u/auth/signup', data)
    return response.data
  }

export const singout = (request: AxiosInstance) => async (): Promise<unknown> => {
  const response = await request.post('/a/auth/signout')
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
    const response = await request.get(`/a/collections?page=${page}&size=${size}`)
    return response.data
  }

export const getWatcher =
  (request: AxiosInstance) =>
  async (email: string): Promise<WatcherType> => {
    const response = await request.get(`/a/watchers/${email}`)
    return response.data
  }

export const resendInvite =
  (request: AxiosInstance) =>
  async (id: string, email: string): Promise<void> => {
    return await request.get(`/a/stories/${id}/watcher/${email}/resend-invite`)
  }

// Image api
export const uploadImage =
  (request: AxiosInstance) =>
  async (file: File, progressCallback: (progress: { total: number; loaded: number }) => void): Promise<ImageType> => {
    const data = new FormData()
    data.append('file', file)
    const response = await request.post<ImageType>(`a/images`, data, {
      onUploadProgress: e => progressCallback({ total: e.total, loaded: e.loaded })
    })
    return response.data
  }

export const getImage =
  (request: AxiosInstance) =>
  async (id: string): Promise<ImageType> => {
    const response = await request.get<ImageType>(`a/images/${id}`)
    return response.data
  }

// Person api
export const getPerson =
  (request: AxiosInstance) =>
  async (page: number, size: number): Promise<Pageable<CollectionType>> => {
    const response = await request.get(`/a/collections?page=${page}&size=${size}`)
    return response.data
  }

export const createPerson =
  (request: AxiosInstance) =>
  async (data: PersonFormType): Promise<PersonType> => {
    const response = await request.post(`/a/persons`, data)
    return response.data
  }

export const updatePerson =
  (request: AxiosInstance) =>
  async (data: PersonFormType): Promise<PersonType> => {
    const response = await request.put(`/a/persons`, data)
    return response.data
  }

export const uploadPicture =
  (request: AxiosInstance) =>
  async (
    id: string,
    file: File,
    progressCallback?: (progress: { total: number; loaded: number }) => void
  ): Promise<ImageType> => {
    const data = new FormData()
    data.append('file', file)
    const response = await request.post<ImageType>(`/a/persons/${id}/picture`, data, {
      onUploadProgress: e => progressCallback && progressCallback({ total: e.total, loaded: e.loaded })
    })
    return response.data
  }
