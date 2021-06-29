import axios from 'axios'
import Cookies from 'js-cookie'
import { toastSuccess, toastError } from 'components/toast'
import { setLoading } from 'features/loadingSlice'
import store from 'store'

const { dispatch } = store

export const axiosAuth = axios.create()

// Add cookies before sending request to server
axiosAuth.interceptors.request.use((config) => {
  //   dispatch(setLoading(true))
  config.headers['X-CSRFToken'] = Cookies.get('csrftoken')
  return config
})

// Display toasts for server's responses
axiosAuth.interceptors.response.use(
  (response) => {
    // dispatch(setLoading(false))
    toastSuccess(response.data.success)
    return response
  },
  (error) => {
    // dispatch(setLoading(false))
    toastError(`Error occurred, try again later.`)
    return Promise.reject(error)
  }
)
