import axios from 'axios'
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  // LOGOUT,
} from 'store/actions/types'
// import { setAlert } from 'store/actions/alert'

export const signup =
  (username, password, passwordAgain) => async (dispatch) => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': '',
      },
    }

    const body = JSON.stringify({
      username,
      password,
      passwordAgain,
    })

    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/accounts/signup/',
        body,
        config
      )

      if (res.data.error) {
        dispatch({ type: SIGNUP_FAIL })
      } else {
        dispatch({ type: SIGNUP_SUCCESS })
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAIL })
      // dispatch(setAlert('Signup unsuccessful', 'error'))
    }
  }

// export const login = (email, password) => async (dispatch) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }
//   const body = JSON.stringify({ email, password })

//   try {
//     const res = await axios.post(
//       'http://localhost:8000/api/token/', // ! Changes necessary
//       body,
//       config
//     )

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data,
//     })

//     dispatch(setAlert('Authentication successful', 'success'))
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAIL,
//     })
//     dispatch(setAlert('Authentication unsuccessful', 'error'))
//   }
// }

// export const logout = () => (dispatch) => {
//   dispatch(setAlert('Logout successful', 'success'))
//   dispatch({ type: LOGOUT })
// }
