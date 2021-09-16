import axios from 'axios'
import Cookies from 'js-cookie'

// import { toastError, toastSuccess } from 'components/toast'

// // ? Add csrf cookie to header
// const axiosAuth = axios.create({
//   baseURL: 'http://localhost:8000',
//   xsrfHeaderName: 'X-CSRFToken',
//   xsrfCookieName: 'csrftoken',
//   withCredentials: true,
// })

// // ? Display toasts for server's responses
// axiosAuth.interceptors.response.use(
//   (response) => {
//     toastSuccess(response.data.success)
//     return response
//   },
//   (error) => {
//     toastError(`Error occurred, try again later.`)
//     return Promise.reject(error)
//   }
// )

export const APIInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  header: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  timeout: 30000,
  // withCredentials: true,
})

export default APIInstance
