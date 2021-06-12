import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from 'store/actions/types'

const initialState = {
  isAuthenticated: null,
  username: '',
  full_name: '',
  ldap: '',
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      }

    case SIGNUP_FAIL:
      return state

    // case LOGIN_SUCCESS:
    //   localStorage.setItem('token', payload.access)
    //   return {
    //     ...state,
    //     token: payload.access,
    //     isAuthenticated: true,
    //     loading: false,
    //   }

    // case LOGIN_FAIL:
    // case LOGOUT:
    //   localStorage.removeItem('token')
    //   return {
    //     ...state,
    //     token: null,
    //     isAuthenticated: false,
    //     loading: false,
    //   }

    default:
      return state
  }
}

export default authReducer
