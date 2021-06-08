import { userTypes } from 'store/actions/types'

const login = (username, password, from) => {
  const request = (user) => ({ type: userTypes.LOGIN_REQUEST, user })
  const success = (user) => ({ type: userTypes.LOGIN_SUCCESS, user })
  const failure = (error) => ({ type: userTypes.LOGIN_FAILURE, error })

  return (dispatch) => {
    dispatch(request({ username }))

    loginService(username, password).then()
  }
}

function loginService(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }

  return fetch(window.BACKEND_URL + '/users/authenticate', requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      return user
    })
}

// remove user from local storage to log user out
const logoutService = () => localStorage.removeItem('user')

const registerService = (user) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }

  return fetch(window.BACKEND_URL + '/users/register', requestOptions).then(
    handleResponse
  )
}

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      // auto logout if 401 response returned from api
      if (response.status === 401) {
        logoutService()
        window.location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

const userActions = {
  login,
}

export default userActions
