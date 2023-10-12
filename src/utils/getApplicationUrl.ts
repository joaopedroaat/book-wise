export const getApplicationUrl = () => {
  const isServer = typeof window === 'undefined' // Check if it's running on the server

  if (isServer) {
    // Server-side code to get the URL
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const host = process.env.HOST || 'localhost'
    const port = process.env.PORT || 3000
    return `${protocol}://${host}:${port}`
  } else {
    // Client-side code to get the URL
    return window.location.origin
  }
}
