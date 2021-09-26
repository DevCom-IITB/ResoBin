import axios from 'axios'

export const APIInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
})

// ? API endpoints
export const API = {
  auth: {
    // * Authentication endpoints
    login: async ({ params }) => APIInstance.get('/accounts/login', { params }),
    logout: async () => APIInstance.get('/accounts/logout'),
    authenticate: async () => APIInstance.get('/accounts/authenticate'),
    csrftoken: async () => APIInstance.get('/accounts/csrftoken'),
  },

  // * User profile endpoints
  profile: {
    read: async () => APIInstance.get('/accounts/profile'),
    update: async ({ payload }) =>
      APIInstance.put('/accounts/profile', payload),
    delete: async () => APIInstance.delete('/accounts/profile'),
  },

  // * Courses endpoints
  courses: {
    list: async ({ params }) => APIInstance.get('/courses', { params }),
    detail: async ({ code }) => APIInstance.get(`/courses/${code}`),
    listResources: async ({ code }) =>
      APIInstance.get(`/courses/${code}/resources`),
    listReviews: async ({ code }) =>
      APIInstance.get(`/courses/${code}/reviews`),
  },

  // * Resources endpoints
  resources: {
    create: async ({ payload, onUploadProgress }) =>
      APIInstance.post(`/resources`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
      }),
    read: async ({ id }) => APIInstance.get(`/resources/${id}`),
    update: async ({ id, payload, onUploadProgress }) =>
      APIInstance.put(`/resources/${id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      }),
    delete: async ({ id }) => APIInstance.delete(`/resources/${id}`),

    tags: {
      list: async () => APIInstance.get(`/resources/tags`),
    },
  },

  // * Reviews endpoints
  reviews: {
    create: async ({ payload }) => APIInstance.post(`/reviews`, payload),
    read: async ({ id }) => APIInstance.get(`/reviews/${id}`),
    update: async ({ id, payload }) =>
      APIInstance.put(`/reviews/${id}`, payload),
    delete: async ({ id }) => APIInstance.delete(`/reviews/${id}`),
  },

  // * Departments endpoints
  departments: {
    list: async () => APIInstance.get('/departments'),
    detail: async ({ slug }) => APIInstance.get(`/departments/${slug}`),
  },

  // * Developer stats endpoints
  GitHub: {
    getContributors: async () => {
      const ignoredContributors = ['ImgBotApp']
      return axios
        .get('https://api.github.com/repos/arya2331/ResoBin/contributors')
        .then((response) =>
          response.data.filter(
            (contributor) =>
              contributor.type === 'User' &&
              !ignoredContributors.includes(contributor.login)
          )
        )
    },
  },
}

export default APIInstance
