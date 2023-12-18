'use client'

import axios from 'axios'

export const localApi = axios.create({
  baseURL: new URL(
    '/api',
    process.env.BASE_URL || 'http://localhost:3000',
  ).toString(),
})
