import { combineReducers } from 'redux'
import alert from 'store/reducers/alert'
import auth from 'store/reducers/auth'

const rootReducer = combineReducers({
  alert,
  auth,
})

export default rootReducer
