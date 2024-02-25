import axios from 'axios'

const appUrl = new URL('api', process.env.NEXT_PUBLIC_BASE_URL).toString()
export const appApi = axios.create({
  baseURL: appUrl,
})
