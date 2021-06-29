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
import { setLoading } from 'features/loadingSlice'
import { toast } from 'react-toastify'

// Signup Action
export const signupAction =
  ({ username, password, passwordAgain }) =>
  async (dispatch) => {
    const body = {
      username,
      password,
      passwordAgain,
    }

    await axios
      .post('/accounts/signup', body)
      .then(({ response }) => {
        toastSuccess('Signup succesful')
        dispatch({ type: SIGNUP_SUCCESS })
      })
      .catch(({ response }) => {
        toastError(response.data.error)
        dispatch({ type: SIGNUP_FAIL })
      })

    dispatch(setLoading(false))
  }

axios.interceptors.request.use((config) => {
  // config.headers['X-CSRFToken'] = Cookies.get('csrftoken')
  return config
})

axios.interceptors.response.use(
  (response) => {
    toastSuccess(response.data.success)
    return response
  },
  (error) => {
    toast.dismiss()
    toastError(`Error occurred, try again later.`)
    return Promise.reject(error)
  }
)

// Login Action
export const loginAction =
  ({ username, password }) =>
  async (dispatch) => {
    const body = {
      username,
      password,
    }

    await axios
      .post('/accounts/login', body)
      .then((response) => dispatch({ type: LOGIN_SUCCESS }))
      .catch((error) => dispatch({ type: LOGIN_FAIL }))

    dispatch(setLoading(false))
  }

// Logout Action
export const logout = () => async (dispatch) => {
  await axios
    .post('/accounts/logout', {})
    .then(({ response }) => {
      toastSuccess('Login succesful')
      dispatch({ type: LOGOUT_SUCCESS })
    })
    .catch(({ response }) => dispatch({ type: LOGOUT_FAIL }))
}

// Check Authentication Status Action
export const checkAuthenticated = () => async (dispatch) => {
  await axios
    .get('/accounts/authenticated', {})
    .then(({ response }) => {
      toastSuccess('Login succesful')
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true,
      })
    })
    .catch((error) =>
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      })
    )
}

// Delete Account Action
export const delete_account = () => async (dispatch) => {
  await axios
    .delete('/accounts/delete', {})
    .then(({ response }) => {
      toastSuccess('Delete succesful')
      dispatch({ type: DELETE_USER_SUCCESS })
    })
    .catch(({ response }) => dispatch({ type: DELETE_USER_FAIL }))
}
