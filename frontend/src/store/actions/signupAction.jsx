// import { useHistory } from 'react-router-dom'
import { userTypes } from 'store/actions/types'
import { alertActions } from 'store/actions/alertActions'

// --------------------- Register

const signupAction = (user) => {
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

export default signupAction
