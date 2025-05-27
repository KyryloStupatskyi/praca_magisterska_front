import axios, { AxiosError } from 'axios'

const $auth = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
})

const $public = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
})

$auth.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

$auth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const origRequest = error.config

    if (
      error.response?.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      origRequest._isRetry = true

      try {
        const response = await axios.get(
          'http://localhost:3000/authentication/refresh',
          { withCredentials: true }
        )
        localStorage.setItem('accessToken', response.data.accessToken)
        return $auth.request(origRequest)
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message)
        }
      }
    }
  }
)

export { $auth, $public }
