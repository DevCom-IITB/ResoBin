import { combineReducers } from 'redux'
import alert from 'reducers/alert'
import auth from 'reducers/auth'

export default combineReducers(alert, auth)
