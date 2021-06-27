import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from 'store/actions/types'

const initialState = {
  isAuthenticated: null,
  username: '',
  full_name: '',
  ldap: '',
  loading: false,
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      }

    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      }

    case SIGNUP_FAIL:
    case LOGOUT_FAIL:
      return state

    default:
      return state
  }
}

export default authReducer
