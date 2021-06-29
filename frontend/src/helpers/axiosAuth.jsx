import axios from 'axios'
import Cookies from 'js-cookie'
import { toastSuccess, toastError } from 'components/toast'

export const axiosAuth = axios.create()

// ? Add cookies before sending request to server
axiosAuth.interceptors.request.use((config) => {
  config.headers['X-CSRFToken'] = Cookies.get('csrftoken')
  return config
})

// ? Display toasts for server's responses
axiosAuth.interceptors.response.use(
  (response) => {
    toastSuccess(response.data.success)
    return response
  },
  (error) => {
    toastError(`Error occurred, try again later.`)
    return Promise.reject(error)
  }
)
