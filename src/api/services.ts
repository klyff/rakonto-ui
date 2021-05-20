import { AxiosInstance } from 'axios'

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
