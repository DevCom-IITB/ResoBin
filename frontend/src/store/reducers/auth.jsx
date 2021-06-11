import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from 'store/actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      }

    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.access) // ! Rename to accessToken
      return {
        ...state,
        token: payload.access,
        isAuthenticated: true,
        loading: false,
      }

    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      }

    default:
      return state
  }
}

export default authReducer
