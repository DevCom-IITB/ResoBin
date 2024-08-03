import axios from 'axios'

import { toast } from 'components/shared'
import { camelizeKeys, snakeizeKeys } from 'helpers'

// ? waits for 5 mins before timing out
export const APIInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 300000,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
})

APIInstance.interceptors.request.use(
  (request) => {
    if (request.headers['content-type'] === 'application/json')
      return { ...request, data: snakeizeKeys(request.data) }

    return request
  },
  (error) => {
    return Promise.reject(error.message)
  }
)

APIInstance.interceptors.response.use(
  (response) => {
    if (response.headers['content-type'] === 'application/json')
      return camelizeKeys(response.data)

    return response.data
  },
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error)

    try {
      if (error.response.status === 401)
        toast({ status: 'error', content: 'Please login again' })
    } catch (e) {
      toast({ status: 'error', content: 'Server did not respond' })
    }

    return Promise.reject(error.message)
  }
)

// ? API endpoints
export const API = {
  // * Authentication endpoints
  auth: {
    login: async ({ params }) => APIInstance.get('/accounts/login', { params }),
    logout: async () => APIInstance.get('/accounts/logout'),
    authenticate: async () => APIInstance.get('/accounts/authenticate'),
    csrftoken: async () => APIInstance.get('/accounts/csrftoken'),
  },

  // * User feedback endpoints
  feedback: {
    share: async ({ payload }) =>
      APIInstance.post('/accounts/feedback', payload),
  },

  // * User profile endpoints
  profile: {
    read: async () => APIInstance.get('/accounts/profile'),
    update: async ({ payload }) =>
      APIInstance.put('/accounts/profile', payload),
    delete: async () => APIInstance.delete('/accounts/profile'),

    favorites: async () => APIInstance.get('/accounts/profile/favorites'),

    group: {
      list: async (groupName) =>
        APIInstance.get(`/accounts/group/${groupName}/users`),
    },

    resources: {
      list: async () => APIInstance.get('/accounts/profile/resources'),
    },

    reviews: {
      list: async () => APIInstance.get('/accounts/profile/reviews'),
    },

    rapidreviews: {
      list: async () => APIInstance.get('/accounts/profile/rapidreviews'),
    },

    feed: async () => APIInstance.get('/accounts/profile/feed'),

    timetable: {
      read: async ({ season, year }) =>
        APIInstance.get(
          `/accounts/profile/semester/${season}-${year}/timetable`
        ),
      add: async ({ id }) =>
        APIInstance.put(`/accounts/profile/timetable/${id}`),
      remove: async ({ id }) =>
        APIInstance.delete(`/accounts/profile/timetable/${id}`),
      addShared: async ({ ids }) =>
        APIInstance.put(`/accounts/profile/timetable/shared/${ids}`),
    },
  },

  // * Courses endpoints
  courses: {
    list: async ({ params, cancelToken }) =>
      APIInstance.get('/courses', { params, cancelToken }),
    read: async ({ code }) => APIInstance.get(`/courses/${code}`),
    listResources: async ({ code }) =>
      APIInstance.get(`/courses/${code}/resources`),
    listReviews: async ({ code }) =>
      APIInstance.get(`/courses/${code}/reviews`),

    getCutoffs: async ({ code }) => APIInstance.get(`/courses/${code}/cutoffs`),

    favorite: {
      add: async ({ code }) =>
        APIInstance.put(`/accounts/profile/courses/${code}/favorite`),
      remove: async ({ code }) =>
        APIInstance.delete(`/accounts/profile/courses/${code}/favorite`),
    },
  },

  // * Resources endpoints
  resources: {
    create: async ({ payload, onUploadProgress }) =>
      APIInstance.post(`/resources`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
        timeout: 3600000,
      }),
    read: async ({ id }) => APIInstance.get(`/resources/${id}`),
    update: async ({ id, payload }) =>
      APIInstance.patch(`/resources/${id}`, payload),
    delete: async ({ id }) => APIInstance.delete(`/resources/${id}`),

    request: {
      add: async ({ code }) =>
        APIInstance.put(`/accounts/profile/courses/${code}/request/resources`),
      remove: async ({ code }) =>
        APIInstance.delete(
          `/accounts/profile/courses/${code}/request/resources`
        ),
    },
  },

  professors: {
    read: async ({ code }) => APIInstance.get(`/professor/${code}`),
  },

  similarCourses: {
    read: async ({ code }) => APIInstance.get(`/similar/${code}`),
  },

  // * Reviews endpoints
  reviews: {
    create: async ({ payload }) => APIInstance.post(`/reviews`, payload),
    read: async ({ id }) => APIInstance.get(`/reviews/${id}`),
    update: async ({ id, payload }) =>
      APIInstance.put(`/reviews/${id}`, payload),
    delete: async ({ id }) => APIInstance.delete(`/reviews/${id}`),

    request: {
      add: async ({ code }) =>
        APIInstance.put(`/accounts/profile/courses/${code}/request/reviews`),
      remove: async ({ code }) =>
        APIInstance.delete(`/accounts/profile/courses/${code}/request/reviews`),
    },

    vote: {
      add: async ({ id }) =>
        APIInstance.put(`/accounts/profile/reviews/${id}/vote`),
      remove: async ({ id }) =>
        APIInstance.delete(`/accounts/profile/reviews/${id}/vote`),
    },
  },

  // * Rapid Reviews endpoints
  rapidreviews: {
    create: async ({ payload }) => APIInstance.post(`/rapidreviews`, payload),
    read: async ({ id }) => APIInstance.get(`/rapidreviews/${id}`),
    update: async ({ id, payload }) =>
      APIInstance.put(`/rapidreviews/${id}`, payload),
    delete: async ({ id }) => APIInstance.delete(`/rapidreviews/${id}`),
  },

  // * Departments endpoints
  departments: {
    list: async () => APIInstance.get('/departments'),
    detail: async ({ slug }) => APIInstance.get(`/departments/${slug}`),
  },

  semesters: {
    list: async () => APIInstance.get('/semesters'),
  },

  minors: {
    list: async () => APIInstance.get('/minors'),
  },

  programReviews: {
    read: async ({ id }) => APIInstance.get(`/program-reviews/${id}`),
  },

  honors: {
    list: async () => APIInstance.get('/honors'),
  },
  // * Stats endpoint
  stats: {
    list: async () => APIInstance.get('/stats'),
  },

  // * Timetable endpoint
  timetable: {
    list: async ({ params }) => APIInstance.get('/timetable', { params }),
    read: async ({ id }) => APIInstance.get(`/timetable/${id}`),
  },

  // * Developer stats endpoints
  GitHub: {
    getContributors: async () => {
      const ignoredContributors = ['ImgBotApp']
      return axios
        .get('https://api.github.com/repos/wncc/ResoBin/contributors')
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

export default API
