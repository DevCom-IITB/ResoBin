import { userTypes } from 'store/actions/types'

let user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? {
      loggedIn: true,
      user,
    }
  : {}

const login = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      }
    case userTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      }
    case userTypes.LOGIN_FAILURE:
      return {}
    case userTypes.LOGOUT:
      return {}
    default:
      return state
  }
}

export default login
