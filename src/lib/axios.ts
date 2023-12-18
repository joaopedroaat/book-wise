import axios from 'axios'

export const localApi = axios.create({
  baseURL: new URL('/api', window.location.origin).toString(),
})
