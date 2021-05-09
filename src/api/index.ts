import axios from 'axios'
import { throws } from 'assert'

const api = axios.create({
  baseURL: '/'
})

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})

export const getMe = async () => {
  try {
    const response = await api.get('/a/me')
    return response.data
  } catch (err) {
    console.error(err)
    return null
  }
}

interface iSingin {
  email: string
  password: string
}

export const singin = async (data: iSingin) => {
  const response = await api.post('/u/auth/signin', data)
  return response.data
}

interface iSingup {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmation: string
}

export const singup = async (data: iSingup) => {
  try {
    const response = await api.post('/u/auth/signup', data)
    return response.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const singout = async () => {
  try {
    const response = await api.post('/u/auth/signout')
    return response.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const confirmEmail = async (token: string) => {
  try {
    const response = await api.post(`u/confirmation-email/${token}`)
    return response.data
  } catch (err) {
    console.error(err)
    return null
  }
}

interface iPasswordReset {
  token: string
  email: string
  password: string
}

export const passwordReset = async (data: iPasswordReset) => {
  const { token, ...rest } = data
  try {
    const response = await api.post(`u/password-reset/${token}`, rest)
    return response.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await api.post(`u/password-reset`, { email })
    return response.data
  } catch (err) {
    console.error(err)
    return null
  }
}
