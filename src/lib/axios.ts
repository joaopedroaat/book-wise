import { getApplicationUrl } from '@/utils/getApplicationUrl'
import axios from 'axios'

export const localApi = axios.create({ baseURL: getApplicationUrl() + '/api' })