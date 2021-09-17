import axios from 'axios'
import Cookies from 'js-cookie'

export const APIInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 30000,
  header: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
})

export default APIInstance
