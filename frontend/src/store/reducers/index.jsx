import { combineReducers } from 'redux'
import alertReducer from 'store/reducers/alert'
import authReducer from 'store/reducers/auth'

const rootReducer = combineReducers({ alert: alertReducer, auth: authReducer })

export default rootReducer
