import axios from 'axios'

const api = axios.create({
  baseURL: '/'
})

api.interceptors.request.use(function (config) {
  const storageToken = localStorage.getItem('token')
  const token = storageToken ? JSON.parse(storageToken) : ''
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// TODO null user when 401
// api.interceptors.response.use(function (config) {
//   const token = JSON.parse(localStorage.getItem('token') || '')
//   config.headers.Authorization = `Bearer ${token}`
//   return config
// })

export const getMe = async () => {
  try {
    const response = await api.get('/a/me')
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

export const signin = async (data: iSignin) => {
  const response = await api.post('/u/auth/signin', data)
  return response.data
}

export interface iSingup {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmation: string
}

export const singup = async (data: iSingup) => {
  const response = await api.post('/u/auth/signup', data)
  return response.data
}

export const singout = async () => {
  const response = await api.post('/u/auth/signout')
  return response.data
}

export const confirmEmail = async (token: string) => {
  const response = await api.post(`u/confirmation-email/${token}`)
  return response.data
}

export interface iPasswordReset {
  token: string
  email: string
  password: string
}

export const passwordReset = async (data: iPasswordReset) => {
  const { token, ...rest } = data
  const response = await api.post(`u/password-reset/${token}`, rest)
  return response.data
}

export const requestPasswordReset = async (email: string) => {
  const response = await api.post(`u/password-reset`, { email })
  return response.data
}
