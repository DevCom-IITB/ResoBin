import { combineReducers } from 'redux'
import alert from 'store/reducers/alert'
import auth from 'store/reducers/auth'

export default combineReducers(alert, auth)
