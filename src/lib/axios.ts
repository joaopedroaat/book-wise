import { endpoints } from '@/api/endpoints'
import axios from 'axios'

export const appApi = axios.create({
  baseURL: endpoints.bw,
})
