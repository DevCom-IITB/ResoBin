import { userTypes } from 'store/actions/types'
import alertActions from 'store/actions/alertActions'

// --------------------- Login / logout

const login = (username, password) => {
  const request = (user) => ({ type: userTypes.LOGIN_REQUEST, user })
  const success = (user) => ({ type: userTypes.LOGIN_SUCCESS, user })
  const failure = (error) => ({ type: userTypes.LOGIN_FAILURE, error })

  return (dispatch) => {
    dispatch(request({ username }))
    loginService(username, password).then(
      (user) => {
        dispatch(success(user))
        // history.push(from)
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      }
    )
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
const logout = (username, password, from) => {
  localStorage.removeItem('user')
  return { type: userTypes.LOGOUT }
}

// --------------------- Register

const register = (user) => {
  const request = (user) => ({ type: userTypes.REGISTER_REQUEST, user })
  const success = (user) => ({ type: userTypes.REGISTER_SUCCESS, user })
  const failure = (error) => ({ type: userTypes.REGISTER_FAILURE, error })

  return (dispatch) => {
    dispatch(request(user))
    registerService(user).then(
      (user) => {
        dispatch(success())
        // history.push('/login')
        dispatch(alertActions.success('Registration successful'))
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      }
    )
  }
}

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
        localStorage.removeItem('user')
        window.location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

// --------------------- Services

const authHeader = () => {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'))
  return user && user.token ? { Authorization: 'Bearer ' + user.token } : {}
}

const getAllService = () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(window.BACKEND_URL + '/users/', requestOptions).then(
    handleResponse
  )
}

const getByIdService = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(window.BACKEND_URL + '/users/' + id, requestOptions).then(
    handleResponse
  )
}

const updateService = (user) => {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }

  return fetch(window.BACKEND_URL + '/users/' + user.id, requestOptions).then(
    handleResponse
  )
}

const deleteService = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }
  return fetch(window.BACKEND_URL + '/users/' + id, requestOptions).then(
    handleResponse
  )
}

const getAll = () => {
  const request = () => ({ type: userTypes.GETALL_REQUEST })
  const success = (users) => ({ type: userTypes.GETALL_SUCCESS, users })
  const failure = (error) => ({ type: userTypes.GETALL_FAILURE, error })

  return (dispatch) => {
    dispatch(request())

    getAllService().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    )
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = (id) => {
  const request = (id) => ({ type: userTypes.DELETE_REQUEST, id })
  const success = (id) => ({ type: userTypes.DELETE_SUCCESS, id })
  const failure = (id, error) => ({ type: userTypes.DELETE_FAILURE, id, error })

  return (dispatch) => {
    dispatch(request(id))

    deleteService(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    )
  }
}

const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
}

export default userActions
