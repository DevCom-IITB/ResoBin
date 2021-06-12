import axios from 'axios'
import Cookies from 'js-cookie'
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from 'store/actions/types'
import { toastSuccess, toastError } from 'components/toast'

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
    } catch ({ response }) {
      toastError(response.data.error)
      dispatch({ type: SIGNUP_FAIL })
    }
  }

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
      const res = await axios
        .post(
          process.env.REACT_APP_BACKEND_URL + '/accounts/login',
          body,
          config
        )
        .then(null, (error) => console.log(error))
        .catch((error) => console.log(error))

      if (res.data.success) {
        dispatch({ type: LOGIN_SUCCESS })
      } else {
        dispatch({ type: LOGIN_FAIL })
      }
      // dispatch(setAlert('Authentication successful', 'success'))
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      })
      // dispatch(setAlert('Authentication unsuccessful', 'error'))
    }
  }

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
  }

  const body = JSON.stringify({
    withCredentials: true,
  })

  try {
    const res = await axios
      .post(
        process.env.REACT_APP_BACKEND_URL + '/accounts/logout',
        body,
        config
      )
      .then(null, (error) => console.log(error))
      .catch((error) => console.log(error))

    if (res.data.success) {
      dispatch({ type: LOGOUT_SUCCESS })
    } else {
      dispatch({ type: LOGOUT_FAIL })
    }
    // dispatch(setAlert('Logout successful', 'success'))
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL })
  }
}
