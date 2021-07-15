import axios from 'axios'

import { toastError, toastSuccess } from 'components/toast'

// ? Add csrf cookie to header
const axiosAuth = axios.create({
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
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

export default axiosAuth
