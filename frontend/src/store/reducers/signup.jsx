import { userTypes } from 'store/actions/types'

const signup = (state = {}, action) => {
  switch (action.type) {
    case userTypes.REGISTER_REQUEST:
      return { registering: true }
    case userTypes.REGISTER_SUCCESS:
      return {}
    case userTypes.REGISTER_FAILURE:
      return {}
    default:
      return state
  }
}

export default signup
