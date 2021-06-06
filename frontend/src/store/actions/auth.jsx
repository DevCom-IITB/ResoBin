import axios from 'axios'
import { setAlert } from 'store/actions/alert'
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from 'store/actions/types'

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post(
      'http://localhost:8000/api/token/', // ! Changes necessary
      body,
      config
    )

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(setAlert('Authentication successful', 'success'))
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    })
    dispatch(setAlert('Authentication unsuccessful', 'error'))
  }
}

export const signup =
  (name, email, password, passwordAgain) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ name, email, password, passwordAgain })

    try {
      const res = await axios.post(
        'http://localhost:8000/api/accounts/signup/', // ! Changes necessary
        body,
        config
      )

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      })

      dispatch(login(email, password))
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
      })
      dispatch(setAlert('Signup unsuccessful', 'error'))
    }
  }

export const logout = () => (dispatch) => {
  dispatch(setAlert('Logout successful', 'success'))
  dispatch({ type: LOGOUT })
}
