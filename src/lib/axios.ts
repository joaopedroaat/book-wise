import { environment } from '@/utils/environment'
import axios from 'axios'

const appUrl = new URL('api', environment.NEXT_PUBLIC_BASE_URL).toString()
export const appApi = axios.create({
  baseURL: appUrl,
})
