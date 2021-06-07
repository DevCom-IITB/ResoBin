import { combineReducers } from 'redux'

import alert from 'store/reducers/alert'
import login from 'store/reducers/auth'
import signup from 'store/reducers/signup'

const rootReducer = combineReducers({
  alert,
  login,
  signup,
})

export default rootReducer
