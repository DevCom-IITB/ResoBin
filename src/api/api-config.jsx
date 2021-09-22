import axios from 'axios'

export const APIInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  timeout: 30000,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
})

// ? API endpoints
export const API = {
  accounts: {
    // * auth endpoints
    login: async (payload) => APIInstance.get('/accounts/login', payload),
    logout: async () => APIInstance.get('/accounts/logout'),
    authenticate: async () => APIInstance.get('/accounts/authenticate'),
    CSRFToken: async () => APIInstance.get('/accounts/csrftoken'),

    // * user profile endpoints
    getProfile: async () => APIInstance.get('/accounts/profile'),
    updateProfile: async (payload) =>
      APIInstance.put('/accounts/profile', payload),
    deleteProfile: async () => APIInstance.delete('/accounts/profile'),
  },

  courses: {
    // * courses endpoints
    getCourseList: async () => APIInstance.get('/courses'),
    getCourseDetail: async ({ code }) => APIInstance.get(`/courses/${code}`),

    // * resources endpoints
    getCourseResourceList: async ({ code }) =>
      APIInstance.get(`/courses/${code}/resources`),
    getCourseResourceDetail: async ({ code, id }) =>
      APIInstance.get(`/courses/${code}/resources/${id}`),

    createCourseResource: async ({ code, payload, onUploadProgress }) =>
      APIInstance.post(`/courses/${code}/resources`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
      }),

    updateCourseResource: async ({ code, id, payload, onUploadProgress }) =>
      APIInstance.put(`/courses/${code}/resources/${id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      }),

    // * reviews endpoints
    getCourseReviewList: async ({ code }) =>
      APIInstance.get(`/courses/${code}/reviews`),
    getCourseReviewDetail: async ({ code, id }) =>
      APIInstance.get(`/courses/${code}/reviews/${id}`),

    createCourseReview: async ({ code, payload }) =>
      APIInstance.post(`/courses/${code}/reviews`, payload),
    updateCourseReview: async ({ code, id, payload }) =>
      APIInstance.put(`/courses/${code}/reviews/${id}`, payload),
  },

  departments: {
    // * departments endpoints
    getDepartmentList: async () => APIInstance.get('/departments'),
    getDepartmentDetail: async ({ name }) =>
      APIInstance.get(`/departments/${name}`),
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
