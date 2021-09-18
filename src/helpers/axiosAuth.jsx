import axios from 'axios'

export const APIInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 30000,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
})

export default APIInstance
