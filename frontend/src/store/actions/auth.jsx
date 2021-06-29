import { axiosAuth } from 'helpers/axiosAuth'
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

// Signup Action
export const signupAction = (data) => async (dispatch) => {
  await axiosAuth
    .post('/accounts/signup', data)
    .then(({ response }) => dispatch({ type: SIGNUP_SUCCESS }))
    .catch(({ response }) => dispatch({ type: SIGNUP_FAIL }))
}

// Login Action
export const loginAction = (data) => async (dispatch) => {
  await axiosAuth
    .post('/accounts/login', data)
    .then((response) => dispatch({ type: LOGIN_SUCCESS }))
    .catch((error) => dispatch({ type: LOGIN_FAIL }))
}

// Logout Action
export const logout = () => async (dispatch) => {
  await axiosAuth
    .post('/accounts/logout', {})
    .then(({ response }) => dispatch({ type: LOGOUT_SUCCESS }))
    .catch(({ response }) => dispatch({ type: LOGOUT_FAIL }))
}

// Check Authentication Status Action
export const checkAuthenticated = () => async (dispatch) => {
  await axiosAuth
    .get('/accounts/authenticated')
    .then(({ response }) =>
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true,
      })
    )
    .catch((error) =>
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      })
    )
}

// Delete Account Action
export const delete_account = () => async (dispatch) => {
  await axiosAuth
    .delete('/accounts/delete', {})
    .then(({ response }) => dispatch({ type: DELETE_USER_SUCCESS }))
    .catch(({ response }) => dispatch({ type: DELETE_USER_FAIL }))
}
