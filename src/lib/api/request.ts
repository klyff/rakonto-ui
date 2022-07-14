import { setup } from 'axios-cache-adapter'
import Cookies from 'js-cookie'
import localforage from 'localforage'
// @ts-ignore
import memoryDriver from 'localforage-memoryStorageDriver'
import { history } from '../../App'

const minute = 60 * 1000

localforage.defineDriver(memoryDriver)
const forageStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, memoryDriver._driver],
  name: 'axios-cache'
})

const request = setup({
  baseURL: '/api',
  cache: {
    maxAge: 1 * minute,
    store: forageStore
  }
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

    return Promise.reject(e)
  }
)

export default request
