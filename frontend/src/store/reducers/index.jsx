import { combineReducers } from 'redux'

import alert from 'store/reducers/alert'
import login from 'store/reducers/login'
import signup from 'store/reducers/signup'
// import user from 'store/reducers/user'

const rootReducer = combineReducers({
  alert,
  login,
  signup,
  // user,
})

export default rootReducer
