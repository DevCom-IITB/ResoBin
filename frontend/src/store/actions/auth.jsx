import axios from 'axios'
import Cookies from 'js-cookie'
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from 'store/actions/types'
import { toastSuccess, toastError } from 'components/toast'

// Signup Action
export const signupAction =
  ({ username, password, passwordAgain }) =>
  async (dispatch) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    }

    const body = JSON.stringify({
      username,
      password,
      passwordAgain,
    })

    try {
      await axios
        .post(
          process.env.REACT_APP_BACKEND_URL + '/accounts/signup',
          body,
          config
        )
        .then(
          ({ response }) => {
            toastSuccess('Signup succesful')
            dispatch({ type: SIGNUP_SUCCESS })
          },
          ({ response }) => {
            toastError(response.data.error)
            dispatch({ type: SIGNUP_FAIL })
          }
        )
        .catch(({ response }) => {
          toastError(response.data.error)
          dispatch({ type: SIGNUP_FAIL })
        })
    } catch {
      toastError('Signup failed. Please try again.')
      dispatch({ type: SIGNUP_FAIL })
    }
  }

// Login Action
export const loginAction =
  ({ username, password }) =>
  async (dispatch) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    }

    const body = JSON.stringify({
      username,
      password,
    })

    try {
      await axios
        .post(
          process.env.REACT_APP_BACKEND_URL + '/accounts/login',
          body,
          config
        )
        .then(
          ({ response }) => {
            toastSuccess('Login succesful')
            dispatch({ type: LOGIN_SUCCESS })
          },
          ({ response }) => {
            toastError(response.data.error)
            dispatch({ type: LOGIN_FAIL })
          }
        )
        .catch(({ response }) => {
          toastError(response.data.error)
          dispatch({ type: LOGIN_FAIL })
        })
    } catch {
      toastError('Login failed. Please try again.')
      dispatch({ type: LOGIN_FAIL })
    }
  }

// Logout Action
export const logout = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
  }

  const body = JSON.stringify({})

  try {
    await axios
      .post(
        process.env.REACT_APP_BACKEND_URL + '/accounts/logout',
        body,
        config
      )
      .then(
        ({ response }) => {
          toastSuccess('Login succesful')
          dispatch({ type: LOGOUT_SUCCESS })
        },
        ({ response }) => {
          toastError(response.data.error)
          dispatch({ type: LOGOUT_FAIL })
        }
      )
      .catch(({ response }) => {
        toastError(response.data.error)
        dispatch({ type: LOGOUT_FAIL })
      })
  } catch ({ response }) {
    toastError(response.data.error)
    dispatch({ type: LOGOUT_FAIL })
  }
}

// Check Authentication Status Action
export const checkAuthenticated = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({})

  try {
    await axios
      .get(
        process.env.REACT_APP_BACKEND_URL + '/accounts/authenticated',
        body,
        config
      )
      .then(
        // if (res.data.error || res.data.isAuthenticated === 'error')
        // else if (res.data.isAuthenticated === 'success')
        ({ response }) => {
          toastSuccess('Login succesful')
          dispatch({
            type: AUTHENTICATED_SUCCESS,
            payload: true,
          })
        },
        ({ response }) => {
          toastError(response.data.error)
          dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false,
          })
        }
      )
      .catch(({ response }) => {
        toastError(response.data.error)
        dispatch({
          type: AUTHENTICATED_FAIL,
          payload: false,
        })
      })
  } catch ({ response }) {
    toastError(response.data.error)
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    })
  }
}

// Delete Account Action
export const delete_account = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
  }

  const body = JSON.stringify({})

  try {
    await axios
      .delete(
        process.env.REACT_APP_BACKEND_URL + '/accounts/delete',
        body,
        config
      )
      .then(
        ({ response }) => {
          toastSuccess('Login succesful')
          dispatch({ type: DELETE_USER_SUCCESS })
        },
        ({ response }) => {
          toastError(response.data.error)
          dispatch({ type: DELETE_USER_FAIL })
        }
      )
      .catch(({ response }) => {
        toastError(response.data.error)
        dispatch({ type: DELETE_USER_FAIL })
      })
  } catch ({ response }) {
    toastError(response.data.error)
    dispatch({
      type: DELETE_USER_FAIL,
    })
  }
}
