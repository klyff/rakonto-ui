import { AxiosInstance } from 'axios'
import { StoryType, StoryUpdateType, ImageUploadType } from '@root/types'

export const getMe = (request: AxiosInstance) => async () => {
  try {
    const response = await request.get('/a/me')
    return response.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export interface iSignin {
  email: string
  password: string
}

export const signin = (request: AxiosInstance) => async (data: iSignin) => {
  const response = await request.post('/u/auth/signin', data)
  return response.data
}

export interface iSingup {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmation: string
}

export const singup = (request: AxiosInstance) => async (data: iSingup) => {
  const response = await request.post('/u/auth/signup', data)
  return response.data
}

export const singout = (request: AxiosInstance) => async () => {
  const response = await request.post('/a/auth/signout')
  return response.data
}

export const confirmEmail = (request: AxiosInstance) => async (token: string) => {
  const response = await request.post(`u/confirmation-email/${token}`)
  return response.data
}

export const requestConfirmEmail = (request: AxiosInstance) => async (email: string) => {
  const response = await request.post(`u/confirmation-email`, { email })
  return response.data
}

export interface iPasswordReset {
  token: string
  confirmation: string
  password: string
}

export const passwordReset = (request: AxiosInstance) => async (data: iPasswordReset) => {
  const { token, ...rest } = data
  const response = await request.post(`u/password-reset/${token}`, rest)
  return response.data
}

export const requestPasswordReset = (request: AxiosInstance) => async (email: string) => {
  const response = await request.post(`u/password-reset`, { email })
  return response.data
}

export const searchStories = (request: AxiosInstance) => async () => {
  return Promise.resolve(new Array(10).fill('x'))
}

export const getStory =
  (request: AxiosInstance) =>
  async (id: string): Promise<StoryType> => {
    const response = await request.get<StoryType>(`a/stories/${id}`)
    return response.data
  }

export const createStory = (request: AxiosInstance) => async (file: File, progressCallback: (event: any) => void) => {
  const data = new FormData()
  data.append('file', file)
  const response = await request.post(`a/stories`, data, {
    onUploadProgress: progressCallback
  })
  return response.data
}

export const updateStory = (request: AxiosInstance) => async (id: string, data: Partial<StoryUpdateType>) => {
  const response = await request.put(`a/stories`, data)
  return response.data
}

export const uploadImage =
  (request: AxiosInstance) =>
  async (file: File, progressCallback: (event: any) => void): Promise<ImageUploadType> => {
    const data = new FormData()
    data.append('file', file)
    const response = await request.post<ImageUploadType>(`a/images`, data, {
      onUploadProgress: progressCallback
    })
    return response.data
  }

export const getImage =
  (request: AxiosInstance) =>
  async (id: string): Promise<ImageUploadType> => {
    const response = await request.get<ImageUploadType>(`a/images/${id}`)
    return response.data
  }

export const getCollections = (request: AxiosInstance) => async (page: number, size: number) => {
  const response = await request.get(`/a/collections?page=${page}&size=${size}`)
  return response.data
}
